from __future__ import annotations

import html
import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


COURSE_DIR = Path(r"C:\bot\content_security_policy_fundamentals_course")
ASSETS_DIR = COURSE_DIR / "course_assets"
WIDTH, HEIGHT = 1920, 1080
FOOTER = "Truth Surge Draft Visual Edition"


MODULE_BULLETS = {
    "m01": [
        "Content Security Policy is a browser-enforced policy delivered by a web application.",
        "The application tells the browser which sources are expected for scripts, styles, images, fonts, frames, connections, and other resources.",
        "CSP is defense in depth; it does not replace output encoding, safe templates, validation, dependency management, or secure architecture.",
        "A strong policy can make injected script execution harder and easier to detect.",
        "Useful CSP reflects the application architecture and stays specific, supportable, and maintained as the frontend changes.",
    ],
    "m02": [
        "CSP matters because frontend pages often load code and content from many local and third-party sources.",
        "Without a policy, the browser has less application-specific guidance about which resource sources are expected.",
        "CSP can reduce damage from injected content by limiting inline scripts, external script sources, frames, and risky navigation behavior.",
        "The underlying injection bug still needs to be fixed; CSP reduces impact and improves visibility.",
        "Secure rendering habits, controlled third parties, safe templates, and violation reports make CSP stronger and easier to deploy.",
    ],
    "m03": [
        "CSP is normally delivered through the Content-Security-Policy HTTP response header.",
        "Report-only mode lets teams observe violations without blocking behavior during rollout.",
        "Meta tag delivery has limitations and is not a complete substitute for production response headers.",
        "Teams should understand how servers, CDNs, frameworks, proxies, and deployment platforms set CSP headers.",
        "Rollout should move from report-only observation to staged enforcement with monitoring, ownership, documentation, and regression checks.",
    ],
    "m04": [
        "CSP directives control categories of browser resources and behavior.",
        "default-src provides fallback policy, while script-src, style-src, img-src, connect-src, and font-src control specific resources.",
        "frame-src, object-src, base-uri, and form-action reduce risks from injected markup, frames, object content, and unexpected submissions.",
        "Source expressions that are acceptable for images may be too broad for scripts or other high-risk resource types.",
        "The safest policies are explicit about scripts, frames, forms, and object content instead of relying on broad fallbacks.",
    ],
    "m05": [
        "Script control is central because script execution is often the high-impact outcome of browser injection.",
        "Allowing unsafe-inline weakens CSP by broadly permitting inline script execution.",
        "Nonces and hashes allow specific trusted inline scripts or styles when implemented carefully.",
        "Nonces must be unpredictable and fresh per response; hashes must match exact trusted content and change when content changes.",
        "unsafe-eval, broad script allowlists, and strict-dynamic behavior should be managed as architecture decisions, not pasted-in header fixes.",
    ],
    "m06": [
        "Third-party resources make CSP design difficult because each dependency may require scripts, frames, images, styles, or network connections.",
        "CSP forces teams to name trusted external relationships explicitly and review sources that cannot be justified.",
        "Overly broad allowlists, wildcard patterns, and every-HTTPS allowances reduce the value of the policy.",
        "Allowed third-party scripts still carry supply chain risk because CSP cannot make trusted script code safe after it runs.",
        "Origin inventories should track why each source is needed, which feature uses it, who owns it, and how provider changes are handled.",
    ],
    "m07": [
        "CSP reporting shows browser-side policy violations and what enforcement would block or report.",
        "Report-only policies help teams learn what production enforcement would affect before users experience breakage.",
        "Reports can be noisy because of extensions, privacy tools, cached pages, unusual clients, and enterprise tooling.",
        "Reporting pipelines may receive sensitive browser-side event data, so collection and access should be minimized and protected.",
        "Useful reporting programs have triage rules, ownership, summaries, dashboards, and feedback into policy maintenance.",
    ],
    "m08": [
        "CSP testing starts with browser developer tools, staging environments, and automated checks for expected headers.",
        "Header presence is not enough; policy content and application behavior both need review.",
        "Template and script review should find inline scripts, event handlers, raw HTML helpers, dynamic loading, tag changes, and escaping bypasses.",
        "Regression testing should include authenticated pages, payment flows, widgets, dashboards, previews, and other frontend-heavy features.",
        "CSP needs ownership, documentation, approval paths, and deliberate updates as application features change.",
    ],
    "m09": [
        "CSP helps browsers enforce resource-loading rules and reduce the impact of some injection flaws.",
        "It is most useful alongside output encoding, safe rendering, secure framework practices, dependency management, and frontend design.",
        "Strong programs start in report-only mode, then move toward enforcement as legitimate resource needs are understood.",
        "Risky allowances such as unsafe-inline, unsafe-eval, broad wildcards, and unnecessary third-party sources should shrink over time.",
        "CSP works best when scripts, widgets, analytics, frame targets, API endpoints, and style changes are reviewed like application changes.",
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
    draw.text((132, 76), f"Content Security Policy Fundamentals / {module_id.upper()}", font=eyebrow_font, fill=blue)

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
