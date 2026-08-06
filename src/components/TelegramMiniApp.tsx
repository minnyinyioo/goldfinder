"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import "./telegram-mini-app.css";

type TelegramBackButton = {
  show: () => void;
  hide: () => void;
  onClick: (callback: () => void) => void;
  offClick: (callback: () => void) => void;
};

type TelegramWebApp = {
  initData: string;
  platform: string;
  initDataUnsafe?: { start_param?: string };
  colorScheme: "light" | "dark";
  themeParams: { bg_color?: string; secondary_bg_color?: string; bottom_bar_bg_color?: string };
  BackButton: TelegramBackButton;
  ready: () => void;
  expand: () => void;
  enableClosingConfirmation: () => void;
  setHeaderColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  setBottomBarColor?: (color: string) => void;
  onEvent: (event: string, callback: () => void) => void;
  offEvent: (event: string, callback: () => void) => void;
};

declare global {
  interface Window {
    Telegram?: { WebApp?: TelegramWebApp };
  }
}

const homePaths = new Set(["/", "/en", "/my"]);

export default function TelegramMiniApp() {
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    const webApp = window.Telegram?.WebApp;
    if (!webApp || webApp.platform === "unknown") return;

    const root = document.documentElement;
    root.classList.add("telegram-mini-app");
    root.dataset.telegramPlatform = "mini-app";

    const syncTheme = () => {
      const theme = webApp.colorScheme === "light" ? "light" : "dark";
      root.dataset.theme = theme;
      const background = webApp.themeParams.bg_color || (theme === "light" ? "#edf1ec" : "#07100d");
      const header = webApp.themeParams.secondary_bg_color || background;
      webApp.setBackgroundColor(background);
      webApp.setHeaderColor(header);
      webApp.setBottomBarColor?.(webApp.themeParams.bottom_bar_bg_color || background);
    };

    syncTheme();
    webApp.onEvent("themeChanged", syncTheme);
    webApp.ready();
    webApp.expand();
    webApp.enableClosingConfirmation();

    const startParam = webApp.initDataUnsafe?.start_param;
    if (startParam && /^[a-zA-Z0-9_-]{1,64}$/.test(startParam)) {
      root.dataset.telegramStart = startParam;
    }

    return () => {
      webApp.offEvent("themeChanged", syncTheme);
      root.classList.remove("telegram-mini-app");
      delete root.dataset.telegramPlatform;
      delete root.dataset.telegramStart;
    };
  }, []);

  useEffect(() => {
    const webApp = window.Telegram?.WebApp;
    if (!webApp || webApp.platform === "unknown") return;

    const goBack = () => {
      if (window.history.length > 1) router.back();
      else router.push(path.startsWith("/my") ? "/my" : path.startsWith("/en") ? "/en" : "/");
    };

    webApp.BackButton.offClick(goBack);
    if (homePaths.has(path)) webApp.BackButton.hide();
    else {
      webApp.BackButton.show();
      webApp.BackButton.onClick(goBack);
    }

    return () => webApp.BackButton.offClick(goBack);
  }, [path, router]);

  return null;
}
