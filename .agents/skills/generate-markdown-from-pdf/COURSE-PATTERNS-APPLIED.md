# Course Patterns Applied to generate-markdown-from-pdf Skill

This document shows exactly which patterns from the "Building Claude Skills" course were applied to complete your skill.

## Module 1: Skill Anatomy - ✅ Applied

### Frontmatter Configuration

**Before**:
```yaml
---
name: generate-markdown-frompdf
description: Converts pdf files to markdown for use with Generative AI Agents.
---
---
context: main
model: opus-4-6
---
```

**After**:
```yaml
---
name: generate-markdown-from-pdf
description: This skill should be used when the user asks to "convert PDF to markdown", "extract text from PDF", "turn this PDF into markdown", "convert document to markdown", "make this PDF readable by AI", or "extract content from PDF file".
---
---
context: main
model: claude-opus-4-6
---
```

**Patterns Applied**:
- ✅ Fixed name: kebab-case with hyphens (not `frompdf`, but `from-pdf`)
- ✅ Description with **trigger phrases** - Added actual user language variations
- ✅ Correct model name: `claude-opus-4-6` (not `opus-4-6`)
- ✅ Context mode specified: `main`

### Structure Sections

**Added**:
- ✅ "What You'll Need Before Starting" - Prerequisites checklist
- ✅ "When to Use" - Clarifies scope and when NOT to use
- ✅ "Arguments (Optional)" - Command-line argument support
- ✅ Clear one-line introduction

## Module 2: Sequential Workflow Design - ✅ Applied

### Sequential vs All-at-Once Questions

**Before (lines 23-36)**:
```markdown
---
We need details about your pdf file...

1. Does your PDF contain mostly: a text b images c tables
2. Are there specific sections...
2. Do you have a preferred tool...
```
❌ Asking all questions at once

**After**:
```markdown
### Step 2: Get PDF File
[Ask for PDF file]
[WAIT for answer]

### Step 3: Analyze PDF Content
[Analyze content type]

### Step 4: Ask About Tool Preference
[Ask about tool]
[WAIT for answer]

### Step 7: Ask About Special Requirements
[Ask about requirements]
[WAIT for answer]
```
✅ Questions asked sequentially, one at a time

### WAIT for Answer Markers

**Pattern Applied**:
```markdown
PDF file path:
```

[WAIT for answer]

### Step 3: Analyze PDF Content
```

- ✅ Explicit "WAIT for answer" markers between questions
- ✅ Prevents Claude from asking multiple questions at once

### Skip Patterns

**Pattern Applied**:
```markdown
### Step 2: Get PDF File

**SKIP THIS STEP IF**: User provided `<pdf-file>` as argument

### Step 4: Ask About Tool Preference

**SKIP THIS STEP IF**: User provided `--tool <tool>` in arguments
```

- ✅ Explicit "SKIP THIS STEP IF" conditions
- ✅ Conditional logic clearly documented

### Conversational Questions

**Before**:
```
1. Does your PDF contain mostly: a text b images c tables
```
❌ Interrogative/form-like

**After**:
```markdown
Based on analyzing your PDF, I recommend:

📊 PDF Content Type: [type]
🔧 Recommended Tool: [tool]

Why this tool:
[Explanation]

Would you like to use the recommended tool, or do you have a preference?

1. ✅ Use recommended tool
2. 🔧 Choose a different tool
3. ℹ️  Tell me more about the tools

Your choice? [1/2/3]
```
✅ Conversational with context and examples

### Argument Parsing

**Pattern Applied**:
```markdown
### Step 1: Parse Arguments (If Provided)

**Pattern 1**: `/generate-markdown-from-pdf <pdf-file> --tool <tool> -o <output>`
**Pattern 2**: `/generate-markdown-from-pdf <pdf-file>`
**Pattern 3**: `/generate-markdown-from-pdf` (no arguments)

**Argument Validation**:
- If PDF file doesn't exist, ask user
- If tool not installed, offer alternatives
- All arguments optional - always works in interactive mode
```

- ✅ All argument patterns documented
- ✅ Validation included
- ✅ Fallback to interactive mode

## Module 3: Token Management - ✅ Applied

### Write Tool Usage

**Before**:
No file writing instructions - content would be displayed

**After**:
```markdown
### Step 11: Deliver

**CRITICAL: Manage Output Tokens to Prevent Overflow**

**Token Management Rules**:
1. **Write files using Write tool** - Don't output markdown contents
2. **Show brief confirmations only** - "✅ Created: filename (X lines)"
3. **Keep total output under 5000 tokens** - Brief summaries only
```

- ✅ Explicit token management rules
- ✅ Write tool usage documented
- ✅ 5000 token budget specified

### Brief Confirmations

**Pattern Applied**:
```markdown
✅ PDF to Markdown Conversion Complete

**Files Created**:
- [output-filename] ([line-count] lines) - Converted markdown

**Conversion Details**:
- Source: [pdf-filename]
- Tool used: [tool-name]
- Extraction quality: [percentage]%

**Content Summary**:
- Headings: [count]
- Paragraphs: [count]
- Images: [count]
```

**Token cost**: ~150-250 tokens

- ✅ Structured delivery template
- ✅ No full content display
- ✅ Metrics and summary only

### What NOT to Do

**Pattern Applied**:
```markdown
**What NOT to do**:
- ❌ Don't show full markdown content in response
- ❌ Don't output the entire converted file

**What TO do**:
- ✅ Write file using Write tool
- ✅ Show brief confirmation
- ✅ Keep output concise (under 5000 tokens)
```

- ✅ Explicit examples of wrong approaches
- ✅ Clear guidance on correct approaches

## Module 4: Quality Gates and Validation - ✅ Applied

### Inline Quality Checks

**Pattern Applied**:
```markdown
### Step 10: Final Quality Check (Inline)

**The generated markdown is already in context — check it directly.**

**Must fix before delivering (fix silently, note in delivery summary)**:

| Check | Rule |
|---|---|
| Heading levels | Proper markdown heading hierarchy |
| Link format | Use `[text](url)` format |
| Image paths | Valid image references |
| Table format | Proper markdown table syntax |
| Code blocks | Use triple backticks |
| Encoding | No garbled characters |
| PDF artifacts | No page numbers, headers, footers |
```

- ✅ Inline validation (no agent spawning)
- ✅ Content already in context
- ✅ Checklist format

### Auto-Fix Pattern

**Pattern Applied**:
```markdown
**Auto-fix common issues**:
- Fix malformed headings
- Clean up excessive whitespace
- Normalize link formats
- Fix table alignment
- Remove PDF artifacts

**In delivery summary**:
**Auto-corrections Applied**:
- Fixed [n] malformed headings
- Normalized [n] link formats
- Removed [n] PDF artifacts
```

- ✅ Silent auto-fix
- ✅ Document corrections in delivery
- ✅ User gets corrected content immediately

### Content-Type Specific Rules

**Pattern Applied**:
```markdown
See `@generate-markdown-from-pdf/references/markdown-quality-rules.md` for complete quality standards.
```

- ✅ Markdown-specific validation rules
- ✅ Externalized to reference file
- ✅ Complete with examples

## Module 5: Reference Materials and Templates - ✅ Applied

### Reference Files Created

**Directory Structure**:
```
.agents/skills/generate-markdown-from-pdf/
├── skill.md                              # Main skill file
└── references/
    ├── conversion-commands.md            # Tool-specific commands
    └── markdown-quality-rules.md         # Quality standards
```

### Reference File Usage

**Pattern Applied**:
```markdown
See `@generate-markdown-from-pdf/references/conversion-commands.md` for complete command reference and advanced options.

See `@generate-markdown-from-pdf/references/markdown-quality-rules.md` for complete quality standards and examples.
```

- ✅ Relative paths with namespace prefix
- ✅ Detailed content externalized
- ✅ Main skill stays focused

### Reference File Contents

**conversion-commands.md**:
- Pandoc commands (basic, advanced, GitHub-flavored)
- Docling Python scripts (basic, tables, images)
- PDF2MD commands
- Post-processing commands
- Tool comparison matrix
- Troubleshooting commands

**markdown-quality-rules.md**:
- Heading structure rules
- Link format rules
- Image reference rules
- Table format rules
- Code block rules
- List formatting rules
- Auto-fix patterns

- ✅ Comprehensive examples
- ✅ Correct/incorrect patterns
- ✅ Reusable across skills

## Module 6: Real-World Examples - ✅ Patterns Used

### From showroom-create-lab

**Applied**:
- ✅ Sequential workflow structure
- ✅ "What You'll Need Before Starting" section
- ✅ Arguments with fallback to interactive
- ✅ SKIP THIS STEP IF patterns
- ✅ WAIT for answer markers
- ✅ Token management in delivery
- ✅ Inline quality gates

### From showroom-create-demo

**Applied**:
- ✅ Conversational question format
- ✅ Examples in questions
- ✅ Context explanation ("Why this matters")
- ✅ Reference file usage

### From showroom-blog-generate

**Applied**:
- ✅ Platform-specific formatting
- ✅ Source traceability
- ✅ Content-type quality gates

## Module 7: Best Practices - ✅ Applied

### Best Practice 1: Sequential Over Simultaneous

✅ **Applied**: All questions asked one at a time with WAIT markers

### Best Practice 2: Write Files, Don't Display Them

✅ **Applied**: Step 11 uses Write tool with brief confirmations

### Best Practice 3: Inline Quality Gates

✅ **Applied**: Step 10 checks content already in context

### Best Practice 4: Conversational Questions

✅ **Applied**: Questions include context, examples, friendly tone

### Best Practice 5: Explicit Skip Logic

✅ **Applied**: "SKIP THIS STEP IF" used throughout

### Best Practice 6: Reference External Files

✅ **Applied**: Two reference files created and referenced

### Best Practice 7: Auto-Fix with Documentation

✅ **Applied**: Silent fixes with corrections noted in delivery

### Best Practice 8: Structured Delivery Messages

✅ **Applied**: Template with Files Created, Details, Summary, Next Steps

### Best Practice 9: Handle Edge Cases Gracefully

✅ **Applied**: 
- File not found → ask for correct path
- Tool not installed → show installation or choose different tool
- Conversion fails → offer alternatives
- Password-protected PDF → inform and provide solution

### Best Practice 10: Support Both Modes

✅ **Applied**: Arguments for speed, interactive mode always works

## Anti-Patterns Avoided

### ❌ Anti-Pattern 1: Asking Everything Upfront
**Avoided**: Questions now asked sequentially

### ❌ Anti-Pattern 2: Displaying Generated Files
**Avoided**: Use Write tool, show brief confirmation only

### ❌ Anti-Pattern 3: Spawning Validation Agents
**Avoided**: Inline validation in Step 10

### ❌ Anti-Pattern 4: Vague Instructions
**Avoided**: Specific, actionable steps with clear commands

### ❌ Anti-Pattern 5: Missing Skip Conditions
**Avoided**: Explicit "SKIP THIS STEP IF" throughout

### ❌ Anti-Pattern 6: Requiring Perfect Inputs
**Avoided**: Validation with fallbacks and alternatives

### ❌ Anti-Pattern 7: Embedding Large Examples
**Avoided**: Examples in reference files

### ❌ Anti-Pattern 8: No Token Budget
**Avoided**: Explicit <5000 token limit in Step 11

### ❌ Anti-Pattern 9: Hardcoding Values
**Avoided**: All paths and values are user-provided or detected

### ❌ Anti-Pattern 10: Silent Failures
**Avoided**: Clear error messages and fallback options

## Summary: Complete Transformation

### Before (Your Draft)
- ❌ Asking all questions at once
- ❌ No workflow structure
- ❌ Instructional content for user
- ❌ No token management
- ❌ No quality gates
- ❌ No argument support
- ❌ Incorrect model name

### After (Course Patterns Applied)
- ✅ Sequential questioning with WAIT markers
- ✅ 12-step structured workflow
- ✅ Instructions for Claude
- ✅ Token management (<5000 tokens)
- ✅ Inline quality gates with auto-fix
- ✅ Full argument support
- ✅ Reference files for detailed content
- ✅ Correct frontmatter and naming
- ✅ Edge case handling
- ✅ Conversational tone
- ✅ All course patterns applied

## Files Generated

1. **skill.md** (main skill) - 400+ lines, production-ready
2. **references/conversion-commands.md** - Complete command reference
3. **references/markdown-quality-rules.md** - Quality standards with examples
4. **COURSE-PATTERNS-APPLIED.md** (this file) - Documentation of patterns used

## Result

Your skill is now a **production-quality Claude skill** following all patterns from the course. It can be invoked with:

```bash
/generate-markdown-from-pdf
/generate-markdown-from-pdf whitepaper.pdf
/generate-markdown-from-pdf whitepaper.pdf --tool docling -o output.md
```

And will provide an excellent user experience with:
- Clear sequential workflow
- Helpful guidance
- Quality output
- Token-efficient delivery
- Graceful error handling
