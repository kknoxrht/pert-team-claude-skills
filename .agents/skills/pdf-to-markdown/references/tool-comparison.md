# PDF to Markdown Tool Comparison

## Conversion Methods Overview

### Claude Direct Read (Built-in)

**Best for**: Most PDFs up to 20 pages

**Capabilities**:
- ✅ No installation required
- ✅ Intelligent content understanding
- ✅ Context-aware extraction
- ✅ Native markdown formatting
- ✅ Handles text, tables, lists naturally
- ✅ Cleans up artifacts automatically
- ⚠️ **Limit: 20 pages maximum**

**When to use**:
- Quick conversions
- Standard documents (reports, papers, presentations)
- When you don't want to install tools
- Single-page or small multi-page PDFs

**Example quality**:
```markdown
# Properly structured headings
## With correct hierarchy

Well-formatted paragraphs with proper line breaks.

| Tables | Are | Clean |
|--------|-----|-------|
| Data   | Is  | Aligned |

* Lists are properly formatted
* With consistent markers
```

---

### docling (Recommended for > 20 pages)

**Best for**: Large PDFs with complex layouts, tables, and images

**Capabilities**:
- ✅ Excellent table structure preservation
- ✅ Advanced image extraction
- ✅ Handles multi-column layouts
- ✅ Preserves document structure
- ✅ No page limits
- ⚠️ Requires Python 3.8+
- ⚠️ Slower processing

**Installation**:
```bash
pip install docling
```

**When to use**:
- PDFs > 20 pages
- Technical documentation
- Reports with complex tables
- Documents with many images
- Multi-column layouts

**Conversion command**:
```bash
python3 -c "
from docling.document_converter import DocumentConverter
converter = DocumentConverter()
result = converter.convert('input.pdf')
with open('output.md', 'w') as f:
    f.write(result.document.export_to_markdown())
"
```

**Quality**: ⭐⭐⭐⭐⭐ (5/5)

---

### pandoc (Fast Alternative)

**Best for**: Large text-heavy PDFs where speed matters

**Capabilities**:
- ✅ Very fast conversion
- ✅ Widely available (often pre-installed)
- ✅ Good text extraction
- ✅ Multiple output formats
- ⚠️ Limited table support
- ⚠️ Basic image handling

**Installation**:
```bash
# macOS
brew install pandoc

# Linux
sudo apt install pandoc

# Windows
choco install pandoc
```

**When to use**:
- Text-heavy PDFs without complex tables
- Need speed over perfect formatting
- Simple document structures
- Books, articles, plain reports

**Conversion command**:
```bash
# Basic
pandoc input.pdf -f pdf -t markdown -o output.md

# With image extraction
pandoc input.pdf -f pdf -t markdown -o output.md --extract-media="./media"

# GitHub-flavored markdown
pandoc input.pdf -f pdf -t gfm -o output.md
```

**Quality**: ⭐⭐⭐⭐ (4/5)

---

### pdf2md (Lightweight)

**Best for**: Simple PDFs with minimal formatting

**Capabilities**:
- ✅ Lightweight and simple
- ✅ Fast processing
- ✅ Minimal dependencies
- ⚠️ Limited feature set
- ⚠️ Basic formatting only

**Installation**:
```bash
pip install pdf2md
```

**When to use**:
- Simple PDFs with basic formatting
- When you need a lightweight tool
- Quick and dirty conversions

**Conversion command**:
```bash
pdf2md input.pdf > output.md
```

**Quality**: ⭐⭐⭐ (3/5)

---

## Decision Matrix

| PDF Characteristics | Recommended Method | Why |
|---------------------|-------------------|-----|
| ≤ 20 pages, any content | **Claude Direct Read** | No setup, best UX, intelligent |
| > 20 pages, complex tables/images | **docling** | Best quality, structure preservation |
| > 20 pages, mostly text | **pandoc** | Fast, good quality, easy install |
| > 20 pages, simple formatting | **pdf2md** | Lightweight, sufficient for basic needs |
| Scanned PDF (images) | **OCR first** → then any tool | Needs text layer added |
| Password-protected | **Remove password** → then any tool | Must decrypt first |

## Feature Comparison

| Feature | Claude | docling | pandoc | pdf2md |
|---------|--------|---------|--------|--------|
| **No installation** | ✅ | ❌ | ❌ | ❌ |
| **Page limit** | 20 | ∞ | ∞ | ∞ |
| **Text extraction** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Table preservation** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **Image handling** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Complex layouts** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **Processing speed** | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Markdown quality** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Context awareness** | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐ |

## Real-World Examples

### Example 1: 5-Page Technical Report

**Best choice**: Claude Direct Read

**Why**:
- Within 20-page limit
- No installation needed
- Claude understands technical context
- Clean markdown output immediately

**Result quality**: Excellent headings, proper tables, clean formatting

---

### Example 2: 150-Page Technical Manual with Tables

**Best choice**: docling

**Why**:
- Exceeds 20-page limit
- Contains complex tables that need preservation
- Technical diagrams need proper extraction
- Multi-column layout

**Alternative**: pandoc (if tables are simple and speed is priority)

---

### Example 3: 50-Page Research Paper (Text-Heavy)

**Best choice**: pandoc

**Why**:
- Mostly text with citations
- Few tables, mostly simple
- Fast conversion important
- pandoc handles citations well

**Alternative**: docling (if paper has complex figures/tables)

---

### Example 4: 10-Page Presentation Slides

**Best choice**: Claude Direct Read

**Why**:
- Within 20-page limit
- Bullet points and simple structure
- Immediate conversion
- Claude formats slides into readable markdown well

---

## Installation Difficulty

| Tool | Difficulty | Time | Prerequisites |
|------|-----------|------|---------------|
| Claude | None | 0 min | Just use the skill |
| pandoc | Easy | 2-5 min | Package manager (brew/apt/choco) |
| docling | Medium | 5-10 min | Python 3.8+, pip |
| pdf2md | Easy | 2-5 min | Python, pip |

## Recommendations by User Type

### Casual User (occasional PDF conversions)
**Use**: Claude Direct Read
- No setup required
- Works for most PDFs
- Best user experience

### Power User (frequent conversions, mixed sizes)
**Install**: docling + pandoc
- docling for complex/large PDFs
- pandoc for speed when quality is sufficient
- Claude for quick < 20 page conversions

### Developer/Automation
**Install**: docling
- Best quality for pipelines
- Handles edge cases well
- Python integration available

### Minimalist
**Install**: pandoc only
- Single tool, widely supported
- Good enough for most cases
- Faster than docling

## Common Scenarios

### "I need to convert this PDF to markdown right now"
→ Use Claude (if ≤ 20 pages)

### "I have 100 PDFs to convert"
→ Install docling or pandoc, batch process

### "This PDF has complex data tables"
→ Use docling (best table preservation)

### "I need the fastest conversion possible"
→ Use pandoc (if > 20 pages) or Claude (if ≤ 20 pages)

### "The PDF is a scanned document"
→ OCR first (ocrmypdf), then convert with any tool

### "I want the best quality markdown"
→ Claude (≤ 20 pages) or docling (> 20 pages)
