# PRD — Muzdoo

> A personal, phone-friendly wishlist / bucket-list app for capturing everything you want
> to do, buy, read, watch, hear, eat, and experience — and checking it off when you do.
>
> Status: **v1 design agreed** (via a grilling session). Single-author, local-first.
>
> 📋 Build order lives in [PLAN.md](./PLAN.md) — this PRD is the *what/why*, the plan is the *in-what-order*.

---

## Problem Statement

I constantly come across things I want in the future — a product to buy, a place to travel to,
a book to read, a film to watch, an album to hear, a restaurant to eat at, an event to go to.
Right now these wants are scattered across my head, screenshots, notes apps, and open browser tabs.
They get forgotten, and I never get the satisfaction of seeing them done.

I want one place to **capture a want in two seconds on my phone**, browse what I've saved by
category, and **check things off** as I do them — keeping the completed ones as a record of
what I've achieved.

## Solution

A single-user, phone-friendly **web app** that runs on my device and stores its data **locally on
that device** (no login, no server, no cloud — for v1). I add an item with a title and a category,
optionally a note, link, location, and photo. I can filter by category and search. When I complete
an item I check it off; it leaves the active list and moves to a **Done** view so the active list
stays clean while my accomplishments accumulate.

Categories are a **fixed set of eight verbs**, chosen so that capture is fast and unambiguous:

| Category | Means | Example |
|----------|-------|---------|
| **Buy** | A thing to purchase | "Aesop hand wash" |
| **Go** | A travel destination | "Lisbon" |
| **Read** | A book | "Project Hail Mary" |
| **Watch** | A film or show | "The Bear S3" |
| **Listen** | Recorded music — artist/album | "Khruangbin – Mordechai" |
| **Consume** | All food & drink | "Ichiran ramen, Tokyo" |
| **Experience** | An event or activity (incl. concerts, art, exhibitions) | "Radiohead live" |
| **Other** | Anything that doesn't fit | — |

Disambiguation rule agreed during design: **the recording is _Listen_; the live event is _Experience_.**
A restaurant is **Consume** (you're there for the food); a concert is **Experience** (you're there for the event);
a city you'd travel to is **Go**.

## User Stories

**Capturing**
1. As a user, I want to add an item with just a **title** and a **category**, so that saving a want takes ~2 seconds.
2. As a user, I want to optionally add a **note** to an item, so that I can remember *why* I wanted it.
3. As a user, I want to optionally paste a **link** onto an item, so that I can jump back to the source page later.
4. As a user, I want to optionally type a **location** as free text (e.g. "Lisbon"), so that place-based items have context.
5. As a user, I want to optionally attach **one photo** to an item, so that I can recognise it visually.
6. As a user, I want each item to record the **date it was added** automatically, so that I can see how long it's been on my list.
7. As a user, I want the **add form to default to fast**: title + category required, everything else clearly optional and skippable.

**Browsing & finding**
8. As a user, I want to see all my **active (not-yet-done)** items in one list, so that I know what's outstanding.
9. As a user, I want to **filter by category** (tap "Read" → only my books), so that I can focus on one kind of want.
10. As a user, I want to **search by text** across titles (and notes/location), so that I can find a specific item fast.
11. As a user, I want each item in the list to clearly show its **category** and any **photo/location**, so that the list is scannable.

**Completing**
12. As a user, I want to **check an item off** when I've done it, so that I get the satisfaction of completing it.
13. As a user, I want a checked-off item to **leave the active list**, so that my active list stays clean.
14. As a user, I want a separate **Done** view listing everything I've completed, so that I can enjoy seeing my accomplishments.
15. As a user, I want to be able to **un-complete** an item (move it back to active), so that mistakes are reversible.

**Editing & removing**
16. As a user, I want to **edit** an existing item (fix a typo, add a note later), so that my list stays accurate.
17. As a user, I want to **delete** an item I no longer want, so that I can prune the list.

**Persistence**
18. As a user, I want my items to **still be there when I reopen the app** on the same device, so that the list is durable without a login.

**Importing in bulk**
19. As a user, I want to **paste a list of lines** (one item per line) and **pick a single category** for the whole batch, so that I can seed many items at once (e.g. 20 places I already want to go).
20. As a user, I want **each pasted line to become its own item** with that title and category (note/link/location/photo left blank to fill in later), so that imported items behave exactly like manually-added ones.
21. As a user, I want **blank lines ignored** and to see a **count of how many items were imported**, so that I trust the import did what I expected.

## Implementation Decisions

- **App type:** A single-page, **phone-friendly web app**. Mobile-first layout; usable in a phone browser. Not a native App Store app.
- **Audience & accounts:** **Single user, no authentication.** The app belongs to whoever has the device. No accounts in v1.
- **Persistence:** Data stored **locally on the device** via the browser. Plain text fields are small and fit comfortably; this avoids any server or database for v1.
  - **Open technical note (photos):** Photos are large and basic browser local storage is small (a few MB). For v1, photos are **optional and expected to be few**. The concrete storage mechanism for images (e.g. IndexedDB rather than `localStorage`, or a size/count cap with compression) is a known decision to resolve at build time. "Where photos live properly" is fully addressed when cloud sync arrives in v2.
- **Data model — one unified item.** Every category shares the same shape. Fields:
  - `title` (required, text)
  - `category` (required, one of the 8 fixed values)
  - `note` (optional, text)
  - `link` (optional, URL stored as plain text / tappable link — **not** scraped or auto-filled)
  - `location` (optional, **free text** — e.g. "Lisbon"; no map coordinates, no geocoding in v1)
  - `photo` (optional, single image)
  - `done` (boolean, default false)
  - `dateAdded` (timestamp, set automatically)
- **Categories** are a **fixed, code-defined list** of 8: Buy, Go, Read, Watch, Listen, Consume, Experience, Other. No user-defined / custom categories in v1.
- **Capture is manual.** No link auto-fill / metadata scraping, no barcode scanning, no share-sheet integration. Pasting a link just stores the link.
- **Completion model:** a `done` flag toggled by a checkbox. Active view shows `done === false`; Done view shows `done === true`. Toggling is reversible.
- **Finding:** client-side **category filter** + **text search**. No tags, no advanced sort in v1.
- **Bulk import (v1):** a **paste-a-list** flow. The user pastes plain text (one item per line) and selects **one category for the whole batch**. On import, each non-blank line becomes a separate item — `title` = the line, `category` = the chosen batch category, all other fields blank, `dateAdded` set, `done` false. Blank lines are skipped; the user is shown a count of items created. **No file upload, no CSV parsing, no per-row categories** in v1 — it's a text-box paste, nothing more.

### Suggested build approach (for a beginner — recommendation, not a hard requirement)
- Build with **plain HTML, CSS, and JavaScript** as a single page. No framework, no build tools, nothing to install. This keeps the whole project understandable and removes setup friction. A framework (React/etc.) can come later if the app outgrows plain JS.

## Testing Decisions

- A good test checks **external behaviour the user can observe**, not internal wiring. Test *"adding an item then reloading shows it in the list,"* not *"the save function was called."*
- Behaviours worth covering once the core works:
  - Adding an item with only title + category creates a visible active item.
  - A completed item disappears from Active and appears in Done; un-completing reverses it.
  - Category filter shows only items of that category.
  - Search matches items by title (and note/location).
  - Items persist across a reload of the same device.
  - Pasting three lines with a chosen category creates three separate items in that category; blank lines are ignored.
- **Prior art:** none yet — this is a greenfield project. Testing can start as simple manual checks against the user stories above; automated tests are a "nice to add once the app is stable" item, not a v1 gate, given the developer is learning.

## Out of Scope

Explicitly **not** in v1 (deliberately deferred to keep the project finishable):

- **Distance / "closest-to-furthest" sorting**, map coordinates, geocoding, or live-location features. (This is the planned **v2** headline feature and is a substantial build of its own — it needs turning typed place names into map points via an external map service, plus device location and distance math.)
- **Cloud sync / multi-device** access. v1 is local to one device. (Graduating to this is the other major v2 theme and is what unlocks proper photo storage and, if ever wanted, login.)
- **User accounts / authentication.**
- **Custom / user-created categories**, tags, or favourites.
- **File / CSV / spreadsheet import** and **per-row categories**. v1 import is paste-text-only with one category per batch; richer file import is a *maybe-later* upgrade.
- **Link auto-fill / metadata scraping**, barcode scanning, share-sheet "Add to Muzdoo" from other apps.
- **Reminders / nudges / notifications.**
- A **memory-bank / review-and-rate** experience (this app is forward-looking wants, not a log of past experiences).

## Further Notes

- **v1 = "the weekend version":** add an item → see the active list → filter by category → search → check things off → see them in the Done view → reopen later and it's all still there. That is a complete, usable app. Resist adding to it until that loop works end-to-end.
- **Natural growth path after v1:** (a) optional category-specific fields if "Other" gets overloaded or a field is genuinely missed; (b) **v2** cloud sync + multi-device, which also solves robust photo storage; (c) the location *text* field is intentionally a stepping-stone toward the **v2** distance-sort feature — the data it captures ("Lisbon") is exactly what a future geocoder would consume.
- **App name:** Muzdoo.
