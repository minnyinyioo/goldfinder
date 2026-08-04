import type { Metadata } from "next";
import Link from "next/link";import SiteNav from "@/components/SiteNav";
import "./globals.css";

export const metadata: Metadata = { title: { default: "探金 Goldfinder", template: "%s | 探金" }, description: "科学、可验证的野外探金知识与记录工具" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body><div className="rights-bar">站内第三方图片与资料的权利归各原作者或权利人，并依标注许可进行教育性聚合。<Link href="/copyright">查看版权与免责声明</Link></div><SiteNav/><main>{children}</main><footer><div><Link className="brand" href="/">◈ <span>探金</span><small>GOLDFINDER</small></Link><p>迹象 ≠ 金矿 · 观察 → 取样 → 检测 → 复核</p></div><div className="footer-links"><Link href="/sources">资料与图片来源</Link><Link href="/copyright">版权与免责声明</Link><Link href="/about">安全说明</Link></div><p className="footer-legal">本站原创的中文整理、信息架构与界面设计受适用法律保护；第三方内容各自遵循其来源页所载许可。本项目不构成法律、地质、采矿或投资建议。</p></footer></body></html>;
}
