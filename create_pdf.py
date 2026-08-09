import os

def create_resume_pdf(filename="resume.pdf"):
    # PDF specification 1.4 generator in pure Python
    title = "SACHIN KUMAR"
    subtitle = "Aspiring Data Scientist | BCA Student"
    contact = "Jamshedpur, Jharkhand | kumarsachin8207548606@gmail.com | github.com/kumarsachin8207548606-ship-it"
    
    sections = [
        ("EDUCATION", [
            ("Bachelor of Computer Applications (BCA)", "Srinath University (2024 - 2027) | Score: 69.05%"),
            ("12th Science", "Punyark Vidya Mandir (48.9%)"),
            ("10th Science", "Vidya Jyoti School (64.75%)")
        ]),
        ("INTERNSHIP EXPERIENCE", [
            ("Technical / Data Science Intern", "Vizzital Academy (6 Months)"),
            ("Key Responsibilities:", "Built Python data pipelines, exploratory data analysis scripts, and database queries.")
        ]),
        ("TECHNICAL SKILLS", [
            ("Languages:", "Python, C++, SQL, Java (Basics)"),
            ("Data Libraries:", "Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn"),
            ("Databases & Tools:", "MySQL, Oracle DB, Power BI, Excel, Git, VS Code")
        ]),
        ("KEY PROJECTS", [
            ("PresentSir:", "ASP.NET Core & Oracle QR Attendance Management System"),
            ("Phone Book Management:", "Modern C++ OOP contact application with binary file storage")
        ])
    ]

    # Build stream content
    lines = []
    lines.append("BT")
    
    # Header Name
    lines.append("/F2 22 Tf")
    lines.append("1 0 0 1 50 750 Tm")
    lines.append("(SACHIN KUMAR) Tj")
    
    # Subtitle
    lines.append("/F1 12 Tf")
    lines.append("1 0 0 1 50 730 Tm")
    lines.append("(Aspiring Data Scientist | BCA Student) Tj")
    
    # Contact
    lines.append("/F1 9 Tf")
    lines.append("1 0 0 1 50 715 Tm")
    lines.append("(Jamshedpur, Jharkhand | Email: kumarsachin8207548606@gmail.com) Tj")
    
    y = 680
    for sec_title, items in sections:
        # Line divider
        lines.append("ET")
        lines.append(f"0.2 0.4 0.8 rg") # Accent color line
        lines.append(f"50 {y+12} 512 1.5 re f")
        lines.append("0 0 0 rg") # Reset color
        lines.append("BT")
        
        # Section title
        lines.append("/F2 13 Tf")
        lines.append(f"1 0 0 1 50 {y} Tm")
        lines.append(f"({sec_title}) Tj")
        y -= 20
        
        for item_header, item_desc in items:
            lines.append("/F2 10 Tf")
            lines.append(f"1 0 0 1 60 {y} Tm")
            # Escape parenthesis
            clean_hdr = item_header.replace("(", "\\(").replace(")", "\\)")
            lines.append(f"({clean_hdr}) Tj")
            
            lines.append("/F1 10 Tf")
            lines.append(f"1 0 0 1 200 {y} Tm")
            clean_desc = item_desc.replace("(", "\\(").replace(")", "\\)")
            lines.append(f"({clean_desc}) Tj")
            y -= 16
        y -= 12

    lines.append("ET")
    content_stream = "\n".join(lines).encode('latin-1')

    objects = []
    # 1: Catalog
    objects.append(b"<< /Type /Catalog /Pages 2 0 R >>")
    # 2: Pages
    objects.append(b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>")
    # 3: Page
    objects.append(b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>")
    # 4: Font F1
    objects.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
    # 5: Font F2
    objects.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>")
    # 6: Contents Stream
    objects.append(f"<< /Length {len(content_stream)} >>\nstream\n".encode('latin-1') + content_stream + b"\nendstream")

    # Assemble PDF
    pdf_data = b"%PDF-1.4\n"
    offsets = []
    for i, obj in enumerate(objects, 1):
        offsets.append(len(pdf_data))
        pdf_data += f"{i} 0 obj\n".encode('latin-1') + obj + b"\nendobj\n"
    
    xref_offset = len(pdf_data)
    pdf_data += f"xref\n0 {len(objects)+1}\n0000000000 65535 f \n".encode('latin-1')
    for off in offsets:
        pdf_data += f"{off:010d} 00000 n \n".encode('latin-1')
        
    pdf_data += f"trailer\n<< /Size {len(objects)+1} /Root 1 0 R >>\nstartxref\n{xref_offset}\n%%EOF".encode('latin-1')
    
    with open(filename, "wb") as f:
        f.write(pdf_data)
    print(f"Created {filename} successfully ({len(pdf_data)} bytes)")

if __name__ == "__main__":
    create_resume_pdf("resume.pdf")
