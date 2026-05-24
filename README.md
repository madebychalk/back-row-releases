# Back Row Releases

Public distribution channel for **Back Row for Mac** — the menu-bar app that lets you control your Mac from your iPhone.

This repository hosts:

- **Notarized DMG releases** — attached as assets to each tagged GitHub Release.
- **Sparkle appcast** — published at <https://backrowapp.com/appcast.xml>. Back Row for Mac reads this feed when you click *Check for Updates…* in the menu bar.
- **Landing page** at <https://backrowapp.com>.

## First install (one time only)

1. Open <https://backrowapp.com> and click **Download for Mac**.
2. Open the DMG and drag *Back Row for Mac* into your Applications folder.
3. Launch it once — a chair icon appears in your menu bar.

## Every update after that

Click the chair icon → **Check for Updates…**. Sparkle handles download, signature verification, install, and relaunch automatically. You'll never need to come back to this site for a release again — unless you reinstall macOS.

## Already on Build 10 or earlier?

That build pre-dates auto-update. You'll need one final manual install to get onto the Sparkle track:

1. Quit Back Row from the menu bar.
2. Download the latest DMG from this page.
3. Drag the new `.app` into Applications, replacing the old one.
4. Launch — from now on, *Check for Updates…* is all you need.
