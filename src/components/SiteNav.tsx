"use client";
import Link from "next/link";
import {useEffect,useState} from "react";
import {usePathname} from "next/navigation";
const zh=[["/","首页"],["/project","项目控制台"],["/atlas","真实图鉴"],["/knowledge","知识库"],["/sampling","取样计算"],["/planner","取样规划"],["/field","样品记录"],["/map","样点地图"],["/sources","资料来源"],["/copyright","版权与免责声明"],["/about","安全说明"]];
const en=[["/en","Home"],["/en/project","Project"],["/en/atlas","Photo Atlas"],["/en/knowledge","Knowledge Base"],["/en/sampling","Sampling Tools"],["/en/planner","Sampling Design"],["/en/field","Sample Register"],["/en/map","Sample Mapping"],["/en/sources","References"],["/en/copyright","Copyright & Disclaimer"],["/en/about","Safety"]];
const pairs:Record<string,string>={"/":"/en","/project":"/en/project","/atlas":"/en/atlas","/knowledge":"/en/knowledge","/sampling":"/en/sampling","/planner":"/en/planner","/field":"/en/field","/map":"/en/map","/sources":"/en/sources","/copyright":"/en/copyright","/about":"/en/about","/en":"/","/en/project":"/project","/en/atlas":"/atlas","/en/knowledge":"/knowledge","/en/sampling":"/sampling","/en/planner":"/planner","/en/field":"/field","/en/map":"/map","/en/sources":"/sources","/en/copyright":"/copyright","/en/about":"/about"};
export default function SiteNav(){
 const path=usePathname(),isEn=path.startsWith("/en"),[open,setOpen]=useState(false),links=isEn?en:zh;
 useEffect(()=>{document.body.style.overflow=open?"hidden":"";return()=>{document.body.style.overflow=""}},[open]);
 return <>
  <header className="site-header"><Link className="brand" href={isEn?"/en":"/"} onClick={()=>setOpen(false)}>◆ <span>{isEn?"GOLDFINDER":"探金"}</span><small>{isEn?"FIELD KNOWLEDGE":"GOLDFINDER"}</small></Link><div className="header-actions"><Link className="language-switch" href={pairs[path]||(isEn?"/":"/en")} hrefLang={isEn?"zh-CN":"en"}>{isEn?"中文":"EN"}</Link><button className="menu-button" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="site-menu" aria-label={open?(isEn?"Close navigation":"关闭导航"):(isEn?"Open navigation":"打开导航")}><span>{open?(isEn?"CLOSE":"关闭"):(isEn?"MENU":"菜单")}</span><i className={open?"is-open":""}/></button></div></header>
  <div id="site-menu" className={`nav-overlay ${open?"is-open":""}`} aria-hidden={!open}><div className="nav-inner"><p className="eyebrow">EXPLORE GOLDFINDER</p><nav>{links.map(([href,label],i)=><Link href={href} key={href} onClick={()=>setOpen(false)}><span>{String(i+1).padStart(2,"0")}</span>{label}</Link>)}</nav><div className="nav-note"><strong>{isEn?"Field interpretation principle":"现场判断原则"}</strong><p>{isEn?"Observation is not a conclusion, and a photograph is not an identification. Verify every anomaly through representative sampling, fit-for-purpose analysis, and review.":"观察不是结论，图片不是鉴定。所有异常必须经过代表性取样、适用检测与复核。"}</p></div></div></div>
 </>;
}
