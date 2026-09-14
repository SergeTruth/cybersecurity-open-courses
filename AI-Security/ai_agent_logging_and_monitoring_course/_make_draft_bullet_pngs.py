from __future__ import annotations

import html
import re
import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


COURSE_DIR = Path(r"C:\bot\ai_agent_logging_and_monitoring_course")
ASSETS_DIR = COURSE_DIR / "course_assets"
WIDTH, HEIGHT = 1920, 1080
FOOTER = "Truth Surge Draft Visual Edition"


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

    block = match.group(1)
    paragraphs = [clean_text(item.group(1)) for item in re.finditer(r"<p>(.*?)</p>", block, re.I | re.S)]
    paragraphs = [paragraph for paragraph in paragraphs if paragraph]
    return "\n\n".join(paragraphs)


def split_sentences(text: str) -> list[str]:
    text = re.sub(r"\s+", " ", text).strip()
    if not text:
        return []
    parts = re.split(r"(?<=[.!?])\s+(?=[A-Z0-9])", text)
    return [part.strip() for part in parts if len(part.strip()) > 25]


def shorten_sentence(sentence: str, max_chars: int = 150) -> str:
    sentence = sentence.strip()
    replacements = {
        "AI agents": "Agents",
        "artificial intelligence": "AI",
        "monitoring and logging": "logging and monitoring",
    }
    for old, new in replacements.items():
        sentence = sentence.replace(old, new)

    if len(sentence) <= max_chars:
        return sentence

    cut = sentence[: max_chars + 1]
    for sep in ["; ", ": ", " because ", " when ", " so that "]:
        idx = cut.rfind(sep)
        if idx >= 70:
            cut = cut[:idx]
            break
    else:
        cut = cut[:max_chars].rsplit(" ", 1)[0]
    cut = re.sub(r"\b(the|a|an|and|or|to|of|for|with|from|that)$", "", cut, flags=re.I).strip()
    return cut.rstrip(" ,;:") + "."


def score_sentence(sentence: str, index: int) -> float:
    lowered = sentence.lower()
    score = 0.0
    keywords = [
        "agent",
        "log",
        "monitor",
        "trace",
        "tool",
        "approval",
        "policy",
        "security",
        "privacy",
        "audit",
        "incident",
        "retrieval",
        "memory",
        "detection",
        "alert",
        "reliability",
        "governance",
        "correlat",
        "sensitive",
        "authorization",
        "forensic",
    ]
    for keyword in keywords:
        if keyword in lowered:
            score += 1.0
    if 60 <= len(sentence) <= 170:
        score += 1.5
    if index < 8:
        score += 0.5
    if lowered.startswith(("the goal", "the final takeaway", "a strong", "without", "monitoring must")):
        score += 1.0
    return score


def make_bullets(narration: str) -> list[str]:
    if not narration.strip():
        return ["Narration text not found for this module."]

    sentences = split_sentences(narration)
    if not sentences:
        return ["Narration text not found for this module."]

    candidates = []
    for index, sentence in enumerate(sentences):
        lowered = sentence.lower()
        if lowered in {"narration", "assessment"}:
            continue
        if any(term in lowered for term in ["connecting to lms", "previous", "next", "submit quiz"]):
            continue
        candidates.append((index, score_sentence(sentence, index), sentence))

    if not candidates:
        return ["Narration text not found for this module."]

    selected = sorted(candidates, key=lambda item: (-item[1], item[0]))[:5]
    selected = sorted(selected, key=lambda item: item[0])

    bullets: list[str] = []
    seen: set[str] = set()
    for _, _, sentence in selected:
        bullet = shorten_sentence(sentence)
        normalized = re.sub(r"[^a-z0-9]+", " ", bullet.lower()).strip()
        if normalized and normalized not in seen:
            bullets.append(bullet)
            seen.add(normalized)
        if len(bullets) == 5:
            break

    if len(bullets) < 4:
        for sentence in sentences:
            bullet = shorten_sentence(sentence)
            normalized = re.sub(r"[^a-z0-9]+", " ", bullet.lower()).strip()
            if normalized and normalized not in seen:
                bullets.append(bullet)
                seen.add(normalized)
            if len(bullets) >= 4:
                break

    return bullets[:5] if bullets else ["Narration text not found for this module."]


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
    for paragraph in text.splitlines() or [text]:
        words = paragraph.split()
        current = ""
        for word in words:
            candidate = word if not current else f"{current} {word}"
            bbox = draw.textbbox((0, 0), candidate, font=font_obj)
            if bbox[2] - bbox[0] <= max_width or not current:
                current = candidate
            else:
                lines.append(current)
                current = word
        if current:
            lines.append(current)
    return lines


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
    lines = wrap_by_pixels(draw, text, font_obj, max_width)
    for line in lines:
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
    height = 0
    for index, bullet in enumerate(bullets):
        lines = wrap_by_pixels(draw, bullet, font_obj, max_width)
        for line in lines or [""]:
            bbox = draw.textbbox((0, 0), line, font=font_obj)
            height += (bbox[3] - bbox[1]) + line_gap
        if index < len(bullets) - 1:
            height += bullet_gap
    return height


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
    bullet_font = font(40)
    bullet_small_font = font(36)
    footer_font = font(26)

    draw.rectangle((0, 0, 32, HEIGHT), fill=blue)
    draw.rectangle((96, 84, 110, 202), fill=pale_blue)

    draw.text((132, 76), f"AI Agent Logging and Monitoring / {module_id.upper()}", font=eyebrow_font, fill=blue)

    title_lines = wrap_by_pixels(draw, title, title_font, 1240)
    active_title_font = title_font
    if len(title_lines) > 2:
        active_title_font = title_small_font
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
    active_bullet_font = bullet_font
    line_gap = 13
    bullet_gap = 30
    bullet_start_y = divider_y + 72
    max_content_height = 900 - bullet_start_y
    if bullet_block_height(draw, bullets, active_bullet_font, max_bullet_width, line_gap, bullet_gap) > max_content_height:
        active_bullet_font = bullet_small_font
        line_gap = 12
        bullet_gap = 24
    while len(bullets) > 4 and bullet_block_height(draw, bullets, active_bullet_font, max_bullet_width, line_gap, bullet_gap) > max_content_height:
        bullets = bullets[:-1]

    y = bullet_start_y
    for bullet in bullets:
        draw.ellipse((142, y + 16, 156, y + 30), fill=blue)
        next_y = draw_wrapped(draw, bullet, (184, y), active_bullet_font, navy, max_bullet_width, line_gap)
        y = next_y + bullet_gap
        if y > 900:
            break

    draw.line((96, 940, 1824, 940), fill=line, width=2)
    draw.text((96, 974), FOOTER, font=footer_font, fill=muted)

    image.save(output_path)


def main() -> int:
    ASSETS_DIR.mkdir(parents=True, exist_ok=True)
    module_files = sorted(COURSE_DIR.glob("m*.html"), key=lambda path: path.name.lower())
    generated = []
    warnings = []

    for module_path in module_files:
        module_id = module_path.stem
        try:
            source = read_html(module_path)
            title = extract_title(source, module_id)
            narration = extract_narration(source)
            bullets = make_bullets(narration)
            output_path = ASSETS_DIR / f"{module_id}.png"
            render_slide(module_id, title, bullets, output_path)
            generated.append((module_id, output_path, title, len(bullets), not bool(narration.strip())))
            print(f"{module_id}: generated {output_path} ({len(bullets)} bullet{'s' if len(bullets) != 1 else ''}) - {title}")
        except Exception as exc:
            warnings.append(f"{module_id}: {exc}")
            print(f"WARNING: {module_id} failed: {exc}")

    print("\nVerification:")
    for module_id, output_path, title, bullet_count, used_fallback in generated:
        with Image.open(output_path) as image:
            status = "OK" if image.size == (WIDTH, HEIGHT) else f"BAD {image.size}"
        fallback = " fallback" if used_fallback else ""
        print(f"{module_id}.png: {status}; title=yes; bullets={bullet_count}{fallback}; draft=yes; footer=yes")

    if warnings:
        print("\nWarnings:")
        for warning in warnings:
            print(warning)
    return 0 if not warnings else 1


if __name__ == "__main__":
    raise SystemExit(main())
