# Development

## Browser preview

Start with Node.js 22.13+ (22 LTS), or 24+, and Python 3.10+, then `npm ci`. These are the supported development baselines; lower versions have not been checked. Install Chromium once with `npx playwright install chromium` for the optional browser tools. Linux hosts may also need Playwright's documented system dependencies (`npx playwright install --with-deps chromium`).

On Windows, the browser runner uses `python`, or the executable selected by
`PYTHON`. Set `PYTHONUTF8=1` for the Python source checks. The existing npm
Python commands use `python3`; when that alias is absent, invoke the corresponding
script with `python` directly. Signing through `package.py` remains macOS/Linux
only; use the official Samsung tools for a Windows-signed package.

`npm run dev` starts http://localhost:4795/home/, bound to this computer only. `/home/` serves `app/`, the same source used in the signed widget. Arrow keys, Enter and Escape mirror remote navigation. Device controls report that they require the TV; no success is simulated.

`npm run dev:public` serves the same interface using only the bundled public fonts, even when paid Pangram files exist locally. For a contributor's fresh clone, use the README and `docs/for-agents.md`; the signing/device setup below describes the reference machine and needs adaptation for another owner.

All UI assets, public fonts and the fifteen wallpapers are bundled. This fork
does not include paid Pangram binaries. Upstream's optional local overlay is
retained for owners with their own embedding rights; public preview/export
excludes it. Glass materials and blurred panel backgrounds are rendered ahead
of time; see app/assets/wallpapers/README.md.

## Runtime map and compatibility

- `app/index.html` loads the device adapter, gallery/font/palette catalogues, `assets/icons/metrics.js` and `main.js`, with `style.css`.
- `main.js` owns the List and Dock layouts, panel stack, focus, preferences and wallpaper timers. `device.js` owns installed-app discovery and Tizen calls. Keep device details in that adapter.
- The logical stage is 1920 x 1080, scaled uniformly to the viewport. Check at 1920 x 1080 and 1280 x 720. Glass geometry and cached materials must stay aligned.
- Preferences use localStorage key `cleanframe.home.v1`, with a fallback read from `cleanframe.shore.v1`. Legacy fields are `dock`, `wallpaper`, `mode`, `lastApp` and `theme`. The 0.6 migration preserves app order, wallpaper, rotation and selection. Legacy `list` becomes Dark / List / Type; `shore` and `grid` become Photo / Dock / Glass. Appearance axes are stored separately. A saved dynamic app keeps its real app ID and name; discovery refreshes the installed catalogue. Keep migration checks when changing this format.
- `window.ShoreQA.state()` and `.where()` expose state and focus for browser tests. `minuteMs` can shorten rotation intervals in an isolated browser test.

This fork's tested target is the GU43TU8079UXZG / Tizen 5.5 described in
[compatibility](compatibility.md). The Tizen 9.0 [TV status](tv-status.md) record
belongs to upstream. The manifest's `required_version="5.5"` is a package
declaration, not proof of support for every Tizen 5.5 TV.

`npm run lint` uses ESLint's ES5 grammar for runtime JavaScript and checks
undefined names, unused code and dynamic evaluation. It does not check
DOM/CSS or TV API availability. The CSS guard rejects `inset` and flex `gap`;
use explicit edges and child margins. Geometry checks cover both layouts,
control modes and preview sizes, but do not establish TV compositor support.
Tooling stays outside the widget. See [ESLint's language options](https://eslint.org/docs/latest/use/configure/language-options).

Keep material rendering in the development tools. See [asset generation](assets.md) and [testing](testing.md).

## Local TV tools and signing

The installed Windows/Tizen 5.5 build used private owner-specific preparation,
the official Samsung `tz.exe pack` signer and SDB `vd_appinstall`. Personal
preparation scripts and rollback records are deliberately not published.
Create your own SDK project identity and certificates; never install the
unchanged reference-identity public export. On Windows, use the official SDK
for an owner-specific package rather than the POSIX `package.py` runner.

The retained upstream Mac tooling expects local setup under `.local/`,
excluded from Git:

- `tizen-sdk/`: official Tizen SDK command-line tools, embedded Java and SDB.
- `certificates/private/`: Samsung-issued author/distributor certificates, private keys, protected PKCS12 files and their generated password.
- `certificates/ca/`: CA certificates from Samsung's Certificate Extension.
- `device.json`: TV host address.

`npm run package` builds the widget from `app/` and signs it with an existing official SDK profile. It does not rewrite `profiles.xml`, certificate paths or SDK configuration. It writes `dist/CleanFrame-unsigned.wgt` and promotes a successful build to `dist/CleanFrame.wgt`. Each attempt uses a fresh ignored `dist/signed-*` folder, retained for inspection; a failed attempt keeps the previous successful widget. Check the packaging exit status before installing, since `tv:install` does not establish that this is the latest source build. `scripts/font_assets.py` adds only the six approved local Pangram files when complete pairs are available, plus their generated CSS/catalogue. It never copies private fonts into `app/`. Public checkouts use Manrope, Geist and Newsreader.

For another owner, copy `signing.example.json` to `.local/signing.json` and replace its placeholders with the installed SDK path, certificate profile name and the package/application IDs generated by the official project wizard. An existing local config must explicitly select `profile`; the maintainer default applies only when no config exists. Paths may be absolute or relative to the repo; `~` is supported. The SDK path resolves symlinks before invoking its tools. If the SDK launcher fails on spaces in its real installation path, select a space-free SDK installation; a repository symlink can still contain spaces. The password filename remains unresolved so the no-follow check can reject a symlink. The example contains no real credentials. Both identity fields must be set together. Packaging changes only these two attribute values in the generated manifest; tracked source and the maintainer's identity remain unchanged. The installed app reads its own identity from Tizen when filtering All apps. Native Home helpers retain their separate reference-machine guards and must be reviewed independently.

Select the profile's existing `profiles.xml` through the official SDK configuration if needed; see [Samsung's CLI configuration and packaging documentation](https://developer.samsung.com/smarttv/develop/getting-started/using-sdk/command-line-interface.html). Certificate Manager can store certificates in its own folders. CleanFrame uses those existing paths without moving or rewriting them.

`npm run export:public` is a separate offline, unsigned export. It disables
the proprietary overlay, includes the project/third-party notices and writes
`dist/CleanFrame-public-unsigned.wgt`. On Windows use
`python scripts\export-public.py`. It reads no signing credentials, retains
the source reference identity and contacts no TV. An owner-specific
`npm run package` build can include locally supplied paid fonts; do not
publish it. Asset release checks are in `docs/public-release.md`.

Leave `password_file` as `null` or omit it to use the SDK's saved password access. No extra plaintext copy is required. An unexpected password prompt fails immediately; configure password access in the official tools or explicitly select a password file. The optional file must be owned by the current user, have mode `600` or `400`, and reside in `.local/` or outside the repo. A symlink at the final filename and files inside `app/` or `.git/` are rejected; parent symlinks are resolved before the location check. This fallback supplies one password to at most two certificate prompts and declines password-saving prompts; use SDK-managed access for certificates with different passwords. SDK signing output is suppressed so credentials cannot enter diagnostics. Fixed validation messages identify password-prompt, timeout, failed-command, missing-signature and identity errors without copying SDK output.

With no `.local/signing.json`, the original maintainer defaults remain: `.local/tizen-sdk`, profile `FrameHome`, the source manifest identity, and the existing private password file if present. Its permissions must satisfy the same checks. The SDK must already be configured; automatic SDK/profile repair has been removed. Actual signing with an owner's certificates requires a separate local check; offline tests use a fake SDK.

Upstream's initial custom XML-signature implementation was rejected by its TV.
Use the official SDK signer. Its older Tizen CLI 2.5.25 result is upstream
evidence, not the Windows toolchain used for this fork.

## Another checkout or Mac

Install the official [Samsung TV SDK](https://developer.samsung.com/smarttv/develop/getting-started/setting-up-sdk/installing-tv-sdk.html) and select its path in `.local/signing.json`. The signing runner uses POSIX terminal/process APIs and is supported by these tools on macOS/Linux; Windows needs its own adapted runner. To retain in-place updates to your own existing app, securely transfer its author certificate and password. Keep those credentials local.

For new certificates, use Samsung's [certificate setup](https://developer.samsung.com/smarttv/develop/getting-started/setting-up-sdk/creating-certificates.html). The distributor certificate must include the target TV's DUID. A generic emulator certificate does not establish compatibility with this consumer TV.

Create `.local/device.json` with:

```json
{"host": "YOUR_TV_IP_ADDRESS"}
```

For developer access, connect the TV and Mac to the same network, enable Developer Mode in Apps → App Settings → 12345 and enter the Mac's local address. Fully restart the TV if the developer port remains closed.

## Install and launch

`npm run tv:install` uploads the signed widget with a unique build filename and calls Samsung's `vd_appinstall` command. It checks for `install completed` and confirms the app appears in the installed-app list. `sdb install` on this TV only uploaded the widget and did not install it.

`npm run tv:launch` opens the selected app. It does not change startup defaults. The TV tools use the SDK path and identity selected in `.local/signing.json`, falling back to the reference SDK and source manifest. Before any install connection, the installer checks the signed widget's identity and private-file policy. Changing an installed app's identity creates a different application; preserve existing identity and author certificates for updates. These tools remain reference installation commands, not an unattended installer for every TV.

## Sources

- [Samsung developer connection steps](https://developer.samsung.com/smarttv/develop/getting-started/using-sdk/tv-device.html)
- [Samsung app-launch sample](https://github.com/SamsungDForum/LaunchApp)
- [Samsung remote input guide](https://developer.samsung.com/smarttv/develop/guides/user-interaction/remote-control.html)

## Native Home and recovery: upstream-only tooling

Home/startup was configured on the upstream reference TV, not on this fork's
GU43TU8079UXZG. Native work on this fork is paused. The unchanged helper has
different model, firmware, runtime and original-value requirements and must
not be used on this target or have its guards removed.

The historical procedure is retained in [native-home](../scripts/native-home/README.md)
and [upstream TV status](tv-status.md). It requires a separate device task,
explicit owner permission and a verified exact-value recovery path.
An inventory or routing-database snapshot is not a full firmware backup.
The helper is not packaged inside the web app. Keep all recovery records,
native binaries and device diagnostics private.
