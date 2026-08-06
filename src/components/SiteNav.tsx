"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import "./language-picker.css";
import {
  BookOpen,
  Camera,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Home,
  Info,
  Languages,
  Menu,
  Moon,
  Mountain,
  PanelTop,
  Search,
  ShieldAlert,
  Sun,
  TestTubes,
  Waves,
  X,
} from "lucide-react";
type NavItem = [string, string, LucideIcon];
const zh: NavItem[] = [
  ["/", "首页", Home],
  ["/atlas", "看图识金", Camera],
  ["/assess", "现场判断", TestTubes],
  ["/knowledge", "知识与方法", BookOpen],
  ["/project", "样品工作台", PanelTop],
  ["/about", "安全与来源", ShieldAlert],
];
const en: NavItem[] = [
  ["/en", "Home", Home],
  ["/en/atlas", "Photo Identification", Camera],
  ["/en/assess", "Field Assessment", TestTubes],
  ["/en/knowledge", "Knowledge & Methods", BookOpen],
  ["/en/project", "Sample Workspace", PanelTop],
  ["/en/about", "Safety & Sources", ShieldAlert],
];
const my: NavItem[] = [
  ["/my", "ပင်မစာမျက်နှာ", Home],
  ["/my#placer", "ရွှေကျင်သိုက်", Waves],
  ["/my#lode", "မူလရွှေသိုက်", Mountain],
  ["/my#minerals", "သတ္တုခွဲခြားခြင်း", Camera],
  ["/my/knowledge", "ဘူမိဗေဒနှင့် နမူနာ", ClipboardCheck],
  ["/my#safety", "လုံခြုံရေးနှင့် ဥပဒေ", ShieldAlert],
  ["/my#glossary", "ဘူမိဗေဒဝေါဟာရ", BookOpen],
];
const pairs: Record<string, string> = {
  "/": "/en",
  "/search": "/en/search",
  "/project": "/en/project",
  "/atlas": "/en/atlas",
  "/assess": "/en/assess",
  "/knowledge": "/en/knowledge",
  "/geology": "/en/geology",
  "/tools": "/en/tools",
  "/sampling": "/en/sampling",
  "/qaqc": "/en/qaqc",
  "/planner": "/en/planner",
  "/field": "/en/field",
  "/map": "/en/map",
  "/reports": "/en/reports",
  "/backup": "/en/backup",
  "/sources": "/en/sources",
  "/copyright": "/en/copyright",
  "/about": "/en/about",
};
export default function SiteNav() {
  const path = usePathname(),
    isEn = path.startsWith("/en"),
    isMy = path.startsWith("/my"),
    [open, setOpen] = useState(false),
    [languageOpen, setLanguageOpen] = useState(false),
    [theme, setTheme] = useState<"dark" | "light">("dark"),
    menuButton = useRef<HTMLButtonElement>(null),
    overlay = useRef<HTMLDivElement>(null),
    links = isMy ? my : isEn ? en : zh;
  useEffect(() => {
    const saved = localStorage.getItem("goldfinder-theme"),
      next =
        saved === "light" ||
        (!saved && matchMedia("(prefers-color-scheme: light)").matches)
          ? "light"
          : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }, []);
  useEffect(() => {
    document.documentElement.lang = isMy ? "my" : isEn ? "en" : "zh-CN";
  }, [isMy, isEn]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const focusable = overlay.current?.querySelectorAll<HTMLElement>(
      "a[href],button:not([disabled])",
    );
    focusable?.[0]?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
      if (event.key === "Tab" && focusable?.length) {
        const first = focusable[0],
          last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);
  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("goldfinder-theme", next);
  }
  const home = isMy ? "/my" : isEn ? "/en" : "/",
    zhHref = isEn
      ? path.replace(/^\/en/, "") || "/"
      : isMy
        ? path === "/my/field"
          ? "/field"
          : path === "/my/atlas"
            ? "/atlas"
            : path === "/my/knowledge"
              ? "/knowledge"
              : path === "/my/tools"
                ? "/tools"
                : path === "/my/planner"
                  ? "/planner"
                  : path === "/my/qaqc"
                    ? "/qaqc"
                    : path === "/my/project"
                      ? "/project"
                      : path === "/my/search"
                        ? "/search"
                        : path === "/my/sources"
                          ? "/sources"
                          : path === "/my/copyright"
                            ? "/copyright"
                            : path === "/my/about"
                              ? "/about"
                              : path === "/my/reports"
                                ? "/reports"
                                : path === "/my/backup"
                                  ? "/backup"
                                  : path === "/my/map"
                                    ? "/map"
                                    : "/"
        : path,
    enHref = isEn
      ? path
      : isMy
        ? path === "/my/field"
          ? "/en/field"
          : path === "/my/atlas"
            ? "/en/atlas"
            : path === "/my/knowledge"
              ? "/en/knowledge"
              : path === "/my/tools"
                ? "/en/tools"
                : path === "/my/planner"
                  ? "/en/planner"
                  : path === "/my/qaqc"
                    ? "/en/qaqc"
                    : path === "/my/project"
                      ? "/en/project"
                      : path === "/my/search"
                        ? "/en/search"
                        : path === "/my/sources"
                          ? "/en/sources"
                          : path === "/my/copyright"
                            ? "/en/copyright"
                            : path === "/my/about"
                              ? "/en/about"
                              : path === "/my/reports"
                                ? "/en/reports"
                                : path === "/my/backup"
                                  ? "/en/backup"
                                  : path === "/my/map"
                                    ? "/en/map"
                                    : "/en"
        : pairs[path] || "/en",
    myPath = path.replace(/^\/en/, "") || "/",
    myHref = isMy
      ? path
      : myPath === "/atlas"
        ? "/my/atlas"
        : myPath === "/knowledge"
          ? "/my/knowledge"
          : myPath === "/tools"
            ? "/my/tools"
            : myPath === "/planner"
              ? "/my/planner"
              : myPath === "/qaqc"
                ? "/my/qaqc"
                : myPath === "/project"
                  ? "/my/project"
                  : myPath === "/search"
                    ? "/my/search"
                    : myPath === "/sources"
                      ? "/my/sources"
                      : myPath === "/copyright"
                        ? "/my/copyright"
                        : myPath === "/about"
                          ? "/my/about"
                          : myPath === "/field"
                            ? "/my/field"
                            : myPath === "/map"
                              ? "/my/map"
                              : myPath === "/reports"
                                ? "/my/reports"
                                : myPath === "/backup"
                                  ? "/my/backup"
                                  : "/my",
    searchHref = isMy ? "/my/search" : isEn ? "/en/search" : "/search";
  const openLabel = isMy
      ? "လမ်းညွှန်ဖွင့်ရန်"
      : isEn
        ? "Open navigation"
        : "打开导航",
    closeLabel = isMy
      ? "လမ်းညွှန်ပိတ်ရန်"
      : isEn
        ? "Close navigation"
        : "关闭导航";
  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          const main = document.getElementById("main-content");
          main?.focus();
          main?.scrollIntoView();
          history.replaceState(null, "", "#main-content");
        }}
      >
        {isMy
          ? "အဓိကအကြောင်းအရာသို့"
          : isEn
            ? "Skip to main content"
            : "跳到主要内容"}
      </a>
      <header className="site-header">
        <Link className="brand" href={home} onClick={() => setOpen(false)}>
          <TestTubes size={21} />
          <span>{isMy ? "ရွှေရှာဖွေ" : isEn ? "GOLDFINDER" : "探金"}</span>
          <small>GOLDFINDER</small>
        </Link>
        <div className="header-actions">
          <Link
            className="icon-button"
            href={searchHref}
            aria-label={
              isMy ? "ဆိုက်အတွင်း ရှာဖွေရန်" : isEn ? "Search" : "全站搜索"
            }
          >
            <Search size={18} />
          </Link>
          <button
            className="icon-button"
            onClick={toggle}
            aria-label={
              theme === "dark"
                ? isMy
                  ? "အလင်းရောင် theme သုံးရန်"
                  : isEn
                    ? "Use light theme"
                    : "切换浅色模式"
                : isMy
                  ? "အမှောင် theme သုံးရန်"
                  : isEn
                    ? "Use dark theme"
                    : "切换深色模式"
            }
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className="language-picker">
            <button
              className="language-switch"
              type="button"
              onClick={() => setLanguageOpen(!languageOpen)}
              aria-expanded={languageOpen}
              aria-controls="language-options"
              aria-label={
                isEn
                  ? "Choose language"
                  : isMy
                    ? "ဘာသာစကား ရွေးရန်"
                    : "选择语言"
              }
            >
              <Languages size={16} />
              <span>{isEn ? "English" : isMy ? "မြန်မာ" : "中文"}</span>
              <ChevronDown size={14} />
            </button>
            {languageOpen && (
              <div className="language-options" id="language-options">
                <Link
                  href={zhHref}
                  hrefLang="zh-CN"
                  onClick={() => setLanguageOpen(false)}
                  aria-current={!isEn && !isMy ? "page" : undefined}
                >
                  <b>中文</b>
                  <small>Chinese</small>
                </Link>
                <Link
                  href={enHref}
                  hrefLang="en"
                  onClick={() => setLanguageOpen(false)}
                  aria-current={isEn ? "page" : undefined}
                >
                  <b>English</b>
                  <small>EN</small>
                </Link>
                <Link
                  href={myHref}
                  hrefLang="my"
                  onClick={() => setLanguageOpen(false)}
                  aria-current={isMy ? "page" : undefined}
                >
                  <b>မြန်မာ</b>
                  <small>Myanmar</small>
                </Link>
              </div>
            )}
          </div>
          <button
            ref={menuButton}
            className="menu-button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? closeLabel : openLabel}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
            <span>
              {open
                ? isMy
                  ? "ပိတ်"
                  : isEn
                    ? "CLOSE"
                    : "关闭"
                : isMy
                  ? "မီနူး"
                  : isEn
                    ? "MENU"
                    : "菜单"}
            </span>
          </button>
        </div>
      </header>
      <div
        ref={overlay}
        id="site-menu"
        className={`nav-overlay ${open ? "is-open" : ""}`}
        aria-hidden={!open}
        aria-label={
          isMy ? "အဓိက လမ်းညွှန်" : isEn ? "Main navigation" : "主导航"
        }
      >
        <div className="nav-inner">
          <p className="eyebrow">EXPLORE GOLDFINDER</p>
          <nav>
            {links.map(([href, label, Icon]) => (
              <Link href={href} key={href} onClick={() => setOpen(false)}>
                <Icon size={19} />
                <b>{label}</b>
                <ChevronRight size={17} />
              </Link>
            ))}
          </nav>
          <div className="nav-note">
            <Info size={20} />
            <strong>
              {isMy
                ? "မြေပြင်ဆုံးဖြတ်ချက်အခြခံ"
                : isEn
                  ? "Field interpretation principle"
                  : "现场判断原则"}
            </strong>
            <p>
              {isMy
                ? "ကြည့်ရှုချက်သည် အပြီးသတ်အဖြေမဟုတ်ပါ။ ဓာတ်ပုံတစ်ပုံသည် သတ္တုအတည်ပြုချက်မဟုတ်ပါ။ ကိုယ်စားပြုနမူနာ၊ သင့်လျော်သော စမ်းသပ်မှုနှင့် ပြန်လည်စစ်ဆေးမှု လိုအပ်သည်။"
                : isEn
                  ? "Observation is not a conclusion, and a photograph is not an identification. Verify every anomaly through representative sampling, fit-for-purpose analysis, and review."
                  : "观察不是结论，图片不是鉴定。所有异常必须经过代表性取样、适用检测与复核。"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
