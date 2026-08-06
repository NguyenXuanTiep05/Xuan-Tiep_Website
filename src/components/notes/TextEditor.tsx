"use client";
import { useEffect, useState } from "react";

import "@/assets/TextEditor.css";
import { Markdown } from "@/lib/Markdown";

const TextEditor = () => {
    const [text, setText] = useState<string>(
        '# Windows 11 Debloat & Battery Optimization Guide\n\nA practical guide to stripping bloat and maximizing battery life on Windows 11 laptops — without going the unofficial LTSC route.\n\n---\n\n## 1. Remove Preinstalled Bloatware\n\n### Option A: Manual removal (Settings)\n1. Go to **Settings → Apps → Installed apps**\n2. Sort by name and uninstall anything you don\'t use:\n   - Xbox app, Xbox Game Bar, Xbox Live\n   - Solitaire Collection, Candy Crush, other pre-pinned games\n   - Clipchamp, Cortana, Mixed Reality Portal\n   - LinkedIn, Office Hub (if you don\'t use Microsoft 365)\n   - Weather, News, Maps (if unused)\n\n### Option B: PowerShell bulk removal\nRun PowerShell **as Administrator**:\n\n```powershell\n# List all installed AppX packages\nGet-AppxPackage | Select Name, PackageFullName\n\n# Remove specific bloat apps (example set)\nGet-AppxPackage *xbox* | Remove-AppxPackage\nGet-AppxPackage *solitairecollection* | Remove-AppxPackage\nGet-AppxPackage *bingweather* | Remove-AppxPackage\nGet-AppxPackage *bingnews* | Remove-AppxPackage\nGet-AppxPackage *getstarted* | Remove-AppxPackage\nGet-AppxPackage *zunemusic* | Remove-AppxPackage\nGet-AppxPackage *zunevideo* | Remove-AppxPackage\nGet-AppxPackage *mixedreality* | Remove-AppxPackage\n```\n\n> ⚠️ Be selective — removing core system components (like the Store itself) can break things. Only remove apps you clearly recognize as unused.\n\n### Option C: Community debloat scripts\nTools like **Win11Debloat** (open source, script-based, reversible) automate this safely without touching system internals. Search GitHub for community-maintained scripts, review them before running, and prefer ones with visible source code over compiled `.exe` debloaters.\n\n---\n\n## 2. Cut Background Noise\n\n1. **Settings → Apps → Installed apps** → for each app, click the `...` menu → **Advanced options** → set **Background apps permissions** to "Never"\n2. **Settings → Privacy & security → Background apps** → toggle off apps you don\'t need running silently\n3. **Task Manager (Ctrl+Shift+Esc) → Startup apps tab** → disable anything unnecessary (cloud sync clients, updater helpers, OEM utilities)\n\n---\n\n## 3. Disable Widgets, Copilot, and Search Indexing Extras\n\n```powershell\n# Disable Widgets\nGet-AppxPackage *WebExperience* | Remove-AppxPackage\n\n# Disable Copilot (registry)\nNew-Item -Path "HKCU:\\Software\\Policies\\Microsoft\\Windows\\WindowsCopilot" -Force\nSet-ItemProperty -Path "HKCU:\\Software\\Policies\\Microsoft\\Windows\\WindowsCopilot" -Name "TurnOffWindowsCopilot" -Value 1\n```\n\n- **Settings → Privacy & security → Search permissions** → turn off "Cloud content search" and limit indexing to essential folders (Settings → Search → Searching Windows → Classic/Limited mode)\n\n---\n\n## 4. Reduce Telemetry Load\n\n```powershell\n# Disable Connected User Experiences and Telemetry service (DiagTrack)\nStop-Service "DiagTrack" -Force\nSet-Service "DiagTrack" -StartupType Disabled\n```\n\n**Settings → Privacy & security → Diagnostics & feedback** → set to **Required diagnostic data only**\n\n---\n\n## 5. Battery & Power Tuning (biggest real-world impact)\n\n| Setting | Location | Recommendation |\n|---|---|---|\n| Power mode | Settings → System → Power & battery | **Best Power Efficiency** on battery |\n| Screen brightness | Settings → System → Display | Lower manually; enable adaptive brightness |\n| Refresh rate | Settings → System → Display → Advanced display | Drop to 60Hz on battery if panel supports 90Hz+ |\n| Sleep/screen timeout | Settings → System → Power & battery → Screen and sleep | Shorten on-battery timeouts (e.g. 3–5 min) |\n| GPU selection | Settings → System → Display → Graphics | Force **integrated/power-saving GPU** for non-gaming apps |\n| Background app refresh | Settings → Apps → Installed apps | Disable per-app as above |\n| USB selective suspend | Control Panel → Power Options → Change plan settings → Advanced | Enable |\n| Bluetooth/Wi-Fi | Quick Settings | Turn off Bluetooth when unused |\n\n### Optional: check battery health\n```powershell\npowercfg /batteryreport\n```\nThis generates an HTML report showing battery wear, design vs. current full charge capacity, and usage history — useful for judging whether software tweaks will even move the needle vs. aging hardware.\n\n---\n\n## 6. What NOT to Bother With\n\n- **Windows 11 N/KN editions** — only strip media codecs, no real battery/bloat benefit\n- **Unofficial LTSC ISOs** — closest to "no bloat" but licensed only for specialized devices, missing Store/UWP support, and legally murky for general consumer use\n- Aggressive "ultimate debloat" scripts that disable Windows Update or core services — these often cause more problems (missing security patches, broken app dependencies) than battery gains they deliver\n\n---\n\n## Summary\n\nReal battery gains come mostly from **power settings + background app control**, not bloatware removal alone. Debloating helps with clutter, storage, and minor background CPU/memory overhead, but the biggest wins are:\n1. Best Power Efficiency mode\n2. Lower brightness/refresh rate\n3. Force integrated GPU\n4. Kill unnecessary background apps and telemetry services',
    );
    const [scrollSync, setScrollSync] = useState<boolean>(true);

    useEffect(() => {
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.altKey && e.key == "q") setScrollSync((prev) => !prev);
        });
    }, []);

    const ScrollSync = (source: HTMLElement, target: HTMLElement): void => {
        if (scrollSync == false) return;

        if (!source || !target) return;

        const maxScroll = source.scrollHeight - source.clientHeight;
        const scrollPos: number =
            maxScroll > 0 ? Math.min(source.scrollTop / maxScroll, 1) : 0;
        target.scrollTop =
            (target.scrollHeight - target.clientHeight) * scrollPos;
    };

    const HandleEditor = (
        e: React.UIEvent<HTMLTextAreaElement, UIEvent>,
    ): void => {
        const renderer = document.getElementById("markdownText");
        if (!renderer) return;
        ScrollSync(e.currentTarget, renderer);
    };
    const HandleRenderer = (
        e: React.UIEvent<HTMLDivElement, UIEvent>,
    ): void => {
        const Editor = document.getElementById("normalText");
        if (!Editor) return;
        ScrollSync(e.currentTarget, Editor);
    };

    return (
        <div className="relative w-full h-full flex flex-row max-[]:">
            <textarea
                className=" inset-0 w-[50%] max-w-[50%] h-full px-6 py-12 placeholder:text-center resize-x scrollbar-none border-r border-(--border)"
                id="normalText"
                autoCorrect="off"
                value={text}
                autoFocus
                placeholder="Here you can write 'markdown' syntax"
                onChange={(e) => {
                    setText(e.target.value);
                }}
                onKeyDown={(e) => Markdown.HandleKeyDown(e, [setText])}
                onScroll={(e) => HandleEditor(e)}
            ></textarea>
            <div
                className=" inset-0 flex-1 h-full px-6 py-12 z-10 wrap-break-word overflow-y-scroll scrollbar-none"
                id="markdownText"
                dangerouslySetInnerHTML={{ __html: Markdown.FormatText(text) }}
                onScroll={(e) => HandleRenderer(e)}
            ></div>
            <div className="absolute top-0 right-0 translate-x-2 z-10">
                <button
                    onClick={() => setScrollSync((prev) => !prev)}
                    aria-label={
                        scrollSync
                            ? "Disable scroll sync"
                            : "Enable scroll sync"
                    }
                    className={`w-7 h-7 rounded-lg flex items-center justify-center border cursor-pointer
						 transition-all duration-150 hover:-translate-y-px ${
                             scrollSync
                                 ? "border-blue-400 bg-blue-400/10 text-blue-300"
                                 : "border-neutral-700 bg-transparent text-neutral-400"
                         }`}
                >
                    {scrollSync ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect x="3" y="4" width="7" height="16" rx="1.5" />
                            <rect x="14" y="4" width="7" height="16" rx="1.5" />
                            <path d="M10 9 h4 M14 9 l-2 -2 M14 9 l-2 2" />
                            <path d="M14 15 h-4 M10 15 l2 -2 M10 15 l2 2" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect x="3" y="4" width="7" height="16" rx="1.5" />
                            <rect x="14" y="4" width="7" height="16" rx="1.5" />
                            <path d="M3 21 L21 3" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
};

export default TextEditor;
