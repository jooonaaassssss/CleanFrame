# TV compatibility evidence

Updated 28 October 2026. App rendering and native Home reassignment need separate evidence. Tizen version alone does not establish support. The upstream revision used as this fork's base requires Tizen 6.5; this fork declares 5.5.

## This fork: GU43TU8079UXZG adaptation

This checkout lowers the manifest requirement to 5.5 for an explicitly authorised
standalone-app experiment on a non-Frame TV. The device reports Tizen 5.5/ARMv7;
firmware `T-NKLDEUC-2743.0` has also been read directly from the TV.
The separately signed app installed and launched successfully; the owner
confirmed rendering, arrow navigation and Netflix launch. This does not
establish every app target or native Home/startup compatibility.

Fork version 0.6.3 is installed. The owner also confirmed the German interface,
24-hour clock, monochrome ARD/ZDF marks and new landscape-and-frame app icon in
Samsung's app list. Updates retained the same private app identity and author
certificate; neither is included in this repository.

The initial Home contains Netflix, YouTube, Prime Video, Disney+, Apple TV,
ARD Mediathek and ZDF, using IDs read from the device. Saved choices still take
precedence. TV settings replaces the Frame-only Art Mode shortcut. Samsung Home
and Settings component IDs were found in the app inventory, but their visible
destinations still require an on-device check.

The owner subsequently requested native Home/startup investigation. Read-only
SDK diagnostics confirmed UID 901, .NET 3.0.0, no `/usr/bin/dotnet`, and a
root-owned, SDK-read-only Home routing database. The original `home_appid`,
`overlay_home_appid` and `startup_appid` preferences are absent, not non-empty
values suitable for the maintained helper. A consistent routing database
snapshot and typed preference evidence were saved privately, with matching
TV/host SHA256 and successful SQLite integrity checks.

No native Home/startup values have been changed and no root method has been
executed. The physical Home button retains Samsung's existing behaviour.
Native restore and cold boot remain untested. Neither the inventory nor the
native database snapshot is a full firmware/system recovery image. Device
addresses, owner identity, certificates and backup records remain outside
tracked source.
Further native Home/startup/root work was explicitly paused. The native
diagnostic and cleanup scripts are private, not part of this fork.

## Recorded results

| TV / platform | Web launcher | Native Home | Evidence |
| --- | --- | --- | --- |
| This fork: GU43TU8079UXZG, Tizen 5.5, firmware T-NKLDEUC-2743.0 | Installed through 0.6.3; owner confirmed UI, navigation, Netflix, localization and icons | Not changed; no fixed startup or root applied | Evidence summarized above; private identifiers and recovery records excluded |
| Maintainer LS03D, Tizen 9, firmware 2130.0 | Installation and selected remote flows confirmed; other checks remain pending | Exact-value restore/reapply and Home from Netflix confirmed | [Maintainer record](tv-status.md) |
| QN43Q60BAFXZA, Tizen 6.5, Chromium 85 | Contributor reports rendering, navigation and hidden-boot work in their adapted fork; this branch reworks the boot path | Contributor reports query/apply/restore/reapply, cold boot and Home from Netflix | [PR #2](https://github.com/nthnclrk/CleanFrame/pull/2), [PR #5](https://github.com/nthnclrk/CleanFrame/pull/5) |
| QA75LS03BASXNZ, Tizen 6.5, Chromium 85 | Contributor reports Dock labels and rounded utility focus fixed in their adapted build | No native Home result supplied | [PR #10](https://github.com/nthnclrk/CleanFrame/pull/10) |
| Another 2025 Frame, Tizen 9 | Contributor reports saved apps, scrolling, Home from Netflix and appearance changes on their 0.6.4 build | Existing assignment retained during that update | [PR #7](https://github.com/nthnclrk/CleanFrame/pull/7) |
| QE55LS03R (2019 Frame), Tizen 5.0, firmware T-MSMDEUC-1500.9, Chrome 63.0.3239.0 | Contributor reports Dock, List, Settings and editor remote checks in their adapted build; upstream takes corrected spacing only, retaining its existing compositor path and Tizen 6.5 minimum | Not tested | [PR #11](https://github.com/nthnclrk/CleanFrame/pull/11) |
| UE43NU7099, Tizen 4.0 | Contributor reports their signed launcher ran; current upstream Tizen 6.5 package remains outside this target | Tested developer transport could not stage/run the helper; no native settings read or written | [PR #8](https://github.com/nthnclrk/CleanFrame/pull/8) |
| QN43LS03BAFXZA, Tizen 6.5, firmware 1720.7 | Contributor reports a derived launcher and Samsung Home escape work | Getter/setter/runtime activation and exact empty-value restoration unverified | [Issue #1](https://github.com/nthnclrk/CleanFrame/issues/1) |
| QA55Q8FAAULXL, Tizen 9, firmware 1300.9 | Contributor reports navigation, launching and saved preferences work | No native experiment; independent recovery unresolved | [Issue #3](https://github.com/nthnclrk/CleanFrame/issues/3) |
| UN65U7900FFXZA, Tizen 9, firmware 1300.8 | Contributor reports installation and navigation work | Helper correctly refuses this untested target | [Issue #9](https://github.com/nthnclrk/CleanFrame/issues/9) |
| UN43M70HAFXZX, Tizen 10, firmware 1203.9 | No launcher result supplied | No verified native Home or restore result | [Issue #1 comment](https://github.com/nthnclrk/CleanFrame/issues/1#issuecomment-6351927784) |

Contributor reports have not been reproduced by the maintainer. Browser regression checks cannot verify a TV compositor, native Samsung destination, remote feel or cold boot. The exact Q60B production firmware revision remains to be established: its reported `Version` field was a placeholder, alongside a dated build ID. It is not an exact-firmware allowlist entry.

## Native Home limits

The maintained helper stays on its reference .NET 6 target and firmware guard. A .NET 3.1 build reported by a contributor has not been checked on the reference TV. Keep generated `bin/`, `obj/`, DLLs and debug symbols private; they can contain local paths and are not reviewed source.

The current helper requires non-empty original Home and string values. It does not restore absent keys or an initially empty Home operation. Do not substitute Samsung Home for an empty or missing original value. That case needs a reviewed getter/reset contract and a separate reversible experiment.

Apply and restore use the same SDB execution transport. There is no independently verified recovery path if that transport stops working. Query/inspect also upload temporary files. Follow the [staged setup guide](agent-tv-setup-guide.md) under a separate device task, preserve the exact original values, and stop when transport, firmware, runtime, app identity or recovery differs. Keep DUIDs and recovery records private.
