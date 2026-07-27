# TaxFlow — Demo Script

Live: https://tax-platform-kappa.vercel.app
Repo: https://github.com/Venkat450/tax-platform

Total runtime: ~8–10 minutes. Every step below is a real interaction against
real (fabricated) data — nothing is a static screenshot.

---

## 0. Setup (10 sec)

Open the live URL. You land on `/` — a landing page, not the dashboard.

**Say:** "Instead of dropping straight into a tool with no context, this
explains what it is first."

---

## 1. The landing page (60 sec)

- Point at the headline: **"The AI doesn't get the final word."** — this is
  the thesis the rest of the demo proves.
- Click **"Why only 76%?"** on the K-1 card on the right.
  - It expands to show: the actual source document excerpt (highlighted raw
    text), the AI's reasoning, and two alternative readings it considered
    (40% vs 50% vs 100% ownership).
  - **Say:** "This isn't a mockup — it's real interaction, and it's a
    genuinely ambiguous field, not an easy 98% case. The AI is admitting
    uncertainty, which is the point."
- Scroll to **"One return, four hands"** — the workflow map.
  - **Say:** "Instead of a generic list of personas, this is the actual
    pipeline a return moves through." Point at the four connected stages.
- Scroll to **"What happens when you click a field"** — the four-step sequence.
  - **Say:** "This is a preview of literally what you're about to do."
- Click **"Enter as a CPA"**.

---

## 2. Dashboard as Alex Chen, CPA (45 sec)

- Point at the **stat tiles** (colored icon chips — Total Returns, In
  Progress, Needs Attention, Open Threads).
- Point at the **"Do These First"** section.
  - **Say:** "This leads with what needs a decision, not just numbers."
- Click the **violet showcase banner** — "Sarah Mitchell has AI-extracted
  fields awaiting your review." This takes you straight into the return's
  Fields tab.

---

## 3. Source traceability & the AI decision workflow (2–3 min — the core of the demo)

You're now in Sarah Mitchell's 1040, Fields tab.

- Point at the **Field State Reference** legend (8 states, each with a real
  icon — no emoji).
- Expand the **Business Income** section, click the **K-1 field** (76%
  confidence, violet "AI Extracted" badge).
- In the side panel, walk through top to bottom:
  - **Source Document** → the K-1 excerpt, with the raw value highlighted
    and labeled specifically (not just "Box 1" — the real line description).
  - **AI Confidence** → click **"Why this confidence?"** → the same
    reasoning + alternative-values pattern from the landing page, now in
    the real app.
  - Scroll to the **Actions** at the bottom.
- **Demonstrate a permission boundary:** point out there's no "Approve"
  button here for a CPA — only Verify/Reject/Override/Ask. Then:
- Click into the **Deductions** section → the **mortgage interest field**
  (amber "Needs Approval" badge, 89% confidence).
  - **Say:** "This one needs a senior reviewer to sign off — a CPA
    literally cannot do it. Watch what happens if I switch roles."
  - Open the role switcher (bottom-left avatar) → **switch to Jordan Lee,
    Reviewer**.
  - Navigate back to this same field (breadcrumbs still show you're on
    Sarah Mitchell's return) → now the **"Approve This Field"** button is
    there. Click it → toast confirms → **click "Undo"** on the toast to
    revert it live.
- Switch back to **Alex Chen (CPA)**. Select the ambiguous K-1 field again
  → click **"Override Value"** → type a corrected value and a reason (note
  the textarea is already focused) → **Save Override**.
  - Point at the field: it now shows the "AI Corrected" badge and the
    override appears in **Correction History** with who/when/why.
- Click **"Reject"** on any `ai_generated` field instead, to show the
  alternate path — type a reason, confirm, and note the red "Rejected"
  badge and the required-reason enforcement.

---

## 4. Evidence you can actually open (30 sec)

- Switch to the **Documents** tab.
- Click any document row (not just look at it — click it).
  - **Say:** "Documents used to be a dead list — you could see them but not
    open one. Now clicking shows exactly which return field uses it, with
    a link back."

---

## 5. Contextual collaboration (45 sec)

- Switch to the **Messages** tab.
- Point at the **Client owns / CPA owns** badges and the linked
  field/document chips at the top of a thread.
- Toggle **"Internal only"** vs **"Client-visible"** on the compose box —
  point out internal notes render with dark styling so they're visually
  unmistakable.
- Send a message, then click **"Mark Resolved"** on the thread.
- Back on a field, click **"Ask a Question"** — show it creates a new
  thread linked to that exact field and jumps you to it.

---

## 6. Role-scoped everything (45 sec)

- Switch role to **Sarah Mitchell (Client)**.
- **Say:** "She only sees her own return, not the firm's book of business."
- Go to Dashboard → point at **"We need something from you"** — pulled
  directly from her open threads, nothing generic.
- Open the same K-1 field she was ambiguous about → point out she sees the
  same evidence, but only an **"Ask a Question"** button — none of the
  CPA/reviewer decision buttons.

---

## 7. Cross-return surfaces (45 sec)

Switch back to **Alex Chen (CPA)**.

- **AI Review Queue** (sidebar) → point out it's every reviewable field
  across every return, prioritized (rejected → needs-approval → lowest
  confidence first), with the identical evidence panel — select a few via
  checkbox and show **bulk Verify**.
- **Tasks** → point out blockers, clarifications, and AI-review items
  unified in one filterable list, each owner-labeled.
- **Settings** → the **Roles & Permissions matrix** — point out it's
  generated from the same `permissionsFor()` function that gates the real
  buttons, not a separately maintained table that could drift out of sync.
- **Reports** → real numbers computed from the actual mock data (stage
  distribution, confidence distribution, correction/rejection rate) — no
  fake chart data.

---

## 8. Power-user details (30 sec, optional)

- Press **⌘K / Ctrl+K** anywhere → search returns by client name.
- Press **?** → keyboard shortcuts reference.
- On the Returns list, apply a filter, then **refresh the browser** —
  filters, sort, and page survive because they're in the URL.
- Refresh directly on `/returns/ret-2024-mitchell` (not from `/`) — it
  loads correctly, which is a real SPA routing detail most demos skip.

---

## Closing line

"Everything here is fabricated data, but nothing is fabricated behavior —
every button does what it claims, every permission is actually enforced,
and every AI value is one click from its source."
