import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = { title: { default: "探金 Goldfinder", template: "%s | 探金" }, description: "科学、可验证的野外探金知识与记录工具" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body><header><Link className="brand" href="/">◈ 探金 <small>GOLDFINDER</small></Link><nav><Link href="/knowledge">知识库</Link><Link href="/field">现场系统</Link><Link href="/about">安全说明</Link></nav></header><main>{children}</main><footer><p>迹象 ≠ 金矿 · 观察 → 取样 → 检测 → 复核</p><p>教育与记录用途，不构成勘查或投资结论。</p></footer></body></html>;
}
