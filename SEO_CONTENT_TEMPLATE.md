# Quick Reference: SEO Content Template

Use this template when adding SEO content for new tools.

---

## ✅ Pre-Writing Research (10 min)

1. **Keyword Research**
   - Google: "how to [tool action]"
   - Check "People also ask"
   - Look at competitor pages
   - Note technical terms users search for

2. **User Intent Analysis**
   - What problem are they solving?
   - What concerns do they have?
   - What alternatives are they considering?

3. **Technical Capabilities**
   - What formats are supported?
   - What are the limitations?
   - What makes this tool unique?

---

## 📝 Content Structure (30 min)

### Features Section (3 items)

**Format:**
```json
{
  "title": "Technical Feature Name",
  "description": "One sentence explaining what it does. One sentence on the benefit or technical detail."
}
```

**Guidelines:**
- Use technical terms (OCR, batch processing, resolution)
- Mention specific capabilities (formats, sizes, speeds)
- Focus on WHAT it does uniquely
- 2-3 sentences per feature

**Examples:**
✅ "Smart Page Detection - Automatically identifies logical slide breaks..."
❌ "Easy to Use - Our tool is simple and fast..."

---

### Copy Section

#### Intro (2-3 sentences)
- First sentence: What tool does + primary format
- Second sentence: Key benefit or use case
- Third sentence: Technical highlight or AI feature

**Template:**
```
Convert [FORMAT A] to [FORMAT B] [instantly/professionally/accurately]. 
Perfect for [PRIMARY USE CASE] and [SECONDARY USE CASE]. 
Our [AI/advanced/intelligent] technology [KEY TECHNICAL FEATURE].
```

#### Benefits (6 items)
- Mix of features, formats, and capabilities
- Start with action verbs when possible
- Include technical specs (DPI, file sizes, formats)
- One user concern addressed (privacy, speed, cost)

**Examples:**
- "Supports all major formats: JPG, PNG, GIF, BMP, TIFF"
- "Preserves animations and transitions with precise timing"
- "No software installation - works directly in your browser"
- "Automatic backup and recovery for large conversions"

#### Use Cases (6 items)
- Start with action verb: "Convert", "Create", "Transform", "Generate"
- Include WHO uses it (job role or industry)
- Mention specific scenario or project type
- Follow pattern: [Action] [specifics] for [use case]

**Template:**
```
[Action verb] [specific content type] for [industry/role/purpose]
```

**Examples:**
- "Convert business reports into executive presentations"
- "Create training materials from technical documentation"
- "Transform blog posts into shareable LinkedIn decks"
- "Generate product catalogs for e-commerce stores"

---

### FAQ Section (6 questions)

#### Question Types:

**1. Format/Compatibility Question**
- "What formats can I convert?"
- "Do you support [specific format]?"

**Answer Template:**
- Yes/No first
- List formats or specs
- Technical details or limitations
- Best practices tip

**2. Quality/Preservation Question**
- "Will [element] be preserved?"
- "Can I maintain [quality aspect]?"

**Answer Template:**
- Address concern directly
- Explain how it works
- Mention any caveats
- Provide workaround if needed

**3. Feature Question**
- "Can I [specific action]?"
- "How does [feature] work?"

**Answer Template:**
- Confirm capability (Yes/No)
- Explain process (2-3 sentences)
- Technical detail
- Additional context

**4. Limitation Question**
- "What's the maximum [size/count/length]?"
- "Are there any restrictions?"

**Answer Template:**
- State free tier limit
- State pro tier limit
- Explain reasoning
- Suggest workaround

**5. Editing/Post-conversion Question**
- "Can I edit after conversion?"
- "How do I [modify something]?"

**Answer Template:**
- Confirm editability
- List what can be changed
- Mention tools that work
- Suggest workflow

**6. Technical/Advanced Question**
- "How are [complex elements] handled?"
- "What happens to [edge case]?"

**Answer Template:**
- Explain technical approach
- List options if multiple methods
- Set expectations honestly
- Provide alternative if limitation exists

---

## 🎯 SEO Checklist

### Keyword Integration
- [ ] Primary keyword in intro (1-2 times)
- [ ] Primary keyword in at least 1 feature title
- [ ] 2-3 secondary keywords in benefits
- [ ] Long-tail keywords in FAQs (natural questions)
- [ ] Technical terms throughout (not forced)
- [ ] Keyword density: 1-2% (natural, not stuffed)

### Content Quality
- [ ] 600+ words total
- [ ] No duplicate content from other tools
- [ ] Specific examples (not generic)
- [ ] Technical credibility (specs, formats, capabilities)
- [ ] Honest about limitations
- [ ] Professional tone

### User Experience
- [ ] Clear value proposition in intro
- [ ] Scannable format (lists, short paragraphs)
- [ ] Addresses main user concerns in FAQ
- [ ] Includes industry-specific examples
- [ ] Provides actionable information
- [ ] Call-to-action implied (but not pushy)

### Technical SEO
- [ ] Proper JSON structure
- [ ] No trailing commas
- [ ] Quotes escaped properly
- [ ] Tool slug matches conversions.csv exactly
- [ ] Content under 1000 words per section (readability)

---

## 💡 Writing Tips

### Do:
✅ Use active voice: "Converts PDFs" not "PDFs are converted"
✅ Be specific: "300 DPI" not "high quality"
✅ Include numbers: "up to 100 images" not "many images"
✅ Address concerns: "No quality loss" not "good output"
✅ Technical terms: "OCR", "batch processing", "resolution"
✅ Real scenarios: "Create training manuals" not "for business"

### Don't:
❌ Marketing fluff: "best", "revolutionary", "amazing"
❌ Vague claims: "fast", "easy", "simple" without context
❌ Duplicate content: copying from other tools
❌ Keyword stuffing: forcing keyword 10+ times
❌ False promises: "perfect conversion" (be honest)
❌ Generic examples: "for presentations" (be specific)

---

## 📊 Quality Benchmarks

### Minimum Requirements:
- 600+ words total content
- 3 unique features
- 6 specific benefits
- 6 detailed use cases
- 6 comprehensive FAQs (50+ words each)
- 10+ unique keywords
- 3+ industry-specific examples

### Excellence Standards:
- 700+ words total content
- Technical specs in features
- Mix of feature/format/user benefits
- Job roles in use cases
- FAQs address search queries
- 20+ unique keywords
- 5+ industry examples

---

## 🔍 Validation Steps

Before submitting:

1. **JSON Validation**
   ```bash
   node -e "JSON.parse(require('fs').readFileSync('content/tool-content.json', 'utf8'))"
   ```

2. **Uniqueness Check**
   - Search for duplicate phrases across tools
   - Ensure features aren't generic
   - Verify FAQs are tool-specific

3. **Keyword Check**
   - Primary keyword appears 3-5 times
   - Technical terms included
   - Natural language (not forced)

4. **User Test**
   - Does intro explain the tool clearly?
   - Would benefits convince you to try it?
   - Do FAQs answer your questions?

5. **Competitor Comparison**
   - More detailed than competitors?
   - Addresses concerns they don't?
   - Better technical credibility?

---

## 📈 Success Metrics to Track

After 30 days, check:

- [ ] Google Search Console impressions (new keywords?)
- [ ] Average position (improving?)
- [ ] Click-through rate (higher than others?)
- [ ] Time on page (reading content?)
- [ ] Conversion rate (better than generic tools?)
- [ ] Bounce rate (engaging enough?)

---

## 🎯 Priority Tools to Optimize Next

Based on traffic and competition:

**High Priority (do first):**
1. pdf-to-word (high search volume)
2. word-to-pdf (common conversion)
3. jpg-to-pdf (image category)
4. png-to-pdf (image category)
5. powerpoint-to-jpeg (export format)

**Medium Priority:**
6. google-slides-to-powerpoint
7. keynote-to-powerpoint
8. csv-to-excel
9. txt-to-pdf
10. markdown-to-pdf

**Low Priority (less traffic but good to have):**
11-20. Other specialized conversions

---

## 📚 Resources

**Keyword Research:**
- Google Autocomplete
- Google "People also ask"
- Google "Related searches"
- Answer the Public (free queries)

**Content Ideas:**
- Competitor pages (what they cover)
- Reddit/Quora (real user questions)
- Support tickets (common issues)
- Google Search Console (queries you rank for)

**Writing Quality:**
- Hemingway Editor (readability)
- Grammarly (grammar check)
- Word Counter (length check)
- JSON Lint (validation)

---

**Time Investment:** 45-60 minutes per tool
**SEO Impact:** Visible in 2-4 weeks, full effect in 3-6 months
**ROI:** Each well-optimized tool page = 100-500 visitors/month

---

Happy optimizing! 🚀
