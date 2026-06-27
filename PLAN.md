# Build Plan — Muzdoo

> The execution order for [PRD.md](./PRD.md). The PRD says **what** and **why**;
> this says **in what order** and **how you'll know each step works**.
>
> **Golden rule:** every phase ends with an app you can open and use. No phase
> leaves you half-finished. Build the spine first, add limbs one at a time.

---

## How to read this plan

Each phase has:
- **Goal** — the one sentence describing what this phase is for.
- **You can now…** — what becomes possible that wasn't before (the payoff).
- **Build** — the concrete pieces, and which PRD user stories (US#) they satisfy.
- **Done when** — how you *prove* it works before moving on.
- **Why here** — why this phase sits in this spot in the order.

Do the phases **in order**. Don't start a phase until the previous one's "Done when" is true.
If you run low on time or motivation, **stopping after any completed phase still leaves a working app** —
that's the whole point of slicing it this way.

---

## Phase 0 — Skeleton that opens *(½ hour)*

**Goal:** Get a single web page opening in a browser — on your computer *and* your phone — before any features exist.

**You can now…** open the app and see its title. Nothing works yet, and that's correct.

**Build:**
- One `index.html` file with a mobile-friendly viewport, a heading (the app name), and an empty area where the list will go.
- A little CSS so it doesn't look broken on a phone screen.

**Done when:**
- The page opens in your computer's browser.
- It also opens and looks sensible on your phone's browser (even if that just means opening the file, or running a tiny local server — we'll sort the easiest way when we build).

**Why here:** You want to confirm the *plumbing* (a page that loads on a phone) before piling features on top. Beginners who skip this discover layout/phone problems much later, when they're harder to untangle.

---

## Phase 1 — Capture & keep *(the spine)*

**Goal:** Add an item, see it in a list, and have it still be there after you close and reopen the app.

**You can now…** actually use a basic Muzdoo list. This is the smallest *real* version.

**Build:**
- The 8 fixed categories baked in: **Buy · Go · Read · Watch · Listen · Consume · Experience · Other**.
- An **add form**: a title box + a category picker. Submit → a new item appears in the list. *(US 1, 7)*
- Each item stores `title`, `category`, `dateAdded`, and `done` (always false for now). *(US 6)*
- The list renders all items, each clearly showing its **category**. *(US 8, 11)*
- **Save to the device** (browser local storage) and reload from it on open, so data survives a refresh/close. *(US 18)*
- **Delete** an item. *(US 17)*

**Done when:**
- You add "Lisbon / Go" and it appears in the list.
- You refresh the page (or reopen it) and Lisbon is still there.
- You delete an item and it's gone after refresh too.

**Why here:** Add → show → persist is the heartbeat. Every other feature decorates this loop, so it must be rock-solid first. Delete is included now because you *will* make typos in minute one, and not being able to remove them is maddening.

> **Teaching note:** "local storage" = a small box the browser keeps for your site on *this* device. Free, no server, no login — but it's per-device, which is exactly why multi-device sync is a v2 thing.

---

## Phase 2 — Do it & check it off

**Goal:** Mark an item complete; completed items leave the active list and live in a **Done** view.

**You can now…** get the bucket-list payoff — tick things off and watch your accomplishments pile up.

**Build:**
- A **checkbox / "Done" button** on each item that flips its `done` flag. *(US 12)*
- The main list shows only **active** (not-done) items. *(US 13)*
- A separate **Done view/tab** listing completed items. *(US 14)*
- Ability to **un-complete** (send an item back to active). *(US 15)*

**Done when:**
- Checking off "Lisbon" removes it from Active and shows it under Done.
- Un-checking it in Done returns it to Active.
- Both states survive a reload.

**Why here:** Completion is the emotional core of a *bucket* list, and it only needs the Phase 1 data model plus one flag — small, high-reward, low-risk. Worth banking early.

---

## Phase 3 — Find your stuff

**Goal:** Filter by category and search by text, so the list stays usable past ~20 items.

**You can now…** tap "Read" to see only books, or type "ramen" to jump straight to it.

**Build:**
- **Category filter:** tap a category → list shows only that category. *(US 9)*
- **Text search:** a search box that matches item titles (and notes/location once those exist). *(US 10)*

**Done when:**
- Filtering by "Go" shows only Go items.
- Typing part of a title narrows the list live.
- Filter + search work on both the Active and Done views (or at least Active).

**Why here:** Finding only *matters* once you have a pile of items, which is why it comes after capture and completion — not before. It's also self-contained, so it won't disturb the working core.

---

## Phase 4 — Richer items & editing

**Goal:** Let an item carry optional context, and let you fix/expand an item after creating it.

**You can now…** add a note ("birthday gift idea"), a link, and a location, and correct items later.

**Build:**
- Optional **note** field. *(US 2)*
- Optional **link** field (stored as a plain tappable link — *no* scraping). *(US 3)*
- Optional **location** as free text, e.g. "Lisbon". *(US 4)*
- **Edit** an existing item (change any field). *(US 16)*
- List/detail shows note, link, and location when present. *(US 11)*

**Done when:**
- You can add a note + link + location to an item and see them.
- You can edit an item and the change persists across reload.
- Empty optional fields simply don't show.

**Why here:** These hang off the existing item shape, so they're a clean add once the core loop, completion, and finding all work. Editing belongs here because by now there's enough on an item that fixing one matters. **Location is deliberately *text only*** — it's the stepping-stone toward the v2 distance feature, but with none of that complexity yet.

---

## Phase 5 — Bulk import (paste a list)

**Goal:** Seed many items at once by pasting a list and choosing one category for the batch.

**You can now…** dump 20 places you already know you want to go, in one go, instead of typing them one by one.

**Build:**
- An **import box**: a big text area + a single category picker. *(US 19)*
- On import, **each non-blank line becomes its own item** with that title and the chosen category; other fields blank, `dateAdded` set, `done` false. *(US 20)*
- **Blank lines ignored**; show a **count** of how many items were created. *(US 21)*

**Done when:**
- Pasting three lines under "Go" creates three separate Go items.
- A blank line in the middle is skipped and not turned into an empty item.
- You see "Imported 3 items" (or similar) and they all persist.

**Why here:** Import *reuses* the item-creation path built in Phase 1, so it's cheap once that exists. It's placed after the core CRUD so there's nothing fragile to trip over — it's purely a convenience layered on a proven foundation.

---

## Phase 6 — Photos *(the trickiest core piece — saved for last on purpose)*

**Goal:** Optionally attach one photo to an item.

**You can now…** recognise items at a glance (the jacket, the dish, the artwork).

**Build:**
- Optional **single photo** per item, added via the phone's photo picker/camera. *(US 5)*
- Show the photo (or a thumbnail) on the item.
- **Handle storage deliberately:** because images are large and basic local storage is small (a few MB), this phase decides the real mechanism — likely **IndexedDB** instead of plain local storage, and/or a **size cap + compression**, and/or a small **limit on how many photos** you keep. (See the PRD's "open technical note" on photos.)

**Done when:**
- You can attach a photo to an item and see it after reload.
- Adding several photos doesn't silently break saving (you've picked a storage approach that holds up).

**Why here:** **Last on purpose.** Photos are the one part with a real technical risk (storage limits) that could swallow time. By the time you reach it, the entire app already works and is genuinely useful — so even if photos take a while, nothing valuable is blocked behind them.

---

## ✅ End of v1

After Phase 6 you have the **complete v1** from the PRD: capture fast, browse, find, complete, import in bulk, and attach photos — all on your phone, all stored on your device, no login or server.

## ⏭️ Deferred to v2 *(explicitly not now — see PRD "Out of Scope")*

- **Cloud sync / multi-device** access (also unlocks robust photo storage and, if ever wanted, login).
- **Distance / "closest-to-furthest" sorting** — geocoding typed locations into map points + live-location + distance math. This is a substantial feature of its own; the Phase 4 location text is its on-ramp.
- File/CSV import with per-row categories, custom categories, reminders, link auto-fill, share-sheet capture.

---

## Suggested commit rhythm *(for a beginner)*

Make a **git commit at the end of each phase** (and ideally after each "Done when" check passes within a phase). Each commit is a safe point you can return to — if a later change breaks things, you can get back to the last working app instead of being stranded. Small, frequent commits are one of the best habits to build early.
