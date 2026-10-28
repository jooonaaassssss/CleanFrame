# Fork publication record

Prepared 28 October 2026 for
[jooonaaassssss/CleanFrame](https://github.com/jooonaaassssss/CleanFrame), a public
GitHub fork of [nthnclrk/CleanFrame](https://github.com/nthnclrk/CleanFrame).
The fork's changes start from upstream commit `58ac92a`. Upstream history
and attribution are retained; this is not a new claim of authorship over
the original project.

## Published scope

The source contains the German Tizen 5.5 standalone app, 24-hour clock,
seven default shortcuts, non-Frame settings control, monochrome ARD/ZDF
marks, original landscape app icon, browser tests and updated documentation.
The installed private widget was fork version 0.6.3.

The owner confirmed the localized UI and app icon on a GU43TU8079UXZG.
Home routing, fixed startup, root and firmware were not changed. Native work
is paused. The unchanged native helper and historical Frame documentation
belong to upstream and are not an approved recipe for this TV.

## Private boundary

Only reviewed source and public assets belong in the fork. Do not publish:

- `.local/`, `dist/`, SDKs, dependencies or generated signed widgets;
- certificates, private keys, passwords, authentication sessions or tokens;
- personal app identities, DUIDs, device UUIDs, addresses or local user paths;
- inventory backups, native database snapshots, diagnostic logs or recovery
  configuration;
- proprietary Pangram font binaries.

The original and updated signed packages and recovery records remain local,
outside the public Git history. Public source checks cover candidate files,
staged blobs and reachable history; an additional owner-identifier check
is required before this fork's publication. These are bounded checks, not a
guarantee that every possible secret can be detected.

## Licence and asset review

- The root MIT licence and Nathan Clark copyright notice are unchanged.
  Fork code/documentation changes and the new original app icon use MIT too.
- ARD's paths match the pinned MIT Custom Brand Icons source; ZDF's paths
  match Simple Icons 11.15.0 under CC0. Their white-fill adaptations and source
  URLs are recorded in `app/assets/icons/ADDITIONAL-SOURCES.json`.
- Existing MIT/CC0 icon notices and SIL OFL font licences are retained.
- Wallpaper photographs, derivatives and credits remain those reviewed by
  upstream, under the Unsplash License. German display names do not change
  the photographers or source records.
- Service names and marks identify their services. Their trademark rights
  are not transferred by this fork, and no affiliation is claimed.

See [third-party notices](../THIRD_PARTY_NOTICES.md) and
[asset sources](asset-sources.md). The [upstream publication record](https://github.com/nthnclrk/CleanFrame/blob/58ac92a7b8f80047ca26e5b7097f5e1616762db0/docs/public-release.md)
documents its earlier asset review and clean-history preparation; those
historical approvals are not instructions to rename or republish repositories
under this fork's account.

## Validation and release boundary

The Windows publication check passed ES5 lint, manifest/resource validation,
all five adapter tests, all 442 public-font browser checks and the bounded
source/history check. The original root licence was compared with the
upstream base and is unchanged. Personal owner/device identifiers were not
found in the public candidate files.

Use the existing source/resource checks, ES5 lint, adapter tests, complete
public-font browser checks, source/history checks and unsigned public export.
The POSIX signing-tool suite cannot run on Windows; it must pass in the Linux
GitHub Actions workflow. Check the workflow result for the actual published
commit rather than treating a local test result as hosted success.

The public export contains public fonts and project/third-party notices,
does not contact a TV or read signing credentials, and retains the reference
app identity. It is not a signed, device-ready release. The publication task
does not upload personal widgets or create a binary GitHub release.

The default fork branch carries the German adaptation; the upstream main
branch remains available for comparison. No original repository was renamed,
no existing remote history was force-pushed, and no TV operation is part of
this publication.
