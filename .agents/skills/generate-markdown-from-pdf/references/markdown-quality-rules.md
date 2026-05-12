# Markdown Quality Rules for PDF Conversion

This file defines quality standards for markdown files generated from PDF sources.

## Heading Structure Rules

**CRITICAL: Proper heading hierarchy**

✅ **CORRECT - Hierarchical structure**:
```markdown
# Main Title (H1)

## Section 1 (H2)

### Subsection 1.1 (H3)

### Subsection 1.2 (H3)

## Section 2 (H2)
```

❌ **WRONG - Skipped levels**:
```markdown
# Main Title

### Subsection (skipped H2)

##### Deep section (skipped H3, H4)
```

**Rules**:
- Only one H1 per document
- Don't skip heading levels (H1 → H2 → H3, not H1 → H3)
- Blank line before and after each heading
- Use ATX-style headings (# ## ###), not Setext-style (underline)

## Link Format Rules

**CRITICAL: Consistent link formatting**

✅ **CORRECT - Standard markdown links**:
```markdown
See the [documentation](https://example.com/docs) for details.

For more information, visit [Red Hat Documentation](https://docs.redhat.com).
```

❌ **WRONG - Malformed or inconsistent**:
```markdown
See the documentation (https://example.com/docs) for details.

For more: https://docs.redhat.com (bare URL)

Check <https://example.com> (angle bracket format)
```

**Rules**:
- Use `[text](url)` format consistently
- No bare URLs in paragraph text
- Link text should be descriptive, not "click here"
- External links in new tab when rendering: add caret for AsciiDoc conversion

## Image Reference Rules

**CRITICAL: Valid image paths and alt text**

✅ **CORRECT - Proper image syntax**:
```markdown
![Architecture diagram showing component relationships](./media/architecture.png)

![Data flow between services](./media/dataflow.svg)
```

❌ **WRONG - Missing alt text or broken paths**:
```markdown
![](./media/architecture.png)

![diagram](/absolute/path/that/wont/work/image.png)

Image: architecture.png (not markdown syntax)
```

**Rules**:
- Always include descriptive alt text
- Use relative paths (./media/image.png)
- Verify image files exist at specified paths
- Image file extensions should be lowercase (.png not .PNG)
- One blank line before and after images

## Table Format Rules

**CRITICAL: Proper markdown table syntax**

✅ **CORRECT - Well-formed tables**:
```markdown
| Feature | Status | Notes |
|---------|--------|-------|
| Authentication | ✅ Complete | OAuth 2.0 |
| Authorization | 🚧 In Progress | RBAC implementation |
| Logging | ✅ Complete | JSON format |
```

❌ **WRONG - Malformed tables**:
```markdown
| Feature | Status | Notes
|---------|--------|-------
Authentication | ✅ Complete | OAuth 2.0
Authorization | In Progress | RBAC
(missing pipes, inconsistent columns)
```

**Rules**:
- Pipes (|) at start and end of each row
- Header separator row with dashes (---)
- Same number of columns in all rows
- Blank line before and after table
- Left-align text columns, right-align number columns

## Code Block Rules

**CRITICAL: Proper code fence formatting**

✅ **CORRECT - Fenced code blocks with language**:
````markdown
```python
def convert_pdf(filename):
    with open(filename, 'rb') as f:
        return extract_text(f)
```
````

✅ **CORRECT - Bash commands**:
````markdown
```bash
pandoc input.pdf -o output.md
```
````

❌ **WRONG - Indented code or missing language**:
```markdown
    def convert_pdf(filename):
        return extract_text(filename)

```
pandoc input.pdf -o output.md
```
(no language specified)
```

**Rules**:
- Use triple backticks (```) for code blocks
- Always specify language after opening backticks
- Blank line before and after code blocks
- No indented code blocks (4-space style)

## List Formatting Rules

**CRITICAL: Consistent list syntax**

✅ **CORRECT - Proper unordered lists**:
```markdown
Features include:

* Authentication support
* Role-based access control
* Audit logging
* API rate limiting

Next section...
```

✅ **CORRECT - Proper ordered lists**:
```markdown
Installation steps:

1. Download the package
2. Extract to /opt/
3. Run the installer
4. Configure settings

Verification...
```

❌ **WRONG - Inconsistent or malformed**:
```markdown
Features:
* Item 1
- Item 2 (different marker)
+ Item 3 (different marker)
* Item 4
(no blank lines before/after)

Steps:
1) First step (wrong delimiter)
2) Second step
```

**Rules**:
- Blank line before and after lists
- Consistent markers (* or - for unordered, not mixed)
- Use * for unordered lists (more common)
- Use 1. 2. 3. for ordered lists (not 1) 2) 3))
- Proper indentation for nested lists (2 or 4 spaces)

## Paragraph and Line Break Rules

**CRITICAL: Proper paragraph separation**

✅ **CORRECT - Single blank line between paragraphs**:
```markdown
First paragraph with complete thought and proper punctuation.

Second paragraph starts here with proper spacing.

Third paragraph continues the narrative flow.
```

❌ **WRONG - No spacing or excessive spacing**:
```markdown
First paragraph runs directly into next.
Second paragraph without break.

Third paragraph.


Fourth paragraph with excessive blank lines.
```

**Rules**:
- One blank line between paragraphs
- No more than one blank line between sections
- No trailing whitespace at end of lines
- Line length reasonable (80-120 chars when possible)

## Character Encoding Rules

**CRITICAL: UTF-8 encoding and proper characters**

✅ **CORRECT - UTF-8 compatible characters**:
```markdown
Use proper Unicode characters:
- Em dash: — (U+2014)
- En dash: – (U+2013)
- Ellipsis: … (U+2026)
- Quotes: "quoted text" (curly quotes)
- Apostrophe: it's (curly apostrophe)
```

❌ **WRONG - Encoding issues or garbled text**:
```markdown
Use proper â€" characters (mojibake)

Strange�characters�everywhere

Mix of "straight" and "curly" quotes
```

**Rules**:
- File must be valid UTF-8
- No mojibake or encoding artifacts
- Consistent quote style (prefer curly)
- No control characters or null bytes

## PDF Artifact Removal Rules

**CRITICAL: Remove PDF-specific artifacts**

✅ **CORRECT - Clean markdown**:
```markdown
# Introduction to Cloud Computing

Cloud computing has transformed how organizations...
```

❌ **WRONG - PDF artifacts present**:
```markdown
Page 1

# Introduction to Cloud Computing

Cloud computing has transformed how organizations...

─────────────────────────────────────────
Footer text here | Page 1 of 50
─────────────────────────────────────────

Page 2

## Benefits of Cloud Computing
```

**Rules**:
- Remove page numbers
- Remove headers and footers
- Remove PDF generation timestamps
- Remove horizontal rules from page breaks
- Remove "Page X" markers
- Clean up hyphenation artifacts

## Reference and Citation Rules

**CRITICAL: Preserve citations properly**

✅ **CORRECT - Markdown citations**:
```markdown
According to Smith et al. (2023), cloud adoption has increased[^1].

[^1]: Smith, J., et al. (2023). "Cloud Computing Trends." *Journal of Technology*, 45(2), 123-145.
```

✅ **CORRECT - Inline citations**:
```markdown
Cloud computing reduces costs by 30-50% (Johnson, 2022).
```

❌ **WRONG - Broken citations**:
```markdown
According to Smith1, cloud adoption...

1 Smith, J. (2023). Paper title.
(footnote not properly linked)
```

**Rules**:
- Use markdown footnote syntax [^1]
- Place footnotes at bottom of document
- Preserve all citation information
- Links to DOIs when available

## Quality Validation Checklist

**Must pass before delivery**:

| Check | Rule |
|-------|------|
| Heading hierarchy | No skipped levels, only one H1 |
| Links | Use [text](url) format consistently |
| Images | Alt text present, relative paths, files exist |
| Tables | Proper pipes, consistent columns |
| Code blocks | Triple backticks, language specified |
| Lists | Blank lines before/after, consistent markers |
| Paragraphs | Single blank line separation |
| Encoding | Valid UTF-8, no mojibake |
| PDF artifacts | Headers/footers/page numbers removed |
| Line endings | Consistent (LF preferred) |

## Auto-Fix Patterns

**Common fixes to apply automatically**:

1. **Fix malformed headings**:
   - Add blank lines before/after headings
   - Ensure space after # markers

2. **Normalize link formats**:
   - Convert `(http://...)` to `[link](http://...)`
   - Fix broken markdown link syntax

3. **Clean up whitespace**:
   - Remove trailing whitespace
   - Consolidate multiple blank lines to one
   - Ensure blank lines around lists/code/tables

4. **Fix table alignment**:
   - Ensure consistent column count
   - Add missing pipes
   - Align header separators

5. **Remove PDF artifacts**:
   - Strip page numbers (regex: `^Page \d+$`)
   - Remove footer patterns
   - Clean hyphenation artifacts

6. **Fix code blocks**:
   - Convert indented code to fenced
   - Add language identifiers where obvious

## Post-Conversion Recommendations

**Manual review needed for**:

* Mathematical formulas (may need LaTeX)
* Complex tables (verify structure)
* Multi-column layouts (may be linearized)
* Footnotes and references (verify linking)
* Special characters and symbols (verify rendering)
* Image quality and clarity
* Code snippet completeness

**Enhancement opportunities**:

* Add table of contents
* Improve heading hierarchy
* Add cross-references between sections
* Enhance code examples with output
* Add explanatory notes for complex content
