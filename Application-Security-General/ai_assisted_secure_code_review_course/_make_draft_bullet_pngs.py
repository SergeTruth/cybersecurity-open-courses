from __future__ import annotations

import html
import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


COURSE_DIR = Path(r"C:\bot\ai_assisted_secure_code_review_course")
ASSETS_DIR = COURSE_DIR / "course_assets"
WIDTH, HEIGHT = 1920, 1080
FOOTER = "Truth Surge Draft Visual Edition"


MODULE_BULLETS = {
    "m01": [
        "AI-assisted secure code review uses AI to support authorized review of source code for security weaknesses.",
        "AI can explain code, summarize components, suggest review areas, draft checklists, and clarify remediation language.",
        "The AI is not the authority on risk appetite, deployment context, business rules, or design history.",
        "Treat each AI statement as a lead that needs verification, not as a finished finding.",
        "A valid finding needs code evidence, context, impact, accountability, and a practical remediation path.",
    ],
    "m02": [
        "Scope identifies which repositories, branches, components, languages, frameworks, services, and deployment paths are authorized.",
        "Exclusions prevent the review from drifting into unrelated systems, third-party code, or sensitive areas needing separate approval.",
        "Review goals should focus on areas such as authentication, authorization, input handling, dependencies, secrets, or recent changes.",
        "Targeted questions against scoped components produce results that are easier to verify than broad repository prompts.",
        "AI usage rules should define approved tools, data handling, shared code, secrets, logs, customer data, and proprietary details.",
    ],
    "m03": [
        "Preparation starts by understanding components, entry points, data stores, service boundaries, and deployment model.",
        "AI can summarize unfamiliar files, trace high-level call paths, and describe framework routes or handlers.",
        "Security review depends on data flow, trust boundaries, input parsing, authentication, authorization, and sensitive data handling.",
        "Vulnerabilities often appear where one component trusts another component, queue message, job, or earlier validation step.",
        "Bounded prompts should ask for summaries, external inputs, assumptions, or specific data paths tied to files and functions.",
    ],
    "m04": [
        "AI-assisted review works best when the reviewer brings patterns for input validation, output encoding, access control, and authentication.",
        "For input validation, check type, length, format, range, and allowed values before untrusted data is used.",
        "For output encoding, verify that data is encoded for the correct destination such as HTML, JavaScript, SQL, shell, logs, or paths.",
        "Access control review requires human understanding of roles, ownership, tenancy, middleware, sessions, tokens, and framework conventions.",
        "Each pattern should ask what input controls behavior, what property is at stake, what guard should exist, and where evidence appears.",
    ],
    "m05": [
        "Good prompts ask focused questions instead of asking whether an entire file or project is secure.",
        "Strong prompts provide code purpose, framework, trust boundary, specific concern, and the structure expected in the response.",
        "Ask AI to separate confirmed observations from hypotheses and cite exact code behavior supporting each claim.",
        "Prompting is part of the review record, including assumptions, decisions, rejected hypotheses, and confirmed evidence.",
        "For numeric review, verify downstream uses such as allocation size, loop bound, timeout, offset, or array index.",
    ],
    "m06": [
        "AI output can be useful and wrong at the same time through hallucinations, false positives, or false negatives.",
        "Verification means checking claims against code, configuration, tests, dependency versions, deployment assumptions, and runtime behavior.",
        "Access-control claims require tracing routes, middleware, service calls, policy checks, and object ownership rules.",
        "Input-validation claims require identifying which input reaches which operation without an adequate check.",
        "Distinguish exploitability from theoretical weakness, and let evidence determine whether a finding is valid.",
    ],
    "m07": [
        "AI can draft safer alternatives, validation logic, framework-specific API suggestions, and tests for remediation.",
        "Generated code must still be reviewed like any other security-sensitive change.",
        "Good remediation fixes the verified issue, preserves intended behavior, handles failure paths, and avoids new weaknesses.",
        "Ask AI to explain assumptions and tradeoffs, not just produce a patch.",
        "Tests should prove the security property, expected rejection paths, edge cases, and corrected behavior before approval.",
    ],
    "m08": [
        "AI-assisted review should fit existing pull request, larger review, SAST, SCA, ticketing, and audit workflows.",
        "In pull requests, AI can summarize security-relevant changes, generate questions, compare against checklists, or draft findings.",
        "AI can group scanner findings, explain tool output, suggest owners, and propose verification steps while preserving original evidence.",
        "Ticketing should distinguish verified vulnerabilities from hypotheses, accepted risk, false positives, and backlog hardening work.",
        "Governance keeps AI assistance visible, bounded, accountable, privacy-aware, and subject to human approval before merge.",
    ],
    "m09": [
        "AI can make secure code review faster, broader, and more consistent, but it does not replace the reviewer.",
        "Strong workflows begin with authorization, scope, architecture, data flows, trust boundaries, auth, dependencies, secrets, and configuration.",
        "Focused prompts should require the AI to separate evidence from assumptions and work on manageable code sections.",
        "Claims must be verified against source code, tests, configuration, runtime behavior, and framework context.",
        "The goal is better security decisions, not automated confidence or blind trust in model output.",
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
    draw.text((132, 76), f"AI-Assisted Secure Code Review / {module_id.upper()}", font=eyebrow_font, fill=blue)

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
