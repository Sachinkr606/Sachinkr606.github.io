from reportlab.lib import colors  # type: ignore[import]
from reportlab.lib.pagesizes import A4  # type: ignore[import]
from reportlab.lib.styles import ParagraphStyle  # type: ignore[import]
from reportlab.lib.enums import TA_CENTER  # type: ignore[import]
from reportlab.lib.units import mm  # type: ignore[import]
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle, KeepTogether  # type: ignore[import]

import os

# Output path (same folder as this script)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
pdf_path = os.path.join(BASE_DIR, "Sachinkr606resume.pdf")

# ─────────────────────────────────────────────
# PDF GENERATION  (ReportLab – ATS one-page)
# ─────────────────────────────────────────────
base    = ParagraphStyle("b",    fontName="Helvetica",      fontSize=8.1, leading=9.3, textColor=colors.HexColor("#222222"))
name    = ParagraphStyle("n",    parent=base, fontName="Helvetica-Bold", fontSize=18.5, leading=19.5, alignment=TA_CENTER, spaceAfter=1)
title   = ParagraphStyle("t",    parent=base, fontSize=9.0, leading=10.1, alignment=TA_CENTER, textColor=colors.HexColor("#444444"), spaceAfter=1.8)
contact = ParagraphStyle("c",    parent=base, fontSize=7.6, leading=8.7, alignment=TA_CENTER, textColor=colors.HexColor("#444444"), spaceAfter=1.8)
section = ParagraphStyle("s",    parent=base, fontName="Helvetica-Bold", fontSize=9.1, leading=10.1, spaceBefore=2.0, spaceAfter=1.0)
body    = ParagraphStyle("body", parent=base, fontSize=7.95, leading=9.1, spaceAfter=.5)
item    = ParagraphStyle("i",    parent=base, fontSize=7.8,  leading=8.9, spaceAfter=.3)
job     = ParagraphStyle("j",    parent=base, fontName="Helvetica-Bold", fontSize=8.2, leading=9.2, spaceAfter=.1)
meta    = ParagraphStyle("m",    parent=base, fontSize=7.5, leading=8.5, textColor=colors.HexColor("#555555"), spaceAfter=.3)

doc = SimpleDocTemplate(
    pdf_path, pagesize=A4,
    leftMargin=14*mm, rightMargin=14*mm,
    topMargin=6*mm,   bottomMargin=5*mm
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
                   spaceBefore=0, spaceAfter=1.2),
    ]

# About
story += sec("ABOUT ME")
story.append(Paragraph(
    "BCA student and Data Science Intern with hands-on expertise in Python, SQL, Machine Learning, "
    "Power BI, Excel, and data analytics. Demonstrated experience in data cleaning, exploratory data analysis (EDA), "
    "predictive modeling, and interactive visualization. Focused on applying data-driven strategies and AI/ML algorithms "
    "to address complex business challenges and deliver actionable insights.",
    body
))

# Education
story += sec("EDUCATION")
for a, b in [
    ("Bachelor of Computer Applications (BCA)",       "Srinath University, Jamshedpur, Jharkhand | 2024–Present | Score: 69.05%"),
    ("Senior Secondary (Class XII) – Science Stream", "Punyark Vidya Mandir, Pundarakh, Bihar | 2022–2024 | Score: 48.9%"),
    ("Secondary (Class X)",                           "Vidya Jyoti School, Gamharia, Jamshedpur | 2017–2022 | Score: 64.75%"),
]:
    story += [Paragraph(a, job), Paragraph(b, meta)]

# Experience
story += sec("EXPERIENCE")
story.append(KeepTogether([
    Paragraph("Data Science Intern", job),
    Paragraph("Vizztal Academy, Adityapur, Jamshedpur | July 2026–Present | 6-Month Internship", meta),
    Paragraph("• Processed, cleaned, and transformed 50,000+ rows of raw unstructured data using Python (Pandas, NumPy) and SQL, improving data quality and pipeline efficiency by 35%.", item),
    Paragraph("• Trained and evaluated 4+ Machine Learning classification &amp; regression models using Scikit-Learn, achieving up to 88% model accuracy on benchmark test datasets.", item),
    Paragraph("• Built 3+ interactive Power BI dashboards and optimized SQL queries, tracking 10+ key performance metrics to deliver actionable visual insights.", item),
    Paragraph("• Collaborated in an agile team of 5+ members to present key data findings, helping streamline workflow decisions by 25%.", item),
]))
story.append(Spacer(1, .3))
story.append(KeepTogether([
    Paragraph("Data Analytics Workshop", job),
    Paragraph("Venturing Digitally | 7-Day Intensive Program", meta),
    Paragraph("• Analyzed 5+ complex real-world datasets containing 10,000+ customer records using advanced exploratory data analysis (EDA) techniques.", item),
    Paragraph("• Leveraged Microsoft Excel (Pivot Tables, VLOOKUP/XLOOKUP, Dynamic Charts) to automate data cleaning workflows, cutting report prep time by 30%.", item),
    Paragraph("• Completed 100% of hands-on data analytics assignments and real-world case studies, deriving 15+ actionable business insights.", item),
]))

# Projects
story += sec("PROJECTS")
story += [
    Paragraph("Personal Portfolio Website", job),
    Paragraph("HTML5, CSS3, JavaScript | Deployed on GitHub Pages", meta),
    Paragraph("• Designed and deployed a high-performance personal portfolio website with 98%+ PageSpeed score, serving 100+ visitors across 8 interactive sections.", item),
    Paragraph("• Integrated responsive UI components, sleek CSS animations, and modal popups, reducing average page load time to under 1.2 seconds.", item),
    Paragraph("Phone Book Management System", job),
    Paragraph("C++ | File Handling | CRUD Operations", meta),
    Paragraph("• Developed a high-speed console-based contact management application in C++ using binary file handling, supporting search &amp; CRUD operations for 1,000+ records.", item),
    Paragraph("• Optimized memory structures and file search algorithms, achieving zero data corruption and improving lookup response time by 40%.", item),
]

# Technical Skills
story += sec("TECHNICAL SKILLS")
skills = [
    [
        Paragraph("<b>Programming</b><br/>Python, C, C++", item),
        Paragraph("<b>Data &amp; Analytics</b><br/>Data Analysis, EDA, Statistical Analysis, Data Cleaning, Data Processing", item),
        Paragraph("<b>Databases</b><br/>SQL, MySQL", item),
    ],
    [
        Paragraph("<b>Visualization &amp; BI</b><br/>Power BI, Microsoft Excel, Data Visualization", item),
        Paragraph("<b>AI / ML</b><br/>Artificial Intelligence, Machine Learning, Scikit-Learn, Predictive Modeling", item),
        Paragraph("<b>Core Competencies</b><br/>Data Wrangling, Quantitative Reasoning, Team Collaboration, Technical Writing", item),
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
    "AWS AI Practitioner Challenge — Amazon Web Services",
    "Microsoft Excel with AI Masterclass — Skill Course (Self-Learning)",
    "Basic Data Science and Artificial Intelligence — Feuchr School of Excellence",
]:
    story.append(Paragraph("• " + x, item))

doc.build(story)
print(f"PDF saved: {pdf_path}")

