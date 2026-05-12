# PDF to Markdown Conversion Commands Reference

This file contains detailed conversion commands and options for each supported tool.

## Pandoc Conversion Commands

**Basic conversion**:
```bash
pandoc "input.pdf" -f pdf -t markdown -o "output.md"
```

**With image extraction**:
```bash
pandoc "input.pdf" -f pdf -t markdown -o "output.md" --extract-media="./media"
```

**With smart typography**:
```bash
pandoc "input.pdf" -f pdf -t markdown+smart -o "output.md"
```

**Preserve headers levels**:
```bash
pandoc "input.pdf" -f pdf -t markdown --shift-heading-level-by=-1 -o "output.md"
```

**GitHub-flavored markdown**:
```bash
pandoc "input.pdf" -f pdf -t gfm -o "output.md"
```

## Docling Conversion Commands

**Python script for docling**:
```python
from docling.document_converter import DocumentConverter

# Initialize converter
converter = DocumentConverter()

# Convert PDF
result = converter.convert("input.pdf")

# Export to markdown
markdown_content = result.document.export_to_markdown()

# Save to file
with open("output.md", "w", encoding="utf-8") as f:
    f.write(markdown_content)
```

**With table preservation**:
```python
from docling.document_converter import DocumentConverter
from docling.datamodel.pipeline_options import PdfPipelineOptions

# Configure for better table handling
pipeline_options = PdfPipelineOptions()
pipeline_options.do_table_structure = True

converter = DocumentConverter(
    pipeline_options=pipeline_options
)

result = converter.convert("input.pdf")
markdown_content = result.document.export_to_markdown()

with open("output.md", "w", encoding="utf-8") as f:
    f.write(markdown_content)
```

**With image extraction**:
```python
from docling.document_converter import DocumentConverter
from docling.datamodel.pipeline_options import PdfPipelineOptions

pipeline_options = PdfPipelineOptions()
pipeline_options.generate_picture_images = True

converter = DocumentConverter(
    pipeline_options=pipeline_options
)

result = converter.convert("input.pdf")
markdown_content = result.document.export_to_markdown()

# Images are saved to ./images/ by default

with open("output.md", "w", encoding="utf-8") as f:
    f.write(markdown_content)
```

## PDF2MD Conversion Commands

**Basic conversion**:
```bash
pdf2md "input.pdf" > "output.md"
```

**With specific page range**:
```bash
pdf2md --pages 1-10 "input.pdf" > "output.md"
```

## Post-Processing Commands

**Remove PDF artifacts** (page numbers, headers):
```bash
# Remove common page number patterns
sed -i '' '/^Page [0-9]\+$/d' output.md

# Remove excessive blank lines
sed -i '' '/^$/N;/^\n$/D' output.md
```

**Fix heading hierarchy**:
```bash
# Add blank lines before headings if missing
sed -i '' 's/^\(#\+\)/\n\1/g' output.md
```

**Normalize image paths**:
```bash
# Convert absolute paths to relative
sed -i '' 's|file://.*media/|./media/|g' output.md
```

## Tool Comparison Matrix

| Feature | Pandoc | Docling | PDF2MD |
|---------|--------|---------|--------|
| Text extraction | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Table preservation | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| Image extraction | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Complex layouts | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| Speed | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| Installation ease | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| Output quality | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

## Common PDF Content Types and Best Tool

**Research Papers** (text-heavy, references, citations):
- **Best**: Pandoc
- **Command**: `pandoc paper.pdf -t markdown+smart -o paper.md --extract-media=./figures`

**Technical Documentation** (mixed text, diagrams, code):
- **Best**: Docling
- **Reason**: Preserves structure, handles code blocks well

**Data Reports** (tables, charts, data):
- **Best**: Docling
- **Reason**: Superior table structure preservation

**Presentations** (slides, images, bullet points):
- **Best**: Docling
- **Reason**: Better layout understanding, image handling

**Books/Ebooks** (chapters, TOC, footnotes):
- **Best**: Pandoc
- **Command**: `pandoc book.pdf -t markdown --toc -o book.md`

## Troubleshooting Commands

**Check PDF metadata**:
```bash
pdfinfo input.pdf
```

**Verify PDF is not corrupted**:
```bash
qpdf --check input.pdf
```

**Remove PDF password**:
```bash
qpdf --password=PASSWORD --decrypt input.pdf output_unlocked.pdf
```

**Extract specific pages first**:
```bash
# Extract pages 1-10
pdftk input.pdf cat 1-10 output pages_1-10.pdf

# Then convert
pandoc pages_1-10.pdf -o output.md
```

**Check for scanned content** (needs OCR):
```bash
# If pdftotext produces little output, PDF is likely scanned
pdftotext input.pdf - | wc -w
# Low word count = scanned PDF, needs OCR preprocessing
```

## OCR Preprocessing (for scanned PDFs)

**Using Tesseract OCR**:
```bash
# Convert PDF to images first
pdftoppm input.pdf output_page -png

# OCR each image
for img in output_page*.png; do
    tesseract "$img" "${img%.png}" -l eng
done

# Combine text files
cat output_page*.txt > ocr_output.txt

# Convert to markdown
pandoc ocr_output.txt -o output.md
```

**Using OCRmyPDF** (recommended):
```bash
# Add OCR layer to PDF
ocrmypdf input.pdf output_ocr.pdf

# Then convert normally
pandoc output_ocr.pdf -t markdown -o output.md
```

## Quality Validation Commands

**Count extracted elements**:
```bash
# Count headings
grep -c "^#" output.md

# Count images
grep -c "!\[.*\]" output.md

# Count links
grep -c "\[.*\](.*)" output.md

# Count tables
grep -c "^|" output.md
```

**Check for encoding issues**:
```bash
# Detect non-UTF8 characters
iconv -f utf-8 -t utf-8 output.md > /dev/null
echo $?  # 0 = clean, non-zero = issues

# Fix encoding if needed
iconv -f ISO-8859-1 -t UTF-8 output.md > output_fixed.md
```

**Verify markdown syntax**:
```bash
# Use markdownlint
markdownlint output.md

# Or use pandoc to validate
pandoc output.md -o /dev/null && echo "Valid markdown"
```
