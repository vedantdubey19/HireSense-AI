from fpdf import FPDF

def create_pdf(name, content, filename):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt=name, ln=True, align='C')
    pdf.multi_cell(0, 10, txt=content)
    pdf.output(filename)

create_pdf(
    "Alice Johnson", 
    "Software Engineer with 5 years of experience in React, Node.js, and MongoDB. Familiar with Docker and AWS.", 
    "Alice_Johnson_Resume.pdf"
)

create_pdf(
    "Bob Smith", 
    "Marketing Manager with 10 years of experience in SEO, content creation, and digital marketing strategies. Proficient in Google Analytics.", 
    "Bob_Smith_Resume.pdf"
)
