from pathlib import Path
import math
import subprocess
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parent
SCENES = ROOT / "scenes"
BUILD = ROOT / "build"
AUDIO = ROOT / "audio"
FRAMES = ROOT / "frames"
SCENES.mkdir(parents=True, exist_ok=True)
BUILD.mkdir(parents=True, exist_ok=True)
FRAMES.mkdir(parents=True, exist_ok=True)

W, H = 1920, 1080
FPS = 24

COLORS = {
    "cream": "#F7F0DF",
    "ink": "#241A12",
    "ledger": "#2F5D46",
    "chalk": "#183C32",
    "gold": "#D7A84A",
    "red": "#B84A32",
    "blue": "#5E7FA3",
    "kraft": "#C8A978",
    "purple": "#6E557E",
    "paper": "#FFF8E8",
}


def font(size, bold=False, serif=False):
    candidates = []
    if serif:
        candidates += [
            "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
            "/usr/share/fonts/truetype/liberation2/LiberationSerif-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation2/LiberationSerif-Regular.ttf",
        ]
    candidates += [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf",
    ]
    for p in candidates:
        if Path(p).exists():
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


F_TITLE = font(96, bold=True, serif=True)
F_H1 = font(72, bold=True, serif=True)
F_H2 = font(52, bold=True)
F_BODY = font(42)
F_SMALL = font(30)
F_STAMP = font(44, bold=True)


def hex_to_rgb(x):
    x = x.lstrip("#")
    return tuple(int(x[i:i + 2], 16) for i in (0, 2, 4))


def draw_texture(draw):
    for y in range(0, H, 18):
        alpha = 18 if (y // 18) % 2 == 0 else 8
        draw.line((0, y, W, y), fill=(*hex_to_rgb("#D8C8A5"), alpha), width=1)
    for x in range(0, W, 38):
        draw.line((x, 0, x, H), fill=(*hex_to_rgb("#E4D6B8"), 12), width=1)


def text_center(draw, xy, text, fnt, fill=COLORS["ink"]):
    box = draw.textbbox((0, 0), text, font=fnt)
    x, y = xy
    draw.text((x - (box[2] - box[0]) / 2, y - (box[3] - box[1]) / 2), text, font=fnt, fill=fill)


def wrap_text(draw, text, fnt, max_width):
    words, lines, line = text.split(), [], ""
    for word in words:
        test = (line + " " + word).strip()
        if draw.textbbox((0, 0), test, font=fnt)[2] <= max_width:
            line = test
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def paragraph(draw, xy, text, fnt=F_BODY, fill=COLORS["ink"], max_width=760, leading=1.25):
    x, y = xy
    for line in wrap_text(draw, text, fnt, max_width):
        draw.text((x, y), line, font=fnt, fill=fill)
        y += int(fnt.size * leading)
    return y


def rounded(draw, box, fill, outline=None, width=4, radius=30):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def stamp(draw, xy, text, color=COLORS["red"]):
    x, y = xy
    box = draw.textbbox((0, 0), text, font=F_STAMP)
    w, h = box[2] - box[0] + 54, box[3] - box[1] + 30
    draw.rounded_rectangle((x, y, x + w, y + h), radius=14, outline=color, width=8)
    draw.text((x + 27, y + 14), text, font=F_STAMP, fill=color)


def coin(draw, cx, cy, r=48, label="1"):
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=COLORS["gold"], outline=COLORS["ink"], width=5)
    draw.ellipse((cx - r + 12, cy - r + 12, cx + r - 12, cy + r - 12), outline="#F2D277", width=4)
    text_center(draw, (cx, cy), label, font(42, bold=True), COLORS["ink"])


def bookmark(draw, x, y, color=COLORS["red"], scale=1.0):
    w, h = int(95 * scale), int(270 * scale)
    draw.rounded_rectangle((x, y, x + w, y + h), radius=14, fill=color, outline=COLORS["ink"], width=4)
    draw.polygon([(x, y + h), (x + w / 2, y + h - 45 * scale), (x + w, y + h)], fill=COLORS["cream"], outline=COLORS["ink"])
    draw.rectangle((x + w * 0.43, y - 60 * scale, x + w * 0.57, y + 25 * scale), fill=COLORS["gold"], outline=COLORS["ink"])


def base():
    img = Image.new("RGB", (W, H), COLORS["cream"])
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay, "RGBA")
    draw_texture(d)
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    d = ImageDraw.Draw(img)
    d.rectangle((0, 0, W, 78), fill=COLORS["chalk"])
    d.text((60, 20), "SAVE Learning Co.", font=F_SMALL, fill=COLORS["cream"])
    d.text((W - 560, 20), "Main Street Makers • Founder World", font=F_SMALL, fill=COLORS["cream"])
    d.rectangle((0, H - 64, W, H), fill=COLORS["chalk"])
    d.text((60, H - 45), "© 2026 SAVE Learning Co. All rights reserved.", font=font(24), fill=COLORS["cream"])
    return img, d


def title_scene():
    img, d = base()
    text_center(d, (W / 2, 270), "What Is a Business?", F_TITLE)
    paragraph(d, (520, 385), "A short Main Street Makers explainer about needs, customers, money in, money out, and profit.", F_BODY, max_width=900)
    rounded(d, (690, 620, 1230, 780), COLORS["paper"], COLORS["ink"], 5)
    bookmark(d, 760, 570, COLORS["red"], 0.55)
    bookmark(d, 895, 555, COLORS["blue"], 0.55)
    bookmark(d, 1030, 570, COLORS["ledger"], 0.55)
    stamp(d, (720, 820), "FOUNDER LESSON", COLORS["red"])
    return img


def book_club_scene():
    img, d = base()
    d.text((100, 145), "A need appears", font=F_H1, fill=COLORS["ink"])
    rounded(d, (180, 300, 1740, 820), COLORS["kraft"], COLORS["ink"], 5, 36)
    rounded(d, (260, 360, 620, 620), COLORS["paper"], COLORS["ink"], 5, 22)
    rounded(d, (740, 360, 1100, 620), COLORS["paper"], COLORS["ink"], 5, 22)
    rounded(d, (1220, 360, 1580, 620), COLORS["paper"], COLORS["ink"], 5, 22)
    for x in [300, 780, 1260]:
        d.line((x, 460, x + 280, 460), fill=COLORS["blue"], width=8)
        d.line((x, 515, x + 240, 515), fill=COLORS["ledger"], width=8)
    rounded(d, (1140, 710, 1640, 805), COLORS["paper"], COLORS["red"], 5, 24)
    d.text((1190, 735), "“I lost my place!”", font=F_H2, fill=COLORS["ink"])
    return img


def need_offer_scene():
    img, d = base()
    d.text((100, 145), "Need → Offer", font=F_H1, fill=COLORS["ink"])
    rounded(d, (160, 300, 820, 760), COLORS["paper"], COLORS["ink"], 5, 36)
    d.text((230, 355), "NEED", font=F_H2, fill=COLORS["red"])
    paragraph(d, (230, 440), "Readers need a way to save their place in a book.", F_BODY, max_width=500)
    d.line((890, 540, 1030, 540), fill=COLORS["ink"], width=14)
    d.polygon([(1030, 540), (970, 505), (970, 575)], fill=COLORS["ink"])
    rounded(d, (1100, 300, 1760, 760), COLORS["paper"], COLORS["ink"], 5, 36)
    d.text((1170, 355), "OFFER", font=F_H2, fill=COLORS["ledger"])
    bookmark(d, 1250, 450, COLORS["red"], 0.65)
    bookmark(d, 1410, 430, COLORS["blue"], 0.65)
    d.text((1180, 700), "Handmade bookmarks", font=F_BODY, fill=COLORS["ink"])
    return img


def product_service_scene():
    img, d = base()
    d.text((100, 145), "A product is a thing people buy", font=F_H1, fill=COLORS["ink"])
    for i, (x, color) in enumerate([(380, COLORS["red"]), (560, COLORS["blue"]), (740, COLORS["ledger"])]):
        bookmark(d, x, 355, color, 0.9)
    rounded(d, (1040, 330, 1660, 700), COLORS["paper"], COLORS["ink"], 5, 34)
    paragraph(d, (1110, 400), "Nora’s bookmarks are products. She names her small business Nora’s Bookmark Basket.", F_BODY, max_width=470)
    stamp(d, (1110, 650), "PRODUCT", COLORS["red"])
    return img


def customer_scene():
    img, d = base()
    d.text((100, 145), "Who is the customer?", font=F_H1, fill=COLORS["ink"])
    rounded(d, (250, 330, 1670, 760), COLORS["paper"], COLORS["ink"], 5, 40)
    d.ellipse((420, 420, 620, 620), fill=COLORS["blue"], outline=COLORS["ink"], width=5)
    d.ellipse((860, 420, 1060, 620), fill=COLORS["ledger"], outline=COLORS["ink"], width=5)
    d.ellipse((1300, 420, 1500, 620), fill=COLORS["purple"], outline=COLORS["ink"], width=5)
    d.text((360, 655), "Book club", font=F_BODY, fill=COLORS["ink"])
    d.text((835, 655), "Readers", font=F_BODY, fill=COLORS["ink"])
    d.text((1240, 655), "Customers", font=F_BODY, fill=COLORS["ink"])
    d.text((590, 835), "Start small. Learn who needs your offer.", font=F_H2, fill=COLORS["ink"])
    return img


def expense_scene():
    img, d = base()
    d.text((100, 145), "Expense = money out", font=F_H1, fill=COLORS["ink"])
    rounded(d, (180, 300, 880, 780), COLORS["paper"], COLORS["ink"], 5, 36)
    d.text((255, 355), "Supplies", font=F_H2, fill=COLORS["ledger"])
    for i, label in enumerate(["cardstock", "ribbon", "glue", "pencils"]):
        d.text((260, 455 + i * 72), f"• {label}", font=F_BODY, fill=COLORS["ink"])
    for i in range(4):
        coin(d, 1120 + i * 135, 525, 52, "1")
    d.text((1080, 650), "4 coins spent", font=F_H2, fill=COLORS["red"])
    return img


def price_scene():
    img, d = base()
    d.text((100, 145), "Choose a fair price", font=F_H1, fill=COLORS["ink"])
    labels = [("Too low", COLORS["blue"]), ("Fair", COLORS["gold"]), ("Too high", COLORS["red"])]
    for i, (label, color) in enumerate(labels):
        x = 270 + i * 500
        rounded(d, (x, 360, x + 360, 660), color, COLORS["ink"], 5, 30)
        text_center(d, (x + 180, 490), label, F_H2, COLORS["ink"])
    stamp(d, (770, 720), "FAIR PRICE", COLORS["red"])
    return img


def revenue_scene():
    img, d = base()
    d.text((100, 145), "Revenue = money in", font=F_H1, fill=COLORS["ink"])
    rounded(d, (220, 330, 880, 760), COLORS["paper"], COLORS["ink"], 5, 36)
    d.text((300, 390), "5 bookmarks sold", font=F_H2, fill=COLORS["ledger"])
    for i in range(5):
        coin(d, 1080 + (i % 3) * 135, 420 + (i // 3) * 145, 52, "1")
    d.text((1070, 740), "5 coins earned", font=F_H2, fill=COLORS["red"])
    return img


def profit_scene():
    img, d = base()
    d.text((100, 145), "Profit = money left", font=F_H1, fill=COLORS["ink"])
    rounded(d, (245, 360, 1675, 720), COLORS["paper"], COLORS["ink"], 6, 40)
    text_center(d, (W / 2, 500), "5 coins in  −  4 coins out  =  1 coin left", F_H2, COLORS["ink"])
    for x, label in [(490, "5"), (915, "4"), (1350, "1")]:
        coin(d, x, 610, 48, label)
    stamp(d, (760, 790), "PROFIT", COLORS["red"])
    return img


def choices_scene():
    img, d = base()
    d.text((100, 145), "What comes next?", font=F_H1, fill=COLORS["ink"])
    cards = [("Save", COLORS["ledger"]), ("Buy ribbon", COLORS["blue"]), ("Ask customers", COLORS["purple"])]
    for i, (label, color) in enumerate(cards):
        x = 250 + i * 500
        rounded(d, (x, 360, x + 390, 700), COLORS["paper"], COLORS["ink"], 5, 34)
        d.rectangle((x, 360, x + 390, 450), fill=color)
        text_center(d, (x + 195, 405), label, F_H2, COLORS["cream"])
        paragraph(d, (x + 45, 505), "A founder learns from what happened and chooses a next step.", font(34), max_width=300)
    return img


def wrap_scene():
    img, d = base()
    d.text((100, 145), "A business helps people", font=F_H1, fill=COLORS["ink"])
    steps = ["Notices a need", "Makes an offer", "Serves customers", "Keeps records", "Learns what works"]
    for i, step in enumerate(steps):
        x = 220 + i * 320
        rounded(d, (x, 400, x + 260, 610), COLORS["paper"], COLORS["ink"], 4, 28)
        text_center(d, (x + 130, 505), str(i + 1), font(64, bold=True), COLORS["gold"])
        text_center(d, (x + 130, 680), step, font(30, bold=True), COLORS["ink"])
    return img


def notebook_scene():
    img, d = base()
    d.text((100, 145), "Founder Notebook", font=F_H1, fill=COLORS["ink"])
    rounded(d, (360, 300, 1560, 790), COLORS["paper"], COLORS["ink"], 6, 36)
    d.line((510, 300, 510, 790), fill=COLORS["red"], width=5)
    for y in range(390, 720, 70):
        d.line((570, y, 1440, y), fill=COLORS["blue"], width=3)
    paragraph(d, (610, 410), "What need could your pretend business help solve?", F_H2, max_width=770)
    d.text((610, 690), "Write or tell your answer.", font=F_BODY, fill=COLORS["ledger"])
    return img


SCENE_FUNCS = [
    title_scene,
    book_club_scene,
    need_offer_scene,
    product_service_scene,
    customer_scene,
    expense_scene,
    price_scene,
    revenue_scene,
    profit_scene,
    choices_scene,
    wrap_scene,
    notebook_scene,
]


def save_scenes():
    paths = []
    for i, fn in enumerate(SCENE_FUNCS, start=1):
        img = fn()
        path = SCENES / f"scene_{i:02d}.png"
        img.save(path)
        paths.append(path)
    return paths


def duration(path):
    out = subprocess.check_output([
        "ffprobe", "-v", "error", "-show_entries", "format=duration",
        "-of", "default=nw=1:nk=1", str(path)
    ], text=True).strip()
    return float(out)


def concat_audio():
    audio_files = sorted(AUDIO.glob("*.mp3"))
    if not audio_files:
        raise RuntimeError("No narration MP3 files found")
    inputs = []
    for p in audio_files:
        inputs.extend(["-i", str(p)])
    filter_inputs = "".join(f"[{i}:a]" for i in range(len(audio_files)))
    compressed = BUILD / "narration.mp3"
    subprocess.check_call([
        "ffmpeg", "-y", "-v", "error", *inputs,
        "-filter_complex", f"{filter_inputs}concat=n={len(audio_files)}:v=0:a=1[a]",
        "-map", "[a]",
        "-codec:a", "libmp3lame", "-b:a", "128k",
        str(compressed)
    ])
    return compressed


def create_video(scene_paths, narration):
    total = duration(narration)
    weights = [8, 16, 14, 15, 23, 24, 27, 32, 24, 26, 30, 31]
    scale = total / sum(weights)
    clips = []
    for index, (p, weight) in enumerate(zip(scene_paths, weights), start=1):
        clip = BUILD / f"scene_{index:02d}.mp4"
        seconds = weight * scale
        frames = max(1, int(seconds * FPS))
        zoom = "min(zoom+0.00055,1.045)"
        x_expr = "iw/2-(iw/zoom/2)"
        y_expr = "ih/2-(ih/zoom/2)"
        subprocess.check_call([
            "ffmpeg", "-y", "-v", "error", "-loop", "1", "-i", str(p),
            "-vf", f"zoompan=z='{zoom}':x='{x_expr}':y='{y_expr}':d={frames}:s=1920x1080:fps={FPS},format=yuv420p",
            "-t", f"{seconds:.3f}", "-r", str(FPS), "-c:v", "libx264", "-pix_fmt", "yuv420p",
            str(clip)
        ])
        clips.append(clip)
    list_file = BUILD / "clips.txt"
    list_file.write_text("".join(f"file '{p}'\n" for p in clips))
    slideshow = BUILD / "slideshow.mp4"
    subprocess.check_call([
        "ffmpeg", "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", str(list_file),
        "-c", "copy", str(slideshow)
    ])
    final = ROOT / "what-is-a-business-explainer.mp4"
    subprocess.check_call([
        "ffmpeg", "-y", "-v", "error", "-i", str(slideshow), "-i", str(narration),
        "-c:v", "libx264", "-c:a", "aac", "-b:a", "160k", "-shortest",
        "-movflags", "+faststart", str(final)
    ])
    return final


if __name__ == "__main__":
    paths = save_scenes()
    narration = concat_audio()
    final = create_video(paths, narration)
    print(final)
