"use client";
import Link from "next/link";
import {useMemo,useState} from "react";
import {AlertTriangle,ArrowRight,Mountain,RotateCcw,TestTubes,Waves} from "lucide-react";
import "./field-assessment.css";

type Choice={label:string;value:number};
type Question={key:string;label:string;choices:Choice[]};
const placer:Question[]=[
 {key:"cracks",label:"基岩裂缝",choices:[{label:"无",value:0},{label:"少",value:10},{label:"多",value:20}]},
 {key:"blackSand",label:"黑砂",choices:[{label:"无",value:0},{label:"少",value:6},{label:"多",value:12}]},
 {key:"gravel",label:"圆砾石层",choices:[{label:"无",value:0},{label:"有",value:12}]},
 {key:"bend",label:"河流内弯",choices:[{label:"否",value:0},{label:"是",value:10}]},
 {key:"boulder",label:"巨石背水面",choices:[{label:"否",value:0},{label:"是",value:10}]},
 {key:"quartz",label:"上游石英脉",choices:[{label:"不清楚",value:0},{label:"有",value:8}]},
 {key:"gold",label:"标准化 10 L 淘洗见金",choices:[{label:"无",value:0},{label:"1–2 粒",value:15},{label:"3 粒以上",value:28}]}
];
const lode:Question[]=[
 {key:"vein",label:"石英脉",choices:[{label:"无",value:0},{label:"有",value:15}]},
 {key:"fracture",label:"断裂或破碎带",choices:[{label:"无",value:0},{label:"有",value:20}]},
 {key:"oxide",label:"铁锈色氧化",choices:[{label:"无",value:0},{label:"少",value:8},{label:"多",value:15}]},
 {key:"sulfide",label:"硫化物",choices:[{label:"无",value:0},{label:"有",value:15}]},
 {key:"alteration",label:"蚀变岩",choices:[{label:"无",value:0},{label:"有",value:15}]},
 {key:"creek",label:"下方溪沟见金",choices:[{label:"无",value:0},{label:"有",value:10}]},
 {key:"workings",label:"旧采坑或采掘迹象",choices:[{label:"无",value:0},{label:"有",value:10}]}
];
const enLabels:Record<string,string>={"基岩裂缝":"Bedrock cracks","黑砂":"Black sand","圆砾石层":"Rounded gravel layer","河流内弯":"Inside bend","巨石背水面":"Behind boulders","上游石英脉":"Upstream quartz veins","标准化 10 L 淘洗见金":"Visible gold in a standardised 10 L pan","石英脉":"Quartz vein","断裂或破碎带":"Fault or breccia zone","铁锈色氧化":"Iron-oxide staining","硫化物":"Sulphides","蚀变岩":"Altered rock","下方溪沟见金":"Visible gold in creek below","旧采坑或采掘迹象":"Old workings"};
const enChoice:Record<string,string>={"无":"None","少":"Some","多":"Abundant","有":"Yes","否":"No","是":"Yes","不清楚":"Unknown","1–2 粒":"1–2 particles","3 粒以上":"3+ particles"};
export default function FieldAssessment({lang="zh"}:{lang?:"zh"|"en"}){
 const [mode,setMode]=useState<"placer"|"lode">("placer"),[answers,setAnswers]=useState<Record<string,number>>({});
 const questions=mode==="placer"?placer:lode;
 const score=useMemo(()=>questions.reduce((n,q)=>n+(answers[q.key]||0),0),[answers,questions]);
 const zhResult=mode==="placer"?(score<=30?["低优先级","先完成对照样与标准化复采"]:score<=50?["建议扩大验证取样","在上下游或横向布置同体积复样"]:score<=70?["有系统取样价值","建立连续样线并记录回收率"]:["重点采样目标","加密样点、设置重复样并送检"]):(score<=30?["普通山体","没有足够组合迹象，先做基础地质记录"]:score<=50?["弱矿化迹象","沿构造方向布置代表性样品"]:score<=70?["值得系统取样","开展连续槽样并加入 QA/QC"]:["重点矿化调查带","加密地质测量和实验室验证"]);
 const enResult=mode==="placer"?(score<=30?["Low priority","Add controls and repeat with a standardised volume"]:score<=50?["Expand verification sampling","Repeat equal-volume samples upstream, downstream or laterally"]:score<=70?["Systematic sampling warranted","Build a continuous sample line and record recovery"]:["Priority sampling target","Increase sample density, duplicates and laboratory checks"]):(score<=30?["Ordinary terrain","Record baseline geology before further work"]:score<=50?["Weak mineralisation indicators","Collect representative samples along the structure"]:score<=70?["Systematic sampling warranted","Use continuous channel samples with QA/QC"]:["Priority investigation zone","Increase geological mapping and laboratory verification"]);
 const result=lang==="en"?enResult:zhResult;
 function changeMode(next:"placer"|"lode"){setMode(next);setAnswers({})}
 return <section className="assessment">
  <div className="assessment-tabs"><button className={mode==="placer"?"active":""} onClick={()=>changeMode("placer")}><Waves size={18}/>{lang==="en"?"Placer clues":"砂金线索"}</button><button className={mode==="lode"?"active":""} onClick={()=>changeMode("lode")}><Mountain size={18}/>{lang==="en"?"Lode clues":"山金线索"}</button></div>
  <div className="assessment-layout"><div className="assessment-form">{questions.map(q=><fieldset key={q.key}><legend>{lang==="en"?enLabels[q.label]:q.label}</legend><div className="choice-row">{q.choices.map(c=><button key={c.label} className={(answers[q.key]||0)===c.value&&answers[q.key]!==undefined?"selected":""} onClick={()=>setAnswers(a=>({...a,[q.key]:c.value}))}>{lang==="en"?enChoice[c.label]:c.label}</button>)}</div></fieldset>)}</div>
   <aside className="assessment-result"><div className="score"><strong>{score}</strong><span>/ 100</span></div><div className="score-track"><i style={{width:`${score}%`}}/></div><p className="score-label">{lang==="en"?"FIELD-EVIDENCE SCORE":"现场线索评分"}</p><h2>{result[0]}</h2><p>{result[1]}</p><div className="assessment-warning"><AlertTriangle size={18}/><span>{lang==="en"?"This heuristic ranks sampling targets. It is not gold probability, grade, a resource estimate, or mining permission.":"本评分只用于排序取样目标，不代表含金概率、品位、资源量或采矿许可。"}</span></div><div className="assessment-actions"><Link className="button" href={lang==="en"?"/en/sampling":"/sampling"}><TestTubes size={17}/>{lang==="en"?"Calculate grade":"计算品位"}</Link><Link className="button secondary" href={lang==="en"?"/en/field":"/field"}>{lang==="en"?"Create sample record":"建立样品档案"}<ArrowRight size={17}/></Link></div><button className="reset" onClick={()=>setAnswers({})}><RotateCcw size={15}/>{lang==="en"?"Reset":"重置"}</button></aside>
  </div>
 </section>
}
