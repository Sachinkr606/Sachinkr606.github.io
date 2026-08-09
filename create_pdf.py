from reportlab.lib import colors  # type: ignore[import]
from reportlab.lib.pagesizes import A4  # type: ignore[import]
from reportlab.lib.styles import ParagraphStyle  # type: ignore[import]
from reportlab.lib.enums import TA_CENTER  # type: ignore[import]
from reportlab.lib.units import mm  # type: ignore[import]
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle, KeepTogether  # type: ignore[import]

import os

# Output path (same folder as this script)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
pdf_path  = os.path.join(BASE_DIR, "resume.pdf")

# ─────────────────────────────────────────────
# PDF GENERATION  (ReportLab – ATS one-page)
# ─────────────────────────────────────────────
base    = ParagraphStyle("b",    fontName="Helvetica",      fontSize=7.15, leading=8.35, textColor=colors.HexColor("#222222"))
name    = ParagraphStyle("n",    parent=base, fontName="Helvetica-Bold", fontSize=18, leading=19, alignment=TA_CENTER, spaceAfter=1)
title   = ParagraphStyle("t",    parent=base, fontSize=8.05, leading=9.25, alignment=TA_CENTER, textColor=colors.HexColor("#444444"), spaceAfter=2.3)
contact = ParagraphStyle("c",    parent=base, fontSize=6.65, leading=7.8,  alignment=TA_CENTER, textColor=colors.HexColor("#444444"), spaceAfter=2.2)
section = ParagraphStyle("s",    parent=base, fontName="Helvetica-Bold", fontSize=8.25, leading=9.3, spaceBefore=2.7, spaceAfter=1.5)
body    = ParagraphStyle("body", parent=base, fontSize=7.05, leading=8.25, spaceAfter=.8)
item    = ParagraphStyle("i",    parent=base, fontSize=6.9,  leading=8.05, spaceAfter=.45)
job     = ParagraphStyle("j",    parent=base, fontName="Helvetica-Bold", fontSize=7.3, leading=8.3, spaceAfter=.1)
meta    = ParagraphStyle("m",    parent=base, fontSize=6.65, leading=7.7, textColor=colors.HexColor("#555555"), spaceAfter=.5)

doc = SimpleDocTemplate(
    pdf_path, pagesize=A4,
    leftMargin=17*mm, rightMargin=17*mm,
    topMargin=9*mm,   bottomMargin=7*mm
)

story = [
    Paragraph("SACHIN KUMAR", name),
    Paragraph("DATA SCIENCE INTERN | ASPIRING DATA SCIENTIST | PYTHON | SQL | POWER BI | DATA ANALYSIS", title),
    Paragraph(
        "Jamshedpur, Jharkhand | +91 8207548606 | kumarsachin8207548606@gmail.com | "
        "GitHub: github.com/Sachinkr606 | LinkedIn: linkedin.com/in/sachinkr606/",
        contact
    ),
]

def sec(x):
    return [
        Paragraph(x, section),
        HRFlowable(width="100%", thickness=.5, color=colors.HexColor("#777777"),
                   spaceBefore=0, spaceAfter=1.5),
    ]

# About
story += sec("ABOUT ME")
story.append(Paragraph(
    "BCA student and Data Science Intern with hands-on knowledge of Python, SQL, Machine Learning, "
    "Power BI, Excel, and data analysis. Skilled in data cleaning, data processing, exploratory data "
    "analysis, data visualization, insight generation, and analytical problem-solving. Interested in "
    "applying data-driven approaches to real-world problems and building a career in Data Science and AI/ML.",
    body
))

# Education
story += sec("EDUCATION")
for a, b in [
    ("Bachelor of Computer Applications (BCA)",       "Srinath University, Jamshedpur, Jharkhand | 2024–Present | 69.05%"),
    ("Senior Secondary (Class XII) – Science Stream", "Punyark Vidya Mandir, Pundarakh, Bihar | 2022–2024 | 48.9%"),
    ("Secondary (Class X)",                           "Vidya Jyoti School, Gamharia, Jamshedpur | 2017–2022 | 64.75%"),
]:
    story += [Paragraph(a, job), Paragraph(b, meta)]

# Experience
story += sec("EXPERIENCE")
story.append(KeepTogether([
    Paragraph("Data Science Intern", job),
    Paragraph("Vizztal Academy, Adityapur, Jamshedpur | July 2026–Present | 6-month internship", meta),
    Paragraph("• Work with Python for data analysis, data processing, and problem-solving across practical datasets and projects.", item),
    Paragraph("• Apply Machine Learning concepts and algorithms to practical datasets and strengthen AI/ML foundations.", item),
    Paragraph("• Develop skills in SQL, Power BI, Excel, data visualization, data cleaning, analysis, and insight generation.", item),
    Paragraph("• Strengthen analytical thinking, teamwork, communication, and practical problem-solving through hands-on learning.", item),
]))
story.append(Spacer(1, .5))
story.append(KeepTogether([
    Paragraph("Data Analytics Workshop", job),
    Paragraph("Venturing Digitally | 7 Days", meta),
    Paragraph("• Applied data analysis fundamentals and data handling techniques using real-world-style datasets.", item),
    Paragraph("• Used Microsoft Excel for data organization, data cleaning, visualization, and basic insight generation.", item),
    Paragraph("• Completed hands-on assignments simulating industry data scenarios.", item),
]))

# Projects
story += sec("PROJECTS")
story += [
    Paragraph("Personal Portfolio Website", job),
    Paragraph("HTML, CSS, JavaScript | GitHub Pages", meta),
    Paragraph("• Designed and deployed a personal portfolio website to showcase profile, skills, projects, and contact information.", item),
    Paragraph("Phone Book Management System", job),
    Paragraph("C++ | File Handling | CRUD Operations", meta),
    Paragraph("• Developed a console-based contact management application supporting add, search, update, and delete operations.", item),
]

# Technical Skills
story += sec("TECHNICAL SKILLS")
skills = [
    [
        Paragraph("<b>Programming</b><br/>Python, C, C++", item),
        Paragraph("<b>Data &amp; Analytics</b><br/>Data Analysis, EDA, Statistical Data Analysis, Data Cleaning, Data Processing", item),
        Paragraph("<b>Databases</b><br/>SQL, MySQL", item),
    ],
    [
        Paragraph("<b>Visualization &amp; BI</b><br/>Power BI, Microsoft Excel, Data Visualization", item),
        Paragraph("<b>AI / ML</b><br/>Artificial Intelligence, Machine Learning, ML Algorithms", item),
        Paragraph("<b>Core</b><br/>Problem-Solving, Analytical Thinking, Teamwork, Communication", item),
    ],
]
tbl = Table(skills, colWidths=[55*mm, 65*mm, 55*mm])
tbl.setStyle(TableStyle([
    ("VALIGN",        (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING",   (0, 0), (-1, -1), 0),
    ("RIGHTPADDING",  (0, 0), (-1, -1), 5),
    ("TOPPADDING",    (0, 0), (-1, -1), .3),
    ("BOTTOMPADDING", (0, 0), (-1, -1), .3),
]))
story.append(tbl)

# Certifications
story += sec("CERTIFICATIONS & COURSES")
for x in [
    "AWS AI Practitioner Challenge",
    "Microsoft Excel with AI Masterclass — Skill Course (Self-Learning)",
    "Basic Data Science and Artificial Intelligence — Feuchr School of Excellence",
]:
    story.append(Paragraph("• " + x, item))

doc.build(story)
print(f"PDF saved: {pdf_path}")
