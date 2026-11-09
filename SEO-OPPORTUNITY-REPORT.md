# SEO Opportunity Report — Snapify vs. Sri Lanka Photo-Location Directories

Generated: 2026-11-09 · Mode: **free fallback** (no `APIFY_API_TOKEN` / `GOOSEWORKS_API_KEY`; volumes are directional, not measured)

---

## Your Content Snapshot

| Metric | Value |
| :-- | :-- |
| Indexed pages | **0** — not deployed, no sitemap, no rankings, no backlinks |
| Place pages | 23 (`/community/[slug]`) |
| Blog posts / guides | 0 |
| Topic clusters | One: free public shoot locations |
| Crawlable today | **No** — `ClientOnly` blanks server HTML; cards use `router.push`, so zero internal links |

Phase 1 of this skill assumes a live domain to catalog. Snapify has none, so the inventory above is derived from the codebase. Everything below is therefore a **greenfield gap analysis**, not a ranking comparison.

---

## Competitor Benchmarks

| Domain | Sri Lanka depth | URL structure | Model | Threat |
| :-- | :-- | :-- | :-- | :-- |
| **shothotspot.com** | **~500+** across districts (Colombo 145, Kandy 74, Galle 60, Anuradhapura 36, Jaffna 31) | `/browse/sri-lanka/{province}/{district}/hotspots/` | Algorithmic aggregation, ranked by popularity | **High** — owns the geo-hierarchy pattern |
| **locationscout.net** | 12 for Colombo alone | `/locations/{id}-{city}/spots` | Community, photographer-contributed | **Medium** — strong DA, genuine photographer audience |
| **visitsrilanka.ai** | "Complete map" | `/photo-spots-sri-lanka/` | AI-generated travel content | **Medium** — ranks on exact-match head term |
| **photohound.co** | **Only 5–6 spots** | `/country/sri-lanka/area/{area}/photo-spots` | Community contributions | **Low** — ranks on domain authority, not depth |
| Travel blogs (chasinghippoz, chrisandwren, travelermania, localgrapher, mad-traveller, tr4vel) | 1 post each | `/blog/{slug}` | Editorial listicles | **Medium in aggregate** — they crowd page 1 |

**Correction to earlier assumption:** photohound.co is *not* a deep competitor — it has 5–6 Sri Lanka spots and ranks on authority alone. shothotspot is the only real scale player, and even it is thin per-location (coordinates + a stock line, no access or permit detail).

---

## Gap Analysis

### Hard gaps — competitors cover, Snapify has nothing

| Topic | Who owns it | Intent | Priority |
| :-- | :-- | :-- | :-- |
| District-level location hubs | shothotspot (all 25 districts) | 4 | **High** |
| "Photo spots in {city}" | shothotspot, locationscout, blogs | 4 | **High** |
| Iconic-landmark pages (Nine Arch, Sigiriya, Coconut Tree Hill, Galle Fort, Seema Malaka, Red Mosque, Lotus Tower, Pettah) | Everyone | 5 | **Critical** |
| "Best time / sunrise" per location | Blogs, partially | 4 | **High** |
| National "best photo spots Sri Lanka" | visitsrilanka.ai, shothotspot | 3 | Low — **do not contest at launch** |

**Snapify's 23 places miss nearly every iconic landmark** — no Sigiriya, no Nine Arch Bridge, no Galle Fort, no Seema Malaka, no Red Mosque, no Coconut Tree Hill. These are the highest-volume entity queries in the niche. Fixing this is the single biggest content gap.

### Positioning gaps — nobody covers these well (**Snapify's moat**)

| Topic | Current state | Intent | Priority |
| :-- | :-- | :-- | :-- |
| **Permit required per location + which authority** | **Nobody.** Split across NFC, Dept. of Archaeology, Central Cultural Fund, Galle Heritage Foundation | 5 | **Critical** |
| **Drone rules per location** | Scattered travel blogs; CAASL enforcing from 2026; camera drones need registration at any weight | 5 | **Critical** |
| **Entry fees / tripod & pro-gear fees** | Fragmented (Lotus Tower ~$20 foreign; ticketed archaeological sites charge extra for tripods) | 5 | **Critical** |
| **Commercial vs. hobbyist distinction** | Nobody — all competitors are tourist-framed | 5 | **High** |
| **Studio / paid location rental** | lately.cc (hourly booking), syncshare.lk, solis.lk | 5 | **High** |
| Monsoon/season shooting guidance | Generic travel advice only | 4 | **High** |

**Every competitor is built for tourists. None serves a working photographer who needs to know whether a shoot is legal, what it costs, and whether a drone is permitted.** That is the defensible wedge.

### Informational gaps — deprioritize

Wildlife/safari photography (Yala), tea-plantation landscapes, generic "Sri Lanka itinerary" content. High volume, low fit, saturated.

---

## Top Content Opportunities (ranked)

### 1. Permit & drone guides — *the moat*
- **Targets:** "drone laws Sri Lanka", "film permit Sri Lanka", "can I fly a drone in Sigiriya", "photography permit Cultural Triangle"
- **Owner:** nobody consolidated · **Intent: 5** · **Format:** two authoritative guides + per-place fields
- **Why:** CAASL enforcement starts 2026; published NFC fees (100K feature / 75K TVC / 50K documentary LKR); Central Cultural Fund requires a separate permit per site. Genuinely useful, hard to copy, and the most quotable material for AI answer engines.
- **Caveat:** quasi-YMYL regulatory content — verify every figure against `caa.lk` and `mfa.gov.lk` before publishing; show author + last-reviewed date.

### 2. Iconic landmark pages — *the volume*
- **Targets:** "Nine Arch Bridge photography", "Sigiriya sunrise photo spot", "Coconut Tree Hill", "Galle Fort photography", "Seema Malaka"
- **Intent: 4–5** · **Format:** place pages with Snapify's access/permit depth
- **Why:** highest-volume entity queries; Snapify currently has none. Differentiate with train times (06:48 / 13:37 / 15:48 at Nine Arch), the Pidurangala-vs-Sigiriya viewpoint distinction, permit status, drone rule — detail the incumbents lack.

### 3. District hubs — *match the winning structure*
- **Target:** "photo spots in {district}" · **Owner:** shothotspot · **Intent: 4**
- **Why:** shothotspot's province → district → spots hierarchy is demonstrably working. **Adopt district level**, since Sri Lanka's 25 districts are the natural administrative tier between province and city. Requires a `district` field (see Plan §3.1).

### 4. Colombo city cluster — *the beachhead*
- **Targets:** "photo spots in Colombo", "free photoshoot locations Colombo" (note the live TikTok demand signal)
- **Intent: 4–5** · **Why:** Snapify already has 4 Colombo places and the city is the densest commercial market. Add the known gaps — Seema Malaka, Red Mosque, Pettah Market, Lotus Tower, Old Dutch Hospital.

### 5. Paid / studio locations — *commercial intent*
- **Targets:** "photo studio rental Colombo", "pre-wedding shoot locations Sri Lanka"
- **Owner:** lately.cc, syncshare.lk, solis.lk · **Intent: 5**
- **Why:** real transactional demand, already monetized by others. Study `lately.cc` — it does hourly studio booking and is the closest model to Snapify's paid phase.

### 6. Season & golden-hour — *cheap and unique*
- **Targets:** "best time to photograph Ella", "best time of year Sri Lanka photography"
- **Intent: 4** · **Why:** computable from `latlng` at near-zero cost; monsoon split (west/south unshootable May–Sept, east Nov–Feb) is decision-grade information competitors treat generically.

---

## What NOT to chase at launch

| Target | Reason |
| :-- | :-- |
| "best photo spots Sri Lanka" | Head term owned by 500-spot incumbents; unwinnable from 23 places and zero authority |
| Wildlife / safari photography | Saturated, off-positioning |
| Generic travel itineraries | Wrong audience |
| National "top 200" listicle | Directly invites the duplicate-content comparison we're avoiding |

---

## 90-Day Content Calendar

| Phase | Work | Intent | Notes |
| :-- | :-- | :-- | :-- |
| **Weeks 1–2** | Fix crawlability (Plan Phase 0) | — | **Nothing below ranks until this ships** |
| **Weeks 3–4** | Drone-laws guide + permit guide | 5 | The moat; verify against official sources |
| **Weeks 3–4** | Permit/fee/drone fields on all 23 places | 5 | Depth before breadth |
| **Weeks 5–6** | +15 iconic landmarks (Sigiriya, Nine Arch, Galle Fort, Seema Malaka, Red Mosque, Coconut Tree Hill, Pidurangala, Lotus Tower…) | 5 | Closes the biggest gap |
| **Weeks 5–6** | Colombo city hub + district hubs where ≥3 places | 4 | Beachhead |
| **Weeks 7–8** | Monsoon/season guide + golden-hour data | 4 | Cheap, unique |
| **Weeks 9–12** | OSM/Wikidata expansion to 150–200+; `/list-your-space` | 4–5 | Unlocks remaining district hubs |

---

## Revisions to the launch plan

1. **Add a `district` field** and district hubs — shothotspot proves the province → district → spot hierarchy ranks. Sri Lanka has 25 districts; this is a better middle tier than city alone.
2. **Treat iconic-landmark coverage as a launch blocker, not a nice-to-have.** Missing Sigiriya and Nine Arch Bridge means missing the niche's highest-volume entity queries.
3. **Downgrade photohound.co** from "established competitor" to low threat (5–6 spots).
4. **Add locationscout.net** as a tracked competitor (12 Colombo spots, strong DA, genuine photographer audience).
5. **Confirmed:** do not contest the national head term at launch.

---

## Method & limitations

- Ran in **free fallback mode**. No authority scores, traffic estimates, or exact volumes — `APIFY_API_TOKEN` (Semrush/Ahrefs via Apify) and `GOOSEWORKS_API_KEY` are unset, so `seo-analyzer` and `seo-domain-analyzer` could not run at all. Intent scores are judgment-based; competitor depth is from `site:` probes and SERP titles, which report their own counts.
- Phase 1 (own-content catalog) was derived from the codebase, since the site isn't deployed.
- **To upgrade:** connect DataForSEO (~$0.01/keyword, no minimum) before building district hubs, and re-run `seo-content-audit` once deployed and indexed to measure real positions.

**Sources:** [shothotspot Sri Lanka](https://www.shothotspot.com/browse/sri-lanka/hotspots/) · [Colombo District (145)](https://www.shothotspot.com/browse/sri-lanka/western-province/colombo-district/hotspots/) · [Kandy District (74)](https://www.shothotspot.com/browse/sri-lanka/central-province/kandy-district/hotspots/) · [Galle District (60)](https://www.shothotspot.com/browse/sri-lanka/southern-province/galle-district/hotspots/) · [photohound](https://www.photohound.co/country/sri-lanka) · [locationscout Colombo](https://www.locationscout.net/locations/12623-colombo/spots) · [visitsrilanka.ai](https://visitsrilanka.ai/photo-spots-sri-lanka/) · [CAASL](https://www.caa.lk/en/2-uncategorised/438-manual-drone-applications) · [drone-laws.com](https://drone-laws.com/drone-laws-in-sri-lanka/) · [MFA filming guidelines](https://www.mfa.gov.lk/public/sites/default/files/2026-01/general-guidelines-foreign-shooting-2019-dec-nfc.pdf) · [Galle Heritage Foundation](https://galleheritage.gov.lk/filming-and-photography-within-galle-fort/) · [lately.cc](https://www.lately.cc/rent/photoshoot-studio-rental)
