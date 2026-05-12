---
name: pdf-to-markdown
description: Convert PDF files to markdown. Use when user asks to "convert PDF to markdown", "extract text from PDF", "turn PDF into markdown", or "make PDF readable". Works directly for PDFs up to 20 pages, or guides installation for larger files.
---

---
context: main
model: claude-opus-4-6
---

# PDF to Markdown Conversion (Claude-First Approach)

Convert PDF files to clean markdown format. For PDFs up to 20 pages, this skill uses Claude's native PDF reading - no installation required. For larger PDFs, it guides you through using local conversion tools.

## What You'll Need Before Starting

**For PDFs up to 20 pages (most common)**:
- 📄 **PDF file path** - Location of your PDF
- ✅ **No tools required** - Claude reads PDFs directly

**For PDFs over 20 pages**:
- 💻 **Local tool installation** - One-time setup recommended
- 🔧 **Preferred tool**: docling (best for complex layouts, tables, images)
- 🔄 **Alternatives**: pandoc (faster, simpler PDFs) or pdf2md

## When to Use

Use this skill to convert PDF documents to markdown for:

* AI/LLM consumption and training data
* Documentation migration to markdown systems
* Extracting content from research papers, reports, presentations
* Making PDF content editable and version-controllable

**Don't use this for:**
- Generating PDFs from markdown → use `/generate-pdf`
- OCR of scanned images → preprocess with OCR tools first
- Direct PDF editing → use PDF editor tools

## Arguments (Optional)

```bash
/pdf-to-markdown                          # Interactive mode
/pdf-to-markdown <pdf-file>               # Quick conversion
/pdf-to-markdown <pdf-file> -o output.md  # Specify output name
```

**Parameters**:
- `<pdf-file>` - Path to PDF file
- `-o <output-file>` - Output markdown file path (default: same name as PDF with .md)

## Workflow

**CRITICAL RULES**

### 1. Ask Questions SEQUENTIALLY
- Ask ONE question at a time
- WAIT for user's answer before proceeding
- Do NOT ask multiple questions together

### 2. Manage Output Tokens
- **Write files, don't display them** - Use Write tool
- **Show brief confirmations** - "✅ Created: filename (X lines)"
- **Keep output under 5000 tokens** - Summaries, not full content

---

### Step 1: Parse Arguments (If Provided)

**Check if user invoked skill with arguments**.

**If arguments provided**:
```
Parsing arguments: "<pdf-file> -o <output>"

✓ PDF file: <pdf-file>
✓ Output file: <output> (or default if not specified)

Validating PDF file...
```

**Validate PDF exists**:
- Use Bash tool to check file exists
- If not found, ask user for correct path

**If no arguments**:
```
No arguments provided. Using interactive mode.

Proceeding to Step 2.
```

---

### Step 2: Get PDF File Path

**SKIP THIS STEP IF**: User provided `<pdf-file>` as argument

**Ask the user**:
```
What PDF file would you like to convert to markdown?

You can provide:
- Absolute path: /Users/yourname/Documents/report.pdf
- Relative path: ./docs/whitepaper.pdf

PDF file path:
```

[WAIT for answer]

**Validate the file**:
```bash
# Check if file exists and is readable
test -f "<pdf-file>" && file "<pdf-file>" | grep -q PDF
```

If invalid, ask user to provide a different path.

---

### Step 3: Check PDF Page Count

**Determine if we can use Claude's Read tool or need local tools**.

```
Checking PDF page count...
```

**Use Bash to check page count**:
```bash
# Try pdfinfo first (common on macOS/Linux)
pdfinfo "<pdf-file>" 2>/dev/null | grep "Pages:" | awk '{print $2}'

# Fallback: Try exiftool
exiftool "<pdf-file>" 2>/dev/null | grep "Page Count" | awk '{print $NF}'

# Fallback: Try mdls (macOS)
mdls -name kMDItemNumberOfPages "<pdf-file>" 2>/dev/null | awk '{print $3}'

# If all fail, inform user we'll attempt Read and see if it errors
```

**Store page count** for next step decision.

---

### Step 4: Choose Conversion Method

**Based on page count, decide approach**.

#### Case A: PDF has ≤ 20 pages (or count unknown)

```
✅ Your PDF has <page-count> pages.

I can read this PDF directly using my native PDF reading capability - no tools needed!

Proceeding with direct conversion...
```

**Jump to Step 5A: Claude Direct Read**

#### Case B: PDF has > 20 pages

```
⚠️ Your PDF has <page-count> pages.

**Limitation**: Claude can read up to 20 pages per request. For larger PDFs, you'll need a local conversion tool.

**Why use local tools for large PDFs?**
- Process entire PDF at once (no page limits)
- Faster for bulk conversions
- Works offline

**Recommended tool: docling**
- ✅ Best for: Complex layouts, tables, images
- ✅ Excellent structure preservation
- ✅ Handles technical documentation well
- Install: `pip install docling`

**Alternative tools**:
- **pandoc** - Faster, good for text-heavy PDFs (`brew install pandoc`)
- **pdf2md** - Simple, lightweight (`pip install pdf2md`)

Would you like to:
1. 📦 Install docling and convert the full PDF
2. 📄 Convert just the first 20 pages using Claude (quick preview)
3. 🔧 Use a different tool (pandoc or pdf2md)
4. ℹ️  Show me installation instructions
5. ⏸️  Stop here (I'll install manually and come back)

Your choice? [1/2/3/4/5]
```

[WAIT for answer]

**Handle user choice**:
- Choice 1 → **Jump to Step 6: Check Tool Installation** (docling)
- Choice 2 → **Jump to Step 5A: Claude Direct Read** (pages 1-20 only)
- Choice 3 → **Ask which tool, then jump to Step 6**
- Choice 4 → **Jump to Step 7: Show Installation Instructions**
- Choice 5 → **Exit gracefully**

---

### Step 5A: Claude Direct Read (≤ 20 pages)

**Use Claude's Read tool to directly read and convert the PDF**.

```
Reading PDF with Claude's native PDF reader...
```

**Read the PDF**:
```
Use Read tool with the PDF file path
- If pages specified (first 20), use pages parameter: "1-20"
- Read entire content
```

**Parse and convert to markdown**:
- Claude receives PDF content visually/textually
- Extract text, headings, structure
- Convert to clean markdown format
- Preserve:
  - Heading hierarchy (# ## ###)
  - Lists and bullet points
  - Tables (if present)
  - Code blocks
  - Links and references

**Quality cleanup** (do silently):
- Fix heading levels (proper hierarchy)
- Clean up excessive whitespace
- Normalize link formats: `[text](url)`
- Format tables properly with pipes
- Remove PDF artifacts (page numbers, headers/footers if obvious)
- Fix encoding issues

**Jump to Step 8: Deliver Results**

---

### Step 5B: Local Tool Conversion (> 20 pages)

**Convert using the selected local tool**.

```
Converting <pdf-filename> using <tool-name>...
```

**Execute conversion based on tool**:

**For docling**:
```bash
python3 -c "
from docling.document_converter import DocumentConverter

converter = DocumentConverter()
result = converter.convert('<pdf-file>')
markdown_content = result.document.export_to_markdown()

with open('<output-file>', 'w', encoding='utf-8') as f:
    f.write(markdown_content)

print(f'Converted {len(markdown_content)} characters')
"
```

**For pandoc**:
```bash
pandoc "<pdf-file>" -f pdf -t markdown -o "<output-file>" --extract-media="./media"
```

**For pdf2md**:
```bash
pdf2md "<pdf-file>" > "<output-file>"
```

**If conversion fails**:
```
⚠️ Conversion failed with error:

<error-message>

Troubleshooting:
1. Check if tool is properly installed
2. Verify PDF is not password-protected
3. Try a different tool

Would you like to:
1. 🔄 Try a different tool
2. 📋 See full error details
3. 🔧 Try Claude direct read (first 20 pages only)
4. ⏸️  Stop and troubleshoot manually

Your choice? [1/2/3/4]
```

[WAIT for answer and handle accordingly]

**If successful, read the generated file**:
```
Use Read tool to inspect the generated markdown file
```

**Quality cleanup** (do silently):
- Same quality fixes as Step 5A
- Fix malformed headings
- Normalize links and tables
- Remove PDF artifacts
- Fix encoding issues

**Jump to Step 8: Deliver Results**

---

### Step 6: Check Tool Installation

**Verify the selected tool is installed**.

```
Checking if <tool-name> is installed...
```

**Check installation**:

**For docling**:
```bash
python3 -c "import docling" 2>/dev/null && echo "installed" || echo "not installed"
```

**For pandoc**:
```bash
which pandoc
```

**For pdf2md**:
```bash
which pdf2md || python3 -c "import pdf2md" 2>/dev/null && echo "installed"
```

**If installed**:
```
✅ <tool-name> is installed.

Proceeding to Step 5B: Local Tool Conversion
```

**If NOT installed**:
```
❌ <tool-name> is not installed.

Would you like to:
1. 📋 Show installation instructions
2. 🔄 Choose a different tool
3. 📄 Convert first 20 pages with Claude instead
4. ⏸️  Stop here (I'll install manually)

Your choice? [1/2/3/4]
```

[WAIT for answer]

- Choice 1 → **Jump to Step 7**
- Choice 2 → **Ask which tool, loop back to this step**
- Choice 3 → **Jump to Step 5A**
- Choice 4 → **Exit gracefully**

---

### Step 7: Show Installation Instructions

**Provide installation instructions for the selected tool**.

#### For docling (recommended for large PDFs):

```
📦 Installing docling

**What is docling?**
- Advanced PDF extraction tool from IBM Research
- Excellent at preserving tables, images, and complex layouts
- Best choice for technical documentation and reports

**Installation**:

**macOS/Linux**:
```bash
# Requires Python 3.8+
pip install docling

# Or with pip3
pip3 install docling
```

**Windows**:
```cmd
pip install docling
```

**Verify installation**:
```bash
python3 -c "import docling; print('docling installed successfully!')"
```

After installation, would you like to continue with the conversion? [Yes/No]
```

#### For pandoc:

```
📦 Installing pandoc

**macOS**:
```bash
brew install pandoc
```

**Linux (Ubuntu/Debian)**:
```bash
sudo apt install pandoc
```

**Windows**:
```cmd
choco install pandoc
```

**Verify installation**:
```bash
pandoc --version
```

After installation, would you like to continue? [Yes/No]
```

#### For pdf2md:

```
📦 Installing pdf2md

```bash
pip install pdf2md
```

After installation, would you like to continue? [Yes/No]
```

[WAIT for answer]

**If Yes**: Loop back to Step 6 to verify installation

**If No**: Exit gracefully with message

---

### Step 8: Deliver Results

**CRITICAL: Manage Output Tokens**

**Write the markdown file using Write tool** (if not already written in Step 5B).

**Provide concise delivery summary**:

```
✅ PDF to Markdown Conversion Complete

**Files Created**:
- <output-filename> (<line-count> lines)

**Conversion Details**:
- Source: <pdf-filename> (<page-count> pages, <file-size>)
- Method: [Claude direct read / docling / pandoc / pdf2md]
- Extraction quality: <estimated-percentage>%

**Content Summary**:
- Headings: <count>
- Paragraphs: <count>
- Tables: <count> (if applicable)
- Code blocks: <count> (if applicable)
- Links: <count> (if applicable)

**Auto-corrections Applied**:
- Fixed <n> heading hierarchy issues
- Normalized <n> link formats
- Cleaned <n> table formatting issues
- Removed <n> PDF artifacts (page numbers, headers/footers)

[If images extracted by tool]:
**Images**:
- <count> images extracted to ./media/ directory
- Image references updated in markdown

**Next Steps**:
1. Review the markdown file: <output-filename>
2. [If images] Check images in ./media/ directory
3. Use with AI agents or documentation systems

**Note**: The markdown file is ready to use. Open it in your editor to review and refine if needed.
```

**What NOT to do**:
- ❌ Don't show full markdown content
- ❌ Don't paste hundreds of lines
- ❌ Don't exceed 5000 tokens

**What TO do**:
- ✅ Write file with Write tool
- ✅ Show structured summary
- ✅ Keep output concise

---

### Step 9: Offer Follow-up Assistance (Optional)

**Ask if user needs additional help**:

```
Would you like me to:

1. ✨ Clean up the markdown further (improve formatting, add structure)
2. 📊 Generate a table of contents
3. 📝 Split into multiple files by sections
4. 🔍 Extract specific sections or content
5. ✅ All done, thanks!

Your choice? [1/2/3/4/5]
```

[WAIT for answer and provide assistance if requested]

---

## Tool Recommendations

**Claude Direct Read (≤ 20 pages)**:
- ✅ No installation required
- ✅ Intelligent extraction with context understanding
- ✅ Best for most common PDFs (reports, papers, docs)
- ⚠️ Limited to 20 pages per request

**docling (recommended for > 20 pages)**:
- ✅ Best overall quality for complex PDFs
- ✅ Excellent table and image handling
- ✅ Preserves document structure
- ⚠️ Requires Python installation
- ⚠️ Slower than pandoc

**pandoc (fast alternative)**:
- ✅ Very fast conversion
- ✅ Widely available
- ✅ Good for text-heavy PDFs
- ⚠️ Limited table support
- ⚠️ Basic image handling

**pdf2md (lightweight)**:
- ✅ Simple and fast
- ✅ Minimal dependencies
- ⚠️ Limited features

## Common Issues

**Issue**: "PDF is password-protected"
**Solution**: Remove password first:
```bash
qpdf --password=PASSWORD --decrypt input.pdf output.pdf
```

**Issue**: "PDF appears to be scanned images (OCR needed)"
**Solution**: Preprocess with OCR:
```bash
# Recommended: Use OCRmyPDF
ocrmypdf input.pdf output_ocr.pdf
# Then convert the OCR'd PDF
```

**Issue**: "Page count detection failed"
**Solution**: We'll attempt Claude Read and fall back to tools if needed

**Issue**: "Tables not converting well with Claude"
**Solution**: For PDFs with complex tables, use docling instead:
```
/pdf-to-markdown your-file.pdf
# Choose option 1 to install docling
```

## Why This Design?

**Claude-first approach**:
- Most PDFs are < 20 pages (reports, papers, presentations)
- No installation friction for 80% of use cases
- Claude provides intelligent extraction, not just text dump
- Better markdown quality from native understanding

**Local tools as fallback**:
- Handles edge cases (large PDFs, batch processing)
- Gives users control over processing
- Works offline when needed

**Best of both worlds**: Simple for common cases, powerful for complex ones.
