# Phase 5 Agentic Pipeline Test Page

**URL**: `http://localhost:3000/test-agentic`

---

## 🎯 Purpose

This test page demonstrates the complete Phase 5 agentic pipeline with real-time streaming visualization of all events, including the new memory learning insights.

---

## ✨ Features

### 1. Real-Time SSE Streaming
- ✅ All event types supported
- ✅ Progress tracking (0-100%)
- ✅ Stage-by-stage visualization
- ✅ Live event logs

### 2. Memory Learning Display (NEW!)
- ✅ Research cache status (30x faster!)
- ✅ Content learning (from 3 presentations)
- ✅ Design learning (from 2 designs)
- ✅ Review learning (from 2-5 reviews)
- ✅ Editor learning (from 2 presentations)
- ✅ Total presentations analyzed

### 3. Event Monitoring
All SSE events are captured and displayed:
- `status` - Progress updates
- `thinking_chunk` - AI reasoning
- `thinking_complete` - Phase completion
- `memory_learn` - Learning metrics (NEW!)
- `slide_start` - Slide generation begins
- `slide_complete` - Slide ready
- `artifact` - File saved
- `done` - Job complete
- `error` - Error occurred

### 4. Visual Components
- 📊 Progress bar with stage indicators
- 💭 AI reasoning display
- 🧠 Memory learning card (NEW!)
- 📋 Real-time event logs
- 📦 Artifact list with download links
- 📄 Slide preview
- 🎉 Completion statistics

---

## 🚀 How to Use

### Step 1: Start Backend

```bash
cd backend

# Ensure agentic pipeline is enabled
export USE_AGENTIC_PIPELINE=true

# Start server
python3 main.py
```

### Step 2: Start Frontend

```bash
cd frontend

# Install dependencies (if needed)
npm install

# Start dev server
npm run dev
```

### Step 3: Open Test Page

Navigate to: `http://localhost:3000/test-agentic`

### Step 4: Generate Presentation

1. Enter a prompt (default: "Create a presentation about AI in education with 5 slides")
2. Click "🚀 Generate with Agentic Pipeline"
3. Watch the real-time streaming:
   - Progress bar updates (0-100%)
   - Stage transitions (Research → Content → Design → Review → Edit → etc.)
   - AI reasoning displayed
   - Memory learning insights shown
   - Slides generated
   - Artifacts saved
   - Completion stats displayed

---

## 📊 What You'll See

### During Generation

**Progress Tracking:**
```
🔍 research (15%) - Gathering information...
✨ Research cached (30x faster!)

📝 content (25%) - Writing presentation content...
✅ Learned structure from 3 presentations

🎨 design (45%) - Applying visual design...
✅ Learned colors from 2 proven designs

🔍 review (60%) - Quality assurance review...
✅ Learned quality from 5 excellent presentations

✍️ edit (75%) - Final polish and improvements...
✅ Learned editing from 2 presentations

🖼️ html (88%) - Rendering presentation...
💾 finalize (95%) - Finalizing artifacts...
```

**Memory Learning Summary:**
```
🧠 AI Learning Summary
─────────────────────
✨ Research cached (30x faster!)
📝 Learned structure from 3 presentations
🎨 Learned colors from 2 proven designs
🔍 Learned quality from 5 excellent presentations
✍️ Learned editing from 2 presentations
─────────────────────
Total: 12 presentations analyzed
```

**Event Logs:**
```
[14:23:45] STATUS: 📊 research (5%): Starting intelligent research...
[14:23:46] THINKING: 💭 🔍 Conducting fresh research...
[14:23:48] STATUS: 📊 content (20%): Writing presentation content...
[14:23:49] THINKING: 💭 📝 Analyzing past successful presentations...
[14:23:50] THINKING: 💭 ✅ Learned structure from 3 high-quality presentations
[14:23:52] SLIDE: 📄 Slide 1/5 started
[14:23:53] SLIDE: ✅ Slide 1 complete
...
[14:24:15] MEMORY_LEARN: 🧠 Memory Learning Summary
[14:24:16] ARTIFACT: 📦 Artifact: html (25600 bytes)
[14:24:17] ARTIFACT: 📦 Artifact: pptx (102400 bytes)
[14:24:18] DONE: 🎉 Complete! Duration: 33.2s
```

### After Completion

**Completion Stats:**
```
🎉 Generation Complete!
Duration: 33.2s
Files Generated: 4
✓ index.html
✓ presentation.pptx
✓ meta.json
✓ export.zip
```

**Artifacts:**
```
📦 Artifacts (4)
HTML     25.0 KB    [Download]
PPTX    100.0 KB    [Download]
JSON      2.5 KB    [Download]
ZIP     128.0 KB    [Download]
```

**Slides:**
```
📄 Slides (5)
Slide 1: <!DOCTYPE html><html>...
Slide 2: <!DOCTYPE html><html>...
Slide 3: <!DOCTYPE html><html>...
Slide 4: <!DOCTYPE html><html>...
Slide 5: <!DOCTYPE html><html>...
```

---

## 🎨 UI Layout

```
┌─────────────────────────────────────────────────────────┐
│  🚀 Phase 5 Agentic Pipeline Test                       │
│  Test the complete 5-agent intelligent system...        │
├─────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────┐ │
│  │ Presentation Prompt                                │ │
│  │ ┌─────────────────────────────────────────────┐   │ │
│  │ │ Create a presentation about AI in education │   │ │
│  │ │ with 5 slides                                │   │ │
│  │ └─────────────────────────────────────────────┘   │ │
│  │ [🚀 Generate with Agentic Pipeline] [⏹️ Stop]     │ │
│  └───────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────┐ │
│  │ 🔍 research                             45%        │ │
│  │ ████████████████████░░░░░░░░░░░░░░░░░░░░░░░░      │ │
│  │ Writing presentation content...                   │ │
│  └───────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────────────┬──────────────────────────┐  │
│  │ LEFT COLUMN          │ RIGHT COLUMN             │  │
│  ├──────────────────────┼──────────────────────────┤  │
│  │ 🧠 AI Learning       │ 🎉 Generation Complete!  │  │
│  │ Summary              │                          │  │
│  │ ─────────────────    │ Duration: 33.2s          │  │
│  │ ✨ Research cached   │ Files: 4                 │  │
│  │ 📝 Learned from 3    │ ─────────────────        │  │
│  │ 🎨 Learned from 2    │ ✓ index.html             │  │
│  │ 🔍 Learned from 5    │ ✓ presentation.pptx      │  │
│  │ ✍️ Learned from 2    │ ✓ meta.json              │  │
│  │ ─────────────────    │ ✓ export.zip             │  │
│  │ Total: 12            │                          │  │
│  ├──────────────────────┼──────────────────────────┤  │
│  │ 💭 AI Reasoning      │ 📦 Artifacts (4)         │  │
│  │ ─────────────────    │ ─────────────────        │  │
│  │ • Research...        │ HTML   [Download]        │  │
│  │ • Content...         │ PPTX   [Download]        │  │
│  │ • Design...          │ JSON   [Download]        │  │
│  ├──────────────────────┤ ZIP    [Download]        │  │
│  │ 📋 Event Logs (125)  ├──────────────────────────┤  │
│  │ ─────────────────    │ 📄 Slides (5)            │  │
│  │ [14:23:45] STATUS    │ ─────────────────        │  │
│  │ [14:23:46] THINKING  │ Slide 1: <!DOCTYPE...    │  │
│  │ [14:23:48] STATUS    │ Slide 2: <!DOCTYPE...    │  │
│  │ ...                  │ Slide 3: <!DOCTYPE...    │  │
│  └──────────────────────┴──────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 🧪 Testing Scenarios

### 1. First Run (No Memory)
- All `learned_from` should be 0
- `research_cached` should be false
- Fresh research conducted

### 2. Subsequent Runs (With Memory)
- Some `learned_from` counts > 0
- `research_cached` may be true
- Faster execution with cache hits

### 3. Cache Hit Scenario
- `research_cached` = true
- "✨ Research cached (30x faster!)" badge
- Significant time savings

### 4. High Learning Scenario
- `total_presentations_used` > 10
- Multiple agents showing learning
- Trust-building visualization

### 5. Error Scenario
- Error event displayed
- Graceful failure handling
- Clear error message

---

## 🔧 Customization

### Change Prompt
Edit the default prompt in the textarea:
```typescript
const [prompt, setPrompt] = useState('Your custom prompt here');
```

### Adjust Log Retention
Modify to show more/fewer thinking chunks:
```typescript
{thinkingContent.slice(-10).map(...)}  // Last 10 chunks
```

### Add Custom Event Handlers
Add new event listeners in `handleGenerate()`:
```typescript
eventSource.addEventListener('custom_event', (e) => {
  // Handle custom event
});
```

---

## 📊 Metrics Tracked

### Pipeline Performance
- ✅ Total duration (seconds)
- ✅ Progress percentage (0-100%)
- ✅ Current stage
- ✅ Event count

### Learning Metrics
- ✅ Research cache hit/miss
- ✅ Content examples used
- ✅ Designer examples used
- ✅ Reviewer examples used
- ✅ Editor examples used
- ✅ Total presentations analyzed

### Output Metrics
- ✅ Slides generated
- ✅ Artifacts created
- ✅ File sizes
- ✅ Files available for download

---

## 🐛 Troubleshooting

### Backend Not Running
```bash
cd backend
python3 main.py
# Check: http://localhost:8000/docs
```

### Frontend Not Running
```bash
cd frontend
npm run dev
# Check: http://localhost:3000
```

### CORS Errors
Ensure backend CORS settings include frontend URL:
```python
# In backend/config.py
CORS_ORIGINS=http://localhost:3000
```

### No Memory Learning
Check that agentic pipeline is enabled:
```bash
# In backend/.env
USE_AGENTIC_PIPELINE=true
AGENTIC_ENABLE_MEMORY=true
```

### SSE Connection Issues
- Check browser console for errors
- Verify stream URL in logs
- Ensure no proxy blocking SSE

---

## 📚 Related Documentation

- **Phase 5 Complete**: `/docs/PHASE5_COMPLETE.md`
- **Agentic Pipeline**: `/docs/PHASE5_AGENTIC_PIPELINE.md`
- **Frontend Integration**: `/docs/FRONTEND_INTEGRATION_PHASE5.md`
- **Quick Reference**: `/docs/QUICK_REFERENCE_PHASE5.md`

---

## 🎉 Success Indicators

### Page Working When:
- ✅ Progress bar animates smoothly
- ✅ Event logs update in real-time
- ✅ Memory learning card appears
- ✅ All stages complete (0-100%)
- ✅ Artifacts downloadable
- ✅ Completion stats displayed

---

**Status**: ✅ Ready to Test  
**URL**: `http://localhost:3000/test-agentic`  
**Requirements**: Backend on port 8000, Frontend on port 3000

🚀 **Start Testing the Intelligent System!**
