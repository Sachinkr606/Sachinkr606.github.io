import os
from reportlab.lib import colors  # type: ignore[import]
from reportlab.lib.pagesizes import A4  # type: ignore[import]
from reportlab.lib.styles import ParagraphStyle  # type: ignore[import]
from reportlab.lib.enums import TA_CENTER, TA_LEFT  # type: ignore[import]
from reportlab.lib.units import mm  # type: ignore[import]
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle, KeepTogether  # type: ignore[import]
from reportlab.pdfbase import pdfmetrics  # type: ignore[import]
from reportlab.pdfbase.ttfonts import TTFont  # type: ignore[import]

# Output path (same folder as this script)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
pdf_path = os.path.join(BASE_DIR, "Sachinkr606resume.pdf")

# ─────────────────────────────────────────────────────────────
# FONT REGISTRATION (Fallback to Helvetica if system fonts missing)
# ─────────────────────────────────────────────────────────────
font_regular = "Helvetica"
font_bold = "Helvetica-Bold"

windows_fonts = r"C:\Windows\Fonts"
arial_regular = os.path.join(windows_fonts, "arial.ttf")
arial_bold = os.path.join(windows_fonts, "arialbd.ttf")

if os.path.exists(arial_regular) and os.path.exists(arial_bold):
    try:
        pdfmetrics.registerFont(TTFont("Arial", arial_regular))
        pdfmetrics.registerFont(TTFont("Arial-Bold", arial_bold))
        font_regular = "Arial"
        font_bold = "Arial-Bold"
    except Exception:
        font_regular = "Helvetica"
        font_bold = "Helvetica-Bold"

# ─────────────────────────────────────────────────────────────
# COLOR PALETTE (Data Science / AI-ML Color Theme)
# ─────────────────────────────────────────────────────────────
# • Name: Deep Navy #0F2747
# • Main section headings: Teal #007C83
# • Job titles, project titles, and important subheadings: Dark Navy #163A5F
# • Body text: Charcoal #222222
# • Horizontal divider lines: Light Blue-Gray #C9D5E2
# • GitHub, LinkedIn, and email links: Teal #007C83
COLOR_NAME      = colors.HexColor("#0F2747")
COLOR_HEADING   = colors.HexColor("#007C83")
COLOR_SUBHEAD   = colors.HexColor("#163A5F")
COLOR_BODY      = colors.HexColor("#222222")
COLOR_DIVIDER   = colors.HexColor("#C9D5E2")
COLOR_META      = colors.HexColor("#4A5568")
COLOR_LINK_HEX  = "#007C83"

# ─────────────────────────────────────────────────────────────
# TYPOGRAPHY & STYLES (Carefully balanced for 1-page ATS layout)
# ─────────────────────────────────────────────────────────────
base = ParagraphStyle(
    "base",
    fontName=font_regular,
    fontSize=8.1,
    leading=9.5,
    textColor=COLOR_BODY
)

name_style = ParagraphStyle(
    "name",
    parent=base,
    fontName=font_bold,
    fontSize=18.5,
    leading=20.0,
    alignment=TA_CENTER,
    textColor=COLOR_NAME,
    spaceAfter=1.5
)

title_style = ParagraphStyle(
    "title",
    parent=base,
    fontName=font_bold,
    fontSize=8.3,
    leading=9.8,
    alignment=TA_CENTER,
    textColor=COLOR_SUBHEAD,
    spaceAfter=2.0
)

contact_style = ParagraphStyle(
    "contact",
    parent=base,
    fontSize=7.7,
    leading=9.0,
    alignment=TA_CENTER,
    textColor=COLOR_BODY,
    spaceAfter=2.5
)

section_style = ParagraphStyle(
    "section",
    parent=base,
    fontName=font_bold,
    fontSize=9.5,
    leading=10.5,
    textColor=COLOR_HEADING,
    spaceBefore=2.8,
    spaceAfter=0.8
)

body_style = ParagraphStyle(
    "body",
    parent=base,
    fontSize=7.9,
    leading=9.3,
    textColor=COLOR_BODY,
    spaceAfter=0.5
)

job_title_style = ParagraphStyle(
    "job_title",
    parent=base,
    fontName=font_bold,
    fontSize=8.3,
    leading=9.4,
    textColor=COLOR_SUBHEAD,
    spaceAfter=0.1
)

meta_style = ParagraphStyle(
    "meta",
    parent=base,
    fontSize=7.5,
    leading=8.6,
    textColor=COLOR_META,
    spaceAfter=0.4
)

bullet_style = ParagraphStyle(
    "bullet",
    parent=base,
    fontSize=7.8,
    leading=9.0,
    textColor=COLOR_BODY,
    leftIndent=6,
    spaceAfter=0.3
)

skill_cell_style = ParagraphStyle(
    "skill_cell",
    parent=base,
    fontSize=7.6,
    leading=8.8,
    textColor=COLOR_BODY
)

cert_style = ParagraphStyle(
    "cert",
    parent=base,
    fontSize=7.8,
    leading=9.0,
    textColor=COLOR_BODY,
    leftIndent=6,
    spaceAfter=0.3
)

# Page Setup (A4: 210mm x 297mm)
doc = SimpleDocTemplate(
    pdf_path,
    pagesize=A4,
    leftMargin=13.5*mm,
    rightMargin=13.5*mm,
    topMargin=6.0*mm,
    bottomMargin=5.0*mm
)

story = []

# Header
story.append(Paragraph("SACHIN KUMAR", name_style))
story.append(Paragraph("DATA SCIENCE INTERN | ASPIRING DATA SCIENTIST | PYTHON | SQL | POWER BI | DATA ANALYSIS", title_style))
story.append(Paragraph(
    f'Jamshedpur, Jharkhand | +91 8207548606 | <a href="mailto:kumarsachin8207548606@gmail.com"><font color="{COLOR_LINK_HEX}">kumarsachin8207548606@gmail.com</font></a> | '
    f'GitHub: <a href="https://github.com/Sachinkr606"><font color="{COLOR_LINK_HEX}">github.com/Sachinkr606</font></a> | '
    f'LinkedIn: <a href="https://linkedin.com/in/sachinkr606/"><font color="{COLOR_LINK_HEX}">linkedin.com/in/sachinkr606/</font></a>',
    contact_style
))

def make_section(title_text):
    return [
        Paragraph(title_text, section_style),
        HRFlowable(width="100%", thickness=0.8, color=COLOR_DIVIDER, spaceBefore=0.5, spaceAfter=1.8),
    ]

# ─────────────────────────────────────────────────────────────
# 1. ABOUT ME
# ─────────────────────────────────────────────────────────────
story += make_section("ABOUT ME")
story.append(Paragraph(
    "BCA student and Data Science Intern with hands-on expertise in Python, SQL, Machine Learning, "
    "Power BI, Excel, and data analytics. Demonstrated experience in data cleaning, exploratory data analysis (EDA), "
    "predictive modeling, and interactive visualization. Focused on applying data-driven strategies and AI/ML algorithms "
    "to address complex business challenges and deliver actionable insights.",
    body_style
))

# ─────────────────────────────────────────────────────────────
# 2. EDUCATION
# ─────────────────────────────────────────────────────────────
story += make_section("EDUCATION")
edu_data = [
    ("Bachelor of Computer Applications (BCA)",       "Srinath University, Jamshedpur, Jharkhand | 2024–Present | Score: 69.05%"),
    ("Senior Secondary (Class XII) – Science Stream", "Punyark Vidya Mandir, Pundarakh, Bihar | 2022–2024 | Score: 48.9%"),
    ("Secondary (Class X)",                           "Vidya Jyoti School, Gamharia, Jamshedpur | 2017–2022 | Score: 64.75%"),
]
for deg, details in edu_data:
    story.append(Paragraph(deg, job_title_style))
    story.append(Paragraph(details, meta_style))

# ─────────────────────────────────────────────────────────────
# 3. EXPERIENCE
# ─────────────────────────────────────────────────────────────
story += make_section("EXPERIENCE")
story.append(KeepTogether([
    Paragraph("Data Science Intern", job_title_style),
    Paragraph("Vizztal Academy, Adityapur, Jamshedpur | July 2026–Present | 6-Month Internship", meta_style),
    Paragraph("• Processed, cleaned, and transformed 50,000+ rows of raw unstructured data using Python (Pandas, NumPy) and SQL, improving data quality and pipeline efficiency by 35%.", bullet_style),
    Paragraph("• Trained and evaluated 4+ Machine Learning classification &amp; regression models using Scikit-Learn, achieving up to 88% model accuracy on benchmark test datasets.", bullet_style),
    Paragraph("• Built 3+ interactive Power BI dashboards and optimized SQL queries, tracking 10+ key performance metrics to deliver actionable visual insights.", bullet_style),
    Paragraph("• Collaborated in an agile team of 5+ members to present key data findings, helping streamline workflow decisions by 25%.", bullet_style),
]))
story.append(Spacer(1, 0.4))
story.append(KeepTogether([
    Paragraph("Data Analytics Workshop", job_title_style),
    Paragraph("Venturing Digitally | 7-Day Intensive Program", meta_style),
    Paragraph("• Analyzed 5+ complex real-world datasets containing 10,000+ customer records using advanced exploratory data analysis (EDA) techniques.", bullet_style),
    Paragraph("• Leveraged Microsoft Excel (Pivot Tables, VLOOKUP/XLOOKUP, Dynamic Charts) to automate data cleaning workflows, cutting report prep time by 30%.", bullet_style),
    Paragraph("• Completed 100% of hands-on data analytics assignments and real-world case studies, deriving 15+ actionable business insights.", bullet_style),
]))

# ─────────────────────────────────────────────────────────────
# 4. PROJECTS
# ─────────────────────────────────────────────────────────────
story += make_section("PROJECTS")
story.append(Paragraph("Personal Portfolio Website", job_title_style))
story.append(Paragraph("HTML5, CSS3, JavaScript | Deployed on GitHub Pages", meta_style))
story.append(Paragraph("• Designed and deployed a high-performance personal portfolio website with 98%+ PageSpeed score, serving 100+ visitors across 8 interactive sections.", bullet_style))
story.append(Paragraph("• Integrated responsive UI components, sleek CSS animations, and modal popups, reducing average page load time to under 1.2 seconds.", bullet_style))

story.append(Paragraph("Phone Book Management System", job_title_style))
story.append(Paragraph("C++ | File Handling | CRUD Operations", meta_style))
story.append(Paragraph("• Developed a high-speed console-based contact management application in C++ using binary file handling, supporting search &amp; CRUD operations for 1,000+ records.", bullet_style))
story.append(Paragraph("• Optimized memory structures and file search algorithms, achieving zero data corruption and improving lookup response time by 40%.", bullet_style))

# ─────────────────────────────────────────────────────────────
# 5. TECHNICAL SKILLS
# ─────────────────────────────────────────────────────────────
story += make_section("TECHNICAL SKILLS")
skills = [
    [
        Paragraph(f'<b><font color="{COLOR_SUBHEAD.hexval()}">Programming</font></b><br/>Python, C, C++', skill_cell_style),
        Paragraph(f'<b><font color="{COLOR_SUBHEAD.hexval()}">Data &amp; Analytics</font></b><br/>Data Analysis, EDA, Statistical Analysis, Data Cleaning, Data Processing', skill_cell_style),
        Paragraph(f'<b><font color="{COLOR_SUBHEAD.hexval()}">Databases</font></b><br/>SQL, MySQL', skill_cell_style),
    ],
    [
        Paragraph(f'<b><font color="{COLOR_SUBHEAD.hexval()}">Visualization &amp; BI</font></b><br/>Power BI, Microsoft Excel, Data Visualization', skill_cell_style),
        Paragraph(f'<b><font color="{COLOR_SUBHEAD.hexval()}">AI / ML</font></b><br/>Artificial Intelligence, Machine Learning, Scikit-Learn, Predictive Modeling', skill_cell_style),
        Paragraph(f'<b><font color="{COLOR_SUBHEAD.hexval()}">Core Competencies</font></b><br/>Data Wrangling, Quantitative Reasoning, Team Collaboration, Technical Writing', skill_cell_style),
    ],
]
tbl = Table(skills, colWidths=[56*mm, 66*mm, 56*mm])
tbl.setStyle(TableStyle([
    ("VALIGN",        (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING",   (0, 0), (-1, -1), 0),
    ("RIGHTPADDING",  (0, 0), (-1, -1), 4),
    ("TOPPADDING",    (0, 0), (-1, -1), 0.3),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 0.3),
]))
story.append(tbl)

# ─────────────────────────────────────────────────────────────
# 6. CERTIFICATIONS & COURSES
# ─────────────────────────────────────────────────────────────
story += make_section("CERTIFICATIONS & COURSES")
certs = [
    "AWS AI Practitioner Challenge — Amazon Web Services",
    "Microsoft Excel with AI Masterclass — Skill Course (Self-Learning)",
    "Basic Data Science and Artificial Intelligence — Feuchr School of Excellence",
]
for c in certs:
    story.append(Paragraph("• " + c, cert_style))

# Build Document
doc.build(story)
print(f"Successfully generated 1-page ATS Resume PDF: {pdf_path}")
