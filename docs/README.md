# `docs/` — project documentation

## plans/

Pipeline outputs and implementation artifacts. One set per template build:

- `01-breadboard.md` — product scope, screen list, breadboard, decisions
- `02-screenboard.md` — wireframes, component breakdowns, mock data per screen
- `04-storyboard.md` — transitions between screens, frames, copy decisions
- `implementation-map.md` — screen → component mapping (written before code)
- `verification.md` — post-build audit trail (files changed, ACs, SPEC-GAPs)

## design/

Design reference docs. Supplements `.claude/rules/ui-guidelines.md` with
longer-form guidance:

- `typography.md` — type scale, landing vs app/workspace usage, font slots
- `copywriting.md` — voice, tone, copy rules (add when needed)
- `blankslates.md` — empty state patterns (add when needed)

New folders (`architecture/`, `reference/`, `runbooks/`) appear when needed.
Don't create them speculatively.
