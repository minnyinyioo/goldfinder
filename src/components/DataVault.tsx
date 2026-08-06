"use client";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  Archive,
  CheckCircle2,
  Download,
  FileCheck2,
  Image as ImageIcon,
  MapPin,
  RefreshCw,
  ShieldAlert,
  Trash2,
  Upload,
} from "lucide-react";
import { strToU8, zipSync } from "fflate";
import { getAllPhotos, type StoredPhoto } from "@/lib/field-media";
import OfflinePackManager from "@/components/OfflinePackManager";
import "./data-vault.css";
type Lang = "zh" | "en" | "my";
type Sample = Record<string, unknown> & {
  id?: string;
  sample?: string;
  lat?: string;
  lng?: string;
  accuracy?: string;
};
type Mode = "exact" | "rounded" | "none";
type Restore = "merge" | "replace";
const tx = {
  zh: {
    title: "本机数据保险库",
    lead: "把样品数据库与取样计划保存为带版本标记的备份。导出前可移除或降低精确坐标；恢复前会先验证格式。",
    samples: "样品记录",
    plan: "取样计划",
    photos: "现场照片",
    local: "仅保存在当前浏览器",
    photoNote:
      "照片不嵌入 JSON。请一键下载 ZIP：其中保留每张原图、样品关联、项目、说明和逐文件 SHA-256 校验值。",
    privacy: "坐标隐私",
    exact: "保留精确坐标",
    rounded: "约化到小数点后 2 位",
    none: "删除全部坐标",
    roundedNote:
      "约化坐标仅用于降低公开分享风险，并不构成强匿名化；稀有地点仍可能被推断。",
    export: "下载完整备份",
    restore: "恢复备份",
    method: "恢复方式",
    merge: "合并并跳过重复记录",
    replace: "替换当前样品和计划",
    choose: "选择备份 JSON",
    invalid: "文件不是有效的 Goldfinder 备份，未作任何更改。",
    success: "恢复完成",
    confirmReplace: "替换将覆盖当前样品记录和取样计划。确定继续？",
    clear: "清除项目数据",
    clearLead: "仅清除样品记录和取样计划；不会删除照片或主题设置。",
    type: "输入 DELETE 确认",
    clearButton: "永久清除本机项目数据",
    cleared: "项目数据已清除。",
    manifest: "备份内容",
    schema: "格式版本",
    generated: "生成时间",
    coords: "坐标处理",
    noPlan: "尚无已保存计划",
    photoArchive: "下载照片归档 ZIP",
    backupDue: "尚未创建本机备份，建议现在下载数据与照片归档。",
    lastBackup: "最近备份",
    integrity: "SHA-256 完整性校验",
    noPhotos: "尚无可归档的现场照片。",
  },
  en: {
    title: "Device data vault",
    lead: "Save the sample database and sampling plan in a versioned backup. Remove or reduce coordinate precision before exporting; every restore is validated first.",
    samples: "Sample records",
    plan: "Sampling plan",
    photos: "Field photographs",
    local: "Stored in this browser only",
    photoNote:
      "Photos are not embedded in JSON. Download one ZIP containing every original, sample link, project, caption and per-file SHA-256 digest.",
    privacy: "Coordinate privacy",
    exact: "Keep exact coordinates",
    rounded: "Round to 2 decimal places",
    none: "Remove all coordinates",
    roundedNote:
      "Rounding lowers casual sharing risk but is not strong anonymisation; a rare location may still be inferred.",
    export: "Download full backup",
    restore: "Restore backup",
    method: "Restore method",
    merge: "Merge and skip duplicate records",
    replace: "Replace current samples and plan",
    choose: "Choose backup JSON",
    invalid: "This is not a valid Goldfinder backup. No changes were made.",
    success: "Restore complete",
    confirmReplace:
      "Replace will overwrite current samples and sampling plan. Continue?",
    clear: "Clear project data",
    clearLead:
      "Clears samples and sampling plan only; photographs and theme settings are retained.",
    type: "Type DELETE to confirm",
    clearButton: "Permanently clear device project data",
    cleared: "Project data cleared.",
    manifest: "Backup contents",
    schema: "Schema version",
    generated: "Generated",
    coords: "Coordinate handling",
    noPlan: "No saved plan",
    photoArchive: "Download photo archive ZIP",
    backupDue: "No device backup has been created yet. Download the data and photo archives now.",
    lastBackup: "Last backup",
    integrity: "SHA-256 integrity check",
    noPhotos: "There are no field photographs to archive.",
  },
  my: {
    title: "စက်တွင်း ဒေတာအရန်စင်တာ",
    lead: "နမူနာ database နှင့် sampling plan ကို version ပါသော backup အဖြစ် သိမ်းပါ။ Export မလုပ်မီ coordinate ကို ဖယ်ရှား သို့မဟုတ် တိကျမှုလျှော့နိုင်ပြီး restore မလုပ်မီ format ကို စစ်ဆေးသည်။",
    samples: "နမူနာမှတ်တမ်း",
    plan: "Sampling plan",
    photos: "ကွင်းဆင်းဓာတ်ပုံ",
    local: "ဤ browser နှင့် စက်တွင်သာ သိမ်းထားသည်",
    photoNote:
      "ဓာတ်ပုံကို JSON ထဲ မထည့်ပါ။ မူရင်းပုံတိုင်း၊ sample ချိတ်ဆက်မှု၊ project၊ caption နှင့် file တစ်ခုချင်း SHA-256 ပါသော ZIP တစ်ခုကို download လုပ်ပါ။",
    privacy: "Coordinate privacy",
    exact: "Exact coordinate ထားရန်",
    rounded: "ဒဿမ ၂ နေရာအထိ လျှော့ရန်",
    none: "Coordinate အားလုံး ဖယ်ရန်",
    roundedNote:
      "Coordinate လျှော့ခြင်းသည် သာမန်မျှဝေရာအန္တရာယ်ကို လျှော့သော်လည်း ခိုင်မာသော anonymisation မဟုတ်ပါ။ ရှားပါးနေရာကို ခန့်မှန်းနိုင်သေးသည်။",
    export: "Backup အပြည့်အစုံ download လုပ်ရန်",
    restore: "Backup ပြန်လည်ရယူရန်",
    method: "Restore နည်းလမ်း",
    merge: "ပေါင်းထည့်ပြီး ထပ်နေသော record ကို ကျော်ရန်",
    replace: "လက်ရှိ sample နှင့် plan ကို အစားထိုးရန်",
    choose: "Backup JSON ရွေးရန်",
    invalid:
      "Goldfinder backup format မမှန်ပါ။ မည်သည့်ဒေတာမျှ မပြောင်းလဲရသေးပါ။",
    success: "Restore ပြီးပါပြီ",
    confirmReplace:
      "Replace လုပ်လျှင် လက်ရှိ sample record နှင့် sampling plan ကို ရေးทับမည်။ ဆက်လုပ်မည်လား။",
    clear: "Project ဒေတာရှင်းရန်",
    clearLead:
      "Sample record နှင့် sampling plan ကိုသာ ရှင်းမည်။ ဓာတ်ပုံနှင့် theme setting မဖျက်ပါ။",
    type: "အတည်ပြုရန် DELETE ရိုက်ပါ",
    clearButton: "စက်တွင်း project ဒေတာကို အပြီးဖျက်ရန်",
    cleared: "Project ဒေတာ ရှင်းပြီးပါပြီ။",
    manifest: "Backup ပါဝင်ချက်",
    schema: "Format version",
    generated: "ထုတ်လုပ်ချိန်",
    coords: "Coordinate ကိုင်တွယ်ပုံ",
    noPlan: "သိမ်းထားသော plan မရှိသေးပါ",
    photoArchive: "ဓာတ်ပုံ archive ZIP download လုပ်ရန်",
    backupDue: "ဤစက်တွင် backup မဖန်တီးရသေးပါ။ ဒေတာနှင့် ဓာတ်ပုံ archive ကို ယခု download လုပ်ပါ။",
    lastBackup: "နောက်ဆုံး backup",
    integrity: "SHA-256 integrity စစ်ဆေးမှု",
    noPhotos: "Archive လုပ်ရန် ကွင်းဆင်းဓာတ်ပုံ မရှိသေးပါ။",
  },
} as const;
export default function DataVault({ lang }: { lang: Lang }) {
  const c = tx[lang],
    [samples, setSamples] = useState<Sample[]>([]),
    [plan, setPlan] = useState<unknown>(null),
    [mode, setMode] = useState<Mode>("none"),
    [restoreMode, setRestoreMode] = useState<Restore>("merge"),
    [phrase, setPhrase] = useState(""),
    [message, setMessage] = useState(""),
    [photos, setPhotos] = useState<StoredPhoto[]>([]),
    [lastBackup, setLastBackup] = useState(""),
    [generatedAt, setGeneratedAt] = useState(""),
    file = useRef<HTMLInputElement>(null);
  function refresh() {
    try {
      const rows = JSON.parse(
        localStorage.getItem("goldfinder-samples-v2") || "[]",
      );
      setSamples(Array.isArray(rows) ? rows : []);
    } catch {
      setSamples([]);
    }
    try {
      setPlan(
        JSON.parse(localStorage.getItem("goldfinder-sampling-plan") || "null"),
      );
    } catch {
      setPlan(null);
    }
  }
  useEffect(() => {
    refresh();
    getAllPhotos().then(setPhotos).catch(() => setPhotos([]));
    setLastBackup(localStorage.getItem("goldfinder-last-backup") || "");
    setGeneratedAt(
      new Date().toLocaleDateString(
        lang === "zh" ? "zh-CN" : lang === "my" ? "my-MM" : "en-GB",
      ),
    );
  }, [lang]);
  const located = useMemo(
    () =>
      samples.filter(
        (x) =>
          x.lat !== "" &&
          x.lng !== "" &&
          Number.isFinite(Number(x.lat)) &&
          Number.isFinite(Number(x.lng)),
      ).length,
    [samples],
  );
  const backupIsDue =
    !lastBackup || Date.now() - new Date(lastBackup).getTime() > 14 * 86400000;
  function protectedSamples() {
    return samples.map((x) => {
      const row = { ...x };
      if (mode === "none") {
        delete row.lat;
        delete row.lng;
        delete row.accuracy;
      } else if (mode === "rounded") {
        if (Number.isFinite(Number(row.lat)))
          row.lat = Number(row.lat).toFixed(2);
        if (Number.isFinite(Number(row.lng)))
          row.lng = Number(row.lng).toFixed(2);
        delete row.accuracy;
      }
      return row;
    });
  }
  function markBackup() {
    const now = new Date().toISOString();
    localStorage.setItem("goldfinder-last-backup", now);
    setLastBackup(now);
  }
  async function digest(value: string | ArrayBuffer) {
    const input = typeof value === "string" ? new TextEncoder().encode(value) : value;
    const hash = await crypto.subtle.digest("SHA-256", input);
    return Array.from(new Uint8Array(hash), (x) => x.toString(16).padStart(2, "0")).join("");
  }
  async function download() {
    const contents = { samples: protectedSamples(), samplingPlan: plan };
    const payload = {
      schema: "goldfinder.vault",
      version: 2,
      exportedAt: new Date().toISOString(),
      coordinateMode: mode,
      contents,
      integrity: { algorithm: "SHA-256", digest: await digest(JSON.stringify(contents)) },
    };
    const url = URL.createObjectURL(
        new Blob([JSON.stringify(payload, null, 2)], {
          type: "application/json",
        }),
      ),
      a = document.createElement("a");
    a.href = url;
    a.download = `goldfinder-vault-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    markBackup();
  }
  async function downloadPhotos() {
    if (!photos.length) return setMessage(c.noPhotos);
    const entries: Record<string, Uint8Array> = {};
    const manifest = [];
    for (const [index, photo] of photos.entries()) {
      const bytes = new Uint8Array(await photo.blob.arrayBuffer());
      const safeName = photo.name.replace(/[^a-zA-Z0-9._-]+/g, "-");
      const archivePath = `photos/${String(index + 1).padStart(3, "0")}-${safeName}`;
      entries[archivePath] = bytes;
      manifest.push({ ...photo, blob: undefined, archivePath, sha256: await digest(bytes.buffer) });
    }
    entries["manifest.json"] = strToU8(JSON.stringify({ schema: "goldfinder.photos", version: 1, exportedAt: new Date().toISOString(), integrity: "SHA-256 per file", photos: manifest }, null, 2));
    const url = URL.createObjectURL(new Blob([zipSync(entries, { level: 0 }) as BlobPart], { type: "application/zip" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `goldfinder-photos-${new Date().toISOString().slice(0, 10)}.zip`;
    a.click();
    URL.revokeObjectURL(url);
    markBackup();
  }
  async function restore(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      const d = JSON.parse(await f.text());
      if (
        d.schema !== "goldfinder.vault" ||
        ![1, 2].includes(d.version) ||
        !d.contents ||
        !Array.isArray(d.contents.samples)
      )
        throw new Error();
      if (d.version === 2 && d.integrity?.digest !== await digest(JSON.stringify(d.contents))) throw new Error();
      if (restoreMode === "replace" && !confirm(c.confirmReplace)) return;
      let next = d.contents.samples as Sample[];
      if (restoreMode === "merge") {
        const keys = new Set(
          samples.map((x) => String(x.id || x.sample || "")),
        );
        next = [
          ...samples,
          ...next.filter((x) => !keys.has(String(x.id || x.sample || ""))),
        ];
      }
      localStorage.setItem("goldfinder-samples-v2", JSON.stringify(next));
      if (d.contents.samplingPlan)
        localStorage.setItem(
          "goldfinder-sampling-plan",
          JSON.stringify(d.contents.samplingPlan),
        );
      else if (restoreMode === "replace")
        localStorage.removeItem("goldfinder-sampling-plan");
      refresh();
      setMessage(`${c.success}: ${next.length} ${c.samples}`);
    } catch {
      setMessage(c.invalid);
    } finally {
      e.target.value = "";
    }
  }
  function clear() {
    if (phrase !== "DELETE") return;
    localStorage.removeItem("goldfinder-samples-v2");
    localStorage.removeItem("goldfinder-sampling-plan");
    setPhrase("");
    refresh();
    setMessage(c.cleared);
  }
  return (
    <section className="vault">
      <header>
        <p className="eyebrow">LOCAL-FIRST DATA PROTECTION</p>
        <h1>
          <Archive size={34} />
          {c.title}
        </h1>
        <p>{c.lead}</p>
      </header>
      <OfflinePackManager lang={lang} />
      <div className="vault-metrics">
        <Metric icon={FileCheck2} value={samples.length} label={c.samples} />
        <Metric
          icon={MapPin}
          value={located}
          label={
            lang === "zh"
              ? "含坐标样品"
              : lang === "my"
                ? "Coordinate ပါသော sample"
                : "Located samples"
          }
        />
        <Metric
          icon={CheckCircle2}
          value={plan ? 1 : 0}
          label={plan ? c.plan : c.noPlan}
        />
        <Metric icon={ImageIcon} value={photos.length} label={c.photos} />
      </div>
      <div className="vault-backup-status" role="status">
        <ShieldAlert size={18} />
        <span>{backupIsDue ? c.backupDue : `${c.lastBackup}: ${new Date(lastBackup).toLocaleString()}`}</span>
      </div>
      <div className="vault-grid">
        <article>
          <h2>
            <Download />
            {c.export}
          </h2>
          <div className="vault-manifest">
            <b>{c.manifest}</b>
            <span>
              {c.samples}: {samples.length}
            </span>
            <span className="vault-plan-state">
              {c.plan}:{" "}
              {plan ? (
                <>
                  <CheckCircle2 size={15} />
                  {lang === "zh"
                    ? "已保存"
                    : lang === "my"
                      ? "သိမ်းထားသည်"
                      : "Saved"}
                </>
              ) : (
                "—"
              )}
            </span>
            <span>{c.schema}: goldfinder.vault / 2</span>
            <span>{c.integrity}</span>
            <span>
              {c.generated}: {generatedAt || "—"}
            </span>
          </div>
          <fieldset>
            <legend>
              <ShieldAlert size={17} />
              {c.privacy}
            </legend>
            {(["none", "rounded", "exact"] as Mode[]).map((x) => (
              <label key={x}>
                <input
                  type="radio"
                  name="coordinate-mode"
                  checked={mode === x}
                  onChange={() => setMode(x)}
                />
                <span>{c[x]}</span>
              </label>
            ))}
          </fieldset>
          <p className="vault-hint">{c.roundedNote}</p>
          <button
            className="vault-primary"
            onClick={download}
            disabled={!samples.length && !plan}
          >
            <Download size={17} />
            {c.export}
          </button>
        </article>
        <article>
          <h2>
            <Upload />
            {c.restore}
          </h2>
          <fieldset>
            <legend>
              <RefreshCw size={17} />
              {c.method}
            </legend>
            {(["merge", "replace"] as Restore[]).map((x) => (
              <label key={x}>
                <input
                  type="radio"
                  name="restore-mode"
                  checked={restoreMode === x}
                  onChange={() => setRestoreMode(x)}
                />
                <span>{c[x]}</span>
              </label>
            ))}
          </fieldset>
          <button
            className="vault-secondary"
            onClick={() => file.current?.click()}
          >
            <Upload size={17} />
            {c.choose}
          </button>
          <input
            ref={file}
            hidden
            type="file"
            accept="application/json"
            onChange={restore}
          />
          <div className="vault-photo-note">
            <ImageIcon size={19} />
            <div><p>{c.photoNote}</p><button className="vault-secondary" onClick={downloadPhotos} disabled={!photos.length}><Download size={17} />{c.photoArchive}</button></div>
          </div>
        </article>
      </div>
      {message && (
        <p className="vault-message" role="status">
          {message}
        </p>
      )}
      <section className="vault-danger">
        <div>
          <h2>
            <Trash2 size={20} />
            {c.clear}
          </h2>
          <p>{c.clearLead}</p>
        </div>
        <label>
          {c.type}
          <input
            value={phrase}
            onChange={(e) => setPhrase(e.target.value)}
            placeholder="DELETE"
          />
        </label>
        <button disabled={phrase !== "DELETE"} onClick={clear}>
          <Trash2 size={16} />
          {c.clearButton}
        </button>
      </section>
      <p className="vault-local">{c.local}</p>
    </section>
  );
}
function Metric({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Archive;
  value: string | number;
  label: string;
}) {
  return (
    <article>
      <Icon size={20} />
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  );
}
