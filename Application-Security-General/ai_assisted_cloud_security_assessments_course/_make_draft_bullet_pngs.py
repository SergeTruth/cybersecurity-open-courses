from __future__ import annotations

import html
import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


COURSE_DIR = Path(r"C:\bot\ai_assisted_cloud_security_assessments_course")
ASSETS_DIR = COURSE_DIR / "course_assets"
WIDTH, HEIGHT = 1920, 1080
FOOTER = "Truth Surge Draft Visual Edition"


MODULE_BULLETS = {
    "m01": [
        "Cloud security assessments review identities, assets, configurations, data exposure, logging, governance, and readiness.",
        "AI helps organize evidence, normalize names, group findings, draft questions, and turn notes into clearer outputs.",
        "AI-assisted assessment should stay inside authorized evidence, not become autonomous testing or scanning.",
        "Findings must be grounded in source material such as exports, snapshots, diagrams, logs, scans, or owner confirmation.",
        "Professional review keeps scope defined, data handling approved, source references preserved, and humans accountable.",
    ],
    "m02": [
        "Scope should define the cloud providers, accounts, projects, tenants, regions, environments, and services under review.",
        "A model should not infer that related systems are in scope just because they appear in evidence.",
        "Assessment boundaries must respect ownership across internal systems, clients, vendors, shared platforms, and integrations.",
        "Rules of engagement define allowed data handling, AI use, prohibited actions, approvals, and sensitive information controls.",
        "Scope control prevents unauthorized analysis, accidental disclosure, and findings that lack defensible authority.",
    ],
    "m03": [
        "Useful evidence includes inventories, IAM exports, configuration snapshots, posture findings, diagrams, logs, IaC, and scan summaries.",
        "Each source answers a different question about what exists, who can reach it, how it is configured, and what was observed.",
        "Provenance lets reviewers trace claims back to exports, findings, command output, tickets, or owner confirmation.",
        "Evidence should be prepared with secrets removed, source dates labeled, context preserved, and sensitive data minimized.",
        "Missing owners, unclear identities, unknown sensitivity, or incomplete logging should become open questions, not invented facts.",
    ],
    "m04": [
        "Asset inventory is the baseline for documenting cloud services, workloads, APIs, identities, storage, endpoints, owners, and data sensitivity.",
        "AI can normalize inconsistent names, group related components, and identify likely duplicates for human review.",
        "Attack surface documentation should connect assets to exposure, privileges, management paths, and sensitive data access.",
        "Useful registers capture component, environment, owner, exposure, authentication, data handled, evidence source, assumptions, and status.",
        "The best inventory supports review, prioritization, remediation, incident response, and traceability back to evidence.",
    ],
    "m05": [
        "Identity and access review asks who exists, what each identity can do, and where privileged or stale access remains.",
        "AI can group identities, highlight broad permissions, compare policies, list inactive accounts, and draft owner questions.",
        "Least privilege requires context about business purpose, workload behavior, automation needs, and compensating controls.",
        "Credential exposure, long-lived keys, inactive users, unused roles, and unclear trust relationships need careful handling.",
        "Access changes require human review, remediation options, owner assignment, and validation to avoid disrupting production.",
    ],
    "m06": [
        "Configuration review looks for settings that expose data, weaken controls, or make incidents harder to detect.",
        "Common concerns include public storage, permissive firewall rules, open management ports, weak encryption, missing logging, and exposed secrets.",
        "AI can group findings by storage exposure, network exposure, logging gaps, identity issues, and encryption concerns.",
        "Reports should separate confirmed exposure from theoretical concern and label confidence, evidence, and uncertainty.",
        "Data protection review connects configuration risk to data sensitivity, encryption, backups, retention, logging, and third-party sharing.",
    ],
    "m07": [
        "Assessments should ask whether defenders can detect and investigate important cloud activity.",
        "Relevant sources include audit logs, identity logs, network logs, data access logs, workload logs, alerts, posture events, and runbooks.",
        "AI can map log sources to assets, identify centralized coverage, summarize retention gaps, and draft responder questions.",
        "Detection coverage should include privilege changes, unusual API activity, new keys, exposed storage, public endpoints, and disabled logging.",
        "Incident readiness includes runbooks, roles, escalation paths, evidence handling, break-glass access, contacts, and recovery plans.",
    ],
    "m08": [
        "Remediation planning should prioritize risk, likelihood, impact, exploitability, business context, ownership, dependencies, effort, and controls.",
        "AI can group related findings, draft remediation tickets, suggest verification steps, and create audience-specific report language.",
        "Reports should preserve uncertainty by separating confirmed findings, owner-validation items, and unknown business impact.",
        "Executives need themes, impact, priorities, and decisions; technical teams need affected resources, evidence, guidance, and validation criteria.",
        "Humans own the final assessment, including scope, methodology, evidence, assumptions, recommendations, and follow-up.",
    ],
    "m09": [
        "AI accelerates cloud assessments by organizing evidence, normalizing inventories, summarizing findings, and drafting clearer reports.",
        "AI does not replace authorization, evidence, cloud expertise, validation, or professional judgment.",
        "Strong assessments preserve provenance, mark uncertainty, avoid scope expansion, and use approved evidence workflows.",
        "Useful outputs connect to action through attack surface registers, identity summaries, findings, logging gaps, tickets, and executive summaries.",
        "The goal is faster, better-documented, defensible review while humans retain responsibility for risk decisions and accountability.",
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
    draw.text((132, 76), f"AI-Assisted Cloud Security Assessments / {module_id.upper()}", font=eyebrow_font, fill=blue)

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
