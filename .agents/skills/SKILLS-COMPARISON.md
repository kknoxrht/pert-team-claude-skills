# PDF to Markdown Skills Comparison

Two approaches to converting PDFs to markdown, each optimized for different use cases.

## Quick Comparison

| Feature | `/pdf-to-markdown` | `/generate-markdown-from-pdf` |
|---------|-------------------|------------------------------|
| **Design Philosophy** | Claude-first, tools as fallback | Tool-first, always uses local tools |
| **Setup Required** | None (80% of cases) | Always (pandoc/docling/pdf2md) |
| **Best For** | Most users, small-medium PDFs | Power users, large PDFs, batch processing |
| **Skill Complexity** | ~600 lines | ~670 lines |
| **User Experience** | Instant for ≤20 pages | Consistent for all sizes |
| **Output Quality** | Excellent (Claude AI) | Good-Excellent (depends on tool) |
| **Page Limits** | 20 pages (Claude method) | No limits |

---

## Skill 1: `/pdf-to-markdown` (New - Recommended)

### Design: Claude-First Approach

**Philosophy**: Use Claude's native PDF reading for most cases, fall back to tools only when needed.

### Workflow

```
User invokes: /pdf-to-markdown report.pdf

1. Check PDF page count
   ├─ ≤ 20 pages? → Use Claude Direct Read (NO TOOLS!)
   │  ├─ Read PDF with Read tool
   │  ├─ Convert to markdown intelligently
   │  ├─ Auto-cleanup (remove artifacts)
   │  └─ Deliver clean markdown
   │
   └─ > 20 pages? → Offer local tools
      ├─ Explain 20-page limitation
      ├─ Recommend docling (or pandoc/pdf2md)
      ├─ Guide installation if needed
      ├─ Convert with chosen tool
      └─ Deliver markdown

Result: ✅ Created: report.md (127 lines)
Time: 10 seconds (no installation) or 5-10 minutes (with installation)
```

### Key Features

✅ **Zero installation for 80% of use cases**
- Most PDFs are < 20 pages
- Claude reads directly
- Immediate results

✅ **Intelligent conversion**
- Claude understands document structure
- Context-aware formatting
- Better markdown quality

✅ **Automatic cleanup**
- Removes page numbers
- Cleans headers/footers
- Fixes encoding issues

✅ **Progressive enhancement**
- Start simple (Claude)
- Add complexity only when needed (tools)

### When to Use

**Perfect for**:
- ✅ Quick one-off conversions
- ✅ PDFs under 20 pages (reports, papers, presentations)
- ✅ Users who don't want to install tools
- ✅ Getting started with PDF conversion

**Not ideal for**:
- ⚠️ Regular batch processing of large PDFs
- ⚠️ PDFs consistently over 20 pages
- ⚠️ Users who need specific tool features

### File Structure

```
.agents/skills/pdf-to-markdown/
├── skill.md (602 lines)
│   └── 9-step workflow with Claude-first logic
├── README.md (302 lines)
│   └── User guide and examples
└── references/
    ├── tool-comparison.md (291 lines)
    │   └── Detailed comparison of all methods
    └── why-claude-first.md (284 lines)
        └── Design philosophy explained
```

**Total**: 1,479 lines

---

## Skill 2: `/generate-markdown-from-pdf` (Original)

### Design: Tool-First Approach

**Philosophy**: Always use local conversion tools (pandoc, docling, pdf2md) for consistent results across all PDF sizes.

### Workflow

```
User invokes: /generate-markdown-from-pdf report.pdf

1. Get PDF file path
2. Analyze PDF content (text/tables/images)
3. Recommend tool based on content
4. Ask user for tool preference
5. Determine output file name
6. Check if tool is installed
   ├─ Installed? → Proceed
   └─ Not installed? → Guide installation
7. Ask about special requirements
8. Perform conversion with tool
9. Analyze conversion quality
10. Final quality check
11. Deliver results
12. Offer post-conversion assistance

Result: ✅ Created: report.md (127 lines)
Time: 5-15 minutes (installation) + conversion time
```

### Key Features

✅ **No page limits**
- Works for any size PDF
- Consistent approach

✅ **Multiple tool options**
- pandoc, docling, pdf2md
- Tool selection based on content

✅ **Fine-grained control**
- Custom conversion options
- Special requirements handling

✅ **Comprehensive workflow**
- 12-step detailed process
- Extensive error handling

### When to Use

**Perfect for**:
- ✅ Large PDFs (> 20 pages) regularly
- ✅ Batch processing multiple PDFs
- ✅ Need specific tool features
- ✅ Power users comfortable with CLI tools

**Not ideal for**:
- ⚠️ Quick one-off conversions
- ⚠️ Users unfamiliar with command-line tools
- ⚠️ When immediate results are preferred

### File Structure

```
.agents/skills/generate-markdown-from-pdf/
├── skill.md (673 lines)
│   └── 12-step workflow with tool selection
├── COURSE-PATTERNS-APPLIED.md (488 lines)
│   └── Documentation of patterns used
└── references/
    ├── conversion-commands.md (258 lines)
    │   └── Detailed tool commands
    └── markdown-quality-rules.md (397 lines)
        └── Quality standards and auto-fix patterns
```

**Total**: 1,816 lines

---

## Side-by-Side Example

### Converting a 5-Page Report

#### Using `/pdf-to-markdown` (Claude-First)

```bash
$ /pdf-to-markdown weekly-report.pdf
```

**Steps**:
1. Checks page count: 5 pages
2. Uses Claude Direct Read
3. Delivers markdown

**Time**: 10 seconds
**Installation**: None
**Quality**: Excellent (Claude understands context)

**Output**:
```
✅ PDF to Markdown Conversion Complete

Files Created:
- weekly-report.md (127 lines)

Conversion Details:
- Source: weekly-report.pdf (5 pages, 245KB)
- Method: Claude direct read
- Extraction quality: 98%
```

---

#### Using `/generate-markdown-from-pdf` (Tool-First)

```bash
$ /generate-markdown-from-pdf weekly-report.pdf
```

**Steps**:
1. Gets PDF path
2. Analyzes content type
3. Recommends tool (e.g., pandoc)
4. Asks for tool preference
5. Checks if pandoc installed
6. If not: guides installation
7. Performs conversion
8. Quality checks
9. Delivers markdown

**Time**: 5-15 minutes (first time with installation), 30 seconds (subsequent)
**Installation**: Required (pandoc/docling/pdf2md)
**Quality**: Good (tool extraction + cleanup)

**Output**:
```
✅ PDF to Markdown Conversion Complete

Files Created:
- weekly-report.md (127 lines)

Conversion Details:
- Source: weekly-report.pdf (245KB)
- Tool used: pandoc
- Content type: text-heavy
- Extraction quality: 95%
```

---

## Decision Matrix

### Choose `/pdf-to-markdown` if...

| Scenario | Why |
|----------|-----|
| First time converting PDFs | No setup required |
| PDF is under 20 pages | Instant results with Claude |
| Quick one-off conversion | No installation friction |
| Want best quality markdown | Claude's intelligent extraction |
| Prefer simple workflows | Minimal steps to result |

### Choose `/generate-markdown-from-pdf` if...

| Scenario | Why |
|----------|-----|
| PDF is over 20 pages | No page limits with tools |
| Batch processing many PDFs | Consistent tool-based workflow |
| Need offline conversion | Tools work without API |
| Want tool-specific features | Fine-grained control over conversion |
| Regularly convert large PDFs | One-time setup, unlimited use |

---

## Real-World Use Cases

### Use Case 1: Student Converting Research Papers

**Typical PDFs**: 10-15 pages, academic papers

**Best Choice**: `/pdf-to-markdown`

**Why**:
- Papers are under 20 pages
- Claude understands academic structure
- No installation needed
- Quick conversion for studying

---

### Use Case 2: Technical Writer Migrating Documentation

**Typical PDFs**: 50-200 pages, technical manuals

**Best Choice**: `/generate-markdown-from-pdf`

**Why**:
- Manuals exceed 20 pages
- Need consistent batch processing
- docling handles complex tables well
- One-time tool setup worth it

---

### Use Case 3: Developer Extracting API Documentation

**Typical PDFs**: 5-20 pages, API guides

**Best Choice**: `/pdf-to-markdown`

**Why**:
- Most API docs are under 20 pages
- Quick extraction needed
- Claude formats code blocks well
- Immediate results

---

### Use Case 4: Data Analyst Converting Reports

**Typical PDFs**: 30-100 pages with complex tables

**Best Choice**: `/generate-markdown-from-pdf` with docling

**Why**:
- Large PDFs with data tables
- docling excels at table preservation
- Regular conversions justify setup
- Need full PDF, not just first 20 pages

---

## Tool Method Comparison

### Claude Direct Read (in `/pdf-to-markdown`)

**Strengths**:
- ⭐ Zero installation
- ⭐ Intelligent extraction
- ⭐ Context-aware formatting
- ⭐ Auto-cleanup of artifacts
- ⭐ Best markdown quality

**Limitations**:
- ⚠️ 20-page maximum
- ⚠️ Requires API access

**Best for**: Reports, papers, presentations, quick conversions

---

### docling (in both skills)

**Strengths**:
- ⭐ No page limits
- ⭐ Excellent table preservation
- ⭐ Great image handling
- ⭐ Complex layout support

**Limitations**:
- ⚠️ Requires Python 3.8+
- ⚠️ Slower than pandoc
- ⚠️ Installation complexity

**Best for**: Large technical docs with tables/images

---

### pandoc (in both skills)

**Strengths**:
- ⭐ Very fast conversion
- ⭐ Easy installation
- ⭐ Good text extraction
- ⭐ Widely supported

**Limitations**:
- ⚠️ Limited table support
- ⚠️ Basic image handling

**Best for**: Large text-heavy PDFs, speed priority

---

## Recommendation

### For Most Users: Start with `/pdf-to-markdown`

**Why?**
1. Works immediately (no setup)
2. Handles 80% of PDFs (under 20 pages)
3. Better quality output
4. Simpler workflow
5. Can still use tools when needed

**Upgrade to** `/generate-markdown-from-pdf` **when**:
- You regularly convert PDFs > 20 pages
- You need batch processing
- You want tool-specific features
- You're comfortable with CLI tools

### For Power Users: Use Both!

- **`/pdf-to-markdown`** for quick < 20 page conversions
- **`/generate-markdown-from-pdf`** for large PDFs and batch processing

Each skill excels in its domain. Use the right tool for the job!

---

## Summary

| Aspect | `/pdf-to-markdown` | `/generate-markdown-from-pdf` |
|--------|-------------------|------------------------------|
| **Primary Users** | Everyone | Power users |
| **Setup Time** | 0 min (80% of cases) | 5-15 min (always) |
| **Typical Conversion** | 10 seconds | 30 seconds - 2 minutes |
| **Page Limit** | 20 (Claude), ∞ (tools) | ∞ (always tools) |
| **Quality** | Excellent | Good-Excellent |
| **Complexity** | Simple | Comprehensive |
| **Use Cases** | Quick conversions | Large PDFs, batches |
| **Philosophy** | Progressive enhancement | Consistent power |

**Both skills are production-ready and follow best practices from the "Building Claude Skills" course.**

Choose based on your needs, or use both for maximum flexibility!
