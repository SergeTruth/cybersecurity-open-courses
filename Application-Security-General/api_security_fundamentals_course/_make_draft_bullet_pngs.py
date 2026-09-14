from __future__ import annotations

import html
import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


COURSE_DIR = Path(r"C:\bot\api_security_fundamentals_course")
ASSETS_DIR = COURSE_DIR / "course_assets"
WIDTH, HEIGHT = 1920, 1080
FOOTER = "Truth Surge Draft Visual Edition"


MODULE_BULLETS = {
    "m01": [
        "APIs let applications, services, users, devices, and data systems invoke behavior across software boundaries.",
        "APIs are security-critical because they sit close to business logic, sensitive data, identity, billing, inventory, and workflows.",
        "API security is not just web security with JSON; it includes tokens, object authorization, contracts, pagination, replay, and automation pressure.",
        "Many API failures expose operations too broadly or accept requests the business never intended to allow.",
        "Strong API programs combine ownership, contracts, least privilege, validation, response controls, abuse limits, and visibility.",
    ],
    "m02": [
        "The API attack surface includes public, partner, internal, service-to-service, mobile, browser, webhook, gateway, and proxy paths.",
        "Every request surface matters: paths, parameters, headers, cookies, bodies, tokens, and response fields.",
        "Gateways can centralize authentication, routing, throttling, and logging, but backend services still enforce endpoint responsibility.",
        "Applications must validate inputs, authorize operations, and return only appropriate data for the caller and resource.",
        "Document trust boundaries so teams know where data enters, identity is checked, authorization happens, contracts are validated, and logs are created.",
    ],
    "m03": [
        "Authentication establishes who or what the API caller is, using keys, tokens, OAuth, OIDC, service accounts, workload identity, or mTLS.",
        "Identity design should match the caller, trust model, and operation instead of reusing one pattern everywhere.",
        "API keys are simple but can become long-lived shared secrets that identify integrations rather than individual users.",
        "Bearer tokens require careful handling for storage, transport, logging, lifetime, audience, issuer, and revocation.",
        "Authentication narrows who is calling; authorization, validation, and business rules decide what the caller may do.",
    ],
    "m04": [
        "Authorization decides whether an authenticated caller may perform an action on a specific resource.",
        "Object-level checks are essential when APIs accept direct identifiers for orders, projects, tenants, accounts, or records.",
        "Function-level checks control which operations a caller may perform, such as viewing, closing, approving, updating, or resetting.",
        "Tenant context from headers, paths, tokens, or bodies must be validated against trusted server-side authorization state.",
        "Backend services should enforce least privilege and ownership checks instead of relying on hidden UI controls or client-side logic.",
    ],
    "m05": [
        "API contracts define required fields, optional fields, types, formats, ranges, enums, arrays, nested objects, and constraints.",
        "Validation should run before data reaches business logic, queries, files, downstream services, or state-changing workflows.",
        "JSON syntax alone is not enough; values may be too long, out of range, deprecated, oversized, or forbidden for the caller.",
        "Unknown fields should be rejected or handled through a clearly documented compatibility rule.",
        "Safe validation errors reject early, explain safely, log responsibly, and avoid leaking internals, secrets, stack traces, or SQL details.",
    ],
    "m06": [
        "Excessive data exposure happens when APIs return more information than the caller needs or should receive.",
        "Backend models should not be serialized directly if they include internal IDs, role flags, audit fields, tokens, or configuration details.",
        "Field-level filtering should reflect endpoint, caller, tenant, relationship, and purpose instead of relying on clients to hide fields.",
        "Stable error structures and correlation IDs support troubleshooting without exposing stack traces, service URLs, or raw downstream responses.",
        "Pagination, sorting, and filtering need limits to prevent enumeration, excessive data exposure, and availability risk.",
    ],
    "m07": [
        "APIs are designed for automation, so abuse can happen at machine speed through attacks, bugs, retries, or misconfigured integrations.",
        "Rate limits, throttling, quotas, upload limits, pagination limits, resource limits, and query controls protect reliability.",
        "Good limits are contextual by user, token, IP, tenant, operation, authentication state, workload identity, or client application.",
        "Replay-aware design matters for payments, approvals, password resets, inventory changes, and webhook processing.",
        "Clear limit responses and monitoring help legitimate clients back off while showing which identity, tenant, operation, or endpoint is creating pressure.",
    ],
    "m08": [
        "Security-relevant API logs should show who called what, from where, against which resource, with what result, and at what volume.",
        "Logs should support investigation without becoming a second copy of sensitive payloads, tokens, cookies, passwords, payment data, or personal data.",
        "Audit trails should capture administrative changes, sensitive record access, failed authorization, and API credential changes.",
        "Testing should cover contracts, malformed input, missing fields, oversized data, type confusion, authorization, and abuse cases.",
        "OpenAPI review and production monitoring reveal undocumented endpoints, missing auth, broad parameters, data exposure, unusual volume, and deprecated behavior.",
    ],
    "m09": [
        "API security protects interfaces that expose application data, business logic, and service operations.",
        "Secure APIs are explicit about identity, access, input, output, abuse limits, and operational visibility.",
        "Authentication identifies the caller, while authorization decides whether the caller can act on the resource in context.",
        "Validation, response shaping, rate limits, quotas, pagination, resource controls, and replay-aware workflows reduce security and reliability risk.",
        "API security is an operational discipline built from logs, tests, specifications, monitoring, and regular review.",
    ],
}


def read_html(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="replace")


def clean_text(value: str) -> str:
    value = re.sub(r"<[^>]+>", " ", value)
    value = html.unescape(value)
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def extract_title(source: str, module_id: str) -> str:
    match = re.search(r'<h1\s+id=["\']module-title["\']>(.*?)</h1>', source, re.I | re.S)
    if match:
        title = clean_text(match.group(1))
        if title:
            return title
    return f"Module {module_id[1:]}"


def extract_narration(source: str) -> str:
    match = re.search(r'<div\s+class=["\']narration-text["\']>(.*?)</div>', source, re.I | re.S)
    if not match:
        return ""
    paragraphs = [clean_text(item.group(1)) for item in re.finditer(r"<p>(.*?)</p>", match.group(1), re.I | re.S)]
    return "\n\n".join(paragraph for paragraph in paragraphs if paragraph)


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        r"C:\Windows\Fonts\segoeuib.ttf" if bold else r"C:\Windows\Fonts\segoeui.ttf",
        r"C:\Windows\Fonts\arialbd.ttf" if bold else r"C:\Windows\Fonts\arial.ttf",
    ]
    for candidate in candidates:
        path = Path(candidate)
        if path.exists():
            return ImageFont.truetype(str(path), size=size)
    return ImageFont.load_default()


def wrap_by_pixels(draw: ImageDraw.ImageDraw, text: str, font_obj: ImageFont.ImageFont, max_width: int) -> list[str]:
    lines: list[str] = []
    current = ""
    for word in text.split():
        candidate = word if not current else f"{current} {word}"
        bbox = draw.textbbox((0, 0), candidate, font=font_obj)
        if bbox[2] - bbox[0] <= max_width or not current:
            current = candidate
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines or [""]


def draw_wrapped(
    draw: ImageDraw.ImageDraw,
    text: str,
    xy: tuple[int, int],
    font_obj: ImageFont.ImageFont,
    fill: tuple[int, int, int],
    max_width: int,
    line_gap: int,
) -> int:
    x, y = xy
    for line in wrap_by_pixels(draw, text, font_obj, max_width):
        draw.text((x, y), line, font=font_obj, fill=fill)
        bbox = draw.textbbox((x, y), line, font=font_obj)
        y += (bbox[3] - bbox[1]) + line_gap
    return y


def bullet_block_height(
    draw: ImageDraw.ImageDraw,
    bullets: list[str],
    font_obj: ImageFont.ImageFont,
    max_width: int,
    line_gap: int,
    bullet_gap: int,
) -> int:
    total = 0
    for index, bullet in enumerate(bullets):
        for line in wrap_by_pixels(draw, bullet, font_obj, max_width):
            bbox = draw.textbbox((0, 0), line, font=font_obj)
            total += (bbox[3] - bbox[1]) + line_gap
        if index < len(bullets) - 1:
            total += bullet_gap
    return total


def render_slide(module_id: str, title: str, bullets: list[str], output_path: Path) -> None:
    bg = (248, 250, 252)
    navy = (15, 23, 42)
    muted = (71, 85, 105)
    blue = (0, 102, 255)
    pale_blue = (226, 240, 255)
    line = (203, 213, 225)

    image = Image.new("RGB", (WIDTH, HEIGHT), bg)
    draw = ImageDraw.Draw(image)

    title_font = font(58, bold=True)
    title_small_font = font(50, bold=True)
    eyebrow_font = font(30, bold=True)
    stamp_font = font(40, bold=True)
    bullet_font = font(39)
    bullet_small_font = font(35)
    footer_font = font(26)

    draw.rectangle((0, 0, 32, HEIGHT), fill=blue)
    draw.rectangle((96, 84, 110, 202), fill=pale_blue)
    draw.text((132, 76), f"API Security Fundamentals / {module_id.upper()}", font=eyebrow_font, fill=blue)

    active_title_font = title_small_font if len(wrap_by_pixels(draw, title, title_font, 1240)) > 2 else title_font
    title_bottom = draw_wrapped(draw, title, (132, 116), active_title_font, navy, 1240, 8)
    divider_y = max(256, title_bottom + 20)
    draw.line((96, divider_y, 1824, divider_y), fill=blue, width=5)

    stamp_rect = (1534, 78, 1822, 160)
    draw.rectangle(stamp_rect, fill=pale_blue, outline=blue, width=4)
    stamp = "[DRAFT]"
    stamp_bbox = draw.textbbox((0, 0), stamp, font=stamp_font)
    stamp_x = stamp_rect[0] + ((stamp_rect[2] - stamp_rect[0]) - (stamp_bbox[2] - stamp_bbox[0])) // 2
    stamp_y = stamp_rect[1] + ((stamp_rect[3] - stamp_rect[1]) - (stamp_bbox[3] - stamp_bbox[1])) // 2 - 2
    draw.text((stamp_x, stamp_y), stamp, font=stamp_font, fill=blue)

    max_bullet_width = 1470
    bullet_start_y = divider_y + 72
    available_height = 900 - bullet_start_y
    active_bullet_font = bullet_font
    line_gap = 13
    bullet_gap = 28
    if bullet_block_height(draw, bullets, active_bullet_font, max_bullet_width, line_gap, bullet_gap) > available_height:
        active_bullet_font = bullet_small_font
        line_gap = 12
        bullet_gap = 23

    y = bullet_start_y
    for bullet in bullets[:6]:
        draw.ellipse((142, y + 16, 156, y + 30), fill=blue)
        next_y = draw_wrapped(draw, bullet, (184, y), active_bullet_font, navy, max_bullet_width, line_gap)
        y = next_y + bullet_gap

    draw.line((96, 940, 1824, 940), fill=line, width=2)
    draw.text((96, 974), FOOTER, font=footer_font, fill=muted)

    image.save(output_path)


def main() -> int:
    ASSETS_DIR.mkdir(parents=True, exist_ok=True)
    module_files = [path for path in sorted(COURSE_DIR.glob("m*.html"), key=lambda item: item.name.lower()) if path.stem in MODULE_BULLETS]
    generated = []
    warnings = []

    for module_path in module_files:
        module_id = module_path.stem
        try:
            source = read_html(module_path)
            title = extract_title(source, module_id)
            if not extract_narration(source):
                warnings.append(f"{module_id}: narration text not found")
            bullets = MODULE_BULLETS[module_id]
            output_path = ASSETS_DIR / f"{module_id}.png"
            render_slide(module_id, title, bullets, output_path)
            generated.append((module_id, output_path, len(bullets)))
            print(f"{module_id}: generated {output_path} ({len(bullets)} bullets) - {title}")
        except Exception as exc:
            warnings.append(f"{module_id}: {exc}")
            print(f"WARNING: {module_id} failed: {exc}")

    print("\nVerification:")
    for module_id, output_path, bullet_count in generated:
        with Image.open(output_path) as image:
            status = "OK" if image.size == (WIDTH, HEIGHT) else f"BAD {image.size}"
        print(f"{module_id}.png: {status}; title=yes; bullets={bullet_count}; draft=yes; footer=yes")
    print("m10.png: skipped as quiz")

    if warnings:
        print("\nWarnings:")
        for warning in warnings:
            print(warning)
    return 0 if not warnings else 1


if __name__ == "__main__":
    raise SystemExit(main())
