# FastTrack

A private, open source intermittent fasting tracker that runs in the browser and installs like an app on iPhone, Android and laptops. No account, no server: all data stays on your device.

Live app: https://pino10.github.io/FastTrack/

- iPhone: open in Safari, tap Share, then Add to Home Screen.
- Android: open in Chrome, tap the menu, then Install app.

## What it does
- **Quick setup:** a few straight questions (weight, height, age, goal, experience, activity, sleep) and it recommends a plan, with the reasons, plus calorie, protein and water targets. You can pick any other plan.
- **Every protocol:** 12:12, 14:10, 16:8, 18:6, 20:4, OMAD, 5:2, alternate day, 24 hour and 36 hour fasts, and a custom window. Each has who it suits, tips and cautions.
- **Day by day schedule:** use one plan every day, a different plan on chosen weekdays, or ease in week by week. Change any single day, or a run of days, from the next 30 day list. Reminders can be exported to your calendar.
- **Timer:** a tick dial with the body stages you move through, editable start and end times, and a prompt when you eat during a fast.
- **Meals and water:** search millions of foods (Open Food Facts), type a barcode or scan it, pick from quick foods including common Ghanaian dishes, or enter your own. Daily calories, protein, carbs and fat against your targets.
- **Progress:** streaks, weekly hours, a five week heat map, weight chart with goal line, energy check-ins and achievements.
- **Your data:** saved on the device, backup and restore as a file, CSV export.

## Privacy and safety
Everything is stored in your browser. Imported backups are sanitised and a strict content security policy limits what the page can load. The only network calls are to Open Food Facts when you search for food.

FastTrack is a tracking tool, not medical advice. Fasting is not suitable for everyone, including people under 18, who are pregnant or breastfeeding, who are underweight, who have had an eating disorder, or who take medication such as insulin. Talk to a doctor first if any of that applies.

## Develop
Plain HTML, CSS and JavaScript in `web/`, no build step.
```
cd web
python3 -m http.server 8000
```
Pushes to `main` that change `web/` are published to GitHub Pages by `.github/workflows/pages.yml`.

Food data: [Open Food Facts](https://world.openfoodfacts.org), ODbL.

## Licence
MIT.


## v1.1

Light, dark and auto themes with accent colours, a 24 hour day rhythm bar, live body stage meters, favourites and copy yesterday in Eat, a Progress area with overview, calendar history, body trends and awards, a Learn library, plan comparison and pause, end early reasons, personal records, challenges and levels, earlier version snapshots, optional auto-save to a file on desktop Chrome and Edge, and one tap updates.
