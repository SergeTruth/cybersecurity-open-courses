from __future__ import annotations

import html
import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


COURSE_DIR = Path(r"C:\bot\ai_assisted_container_security_reviews_course")
ASSETS_DIR = COURSE_DIR / "course_assets"
WIDTH, HEIGHT = 1920, 1080
FOOTER = "Truth Surge Draft Visual Edition"


MODULE_BULLETS = {
    "m01": [
        "AI-assisted container review supports authorized analysis of images, Dockerfiles, pipelines, runtime settings, and deployment context.",
        "AI can organize evidence, explain output, draft checklists, summarize scanner results, and improve remediation language.",
        "Container findings depend on base images, dependencies, build process, registry practices, deployment settings, and workload sensitivity.",
        "AI can connect evidence, but it cannot decide scope, compensating controls, or practical remediation by itself.",
        "Scope, evidence, and human verification remain required for faster, clearer, more consistent defensive review.",
    ],
    "m02": [
        "Scope defines the repositories, images, registries, manifests, pipelines, runtime environments, and review activities allowed.",
        "Rules of engagement should define handling for secrets, environment variables, source code, reports, metadata, and architecture details.",
        "AI-assisted workflows should keep sensitive material inside approved systems and minimize or redact values where possible.",
        "Client, tenant, development, production, registry, and cluster boundaries must stay explicit throughout the review.",
        "Avoid out-of-scope testing or intrusive actions unless runtime validation is approved through the agreed plan.",
    ],
    "m03": [
        "Container images package application files, dependencies, metadata, and build layers needed to run the workload.",
        "Layers can reveal package installation, copied files, environment settings, and leftover build artifacts.",
        "Digests identify immutable image versions more precisely than moving tags such as latest or production.",
        "Registries, provenance, signing, promotion workflows, and trusted base images shape confidence in the image.",
        "AI can summarize scanner output, but reviewers must verify whether findings apply to the deployed workload context.",
    ],
    "m04": [
        "Dockerfiles and build definitions show how the image is created, starting with base image choice and version control.",
        "Package installation can add unnecessary tools, shells, compilers, or network utilities that are not needed at runtime.",
        "Copied files may accidentally include source, test data, credentials, or local configuration in the final image.",
        "Build secrets can leak into layers, logs, package manager configuration, or intermediate artifacts.",
        "AI can flag hardening questions, but reviewers must verify each suggestion against the build and operational constraints.",
    ],
    "m05": [
        "Scanner output can be noisy across operating system packages, language dependencies, libraries, and inherited components.",
        "Priority should consider exploitability, reachability, ownership, workload exposure, fixes, controls, and deployed image context.",
        "False positives can occur when scanners infer versions, rely on incomplete metadata, or lack application context.",
        "Stale images often accumulate repeat findings until base images and dependencies are rebuilt, validated, and promoted.",
        "AI can group findings and draft triage tables, but final risk decisions require evidence and reviewer context.",
    ],
    "m06": [
        "Runtime configuration determines what a container can do after deployment, beyond what the image shows by itself.",
        "Root users, Linux capabilities, and privileged containers can increase impact if the workload or boundary is compromised.",
        "Bind mounts, writable filesystems, environment variables, resource limits, and network exposure all affect risk.",
        "Secrets in environment variables and sensitive host paths need careful handling and approved alternatives.",
        "AI can create runtime review checklists, but recommendations must be checked against actual deployment behavior.",
    ],
    "m07": [
        "Kubernetes and orchestration context can change the meaning of a container finding.",
        "Pods, deployments, namespaces, service accounts, admission policy, network policy, and security context influence runtime risk.",
        "Security contexts, RBAC, network policies, and admission controls help turn image review into deployment risk review.",
        "Image pull policies, registry controls, signing, and promotion workflows affect whether deployments are trustworthy and repeatable.",
        "AI can summarize manifests and map findings to context, while reviewers verify live or approved configuration.",
    ],
    "m08": [
        "Useful findings identify the affected image, component, manifest, pipeline, or runtime setting with evidence references.",
        "Reports should explain risk in context, describe severity reasoning, and give practical remediation guidance.",
        "Evidence may include image digests, Dockerfile lines, scanner entries, SBOM components, metadata, manifests, and runtime exports.",
        "Remediation can include base image updates, rebuilds, package removal, secret handling fixes, non-root users, policies, or tickets.",
        "AI can draft language and summaries, but humans must preserve assumptions, limitations, evidence, and safe recommendations.",
    ],
    "m09": [
        "AI can accelerate reviews by organizing evidence, explaining findings, summarizing scanner output, and drafting remediation language.",
        "Strong reviews begin with authorized scope across repositories, images, registries, Dockerfiles, manifests, pipelines, and environments.",
        "Container artifacts can contain secrets, architecture details, vulnerability information, and client boundaries, so data handling matters.",
        "Image and build review should connect to runtime and orchestration context, not rely on scanner output alone.",
        "Human verification remains central to safer containerized applications and practical remediation guidance.",
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
    draw.text((132, 76), f"AI-Assisted Container Security Reviews / {module_id.upper()}", font=eyebrow_font, fill=blue)

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
