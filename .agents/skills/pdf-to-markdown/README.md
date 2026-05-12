# PDF to Markdown Skill (Claude-First Design)

Convert PDF files to clean markdown format with zero setup for PDFs up to 20 pages.

## Quick Start

```bash
# Interactive mode
/pdf-to-markdown

# Quick conversion
/pdf-to-markdown my-document.pdf

# Specify output file
/pdf-to-markdown report.pdf -o documentation.md
```

## How It Works

### For PDFs ≤ 20 pages (Most Common)
1. Point to your PDF
2. Claude reads and converts it directly
3. Get clean markdown immediately
4. **No tools to install!**

### For PDFs > 20 pages
1. Skill detects the PDF is large
2. Explains the 20-page limitation
3. Recommends docling (or pandoc/pdf2md)
4. Guides installation if needed
5. Converts with chosen tool

## Why This Design?

**80% of PDFs are under 20 pages**:
- Reports, papers, presentations, documentation
- Claude can read these directly - no installation needed
- Better quality output (Claude understands context)
- Immediate results

**20% of PDFs exceed 20 pages**:
- Large manuals, books, comprehensive reports
- Local tools handle these efficiently
- Install only when you actually need them

## Features

✅ **Zero friction for most users** - Works immediately, no setup
✅ **Intelligent extraction** - Claude understands document structure
✅ **High-quality markdown** - Proper headings, tables, formatting
✅ **Automatic cleanup** - Removes page numbers, headers, footers
✅ **Local tools when needed** - Seamless fallback for large PDFs
✅ **Smart recommendations** - Suggests best tool based on content

## Comparison with Other Skills

### `/pdf-to-markdown` (This Skill - Recommended)

**Approach**: Claude-first, tools as fallback

**Best for**: Most users, especially one-off conversions

**Workflow**:
- PDFs ≤ 20 pages: Instant conversion with Claude
- PDFs > 20 pages: Guided tool installation

**Pros**:
- ✅ No installation for 80% of cases
- ✅ Better quality output
- ✅ Simpler workflow
- ✅ Faster results

**Cons**:
- ⚠️ 20-page limit for Claude method

---

### `/generate-markdown-from-pdf` (Alternative Skill)

**Approach**: Tool-first, requires local installation

**Best for**: Power users, batch processing, large PDFs

**Workflow**:
- Always uses local tools (pandoc/docling/pdf2md)
- Guides tool selection and installation
- More configuration options

**Pros**:
- ✅ No page limits
- ✅ More tool options
- ✅ Fine-grained control

**Cons**:
- ⚠️ Requires installation even for small PDFs
- ⚠️ More complex workflow
- ⚠️ Lower quality for simple PDFs

---

### Which Should You Use?

**Use `/pdf-to-markdown` if**:
- ✅ Most of your PDFs are under 20 pages
- ✅ You want immediate results
- ✅ You don't want to install tools
- ✅ You prefer simplicity

**Use `/generate-markdown-from-pdf` if**:
- ✅ You regularly convert large PDFs (> 20 pages)
- ✅ You need batch processing capabilities
- ✅ You want specific tool features
- ✅ You're comfortable with CLI tools

## Examples

### Example 1: Convert a 5-Page Report

```bash
/pdf-to-markdown weekly-report.pdf
```

**Result**:
```
✅ PDF to Markdown Conversion Complete

Files Created:
- weekly-report.md (127 lines)

Conversion Details:
- Source: weekly-report.pdf (5 pages, 245KB)
- Method: Claude direct read
- Extraction quality: 98%

Content Summary:
- Headings: 8
- Paragraphs: 23
- Tables: 2
- Links: 5
```

**Time**: ~10 seconds
**Installation required**: None

---

### Example 2: Convert a 150-Page Manual

```bash
/pdf-to-markdown technical-manual.pdf
```

**Result**:
```
⚠️ Your PDF has 150 pages.

Limitation: Claude can read up to 20 pages per request.

Recommended tool: docling
- Best for: Complex layouts, tables, images
- Install: pip install docling

Would you like to:
1. Install docling and convert the full PDF
2. Convert just the first 20 pages (preview)
3. Use pandoc (faster, simpler)
...
```

**User chooses option 1**:
- Installs docling (one-time setup)
- Converts full 150-page PDF
- Gets complete markdown

**Time**: ~5 minutes (including installation)

---

### Example 3: Quick Preview of Large Book

```bash
/pdf-to-markdown programming-book.pdf
# Choose option 2: Convert first 20 pages
```

**Result**: First 20 pages as markdown (table of contents, intro chapters)

**Use case**: Preview book content before deciding to convert the full thing

## Reference Documentation

- **[Tool Comparison](references/tool-comparison.md)** - Detailed comparison of conversion methods
- **[Why Claude-First](references/why-claude-first.md)** - Design philosophy explained
- **Main skill file**: `skill.md` - Complete workflow documentation

## Installation (Optional)

**You don't need to install anything to use this skill!**

For PDFs over 20 pages, you may optionally install:

### docling (Recommended)
```bash
pip install docling
```
Best for: Complex layouts, tables, images

### pandoc (Faster alternative)
```bash
# macOS
brew install pandoc

# Linux
sudo apt install pandoc
```
Best for: Text-heavy PDFs, speed

### pdf2md (Lightweight)
```bash
pip install pdf2md
```
Best for: Simple PDFs

The skill will guide you through installation if/when you need it.

## Common Use Cases

### 1. Convert Research Paper (10 pages)
**Command**: `/pdf-to-markdown research-paper.pdf`
**Method**: Claude direct read
**Result**: Clean markdown with proper citations, headings, tables

### 2. Extract Documentation from PDF (200 pages)
**Command**: `/pdf-to-markdown user-manual.pdf`
**Method**: docling (after guided installation)
**Result**: Complete markdown with images, tables, structure preserved

### 3. Quick Content Preview (first 20 pages of large PDF)
**Command**: `/pdf-to-markdown large-book.pdf` → Choose preview option
**Method**: Claude direct read (first 20 pages)
**Result**: Quick preview of content structure

### 4. Convert Presentation Slides (15 pages)
**Command**: `/pdf-to-markdown presentation.pdf`
**Method**: Claude direct read
**Result**: Markdown with bullet points, structure from slides

## Quality

### What Gets Preserved

✅ **Headings** - Proper hierarchy (# ## ###)
✅ **Paragraphs** - Clean text with proper line breaks
✅ **Tables** - Markdown table format with pipes
✅ **Lists** - Bullets and numbered lists
✅ **Links** - Clickable URLs in `[text](url)` format
✅ **Code blocks** - Fenced code with language tags
✅ **Images** - References or embedded (depending on method)

### What Gets Cleaned

🧹 **Page numbers** - Removed
🧹 **Headers/footers** - Removed
🧹 **PDF artifacts** - Cleaned up
🧹 **Encoding issues** - Fixed
🧹 **Excessive whitespace** - Normalized
🧹 **Malformed structures** - Auto-corrected

## Troubleshooting

### "My PDF isn't converting well"

**Check**:
1. Is it a scanned PDF? → Use OCR first (`ocrmypdf`)
2. Is it password-protected? → Remove password first
3. Complex tables? → Try docling instead of Claude/pandoc
4. Large file? → Use local tools (docling/pandoc)

### "Page count detection failed"

**Solution**: Skill will attempt Claude Read and fall back to tools if needed

### "Installation issues with docling"

**Solution**: Ensure Python 3.8+ is installed, or use pandoc instead

## Performance

| Method | Speed | Quality | Setup Time |
|--------|-------|---------|------------|
| Claude (≤ 20 pages) | Fast (~10s) | Excellent | 0 min |
| docling | Medium (~1 min) | Excellent | 5-10 min (one-time) |
| pandoc | Very fast (~5s) | Good | 2-5 min (one-time) |
| pdf2md | Fast (~10s) | Basic | 2-5 min (one-time) |

## Contributing

Found an issue or have a suggestion? This skill follows the patterns from the "Building Claude Skills" course.

## License

Part of the knox-test-claude skill collection.
