# Project screenshots

Drop real captures of your own projects here, one folder per project slug:

    public/work/luxe/checkout.png
    public/work/nexora/orderbook.png

Then reference them from the project's `shots` array in `data/projects.ts`:

```ts
shots: [
  {
    src: "/work/luxe/checkout.png",
    alt: "Checkout step showing the three payment methods and the order summary",
    caption: "Multi-method checkout — card, wallet and stored balance in one flow.",
    width: 2400,
    height: 1500,
    // srcDark: "/work/luxe/checkout-dark.png",  // optional
  },
]
```

A project with no `shots` renders no image section and no "Screens" entry in
the page index — nothing to clean up, nothing that looks broken.

## Capturing

- Full-width app screens: 2400x1500 (16:10) is a good target. Retina, then let
  `next/image` resize.
- Crop to the thing the caption is about. A full-page capture of a landing page
  says less than one panel of the feature you are describing.
- PNG for UI, JPEG only for photographic content.
- Write `alt` as a description of what the screen shows, not "screenshot of X".

## Rules

Only your own work. The images that used to live in `public/` (`p1`–`p4.svg`)
were the starter template author's tutorial projects, and `profile.svg` was a
stock photograph of an unrelated person. Neither belongs on this site.
