# TaxFlow — Detailed Demo Walkthrough

Live: https://tax-platform-kappa.vercel.app
Repo: https://github.com/Venkat450/tax-platform

This is the long-form version — every screen, every field, exact data
values, verbatim narration, and the reasoning behind each design choice.
For a fast 8-minute pass, see the "Quick Path" callouts marked ⚡ throughout;
skipping to just those gives you the short version.

**Runtime: ~20–25 minutes for the full walkthrough, ~8–10 minutes for the ⚡ quick path.**

---

## Table of Contents

1. [Before You Start](#1-before-you-start)
2. [The Landing Page](#2-the-landing-page)
3. [Dashboard as Alex Chen (CPA)](#3-dashboard-as-alex-chen-cpa)
4. [Return Detail — Fields Tab (the core demo)](#4-return-detail--fields-tab-the-core-demo)
5. [Return Detail — Documents Tab](#5-return-detail--documents-tab)
6. [Return Detail — Messages Tab](#6-return-detail--messages-tab)
7. [Walking Through All Six Roles](#7-walking-through-all-six-roles)
8. [AI Review Queue](#8-ai-review-queue)
9. [Tasks Page](#9-tasks-page)
10. [Reports Page](#10-reports-page)
11. [Settings — Roles & Permissions](#11-settings--roles--permissions)
12. [Power-User Features](#12-power-user-features)
13. [Edge Cases Checklist](#13-edge-cases-checklist)
14. [Anticipated Questions](#14-anticipated-questions)
15. [Appendix: Exact Mock Data Reference](#15-appendix-exact-mock-data-reference)

---

## 1. Before You Start

Open https://tax-platform-kappa.vercel.app in a clean browser tab (private/incognito
avoids any leftover role state from a prior session, since role selection is stored
in React state, not persisted — a refresh always resets to the landing page cleanly).

Keep this table open in a second window — you'll switch between these six identities
throughout the demo:

| Role | Name | One-line identity | What's different about them |
|---|---|---|---|
| CPA | Alex Chen | Preparer on most returns | Can verify/override/reject, cannot sign off `needs_approval` |
| Reviewer | Jordan Lee | Senior reviewer | Only role (with Admin) that can sign off flagged fields |
| Admin | Morgan Wu | Firm administrator | Sees every return, every preparer, firm-wide |
| Client | Sarah Mitchell | The taxpayer | Sees only her own return, read-only fields, "Ask a Question" only |
| Business Owner | David Kim | Entity return owner | Client-side permissions, but for a business (1120S) return |
| Seasonal Staff | Taylor Kim | Limited-permission preparer | Scoped to their own assigned returns only, no override/reject |

---

## 2. The Landing Page

**URL:** `/`

### 2.1 The hero
- Headline: **"The AI doesn't get the final word."**
- Subhead names the four pillars this whole app is built to prove: evidence,
  confidence, permission, reversibility.
- **Say:** *"Every claim shows its evidence, its confidence, and who's actually
  allowed to accept it — and every decision can be undone. That sentence is
  the spec for the entire rest of the demo."*

### 2.2 ⚡ The live interactive demo (don't skip this one)
- On the right, there's a real component card: **"AI Extracted"** badge,
  **"Ordinary business income — Schedule K-1"**, value **$18,500**, an amber
  confidence bar at **76%**.
- Click **"Why only 76%?"**. It expands in place (no page navigation) to reveal:
  1. **The actual source document excerpt** — "Straight from the document —
     Schedule K-1 — Mitchell Family LLC" with the raw K-1 text and the exact
     value highlighted in yellow.
  2. **The AI's reasoning**, verbatim: *"K-1 not yet fully reviewed... AI
     applied 40% ownership... but ownership % is unconfirmed with client."*
  3. **Two alternative readings** it considered: $46,250 (if 100% ownership)
     and $23,125 (if 50% ownership) — each with its own confidence score.
  4. A closing line: *"This is why a preparer can verify a clean extraction,
     but only a senior reviewer can sign off one like this."* — this is
     foreshadowing Part 4.
- **Say:** *"This is real React state, not a screenshot or a video loop. I
  deliberately chose a field the AI is genuinely unsure about, not an easy
  98% case — a trust story about AI is only convincing when the AI is
  willing to admit it doesn't know something."*

### 2.3 The workflow map — "One return, four hands"
- Four connected cards: **Client → CPA → Reviewer → Admin**, each numbered,
  each with a one-line description of what that stage does.
- Below them, two more cards in a dashed border: **Business Owner** and
  **Seasonal Staff** — labeled as side-branches rather than a fifth/sixth
  step, because they parallel Client and CPA respectively rather than
  extending the pipeline.
- **Say:** *"Instead of a generic team page with headshots, this is the
  actual information architecture of the product — click any stage and you
  enter the app exactly there, as that person."*
- (Optional) Click **"CPA"** here instead of the button in the hero — same
  destination, demonstrates the map is functional, not decorative.

### 2.4 "What happens when you click a field" — the four-step sequence
- **01 See the evidence** → **02 Judge the confidence** → **03 Decide, within
  your role** → **04 Leave a trail**.
- **Say:** *"This numbered sequence is a preview — everything you're about
  to watch me do in the real app follows exactly these four steps, in this
  order, every time."*

### 2.5 The footer disclaimer
- Point it out explicitly: *"Every name, figure, document, and AI output
  above is fabricated."* — **Say:** *"Worth reading aloud once, since
  everything from here on will look and sound like a real accounting firm."*

---

## 3. Dashboard as Alex Chen (CPA)

**URL:** `/dashboard` (land here after clicking "Enter as a CPA" or "Start reviewing")

### 3.1 Stat tiles
Four tiles, each a colored icon chip + a big number:
- **Total Returns** (slate) — count of all returns firm-wide (this role sees everything except... actually CPA sees all returns, not scoped down — point out Admin/CPA/Reviewer all see the full book, only Client/Business Owner/Seasonal Staff are scoped down)
- **In Progress** (indigo)
- **Needs Attention** (amber)
- **Open Threads** (slate, or red if there are overdue/critical items)

**Say:** *"These aren't decorative — every number here is computed live from
the same shared data store the rest of the app reads and writes to."*

### 3.2 "Do These First"
- A preparer-filter dropdown appears top-right of this card (only visible
  when there's more than one preparer to filter by).
- Rows show: client name, return type, stage pill, and either a blocker
  (red text) or the top open thread, each tagged **"Client owns"** (blue) or
  **"CPA owns"** (indigo).
- **Say:** *"This leads with the decision that needs to be made, not a
  vanity metric — that's a deliberate 'action over reporting' choice."*
- Click any row with a **"Client owns"** tag — it deep-links straight into
  that return's **Messages** tab, not just the return generally.

### 3.3 The showcase banner
- A violet-to-indigo gradient banner: *"Sarah Mitchell has AI-extracted
  fields awaiting your review."*
- This only appears when the showcase return (Sarah Mitchell's, the one
  with full field-level data) actually has unresolved AI fields — it's not
  hardcoded to always show.
- Click it → lands directly in **Return Detail → Fields tab** for Sarah Mitchell.

### 3.4 Recent Returns
- Below "Do These First" — same row pattern, sorted by last activity,
  excluding approved/filed returns. Click **"View all →"** to go to the
  full Returns list (covered implicitly; feel free to detour here to show
  search/filter/sort/bulk-reassign if time allows — see §13 for what to
  point out there).

---

## 4. Return Detail — Fields Tab (the core demo)

**URL:** `/returns/ret-2024-mitchell?tab=fields`

This is the single most important part of the demo. Budget the most time here.

### 4.1 The header
- Client name, return type (**1040 · 2024**), stage pill (**Corrections
  Needed**), urgency dot (**High**).
- Preparer: Alex Chen · Reviewer: Jordan Lee · Due: April 15, 2025.
- Below that, the **status pipeline** — 6 stages for CPA/Reviewer/Admin,
  collapsed to 4 for Client (point this out later in §7.4).
- Two red blocker chips: **"Missing Coinbase 1099-DA"** and **"K-1
  ownership % pending client confirmation"**.
- **Say:** *"CPAs and clients literally see different labels for the same
  stage — 'Corrections Needed' internally shows as 'Being Prepared' to the
  client, so we don't alarm someone with internal jargon."*

### 4.2 The Field State Reference legend
- Eight badges, each a real Lucide icon (not emoji) + label: AI Extracted,
  AI · Verified, Manual Entry, Client Provided, Locked, Needs Approval, AI
  Corrected, Rejected.
- **Say:** *"Every one of these renders with an actual icon component. Emoji
  characters mixed with SVG icons is one of the fastest ways an interface
  looks unfinished, so every state uses the same icon system."*

### 4.3 ⚡ Section: Income — the clean, high-confidence field
- Expand **Income**. Click **Line 1a — Wages ($85,000, AI · Verified, 98%)**.
- Source panel shows: Field Value $85,000, source doc **W-2 — Acme Corp
  2024**, the excerpt with **"Box 1 — Wages, tips, other compensation:
  $85,000.00"** highlighted, transformation note ("Strip currency symbol
  and commas → parse as integer"), confidence bar at 98%.
- **Say:** *"Notice the label isn't just 'Box 1' — it's the field's actual
  real box description, pulled from the same data that drove the
  extraction. That specificity matters when you're trying to trust a number."*
- No action buttons appear here except "Ask a Question" — because this
  field is already `ai_verified`, there's nothing left to decide.

### 4.4 ⚡ Section: Income — the corrected field
- Click **Line 3b — Ordinary dividends ($3,420, AI Corrected, 71%)**.
- Point at **Correction History**: *"$3,820 → $3,420 · Alex Chen · Excluded
  IRA dividends ($400). Retirement account distributions are not reportable
  as ordinary dividends on Schedule B."*
- Expand **"Why this confidence?"** — reasoning explains the AI summed two
  account sections on the 1099-DIV, one of which was an IRA that shouldn't
  have been included.
- Open the **document excerpt** — it shows both accounts explicitly:
  "Account 1 — Individual Brokerage" (the real one) and "Account 2 —
  Traditional IRA (excluded — not reportable on Sch. B)" — the mock
  evidence literally shows *why* the AI made the mistake and *why* the
  correction was right.
- **Say:** *"This is the audit trail requirement made concrete — who
  changed it, when, and the exact reasoning, permanently attached to the
  field."*

### 4.5 ⚡ Section: Business Income — the genuinely ambiguous field
- Expand **Business Income**. Click **Line K1-1 ($18,500, AI Extracted, 76%)**
  — the same field from the landing page demo, now live in the real app.
- Walk through identically to §2.2, but this time point out the **Actions**
  at the bottom of the panel:
  - **Verify & Accept** (emerald button) — as Alex Chen (CPA), this is
    available.
  - **Reject** (outlined red button) — also available.
  - **Override Value** (outlined button) — also available.
  - **Ask a Question** — always available to everyone.
- Click **Reject**. A modal opens (auto-focused reason textarea) — type a
  reason like *"Ownership % still needs client confirmation before I can
  accept this."* → **Confirm Reject**.
- The field now shows a red **"Rejected"** badge, and the source panel shows
  the rejection reason in a red callout box.
- **Click "Undo"** on the toast in the bottom-right corner — the field
  reverts live, in front of everyone, back to `ai_generated`.
- **Say:** *"That's a real state mutation with a real undo, not two
  separate pre-baked screens."*

### 4.6 ⚡ Section: Deductions — the permission boundary
- Expand **Deductions**. Click **Line 8a — Mortgage interest ($12,480,
  Needs Approval, 89%)**.
- Point at the amber **"Awaiting Approval"** box: *"Reviewer: Box 6 POS
  credit ($480) — confirm with client if this was a seller-paid buydown..."*
- Point out the **document excerpt** shows Box 6 explicitly: "Points / POS
  credit: $480.00" — the evidence for *why* it's flagged is visible, not
  just asserted.
- **Critical moment:** point out there is **no "Approve" button** — only
  Reject, Override, Ask. Read the italic note if it's showing: *"Only a
  senior reviewer or admin can sign off on this field."*
- **Say:** *"This is the permission model doing real work. Alex Chen is a
  competent CPA, but the interface will not let him sign off a field that
  policy says needs a second set of eyes — regardless of how confident he
  is personally."*
- **Now switch roles** (bottom-left avatar → Switch Role → **Jordan Lee,
  Senior Reviewer**) and land back on `/dashboard`.
- Use **⌘K** (or the search icon) → type "Mitchell" → open her return →
  Fields tab → Deductions → the same mortgage interest field.
- **Now "Approve This Field" is visible.** Click it → toast confirms →
  field badge changes to **"AI · Verified"**.
- **Say:** *"Same field, same data, different role — and the UI enforces
  it. It's not a filter over the same button; the sign-off action simply
  does not exist in the DOM for a CPA."*

### 4.7 The remaining two fields (quick mentions)
- **Line 12a — Charitable contributions ($2,800, Client Provided)** — no
  source document; panel explains *"Value entered by client in their
  questionnaire."*
- **Line 17 — Total tax ($11,842, Locked)** — panel explains *"Calculated
  field — derived from lines 1–16."* No action buttons at all except Ask,
  since it can never be edited directly by anyone.
- **Say:** *"Client-provided and locked fields are read-only for a reason,
  and the copy explains why instead of just disabling a button silently."*

---

## 5. Return Detail — Documents Tab

**URL:** same return, click the **Documents** tab

- Five documents listed: W-2 (reviewed), 1099-INT (reviewed), 1098
  (flagged, with the $480 POS credit note visible inline), 1099-DIV
  (reviewed), Schedule K-1 (pending review).
- **Click the 1098 document.** A modal opens showing:
  - Metadata: type, page count, upload date/by.
  - The flag note repeated at the top.
  - **"Used for Line 8a · Mortgage interest paid"** with a **"View field →"**
    link, and the actual document excerpt below it.
- Click **"View field"** — the modal closes and you land back on that exact
  field in the Fields tab.
- **Say:** *"This used to be a dead list — you could see a document existed
  but never open it. Now every document tells you exactly which field uses
  it, and you can jump straight there."*
- (Optional) Click a document with no linked field to show the empty state:
  *"No return field references this document yet."*

---

## 6. Return Detail — Messages Tab

**URL:** same return, click the **Messages** tab

### 6.1 Thread selector
- Three threads as horizontally-scrollable cards: **K-1 ownership
  percentage** (high priority, red dot, "Client owns"), **Missing: Coinbase
  1099-DA** (high priority, "Client owns"), **Mortgage interest — POS
  credit** (normal priority, "CPA owns").

### 6.2 The K-1 thread
- Click it. Point out the linked-context bar at top: *"Verify ownership
  stake in Mitchell Family LLC"* with a **"View linked field"** link (jumps
  to the K-1 field) and nothing for a document link on this one (it's also
  linked to the K-1 doc — click that too if present).
- Toggle **"Showing internal"** off — the internal note between Alex and
  himself about the 40%/50%/100% ownership math disappears; only the
  client-visible exchange remains (Alex asking, Sarah confirming 40%).
- Toggle it back on — internal notes render with dark slate styling,
  visually unmistakable from client-facing messages.
- **Say:** *"A single toggle, not a separate internal-notes system —
  and the two message types are never visually ambiguous."*

### 6.3 Compose and resolve
- Type a message, press **Enter** to send (Shift+Enter for a newline —
  point this out, it's a small but real detail).
- Click **"Mark Resolved"** — the thread badge changes to green
  **"Resolved"**, and any open-request badges on its messages flip to
  resolved too. Click it again to reopen, demonstrating it's reversible.

### 6.4 Ask a Question from a field
- Go back to the Fields tab, select any field, click **"Ask a Question"**
  in the source panel.
- It creates a brand-new thread — pre-filled with a question referencing
  the exact field/line — and jumps you straight to it in Messages.
- **Say:** *"This didn't exist as a hardcoded thread — it's generated live,
  linked to the field you were just looking at."*

---

## 7. Walking Through All Six Roles

Use the role switcher (bottom-left avatar in the sidebar) for all of these.
For each, land on `/dashboard` first, then optionally drill into a return.

### 7.1 Alex Chen — CPA *(already covered above)*
Nav: Dashboard, Returns, Tasks, AI Review, Messages, Reports, Clients, Settings.
Notice the **"My Personal Return"** link near the bottom of the sidebar nav
— Alex has his own 1040 in the system too (`ret-2024-alex-chen`), a
dual-role demo: the same person is both a preparer *and* a client
elsewhere in the firm.

### 7.2 Jordan Lee — Senior Reviewer
Nav label changes: Dashboard becomes **"Review Queue"**, Returns becomes
**"All Returns"**, Clients becomes **"Team"**.
- Dashboard subtitle: *"Returns and fields awaiting your sign-off."*
- This is the only role (besides Admin) that can click **"Approve This
  Field"** — demonstrated already in §4.6.

### 7.3 Morgan Wu — Firm Administrator
Nav label: Dashboard becomes **"Firm Overview"**, Clients becomes
**"Users & Roles"**, Settings becomes **"Firm Settings"**.
- Dashboard subtitle: *"Firm-wide activity across all preparers."*
- Same full data visibility as CPA/Reviewer, plus can also sign off
  `needs_approval` fields (same permission tier as Reviewer).

### 7.4 Sarah Mitchell — Client
Nav shrinks to: My Return, Documents, Tasks, Messages, Settings — no AI
Review Queue, no Reports, no Clients.
- Dashboard title: **"My Return"**. Stat tiles simplify (no urgency-based
  red tile logic shown to her).
- The **"We need something from you"** panel — pulled from her own open
  threads where she owns the next action (K-1 ownership question, missing
  Coinbase 1099-DA).
- Go to her return: the **status pipeline collapses to 4 stages** instead
  of 6 (Submitting Info → Being Prepared → Your Review → Complete) — point
  out "Corrections Needed" (internal) reads as "Being Prepared" to her.
- Open the K-1 field: **only "Ask a Question" is available** — no Verify,
  Approve, Reject, or Override buttons exist for this role at all.
- Try the **Returns list** (labeled "My Documents" for her) — she only
  sees her own return, not the firm's other 180+ returns.

### 7.5 David Kim — Business Owner (1120S)
Nav: My Entities, Returns, Tasks, Messages, Settings.
- Same permission tier as Client (`canVerify`/`canSignOff`/`canOverride`/
  `canReject` all false) but framed around an entity return instead of a
  personal one.
- **Say:** *"Business Owner and Client are functionally the same
  permission tier — the difference is entirely about framing and scope,
  which is why the landing page groups them as parallel branches, not
  separate pipeline stages."*

### 7.6 Taylor Kim — Seasonal Staff (Limited)
Nav: My Workload, My Returns, Tasks, AI Review, Messages — no Reports, no
Settings shown in nav.
- Go to **Returns** ("My Returns") — scoped to only the returns where
  Taylor Kim is the preparer, not the full firm book.
- Open the **AI Review Queue** — Taylor can still see evidence and click
  **Verify & Accept** on a clean `ai_generated` field (this role does have
  `canVerify`), but has **no Override or Reject button anywhere** —
  `canOverride`/`canReject` are both false for this role.
- **Say:** *"'Limited' isn't just a subtitle — a seasonal preparer can
  confirm an obvious extraction is correct, but cannot make a judgment
  call to override or reject one. That's a deliberate, real permission
  boundary, not a cosmetic label."*

---

## 8. AI Review Queue

**URL:** `/ai-review` (as Alex Chen, CPA)

- Left column: every reviewable field across every return you can see,
  sorted by risk — **Rejected → Needs Approval → lowest AI confidence
  first**. Each row shows the return's client name, so you can tell at a
  glance which return you're about to act on.
- Filters at top: **state** (all/rejected/needs-approval/AI-extracted),
  **confidence band** (low/medium/high), and **which return** (only shown
  once there's more than one return with reviewable fields).
- Click a row → the exact same source panel from §4 renders on the right
  — same component, same evidence, same actions.
- Click **"Skip to next"** or take an action (Verify/Approve/Reject/
  Override) — it automatically advances to the next item in the filtered
  queue.
- Select 2+ checkboxes on eligible rows (only `ai_generated` or
  `needs_approval` items show a checkbox, and only if your role has the
  matching permission) → a toolbar appears → **"Verify 2"** or **"Approve 2"**
  → confirms both at once with a single toast.
- **Say:** *"This isn't a second copy of the review logic — it's the same
  `SourcePanel`, `OverrideModal`, and `RejectModal` components imported
  directly from the return detail page. Fix a bug in one place, it's fixed
  in both."*

---

## 9. Tasks Page

**URL:** `/tasks`

- Unifies three kinds of open items across every return you can see:
  **Blockers** (red), **Clarifications** (blue, from open threads), **AI
  Review** items (violet, from needs-approval/rejected fields).
- Each row is owner-tagged (**Client owns** / **CPA owns**) and links
  straight to the right context — a blocker opens the return, a
  clarification opens Messages, an AI-review item opens the exact field.
- Filter by type or by **"Assigned to me"** (which maps to `cpa` for
  CPA/Admin/Seasonal Staff and `client` for Client/Business Owner).
- **Say:** *"This is the answer to 'do I need a whole separate Tasks
  feature' — no, because everything here is just a different lens on data
  that already exists elsewhere; nothing is duplicated or newly invented."*

---

## 10. Reports Page

**URL:** `/reports`

- Three stat tiles: **Avg. AI Confidence**, **Correction Rate**, **Rejection
  Rate** — all computed live from actual field states across returns with
  real field data (mostly Sarah Mitchell's and Alex Chen's personal
  returns, since the other ~180 generated returns don't have field-level
  detail — a note under the tiles says this explicitly).
- **Returns by Stage** and **Returns by Priority** — simple horizontal bar
  rows with counts and percentages, using the same color language as
  everywhere else in the app (no new palette introduced just for charts).
- **AI Confidence Distribution** — how many fields fall into
  high/medium/low confidence bands.
- **Say:** *"No fake chart data — if I approve or reject a field in the AI
  Review Queue right now and come back to this page, these numbers move."*
  (Demonstrate this if time allows: approve a field, revisit Reports, show
  the correction/rejection rate has changed.)

---

## 11. Settings — Roles & Permissions

**URL:** `/settings`

- **"What you can do as [Role]"** — a live summary grid for whoever's
  currently logged in.
- **The full Roles & Permissions matrix** — every action (Verify, Approve/
  Sign-off, Override, Reject, Ask) against every one of the six roles, with
  green checks and gray X's. The current role's column is highlighted.
- **Say:** *"This table isn't hand-maintained data that could drift out of
  sync — it calls the exact same `permissionsFor()` function that gates the
  real buttons on the field-review screens. If I change that function,
  both this table and the actual enforcement update together, by
  construction."*
- Below that: Notification Preferences (working toggles — click one, watch
  it slide and change color) and a link to the **Interaction Reference**
  page (`/affordances`), which documents all 8 field states and the visual
  rules behind them in one place.

---

## 12. Power-User Features

- **⌘K / Ctrl+K** (or `/`, or the header search icon) anywhere in the app
  → a command palette scoped to whatever the current role can see → search
  "Mitchell" or "1065" → Enter to jump straight to a return.
- **?** → a keyboard shortcuts reference modal (⌘1–5 for nav, Esc to close
  dialogs).
- **Every modal closes on Escape and on backdrop click** — Override,
  Reject, Document Viewer, Command Palette all behave consistently.
- On the **Returns list**: apply a search term, a stage filter, and a sort
  order, then **hit refresh** — all three survive, because they live in the
  URL query string, not just component state.
- Navigate directly to `/returns/ret-2024-mitchell` by typing the URL (not
  clicking through) — it loads correctly. **Say:** *"This sounds trivial,
  but a client-side-routed app deployed as a static site needs an explicit
  rewrite rule for this to work at all — it's a real deployment detail,
  not a given."*

---

## 13. Edge Cases Checklist

Work these in wherever they fit naturally, or as a rapid-fire closing pass:

- [ ] **Low-confidence extraction** — the K-1 field, 76% (§2.2, §4.5)
- [ ] **Conflicting/ambiguous source** — same K-1 field's alternative
      values (40%/50%/100% ownership readings)
- [ ] **Missing document** — the "Missing Coinbase 1099-DA" blocker has no
      linked document at all; visit the Documents tab to show it renders
      as a distinct dashed-border "Missing document" row with a "Request
      from client" button, not just a silent gap
- [ ] **Locked field** — Line 17, Total tax (§4.7)
- [ ] **Corrected AI value** — Line 3b, dividends (§4.4)
- [ ] **Client action required** — the K-1 ownership thread, "Client owns"
- [ ] **Reviewer action required** — the mortgage interest field,
      needs_approval (§4.6)
- [ ] **Blocked return** — the return's stage is `corrections_needed` with
      two active blockers shown as red chips in the header

---

## 14. Anticipated Questions

**"Is any of this real AI?"**
No — confidence scores, reasoning text, and alternative readings are
authored mock data. The point being demonstrated is the *interaction
pattern* for trustworthy AI review, not a working extraction model.

**"Does data actually persist?"**
Within a session, yes — approvals, overrides, rejections, and messages are
real state mutations in a shared React context (`ReturnsDataContext`), so
acting on a field in the AI Review Queue is immediately reflected on the
return detail page, the Dashboard, and Reports. Refreshing the page resets
to the original mock data, since there's no backend.

**"Why doesn't every return have full field data?"**
~180 of the ~200 returns are bulk-generated for volume (to make search/
filter/sort/pagination on the Returns list meaningful) but only carry
metadata (stage, urgency, blockers) — building full field-level detail for
all of them wasn't necessary to prove the interaction patterns, and Sarah
Mitchell's and Alex Chen's returns already do that job.

**"Why no Reports/Settings in the client's nav, but Tasks is there?"**
Reports and full Settings are firm-internal concerns. Tasks — reframed as
"things we need from you" — is directly relevant to a client, so it stays.

**"What wasn't built, and why?"**
Real authentication, a standalone cross-return document browser (each
return's own Documents tab already covers this), compliance report
generation, and offline handling — all called out explicitly in the
README's "Beyond the 10 challenges" section as deliberate scope decisions,
not oversights.

---

## 15. Appendix: Exact Mock Data Reference

### Sarah Mitchell's return (`ret-2024-mitchell`) — 1040, 2024
Stage: Corrections Needed · Urgency: High · Preparer: Alex Chen · Reviewer:
Jordan Lee · Due: April 15, 2025

| Line | Label | Value | State | Confidence | Source |
|---|---|---|---|---|---|
| 1a | Wages, salaries, tips | $85,000 | AI · Verified | 98% | W-2 — Acme Corp |
| 2b | Taxable interest | $1,240 | AI Extracted | 94% | 1099-INT — Chase Bank |
| 3b | Ordinary dividends | $3,420 | AI Corrected | 71% | 1099-DIV — Fidelity |
| 8a | Mortgage interest paid | $12,480 | Needs Approval | 89% | 1098 — Wells Fargo |
| 12a | Charitable contributions | $2,800 | Client Provided | — | none |
| 17 | Total tax (calculated) | $11,842 | Locked | — | none |
| K1-1 | Ordinary business income | $18,500 | AI Extracted | 76% | Schedule K-1 — Mitchell Family LLC |

Blockers: *Missing Coinbase 1099-DA* · *K-1 ownership % pending client confirmation*

Threads: K-1 ownership % (high priority, client owns) · Missing Coinbase
1099-DA (high priority, client owns) · Mortgage interest POS credit
(normal priority, CPA owns)

### Alex Chen's personal return (`ret-2024-alex-chen`) — 1040, 2024
Stage: Under Review · Preparer: Morgan Wu · Reviewer: Jordan Lee · Amount
due: $2,840

| Line | Label | Value | State | Confidence |
|---|---|---|---|---|
| 1a | Wages, salaries, tips | $142,000 | AI · Verified | 99% |
| 3b | Ordinary dividends | $4,800 | AI Extracted | 96% |
| 17 | Total tax (calculated) | $32,410 | Locked | — |

### The Six Roles

| Role | Name | canVerify | canSignOff | canOverride | canReject | canAsk |
|---|---|---|---|---|---|---|
| CPA | Alex Chen | ✅ | ❌ | ✅ | ✅ | ✅ |
| Reviewer | Jordan Lee | ✅ | ✅ | ✅ | ✅ | ✅ |
| Admin | Morgan Wu | ✅ | ✅ | ✅ | ✅ | ✅ |
| Client | Sarah Mitchell | ❌ | ❌ | ❌ | ❌ | ✅ |
| Business Owner | David Kim | ❌ | ❌ | ❌ | ❌ | ✅ |
| Seasonal Staff | Taylor Kim | ✅ | ❌ | ❌ | ❌ | ✅ |

---

## Closing Line

*"Everything here is fabricated data, but nothing is fabricated behavior —
every button does what it claims, every permission is actually enforced,
and every AI value is one click from its source."*
