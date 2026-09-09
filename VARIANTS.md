# Capital Career Club hero variants

## Open the studio

Run:

```bash
npm run studio
```

Then open [http://localhost:3210/variants](http://localhost:3210/variants).

The studio shows all seven complete landing pages. Select a direction in the left rail, switch
between desktop and mobile, or use **Present** for a clean stakeholder walkthrough. The address bar
keeps the selected ID, so `/variants?v=second-shift` can be bookmarked and referenced in Codex.

## Edit a variant with Codex

All hero content and review statuses live in:

`components/variants/hero-variants.ts`

Useful prompts:

- “Edit the `second-shift` hero. Make the lede shorter without changing the headline.”
- “Show `/variants?v=no-interviews` and tighten the mobile hero.”
- “Mark `value-first` approved and `career-progression` in review.”
- “Create a new headline option from `hours-and-access`, keeping its layout and qualifiers.”

The shared renderer is `components/variants/HeroVariant.tsx`. Change it only when every variant using
that layout should change. The remainder of the landing page is composed once in
`components/variants/LandingPage.tsx`.

## Permanent local routes

| ID | Route | Purpose |
|---|---|---|
| `baseline` | `/` | Original homepage baseline |
| `value-first` | `/value-first` | Existing value-first version |
| `no-interviews` | `/variants/no-interviews` | Active-search pain |
| `career-progression` | `/variants/career-progression` | Employed and stalled |
| `second-shift` | `/variants/second-shift` | Time and workload |
| `interview-conversion` | `/variants/interview-conversion` | Interviews without offers |
| `hours-and-access` | `/variants/hours-and-access` | Founder value proposition |

## Local version history

This project uses local Git only. Before a stakeholder session, create a checkpoint with a concise
message. No remote is configured, and testimonial screenshots plus the offer PDF are intentionally
excluded from version history.
