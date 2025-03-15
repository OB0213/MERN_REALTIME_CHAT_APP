import React from "react";
import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../colorThemes";

function Settings() {
  const { theme, setTheme } = useThemeStore();
  return (
    <div className="h-screen container mx-auto px-4 max-w-5xl py-24">
      <div className="space-y-16">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-sm text-base-content/70">
            Choose a theme from your chat interface
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {THEMES.map((elements) => (
            <button
              key={elements}
              className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${
                theme === elements ? "bg-base-200" : "hover:bg-base-200/50"
              }`}
              onClick={() => setTheme(elements)}
            >
              <div
                className="relative h-8 w-full rounded-md overflow-hidden"
                data-theme={elements}
              >
                <div className="absolute inset-0 grid grid-cols-4 gap-px p1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-[11px] font-medium truncate w-full text-center">
                {elements.charAt(0).toUpperCase() + elements.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Settings;
