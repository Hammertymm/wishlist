# Muzdoo

**▶️ Live app: https://hammertymm.github.io/muzdoo/**

A personal, phone-friendly wishlist / bucket-list app for capturing everything you
want to do, buy, read, watch, hear, eat, and experience — and checking it off when
you do.

Open the link above on your phone and add it to your home screen (it installs as an
app and works offline).

## What it does

- **Capture fast** — add an item with just a title and one of 8 categories
  (Buy · Go · Read · Watch · Listen · Consume · Experience · Other).
- **Add context** — optional note, link, location, and one photo per item.
- **Find** — filter by category and search across title, note, and location.
- **Complete** — tick items off; they move to a **Done** view so your active list stays clean.
- **Bulk import** — paste a list (one per line) and file them all under one category.
- **Yours, on your device** — no login, no server. Data is stored locally in the browser.

## How it's built

Plain HTML, CSS, and JavaScript in a single [index.html](index.html) — no framework,
no build step. It's a PWA (installable + offline) via [manifest.json](manifest.json)
and [sw.js](sw.js). Photos are stored in IndexedDB; everything else in local storage.

See [PRD.md](PRD.md) for the *what/why* and [PLAN.md](PLAN.md) for the build order.

## Run it locally

Any static file server works. For example, with Node installed:

```
npx serve -p 5600 .
```

Then open http://localhost:5600 in your browser.
