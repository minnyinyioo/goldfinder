import type { Metadata, Viewport } from "next";
import SiteNav from "@/components/SiteNav";import SiteFooter from "@/components/SiteFooter";
import "./globals.css";
import "./chrome.css";
import "./theme.css";

const site="https://goldfinder.vercel.app";
export const metadata: Metadata = {
  metadataBase:new URL(site),applicationName:"Goldfinder",category:"education",creator:"Goldfinder Project",publisher:"Goldfinder Project",
  title:{default:"探金 Goldfinder — 可验证的野外地质知识与取样工具",template:"%s | 探金 Goldfinder"},
  description:"用真实图片、地质证据、代表性取样、QA/QC、地图与现场记录，科学判断沙金和山金线索。",
  keywords:["探金","沙金","山金","砂金取样","黄金地质","矿物图鉴","野外地质","QA/QC"],
  alternates:{canonical:"/",languages:{"zh-CN":"/",en:"/en","x-default":"/"}},manifest:"/manifest.webmanifest",
  openGraph:{type:"website",locale:"zh_CN",alternateLocale:"en_US",url:site,siteName:"Goldfinder",title:"探金 Goldfinder",description:"真实图片、地质证据与可验证取样组成的野外探金知识平台。",images:[{url:"/images/gold-native.jpg",width:1200,height:900,alt:"石英标本上的自然金颗粒"}]},
  twitter:{card:"summary_large_image",title:"探金 Goldfinder",description:"以证据、取样和 QA/QC 支持野外黄金地质判断。",images:["/images/gold-native.jpg"]},
  formatDetection:{telephone:false,address:false,email:false},robots:{index:true,follow:true,"max-image-preview":"large","max-snippet":-1}
};
export const viewport:Viewport={themeColor:[{media:"(prefers-color-scheme: dark)",color:"#0d0f12"},{media:"(prefers-color-scheme: light)",color:"#f4f1e9"}],colorScheme:"dark light",width:"device-width",initialScale:1,viewportFit:"cover"};
const structured={"@context":"https://schema.org","@type":"WebSite",name:"Goldfinder",alternateName:"探金",url:site,inLanguage:["zh-CN","en"],description:"Evidence-led field geology, mineral recognition, sampling and record tools.",publisher:{"@type":"Organization",name:"Goldfinder Project",url:site}};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured)}}/><SiteNav/><main>{children}</main><SiteFooter/></body></html>;
}
