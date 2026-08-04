import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";import SiteFooter from "@/components/SiteFooter";
import "./globals.css";
import "./chrome.css";
import "./theme.css";

export const metadata: Metadata = { title: { default: "探金 Goldfinder", template: "%s | 探金" }, description: "科学、可验证的野外探金知识与记录工具" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body><SiteNav/><main>{children}</main><SiteFooter/></body></html>;
}
