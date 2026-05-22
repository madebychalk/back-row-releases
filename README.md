# Back Row Releases

Public distribution channel for **[Back Row for Mac](https://github.com/madebychalk/back-row)** — the menu-bar app that lets you control your Mac from your iPhone.

This repository hosts:

- **Notarized DMG releases** — attached as assets to each tagged [GitHub Release](https://github.com/madebychalk/back-row-releases/releases).
- **Sparkle appcast** — published at <https://madebychalk.github.io/back-row-releases/appcast.xml>. Back Row for Mac reads this feed when you click *Check for Updates…* in the menu bar.
- **Landing page** for testers at <https://madebychalk.github.io/back-row-releases/>.

The application source code lives in a separate private repository at [`madebychalk/back-row`](https://github.com/madebychalk/back-row). This repo exists purely so Sparkle can fetch unauthenticated download URLs.

## For users

If you're a Back Row tester, visit the landing page above to grab the latest build. Once installed, future updates arrive via the *Check for Updates…* menu item — no need to download manually again.

## For maintainers

Per-release steps live in `RELEASE.md` on the source repo.
