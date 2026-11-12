# Development image sources

All are illustrative, not evidence of personal travel. Downloaded November 12, 2026 from Unsplash. License: https://unsplash.com/license (free commercial/noncommercial use; review terms before launch). No endorsement implied.

- Italian coastal photograph: https://images.unsplash.com/photo-1516483638261-f4dbaf036963
- Japan photograph: https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e
- Portugal photograph: https://images.unsplash.com/photo-1555881400-74d7acaacd8b

Verify precise location captions and choose final editorial imagery before production. Sources are not owner travel photographs. The first photograph is also used as the development social preview.

## Owner-supplied WordPress photos

The owner supplied both files in `Biltmore-Village-ANC-1024x683.zip`. These are original article assets, not Unsplash placeholders. Source paths match the WordPress export:

- `src/assets/asheville.jpg`: `2026/04/Biltmore-Village-ANC-1024x683.jpg`, 1024 × 683.
- `src/assets/san-francisco.jpeg`: `2026/03/IMG_1762-1024x683.jpeg`, 1024 × 683.

Astro creates responsive WebP variants for cards and article covers. Alt text describes visible content without identifying people.

## WordPress image Batches 1–4

All 18 requested files were received in the owner's four ZIPs. They are stored unchanged in `src/assets/wordpress/`; `docs/migration/received-media.json` records original filenames, batch numbers, descriptive alt text and SHA-256 receipts. The original WordPress export determines where each asset is used. No supplied image was generated, edited or substituted; Astro produces optimized display variants. The two airport-security illustrations are described as illustrative, not evidence of current queues or wait times.

## Maui destination photograph

`src/assets/maui-coast.jpg` replaces the food photograph only in Maui destination discovery and its landing-page hero. The lunch article retains its original `Maui-Fishn-Chips-scaled.jpg` image.

- Photographer: Ganapathy Kumar (@gkumar2175).
- Source and location: https://unsplash.com/photos/tropical-beach-at-sunset-in-maui-7782WXBriyM — Secret Cove Beach, Kihei, Maui, per the photographer's caption.
- License: https://unsplash.com/license; the source page explicitly identifies this as a free Unsplash License image (checked November 12, 2026).
- Download: https://images.unsplash.com/photo-1542259009477-d625272157b7?w=1600&q=85&fit=crop&fm=jpg
- Attribution is displayed on the Maui destination page. This is licensed destination imagery, not an owner travel photograph or evidence of a personal visit.

## Editorial cover selected by the owner

`src/assets/editorial/sf-painted-ladies.jpg` is the unchanged `joshua-sortino-HadloobmnQs-unsplash.jpg` supplied in `SF Image.zip` on November 12, 2026. Photo: Joshua Sortino / Unsplash; source https://unsplash.com/photos/HadloobmnQs, license https://unsplash.com/license. It shows the Painted Ladies with the San Francisco skyline and moon. It is destination imagery, not evidence of an author visit. The original SHA-256 receipt is recorded in `editorial/research/sf-without-a-car.json`. Astro generates optimized responsive display variants.

## Displayed credits

`src/config/photo-credits.json` records the existing known source/credit/license links for Maui, the owner-selected Painted Ladies cover, and the three development sample images. `PhotoCredit.astro` renders these consistently beneath destination or article images. Sample photographs without a recorded photographer name are credited to Unsplash only; unknown individual authors of supplied archive images are not invented. Source provenance above remains unchanged.
