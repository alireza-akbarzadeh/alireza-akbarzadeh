#!/usr/bin/env bash
# Removes the starter-template files that are breaking the Vercel build.
#
# Every path below is dead code: nothing reachable from a route imports any of
# it, and each one references a package that is no longer a dependency
# (framer-motion, react-icons, react-lottie, three-globe, @react-three/drei).
# `next build` type-checks the whole project, not just the reachable graph,
# which is why the deploy fails on 40 errors while the site itself is fine.
#
# Run from the repo root:  bash finish-cleanup.sh
set -euo pipefail

echo "==> Removing dead template components"
git rm -r -q --ignore-unmatch \
  components/Approach.tsx \
  components/RecentProjects.tsx \
  components/MagicButton.tsx \
  components/ui/BentoGrid.tsx \
  components/ui/Button.jsx \
  components/ui/CanvasRevealEffect.tsx \
  components/ui/FloatingNavbar.tsx \
  components/ui/Globe.tsx \
  components/ui/GradientBg.tsx \
  components/ui/GridGlobe.tsx \
  components/ui/HoverBorder.tsx \
  components/ui/InfiniteCards.tsx \
  components/ui/LayoutGrid.tsx \
  components/ui/MovingBorders.tsx \
  components/ui/Pin.tsx \
  components/ui/Spotlight.tsx \
  components/ui/TextGenerateEffect.tsx

echo "==> Removing data payloads only those components read (932KB)"
git rm -q --ignore-unmatch data/globe.json data/confetti.json

echo "==> Removing tailwind.config.ts"
# Tailwind v4 reads @theme from CSS and only loads a config file behind an
# explicit @config directive, which this project does not use. The file is
# inert, requires v3-only internals, and is the source of the two
# module-not-found warnings in the build log.
git rm -q --ignore-unmatch tailwind.config.ts

echo "==> Removing .eslintrc.json (superseded by eslint.config.mjs)"
git rm -q --ignore-unmatch .eslintrc.json

echo "==> Removing public/ — 25MB of unreferenced template art"
# No live reference to any of it: the favicon is app/icon.svg and the social
# card is app/opengraph-image.tsx. Recoverable from git history.
git rm -r -q --ignore-unmatch public
mkdir -p public
printf '%s\n' '# Static assets served from the site root.' \
              '# Emptied: the original template art (see git history).' > public/.gitkeep
git add public/.gitkeep

echo
echo "==> Verifying"
pnpm install
pnpm typecheck
pnpm lint
pnpm build

echo
echo "All green. Review with 'git status', then:"
echo "  git add -A && git commit -m 'chore: retire starter-template layer, add light mode' && git push"
