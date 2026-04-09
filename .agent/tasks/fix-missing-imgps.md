# Task: Fix missing 'imgPs' variable

The landing page is failing to build because `imgPs` is used in the `HeroSection` but not defined.

## Problem
- File: `src/app/page.tsx`
- Line: 325
- Error: `Cannot find name 'imgPs'`

## Solution
Define `imgPs` as a constant array at the top of `src/app/page.tsx` using the images found in `public/images/prova_social/`.

## Checklist
- [x] Add `const imgPs = [...]` to `src/app/page.tsx`
- [x] Verify the paths match the existing files in `public/images/prova_social/`
- [x] Ensure the UI renders correctly.

