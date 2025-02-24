from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib.colors import Color
import qrcode
import os
import tempfile

# Card dimensions (2.5" x 3.5")
CARD_WIDTH, CARD_HEIGHT = 2.5 * inch, 3.5 * inch
PAGE_WIDTH, PAGE_HEIGHT = letter

# Define Royal Turquoise color (#00918b)
royal_turquoise = Color(0, 0.569, 0.545)

# Card content (keeping it minimal for brevity)
pillar_cards = [
    ("Purity Pillar", "Your mission: Eliminate corruption to defend life. Draw Challenge Cards to collect them."),
    ("Protection Pillar", "Your mission: Shield the vulnerable from threats. Draw Challenge Cards to collect them."),
    ("Peace Pillar", "Your mission: Foster unity for the pro-life cause. Draw Challenge Cards to collect them."),
    ("Productivity Pillar", "Your mission: Build initiatives that save lives. Draw Challenge Cards to collect them.")
]
challenge_cards = [
    ("Purity", "Write a 3-sentence pledge to use kind words daily."),
    ("Purity", "Commit to avoiding mean shows or games for one week."),
    ("Purity", "Name a way to help a friend be their best self."),
    ("Purity", "List 2 reasons teasing hurts families."),
    ("Purity", "Pray a short prayer for kindness in your community."),
    ("Protection", "Identify a trick someone might use to fool you and how to spot it."),
    ("Protection", "Suggest a way to keep kids safe online."),
    ("Protection", "Describe a way to tell if a story about life is true."),
    ("Protection", "Plan a simple rule to keep your family safe."),
    ("Protection", "Name a group that helps protect people."),
    ("Peace", "Propose a kind way to end an argument with a friend."),
    ("Peace", "Write a note to make up with someone you’ve disagreed with."),
    ("Peace", "Share a happy saying that brings people together."),
    ("Peace", "Describe a family activity that makes everyone smile."),
    ("Peace", "Suggest a prayer for friends to get along."),
    ("Productivity", "Outline a 1-minute idea to cheer for life."),
    ("Productivity", "Plan a 5-person prayer event to help babies."),
    ("Productivity", "Name a craft kids can make to show love."),
    ("Productivity", "List 3 ways to help a good cause."),
    ("Productivity", "Sketch a quick idea for a life-loving poster.")
]
threat_cards = [
    ("Threat", "A friend sees a scary show. Lose a card unless you suggest a happy one."),
    ("Threat", "Misinformation spreads doubt. Lose a card unless you share a true fact."),
    ("Threat", "Conflict divides your team. Lose a card unless you suggest a peace step."),
    ("Threat", "Opposition mocks your work. Lose a card unless you affirm life’s value."),
    ("Threat", "A distraction stalls progress. Lose a card unless you refocus with a goal."),
    ("Threat", "A tricky person targets a family. Lose a card unless you offer a safeguard."),
    ("Threat", "A culture of death grows. Lose a card unless you pray for strength."),
    ("Threat", "A lie about life spreads. Lose a card unless you tell the truth."),
    ("Threat", "Anger flares in your group. Lose a card unless you calm it with kindness."),
    ("Threat", "Laziness creeps in. Lose a card unless you list a fun task.")
]

def wrap_text(text, width, font, font_size, c):
    c.setFont(font, font_size)
    words = text.split()
    lines = []
    current_line = []
    current_width = 0
    for word in words:
        word_width = c.stringWidth(word + " ", font, font_size)
        if current_width + word_width <= width:
            current_line.append(word)
            current_width += word_width
        else:
            lines.append(" ".join(current_line))
            current_line = [word]
            current_width = word_width
    if current_line:
        lines.append(" ".join(current_line))
    return lines

def draw_card(c, x, y, title, text):
    c.setFont("Helvetica-Bold", 12)
    c.setFillColorRGB(0, 0, 0)
    c.drawString(x + 10, y + CARD_HEIGHT - 20, title)
    c.setFont("Helvetica", 10)
    wrapped_lines = wrap_text(text, CARD_WIDTH - 20, "Helvetica", 10, c)
    for i, line in enumerate(wrapped_lines[:4]):
        c.drawString(x + 10, y + CARD_HEIGHT - 40 - i * 12, line)
    c.rect(x, y, CARD_WIDTH, CARD_HEIGHT)

def create_qr_code(url):
    qr = qrcode.QRCode(version=1, box_size=10, border=1)
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".png")
    img.save(temp_file.name)
    return temp_file.name

def create_pdf():
    c = canvas.Canvas("stronghold_quest.pdf", pagesize=letter)
    # Set PDF metadata title
    c.setTitle("Stronghold Quest: A Pro-Life Card Game from Zoseco")
    
    # Page 1: Cover
    c.setFont("Helvetica-Bold", 20)
    c.setFillColor(royal_turquoise)
    c.drawCentredString(PAGE_WIDTH/2, PAGE_HEIGHT/2, "Stronghold Quest: A Card Game")
    c.setFont("Helvetica", 12)
    c.drawCentredString(PAGE_WIDTH/2, PAGE_HEIGHT/2 - 30, "A Zoseco Challenge to Defend Innocent Life")
    c.setFont("Helvetica-Bold", 11)
    c.drawCentredString(PAGE_WIDTH/2, 1.8 * inch, "Fortify the Stronghold – Get in Touch!")
    c.setFont("Helvetica", 9)
    c.setFillColorRGB(0, 0, 0)
    contact_text = [
        "Text/Voicemail: (219) 488-2689",
        "Email: info@zoseco.com",
        "Join our Discord:",
        "https://discord.com/invite/zZhtw9WVNv"
    ]
    y_pos = 1.6 * inch
    for line in contact_text:
        c.drawCentredString(PAGE_WIDTH/2, y_pos, line)
        y_pos -= 18
    qr_file = create_qr_code("https://discord.com/invite/zZhtw9WVNv")
    c.drawImage(qr_file, 5.5 * inch, 0.8 * inch, 1 * inch, 1 * inch)
    os.remove(qr_file)
    c.showPage()

    # Page 2: Instructions
    c.setFont("Helvetica-Bold", 16)
    c.setFillColor(royal_turquoise)
    c.drawString(1 * inch, PAGE_HEIGHT - 1 * inch, "Stronghold Quest: How to Play")
    c.setFont("Helvetica", 11)
    c.setFillColorRGB(0, 0, 0)
    instructions = [
        "Welcome to Stronghold Quest, a card game from Zoseco to fortify your commitment to defending innocent life! Inspired by our four pillars—Purity, Protection, Peace, and Productivity—you’ll draw cards, face challenges, and overcome threats to build a stronghold for life. Play solo or with your family to collect 7 Challenge Cards (or 12 for a greater victory) and claim your “Defender of Life” badge.",
        "How to Play:",
        "1. Setup: Print this PDF, cut out the cards (Pillar, Challenge, Threat), and use the Score Tracker.",
        "2. Start: Shuffle the Challenge and Threat decks separately. Pick a Pillar Card to guide your mission (optional).",
        "3. Draw & Act: Draw a Challenge Card each turn, complete its task (e.g., write, plan, pray), and keep it. Every 3rd turn, draw a Threat Card instead—follow its instructions to avoid losing a card.",
        "4. Personalize: Make it yours! Draw or color on the cards to reflect your family’s pro-life goals—like adding a heart for purity or a shield for protection. Let kids join in to learn how work defends life.",
        "5. Win: Collect 7 Challenge Cards (or 12 for a greater victory) to fortify your stronghold. Sign your “Defender of Life” badge!",
    ]
    y_pos = PAGE_HEIGHT - 1.5 * inch
    for line in instructions:
        wrapped_lines = wrap_text(line, PAGE_WIDTH - 2 * inch, "Helvetica", 11, c)
        for wrapped_line in wrapped_lines:
            c.drawString(1 * inch, y_pos, wrapped_line)
            y_pos -= 15
        y_pos -= 5
    c.setFont("Helvetica-Bold", 11)
    c.setFillColor(royal_turquoise)
    c.drawCentredString(PAGE_WIDTH/2, 1.8 * inch, "Fortify the Stronghold – Get in Touch!")
    c.setFont("Helvetica", 9)
    c.setFillColorRGB(0, 0, 0)
    contact_text = [
        "Text/Voicemail: (219) 488-2689",
        "Email: info@zoseco.com",
        "Join our Discord:",
        "https://discord.com/invite/zZhtw9WVNv"
    ]
    y_pos = 1.6 * inch
    for line in contact_text:
        c.drawCentredString(PAGE_WIDTH/2, y_pos, line)
        y_pos -= 18
    qr_file = create_qr_code("https://discord.com/invite/zZhtw9WVNv")
    c.drawImage(qr_file, 5.5 * inch, 0.8 * inch, 1 * inch, 1 * inch)
    os.remove(qr_file)
    c.showPage()

    # Page 3: Pillar Cards
    for i, (title, text) in enumerate(pillar_cards):
        x = (i % 2) * (CARD_WIDTH + 20) + 1.75 * inch
        y = PAGE_HEIGHT - ((i // 2) + 1) * (CARD_HEIGHT + 20) - 1 * inch
        draw_card(c, x, y, title, text)
    c.showPage()

    # Pages 4-8: Challenge Cards
    for i, (pillar, text) in enumerate(challenge_cards):
        page = 3 + (i // 4)
        if i % 4 == 0 and i > 0:
            c.showPage()
        x = (i % 2) * (CARD_WIDTH + 20) + 1.75 * inch
        y = PAGE_HEIGHT - ((i % 4 // 2) + 1) * (CARD_HEIGHT + 20) - 1 * inch
        draw_card(c, x, y, f"{pillar} Challenge", text)
    c.showPage()

    # Pages 9-11: Threat Cards
    for i, (type, text) in enumerate(threat_cards):
        page = 8 + (i // 4)
        if i % 4 == 0 and i > 0:
            c.showPage()
        x = (i % 2) * (CARD_WIDTH + 20) + 1.75 * inch
        y = PAGE_HEIGHT - ((i % 4 // 2) + 1) * (CARD_HEIGHT + 20) - 1 * inch
        draw_card(c, x, y, type, text)
    c.showPage()

    # Page 12: Score Tracker, Badge, Contribution, Join Us
    c.setFont("Helvetica-Bold", 12)
    c.setFillColor(royal_turquoise)
    c.drawCentredString(PAGE_WIDTH/2, PAGE_HEIGHT - 1 * inch, "Score Tracker")
    c.setFont("Helvetica", 10)
    c.setFillColorRGB(0, 0, 0)
    c.drawCentredString(PAGE_WIDTH/2, PAGE_HEIGHT - 1.4 * inch, "Goal: Collect 7 Cards (or 12)")
    c.rect(2 * inch, PAGE_HEIGHT - 2 * inch, 4.5 * inch, 0.82 * inch)
    c.setFont("Helvetica", 9)
    c.drawCentredString(3.125 * inch, PAGE_HEIGHT - 1.59 * inch, "Purity: ____")
    c.drawCentredString(3.125 * inch, PAGE_HEIGHT - 1.74 * inch, "Protection: ____")
    c.drawCentredString(5.375 * inch, PAGE_HEIGHT - 1.59 * inch, "Peace: ____")
    c.drawCentredString(5.375 * inch, PAGE_HEIGHT - 1.74 * inch, "Productivity: ____")
    c.drawCentredString(PAGE_WIDTH/2, PAGE_HEIGHT - 2.45 * inch, "Total Cards: ____ / 7 (or 12)")
    c.line(1 * inch, PAGE_HEIGHT - 2.6 * inch, PAGE_WIDTH - 1 * inch, PAGE_HEIGHT - 2.6 * inch)

    badge_width, badge_height = 3.5 * inch, 1.5 * inch
    badge_x, badge_y = (PAGE_WIDTH - badge_width) / 2, 6 * inch
    c.rect(badge_x, badge_y, badge_width, badge_height)
    pillar_size = 0.3 * inch
    c.rect(badge_x - pillar_size - 10, badge_y + badge_height - pillar_size, pillar_size, pillar_size)
    c.rect(badge_x + badge_width + 10, badge_y + badge_height - pillar_size, pillar_size, pillar_size)
    c.rect(badge_x - pillar_size - 10, badge_y, pillar_size, pillar_size)
    c.rect(badge_x + badge_width + 10, badge_y, pillar_size, pillar_size)
    c.setFont("Helvetica-Bold", 14)
    c.setFillColor(royal_turquoise)
    c.drawCentredString(PAGE_WIDTH/2, badge_y + badge_height - 0.4 * inch, "Defender of Life Badge")
    c.setFont("Helvetica", 10)
    c.drawCentredString(PAGE_WIDTH/2, badge_y + badge_height - 0.7 * inch, "Awarded to: ________________")
    c.drawCentredString(PAGE_WIDTH/2, badge_y + badge_height - 1.0 * inch, "Victory Earned!")

    c.setFont("Helvetica-Bold", 11)
    c.setFillColor(royal_turquoise)
    c.drawCentredString(PAGE_WIDTH/2, 4.2 * inch, "Stronghold Quest Optional Contribution")
    c.setFont("Helvetica", 9)
    c.setFillColorRGB(0, 0, 0)
    contribution_text = [
        "Keep building! Contribute 50¢, $500, or",
        "anything to Zoseco: A Stronghold for",
        "Pro-Life Victory. Not tax-deductible.",
        "https://pay.zaprite.com/pl_4LxYdtCRsZ"
    ]
    y_pos = 4 * inch
    for line in contribution_text:
        c.drawCentredString(PAGE_WIDTH/2, y_pos, line)
        y_pos -= 18
    qr_file = create_qr_code("https://pay.zaprite.com/pl_4LxYdtCRsZ")
    c.drawImage(qr_file, 5.5 * inch, 3.2 * inch, 1 * inch, 1 * inch)
    os.remove(qr_file)

    c.setFont("Helvetica-Bold", 11)
    c.setFillColor(royal_turquoise)
    c.drawCentredString(PAGE_WIDTH/2, 1.8 * inch, "Fortify the Stronghold – Get in Touch!")
    c.setFont("Helvetica", 9)
    c.setFillColorRGB(0, 0, 0)
    join_text = [
        "Text/Voicemail: (219) 488-2689",
        "Email: info@zoseco.com",
        "Join our Discord:",
        "https://discord.com/invite/zZhtw9WVNv"
    ]
    y_pos = 1.6 * inch
    for line in join_text:
        c.drawCentredString(PAGE_WIDTH/2, y_pos, line)
        y_pos -= 18
    qr_file = create_qr_code("https://discord.com/invite/zZhtw9WVNv")
    c.drawImage(qr_file, 5.75 * inch, 0.8 * inch, 1 * inch, 1 * inch)
    os.remove(qr_file)
    c.showPage()

    c.save()

if __name__ == "__main__":
    create_pdf()
    print("PDF created as 'stronghold_quest.pdf'!")