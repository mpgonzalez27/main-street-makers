#!/usr/bin/env python3
"""
Build the SAV-35 upgraded hybrid explainer video.

Method:
- Keep exact teaching/math text as controlled programmatic card images.
- Use AI motion clips only for object/story moments where text fidelity is not required.
- Use the existing Sulafat narration from the first production.
"""

from __future__ import annotations

import math
import shutil
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent
OLD = ROOT.parent / "what-is-a-business"
BUILD = ROOT / "build"
CLIPS_BUILD = BUILD / "clips"
SCENES = OLD / "scenes"
KEYFRAMES = ROOT / "keyframes"
AI_CLIPS = ROOT / "clips"

WIDTH = 1920
HEIGHT = 1080
FPS = 24

OUTPUT = ROOT / "what-is-a-business-explainer-upgraded.mp4"
NARRATION = OLD / "build" / "narration.mp3"


def run(cmd: list[str]) -> None:
    print("+", " ".join(str(c) for c in cmd))
    subprocess.run(cmd, check=True)


def ensure_dirs() -> None:
    BUILD.mkdir(exist_ok=True)
    if CLIPS_BUILD.exists():
        shutil.rmtree(CLIPS_BUILD)
    CLIPS_BUILD.mkdir(parents=True)


def font(size: int, bold: bool = False, serif: bool = False) -> ImageFont.FreeTypeFont:
    candidates = []
    if serif:
        candidates.extend(
            [
                "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
                "/usr/share/fonts/truetype/liberation2/LiberationSerif-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation2/LiberationSerif-Regular.ttf",
            ]
        )
    else:
        candidates.extend(
            [
                "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
                "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf",
            ]
        )
    for item in candidates:
        if Path(item).exists():
            return ImageFont.truetype(item, size)
    return ImageFont.load_default()


def draw_round_rect(draw: ImageDraw.ImageDraw, xy, radius, fill, outline, width=5):
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)


def make_next_card() -> Path:
    """Replace the crowded original what-comes-next card with a readable one."""
    out = BUILD / "scene_10_readable.png"
    paper = "#F7F0DF"
    ink = "#241A12"
    green = "#2F5D46"
    blue = "#5E7FA3"
    purple = "#6E557E"
    border = "#1F1A14"

    img = Image.new("RGB", (WIDTH, HEIGHT), paper)
    draw = ImageDraw.Draw(img)

    top_bar = "#183C32"
    draw.rectangle([0, 0, WIDTH, 78], fill=top_bar)
    draw.rectangle([0, HEIGHT - 78, WIDTH, HEIGHT], fill=top_bar)
    draw.text((60, 23), "SAVE Learning Co.", font=font(31), fill="white")
    draw.text((WIDTH - 560, 23), "Main Street Makers • Founder World", font=font(31), fill="white")
    draw.text((60, HEIGHT - 55), "© 2026 SAVE Learning Co. All rights reserved.", font=font(25), fill="white")

    draw.text((98, 150), "What comes next?", font=font(76, bold=True, serif=True), fill=ink)

    cards = [
        ("Save", green, "Keep the coin\nfor later."),
        ("Buy ribbon", blue, "Replace supplies\nand make more."),
        ("Ask customers", purple, "Learn what readers\nlike best."),
    ]
    card_w = 400
    card_h = 330
    gap = 90
    x0 = (WIDTH - (3 * card_w + 2 * gap)) // 2
    y0 = 380
    for i, (title, color, body) in enumerate(cards):
        x = x0 + i * (card_w + gap)
        draw_round_rect(draw, [x, y0, x + card_w, y0 + card_h], 28, "#FFF8EA", border, 5)
        draw.rounded_rectangle([x, y0, x + card_w, y0 + 92], radius=26, fill=color)
        draw.rectangle([x, y0 + 54, x + card_w, y0 + 92], fill=color)
        tw = draw.textlength(title, font=font(45, bold=True))
        draw.text((x + (card_w - tw) / 2, y0 + 20), title, font=font(45, bold=True), fill="white")
        draw.multiline_text((x + 45, y0 + 140), body, font=font(35), fill=ink, spacing=10)

    draw.text(
        (WIDTH // 2 - 535, 810),
        "A founder learns from what happened and chooses a next step.",
        font=font(39, bold=True),
        fill=ink,
    )

    img.save(out)
    return out


def image_clip(image_path: Path, out_path: Path, duration: float, zoom: bool = False) -> None:
    frames = max(1, round(duration * FPS))
    if zoom:
        vf = (
            f"scale={WIDTH}:{HEIGHT},"
            f"zoompan=z='1+0.035*on/{frames}':"
            f"x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':"
            f"d={frames}:s={WIDTH}x{HEIGHT}:fps={FPS},"
            "format=yuv420p"
        )
        cmd = [
            "ffmpeg",
            "-y",
            "-hide_banner",
            "-loglevel",
            "error",
            "-loop",
            "1",
            "-i",
            str(image_path),
            "-frames:v",
            str(frames),
            "-vf",
            vf,
            "-an",
            "-c:v",
            "libx264",
            "-preset",
            "fast",
            "-crf",
            "20",
            "-pix_fmt",
            "yuv420p",
            str(out_path),
        ]
    else:
        cmd = [
            "ffmpeg",
            "-y",
            "-hide_banner",
            "-loglevel",
            "error",
            "-loop",
            "1",
            "-t",
            f"{duration:.3f}",
            "-i",
            str(image_path),
            "-vf",
            f"scale={WIDTH}:{HEIGHT},fps={FPS},format=yuv420p",
            "-an",
            "-c:v",
            "libx264",
            "-preset",
            "fast",
            "-crf",
            "20",
            "-pix_fmt",
            "yuv420p",
            str(out_path),
        ]
    run(cmd)


def video_clip(video_path: Path, out_path: Path, duration: float) -> None:
    run(
        [
            "ffmpeg",
            "-y",
            "-hide_banner",
            "-loglevel",
            "error",
            "-i",
            str(video_path),
            "-t",
            f"{duration:.3f}",
            "-vf",
            f"scale={WIDTH}:{HEIGHT},fps={FPS},format=yuv420p",
            "-an",
            "-c:v",
            "libx264",
            "-preset",
            "fast",
            "-crf",
            "20",
            "-pix_fmt",
            "yuv420p",
            str(out_path),
        ]
    )


def build() -> None:
    ensure_dirs()
    readable_next = make_next_card()

    timeline = [
        ("image", SCENES / "scene_01.png", 6.000, False),
        ("image", KEYFRAMES / "01-book-club-clean.png", 8.000, True),
        ("video", AI_CLIPS / "02-page-turn.mp4", 6.000, False),
        ("image", SCENES / "scene_02.png", 12.000, False),
        ("image", SCENES / "scene_03.png", 14.000, False),
        ("image", KEYFRAMES / "03-bookmark-sketch-clean.png", 8.000, True),
        ("image", SCENES / "scene_04.png", 14.000, False),
        ("image", SCENES / "scene_05.png", 20.000, False),
        ("video", AI_CLIPS / "04-bookmark-basket.mp4", 6.000, False),
        ("image", SCENES / "scene_06.png", 22.000, False),
        ("image", SCENES / "scene_07.png", 24.000, False),
        ("image", SCENES / "scene_08.png", 24.000, False),
        ("image", SCENES / "scene_09.png", 22.000, False),
        ("video", AI_CLIPS / "05-next-choices.mp4", 6.000, False),
        ("image", readable_next, 22.000, False),
        ("image", SCENES / "scene_11.png", 26.000, False),
        ("image", SCENES / "scene_12.png", 30.096, False),
    ]

    clip_paths: list[Path] = []
    for idx, (kind, src, duration, zoom) in enumerate(timeline, start=1):
        out = CLIPS_BUILD / f"{idx:02d}.mp4"
        if kind == "image":
            image_clip(src, out, duration, bool(zoom))
        else:
            video_clip(src, out, duration)
        clip_paths.append(out)

    concat = BUILD / "clips.txt"
    concat.write_text("".join(f"file '{p}'\n" for p in clip_paths))

    silent = BUILD / "silent_upgraded.mp4"
    run(
        [
            "ffmpeg",
            "-y",
            "-hide_banner",
            "-loglevel",
            "error",
            "-f",
            "concat",
            "-safe",
            "0",
            "-i",
            str(concat),
            "-c",
            "copy",
            str(silent),
        ]
    )

    run(
        [
            "ffmpeg",
            "-y",
            "-hide_banner",
            "-loglevel",
            "error",
            "-i",
            str(silent),
            "-i",
            str(NARRATION),
            "-map",
            "0:v:0",
            "-map",
            "1:a:0",
            "-c:v",
            "copy",
            "-c:a",
            "aac",
            "-b:a",
            "160k",
            "-shortest",
            "-movflags",
            "+faststart",
            str(OUTPUT),
        ]
    )

    print(f"Built {OUTPUT}")


if __name__ == "__main__":
    build()
