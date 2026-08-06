"use client";
import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";
import { usePathname } from "next/navigation";
import "./offline-status.css";
export default function OfflineStatus(){const path=usePathname(),[offline,setOffline]=useState(false);useEffect(()=>{const sync=()=>setOffline(!navigator.onLine);sync();addEventListener("online",sync);addEventListener("offline",sync);if(process.env.NODE_ENV==="production"&&"serviceWorker" in navigator)navigator.serviceWorker.register("/sw.js",{scope:"/"}).catch(()=>{});return()=>{removeEventListener("online",sync);removeEventListener("offline",sync)}},[]);const text=path.startsWith("/my")?"အော့ဖ်လိုင်း · သိမ်းထားသောစာမျက်နှာ":path.startsWith("/en")?"Offline · cached pages available":"离线状态 · 可使用已缓存页面";return <div className={`offline-status${offline?" is-visible":""}`} role="status" aria-live="polite" aria-hidden={!offline}><WifiOff size={17}/>{text}</div>}
