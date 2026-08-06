"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Download, HardDriveDownload, Smartphone } from "lucide-react";
import "./offline-pack.css";

type Lang = "zh" | "en" | "my";
type InstallPrompt = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const copy = {
  zh: {
    eyebrow: "OFFLINE FIELD APP",
    title: "离线应用包",
    lead: "在有网络时先下载完整资料。完成后，即使山里没有信号，知识库、图片、计算器和本机记录仍可打开。",
    download: "下载完整离线资料",
    downloading: "正在下载",
    ready: "离线资料已准备完成",
    failed: "部分资源未能下载，请联网后重试。",
    install: "安装为 App",
    installHelp: "iPhone / iPad：Safari 分享 → 添加到主屏幕；Android：浏览器菜单 → 安装应用；Windows：Edge 或 Chrome 地址栏 → 安装。",
    note: "首次下载必须联网。地图底图来自外部地图服务，未预先浏览的区域在断网时可能不显示；样点坐标、记录和报告仍保存在本机。",
  },
  en: {
    eyebrow: "OFFLINE FIELD APP",
    title: "Offline application pack",
    lead: "Download the complete reference pack while online. Knowledge, photographs, calculators and device records remain available without a signal.",
    download: "Download complete offline pack",
    downloading: "Downloading",
    ready: "Offline pack is ready",
    failed: "Some resources could not be downloaded. Reconnect and retry.",
    install: "Install as an app",
    installHelp: "iPhone / iPad: Safari Share → Add to Home Screen; Android: browser menu → Install app; Windows: use Install in the Edge or Chrome address bar.",
    note: "The first download requires a connection. Basemap tiles come from an external map service, so areas not previously viewed may be blank offline; sample coordinates, records and reports remain on the device.",
  },
  my: {
    eyebrow: "OFFLINE FIELD APP",
    title: "အော့ဖ်လိုင်း အက်ပ်အထုပ်",
    lead: "အင်တာနက်ရှိစဉ် အချက်အလက်အပြည့်အစုံကို ဒေါင်းလုဒ်လုပ်ပါ။ လိုင်းမရှိသည့်နေရာတွင် knowledge၊ ဓာတ်ပုံ၊ calculator နှင့် စက်အတွင်း record များကို ဆက်သုံးနိုင်သည်။",
    download: "အော့ဖ်လိုင်းအထုပ် အပြည့်အစုံ ဒေါင်းလုဒ်",
    downloading: "ဒေါင်းလုဒ်လုပ်နေသည်",
    ready: "အော့ဖ်လိုင်းအထုပ် အသင့်ဖြစ်ပါပြီ",
    failed: "Resource အချို့ မဒေါင်းလုဒ်နိုင်ပါ။ အင်တာနက်ဖြင့် ထပ်စမ်းပါ။",
    install: "App အဖြစ် ထည့်သွင်းရန်",
    installHelp: "iPhone / iPad: Safari Share → Add to Home Screen; Android: browser menu → Install app; Windows: Edge သို့မဟုတ် Chrome address bar မှ Install ကိုရွေးပါ။",
    note: "ပထမဆုံးဒေါင်းလုဒ်အတွက် အင်တာနက်လိုသည်။ Basemap tile များသည် ပြင်ပဝန်ဆောင်မှုမှဖြစ်သောကြောင့် ကြိုမကြည့်ထားသောနေရာများ offline တွင် မပေါ်နိုင်ပါ။ Sample coordinate၊ record နှင့် report များကို စက်ထဲတွင် ဆက်သိမ်းထားသည်။",
  },
};

export default function OfflinePackManager({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const [installPrompt, setInstallPrompt] = useState<InstallPrompt | null>(null);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [state, setState] = useState<"idle" | "loading" | "ready" | "error">("idle");

  useEffect(() => {
    const capture = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPrompt);
    };
    const receive = (event: MessageEvent) => {
      if (event.data?.type === "OFFLINE_PROGRESS") {
        setState("loading");
        setProgress({ done: event.data.done, total: event.data.total });
      }
      if (event.data?.type === "OFFLINE_COMPLETE") {
        setProgress({ done: event.data.done, total: event.data.total });
        setState(event.data.errors?.length ? "error" : "ready");
        if (!event.data.errors?.length) localStorage.setItem("goldfinder-offline-pack", "3.50.0");
      }
    };
    addEventListener("beforeinstallprompt", capture);
    navigator.serviceWorker?.addEventListener("message", receive);
    if (localStorage.getItem("goldfinder-offline-pack") === "3.50.0") setState("ready");
    return () => {
      removeEventListener("beforeinstallprompt", capture);
      navigator.serviceWorker?.removeEventListener("message", receive);
    };
  }, []);

  async function downloadPack() {
    setState("loading");
    setProgress({ done: 0, total: 0 });
    try {
      if (!("serviceWorker" in navigator)) throw new Error();
      await navigator.serviceWorker.register("/sw.js", { scope: "/" });
      const registration = await navigator.serviceWorker.ready;
      await registration.update();
      const worker = registration.active || registration.waiting || registration.installing;
      if (!worker) throw new Error();
      worker.postMessage({ type: "CACHE_OFFLINE_PACK" });
    } catch {
      setState("error");
    }
  }

  async function install() {
    if (!installPrompt) return;
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  }

  const percent = progress.total ? Math.round((progress.done / progress.total) * 100) : 0;

  return (
    <section className="offline-pack" aria-labelledby="offline-pack-title">
      <header>
        <HardDriveDownload aria-hidden="true" />
        <div>
          <p className="eyebrow">{c.eyebrow}</p>
          <h2 id="offline-pack-title">{c.title}</h2>
          <p>{c.lead}</p>
        </div>
      </header>
      <div className="offline-pack-actions">
        <button className="vault-primary" onClick={downloadPack} disabled={state === "loading"}>
          {state === "ready" ? <CheckCircle2 /> : <Download />}
          {state === "loading" ? `${c.downloading} ${percent}%` : state === "ready" ? c.ready : c.download}
        </button>
        {installPrompt && (
          <button className="vault-secondary" onClick={install}>
            <Smartphone /> {c.install}
          </button>
        )}
      </div>
      {state === "loading" && (
        <div className="offline-progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
          <span style={{ width: `${percent}%` }} />
        </div>
      )}
      {state === "error" && <p className="offline-pack-error" role="alert">{c.failed}</p>}
      <p className="offline-install-help">{c.installHelp}</p>
      <p className="offline-pack-note">{c.note}</p>
    </section>
  );
}
