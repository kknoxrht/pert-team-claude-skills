---
name: generate-markdown-from-pdf
description: This skill should be used when the user asks to "convert PDF to markdown", "extract text from PDF", "turn this PDF into markdown", "convert document to markdown", "make this PDF readable by AI", or "extract content from PDF file".
---

---
context: main
model: claude-opus-4-6
---

# Markdown Generation from PDF

Guide you through converting PDF files to Markdown format optimized for Generative AI Agents, with automatic tool selection based on PDF content type.

## What You'll Need Before Starting

Have these ready before running this skill:

**Required:**
- 📄 **PDF file path** - Location of the PDF you want to convert
- 💻 **System access** - Ability to install conversion tools (or tools already installed)

**Helpful to have:**
- 📊 **PDF content type** - Mostly text, images, or tables (I'll help you determine this)
- 🎯 **Output purpose** - What you'll use the markdown for (documentation, AI training, etc.)
- 🔧 **Tool preference** - If you already have a preferred converter

**Access needed:**
- ✅ Read permissions for the PDF file
- ✅ Write permissions for output directory
- ✅ Command-line access (for tool installation if needed)

## When to Use

Use this skill to convert PDF documents to markdown format for:

* Preparing documentation for AI/LLM consumption
* Extracting text from research papers or technical docs
* Converting presentations or reports to editable markdown
* Creating AI training data from PDF sources
* Migrating PDF content to documentation systems

**Don't use this for:**
- Generating PDFs from markdown → use `/generate-pdf`
- OCR of scanned images → use dedicated OCR tools first
- Direct PDF editing → use PDF editor tools

## Arguments (Optional)

This skill supports optional command-line arguments for faster workflows.

**Usage Examples**:
```bash
/generate-markdown-from-pdf                           # Interactive mode
/generate-markdown-from-pdf <pdf-file>                # Specify PDF file
/generate-markdown-from-pdf <pdf-file> --tool pandoc  # Specify converter
/generate-markdown-from-pdf <pdf-file> -o output.md   # Specify output file
```

**Parameters**:
- `<pdf-file>` - Path to PDF file to convert
  - Example: `/generate-markdown-from-pdf docs/whitepaper.pdf`
- `--tool <tool-name>` - Preferred conversion tool (pandoc, docling, pdf2md)
- `-o <output-file>` - Desired output markdown file path
  - If not provided, defaults to same name with `.md` extension

**How Arguments Work**:
- Arguments skip certain questions (faster workflow)
- You can still use interactive mode by calling without arguments
- Arguments are validated before use

## Workflow

**CRITICAL RULES**

### 1. Ask Questions SEQUENTIALLY

- Ask ONE question or ONE group of related questions at a time
- WAIT for user's answer before proceeding
- Do NOT ask questions from multiple steps together
- Do NOT skip workflows based on incomplete answers

### 2. Manage Output Tokens

- **NEVER output full markdown content** - Use Write tool to create files
- **Show brief confirmations only** - "✅ Created: filename (X lines)"
- **Keep total output under 5000 tokens** - Summaries, not content
- **Files are written, not displayed** - User reviews with their editor

---

### Step 1: Parse Arguments (If Provided)

**Check if user invoked skill with arguments**.

**Pattern 1: `/generate-markdown-from-pdf <pdf-file> --tool <tool> -o <output>`**
```
Parsing arguments: "<pdf-file> --tool <tool> -o <output>"

✓ PDF file: <pdf-file>
✓ Preferred tool: <tool>
✓ Output file: <output>

Validating PDF file...
[Check if file exists and is readable]

Skipping: Step 2 (PDF file already provided)
Skipping: Step 4 (tool already specified)
Skipping: Step 5 (output file already specified)
Proceeding to: Step 3 (Analyze PDF Content)
```

**Pattern 2: `/generate-markdown-from-pdf <pdf-file>`**
```
Parsing arguments: "<pdf-file>"

✓ PDF file: <pdf-file>

Validating PDF file...
[Check if file exists and is readable]

Skipping: Step 2 (PDF file already provided)
Proceeding to: Step 3 (Analyze PDF Content)
```

**Pattern 3: `/generate-markdown-from-pdf` (no arguments)**
```
No arguments provided.

Using interactive mode.

Proceeding to: Step 2 (Get PDF File)
```

**Argument Validation**:
- If PDF file doesn't exist, ask user: "File not found. Please provide correct path."
- If tool specified is not installed, inform user and offer alternatives
- All arguments are optional - skill always works in interactive mode

---

### Step 2: Get PDF File

**SKIP THIS STEP IF**: User provided `<pdf-file>` as argument

**Ask the user**:
```
What PDF file would you like to convert to markdown?

You can provide:
- A local file path: /Users/yourname/Documents/whitepaper.pdf
- A relative path: ./docs/report.pdf

PDF file path:
```

[WAIT for answer]

**Validate the file**:
- Check if file exists
- Check if file is readable
- Check if file is actually a PDF (by extension or magic number)
- If invalid, ask user to provide a different path

---

### Step 3: Analyze PDF Content

**Determine PDF content type to recommend best tool.**

```
Let me analyze your PDF to recommend the best conversion tool...
```

**Use Read tool to inspect the PDF**:
- Read first few pages to understand content
- Identify content type: text-heavy, image-heavy, table-heavy, or mixed

**Determine content characteristics**:
- **Text-heavy**: Mostly paragraphs, headings, simple formatting
- **Table-heavy**: Contains data tables, spreadsheet-like content
- **Image-heavy**: Diagrams, screenshots, figures
- **Mixed**: Combination of above

**Set recommended tool based on content**:
- **Text-heavy PDFs**: `pandoc` (excellent text extraction)
- **Table-heavy PDFs**: `docling` (preserves table structure)
- **Image-heavy PDFs**: `docling` (better image handling)
- **Mixed content**: `docling` (most comprehensive)

---

### Step 4: Ask About Tool Preference

**SKIP THIS STEP IF**: User provided `--tool <tool>` in arguments

**Ask the user**:
```
Based on analyzing your PDF, I recommend:

📊 PDF Content Type: [text-heavy/table-heavy/image-heavy/mixed]
🔧 Recommended Tool: [tool-name]

Why this tool:
[Brief explanation of why this tool is recommended]

Would you like to use the recommended tool, or do you have a preference?

1. ✅ Use recommended tool ([tool-name])
2. 🔧 Choose a different tool (I'll show you options)
3. ℹ️  Tell me more about the tools

Your choice? [1/2/3]
```

[WAIT for answer]

**If user chooses option 2 (different tool)**:
```
Here are the available PDF to Markdown converters:

**pandoc** - Universal document converter
- ✅ Best for: Text-heavy PDFs
- ✅ Pros: Fast, widely available, good text extraction
- ⚠️ Cons: Limited table support, basic image handling
- Install: brew install pandoc (macOS), apt install pandoc (Linux)

**docling** - Advanced PDF extraction
- ✅ Best for: Tables, images, complex layouts
- ✅ Pros: Preserves structure, handles images well, table extraction
- ⚠️ Cons: Slower, requires Python
- Install: pip install docling

**pdf2md** - Specialized PDF to Markdown
- ✅ Best for: Simple PDFs with standard formatting
- ✅ Pros: Lightweight, focused tool
- ⚠️ Cons: Limited feature set
- Install: pip install pdf2md

Which tool would you like to use? [pandoc/docling/pdf2md]
```

[WAIT for answer]

**If user chooses option 3 (tell me more)**:
```
[Provide detailed explanation of each tool with use cases, then loop back to asking which tool to use]
```

---

### Step 5: Determine Output File

**SKIP THIS STEP IF**: User provided `-o <output>` in arguments

**Ask the user**:
```
Where should I save the converted markdown file?

Default: [same-name-as-pdf].md
Example: whitepaper.pdf → whitepaper.md

Options:
1. ✅ Use default name ([pdf-name].md)
2. 📝 Specify custom name

Your choice? [1/2]
```

[WAIT for answer]

**If user chooses option 2**:
```
What would you like to name the output file?

Output file name (include .md extension):
```

[WAIT for answer]

---

### Step 6: Check Tool Installation

**Verify the selected tool is installed.**

```
Checking if [tool-name] is installed...
```

**Use Bash tool to check**:

For pandoc:
```bash
which pandoc
```

For docling:
```bash
python3 -c "import docling" 2>/dev/null && echo "installed" || echo "not installed"
```

For pdf2md:
```bash
which pdf2md
```

**If NOT installed**:
```
[tool-name] is not installed on your system.

Would you like me to:
1. 📦 Show you installation instructions
2. 🔄 Choose a different tool
3. ⏸️  Stop here (you'll install manually and re-run)

Your choice? [1/2/3]
```

[WAIT for answer]

**If option 1 (show installation)**:
```
To install [tool-name]:

**macOS**:
[installation command for macOS]

**Linux (Ubuntu/Debian)**:
[installation command for Linux]

**Windows**:
[installation command for Windows]

**Python (pip)**:
[pip installation if applicable]

After installation, re-run this skill or let me know when ready to continue.

Are you ready to continue? [Yes/No]
```

[WAIT for answer]

**If option 2**: Go back to Step 4

**If option 3**: Exit gracefully with clear message

---

### Step 7: Ask About Special Requirements

**Ask if there are any special requirements for the conversion.**

```
Are there specific elements you want to ensure are preserved?

Common options:
- Headings structure (h1, h2, h3, etc.)
- Links and URLs
- Images (embedded or referenced)
- Tables
- Code blocks
- Footnotes and references

Please describe any special requirements, or type "default" for standard conversion:
```

[WAIT for answer]

**Parse special requirements and note for conversion command customization.**

---

### Step 8: Perform Conversion

**Execute the PDF to Markdown conversion.**

```
Converting [pdf-filename] to markdown...

Using: [tool-name]
Output: [output-filename]
```

**Build and execute conversion command based on tool**.

See `@generate-markdown-from-pdf/references/conversion-commands.md` for complete command reference and advanced options.

**For pandoc**:
```bash
pandoc "[pdf-file]" -f pdf -t markdown -o "[output-file]" --extract-media="./media"
```

**For docling**:
```bash
python3 -c "
from docling.document_converter import DocumentConverter
converter = DocumentConverter()
result = converter.convert('[pdf-file]')
with open('[output-file]', 'w') as f:
    f.write(result.document.export_to_markdown())
"
```

**For pdf2md**:
```bash
pdf2md "[pdf-file]" > "[output-file]"
```

**Capture output and any errors.**

**If conversion fails**:
```
⚠️ Conversion failed with error:

[error message]

Troubleshooting options:
1. Try a different tool
2. Check if PDF is password-protected or corrupted
3. Verify file permissions

Would you like to:
1. 🔄 Try a different conversion tool
2. 📋 See full error details
3. ⏸️  Stop and troubleshoot manually

Your choice? [1/2/3]
```

[WAIT for answer and handle accordingly]

---

### Step 9: Analyze Conversion Quality

**Read the generated markdown file and assess quality.**

```
Analyzing conversion quality...
```

**Use Read tool to inspect output markdown**:
- Check if content was extracted
- Identify any obvious formatting issues
- Count headings, paragraphs, images, tables
- Check for garbled text or encoding issues

**Provide quality assessment**:
```
✅ Conversion complete!

**Quality Assessment**:
- Content extracted: [Yes/No]
- Headings found: [count]
- Paragraphs: [count]
- Images: [count] ([embedded/referenced])
- Tables: [count]
- Estimated coverage: [percentage]%

**Potential Issues Detected**:
[List any issues found, or "None - conversion looks clean"]
```

---

### Step 10: Final Quality Check (Inline)

**The generated markdown is already in context — check it directly.**

See `@generate-markdown-from-pdf/references/markdown-quality-rules.md` for complete quality standards and examples.

**Must fix before delivering (fix silently, note in delivery summary)**:

| Check | Rule |
|---|---|
| Heading levels | Proper markdown heading hierarchy (# ## ###) |
| Link format | Use `[text](url)` format |
| Image paths | Valid image references or embedded images |
| Table format | Proper markdown table syntax with \| delimiters |
| Code blocks | Use triple backticks for code |
| Encoding | No garbled characters or encoding issues |
| Line breaks | Proper paragraph separation |
| PDF artifacts | No page numbers, headers, footers |

**Auto-fix common issues**:
- Fix malformed headings
- Clean up excessive whitespace
- Normalize link formats
- Fix table alignment
- Remove PDF artifacts (page numbers, headers/footers if obvious)

If anything is fixed, note what was corrected in the delivery summary.

---

### Step 11: Deliver

**CRITICAL: Manage Output Tokens to Prevent Overflow**

**Token Management Rules**:
1. **Write files using Write tool** - Don't output full markdown contents to user
2. **Show brief confirmations only** - "✅ Created: filename (X lines)"
3. **Provide summary at end** - List what was created, not the full content
4. **Never output entire markdown content** - File is already written
5. **Keep total output under 5000 tokens** - Brief summaries only

**Output Format**:

```
✅ PDF to Markdown Conversion Complete

**Files Created**:
- [output-filename] ([line-count] lines) - Converted markdown

**Conversion Details**:
- Source: [pdf-filename] ([file-size])
- Tool used: [tool-name]
- Content type: [text-heavy/table-heavy/image-heavy/mixed]
- Extraction quality: [percentage]%

**Content Summary**:
- Headings: [count]
- Paragraphs: [count]
- Images: [count] (saved to: ./media/)
- Tables: [count]
- Links: [count]

**Auto-corrections Applied** (if any):
- Fixed [n] malformed headings
- Normalized [n] link formats
- Cleaned [n] table formatting issues
- Removed [n] PDF artifacts

**Image Handling**:
- Images extracted to: ./media/ directory
- Image references: [embedded/external]
- Manual review recommended for: [list any image issues]

**Next Steps**:
1. Review markdown: [output-filename]
2. Check image references in ./media/ directory
3. Verify tables and special formatting
4. Use with AI agents or documentation systems

**Note**: Markdown file has been written. Use your editor to review and refine if needed.
```

**What NOT to do**:
- ❌ Don't show full markdown content in response
- ❌ Don't output the entire converted file
- ❌ Don't paste hundreds of lines of markdown

**What TO do**:
- ✅ Write file using Write tool
- ✅ Show brief "Created: filename (X lines)" confirmation
- ✅ Provide structured summary with metrics
- ✅ Give clear next steps
- ✅ Keep output concise (under 5000 tokens)

---

### Step 12: Offer Post-Conversion Assistance (Optional)

**Ask if user needs additional help**:

```
Would you like me to:

1. ✨ Clean up the markdown further (remove artifacts, improve formatting)
2. 📊 Generate a table of contents
3. 🔍 Analyze the content for AI training suitability
4. 📝 Split into multiple files by sections
5. ✅ No thanks, I'm all set

Your choice? [1/2/3/4/5]
```

[WAIT for answer and provide requested assistance if needed]

---

## Tool Reference

**Recommended tools by PDF type**:

| PDF Type | Best Tool | Alternative |
|----------|-----------|-------------|
| Text-heavy documents | pandoc | pdf2md |
| Tables and data | docling | pandoc |
| Images and diagrams | docling | pandoc |
| Mixed content | docling | pandoc |
| Simple formatting | pdf2md | pandoc |

**Installation quick reference**:

**pandoc**:
```bash
# macOS
brew install pandoc

# Linux (Ubuntu/Debian)
sudo apt install pandoc

# Windows
choco install pandoc
```

**docling**:
```bash
# Requires Python 3.8+
pip install docling
```

**pdf2md**:
```bash
# Via pip
pip install pdf2md
```

## Common Issues and Solutions

**Issue**: PDF is password-protected

**Solution**: Remove password first using:
```bash
qpdf --password=PASSWORD --decrypt input.pdf output.pdf
```

**Issue**: Images not extracting

**Solution**: Use docling or add `--extract-media` flag with pandoc

**Issue**: Tables converted poorly

**Solution**: Try docling for better table structure preservation

**Issue**: Encoding/character issues

**Solution**: Specify encoding explicitly:
```bash
pandoc input.pdf -o output.md --to=markdown+smart
```

**Issue**: Page numbers and headers included

**Solution**: Post-process to remove (or use docling which handles this better)

## Integration Notes

**Output format**:
- Standard markdown (.md)
- Compatible with GitHub, GitLab, Hugo, Jekyll
- Optimized for LLM/AI agent consumption

**Image handling**:
- Extracted to `./media/` directory by default
- References updated in markdown
- Can be embedded as base64 if needed

**Quality considerations**:
- Complex layouts may need manual review
- Mathematical formulas may need LaTeX conversion
- Scanned PDFs require OCR preprocessing
- Multi-column layouts may need adjustment

## Related Skills

- `/generate-pdf` - Convert markdown back to PDF
- `/showroom:create-lab` - Use converted content for workshop creation
- `/showroom:blog-generate` - Transform into blog posts
