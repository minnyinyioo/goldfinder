const sources=[
['USGS：Gold','黄金的性质、原生矿与砂矿形成、重力富集','https://pubs.usgs.gov/gip/prospect1/goldgip.html'],
['USGS：Prospecting for Gold in the United States','砂矿、淘金盘、土地许可与勘查边界','https://pubs.usgs.gov/gip/prospect2/prospectgip.html'],
['USGS Bulletin 1857-G：Gold in placer deposits','砂金形成、搬运、再富集与典型矿区','https://pubs.usgs.gov/publication/b1857G'],
['USGS Circular 612','自然金在矿物中的赋存与成分','https://www.usgs.gov/publications/gold-minerals-and-composition-native-gold'],
['USGS OFR 2011-1187','地球化学数据 QA/QC、污染、重复样与解释责任','https://www.usgs.gov/publications/quality-assurance-and-quality-control-geochemical-data-a-primer-research-scientist'],
['USGS Circular 1138','地球化学样品交接链与证据样管理','https://pubs.usgs.gov/circ/1997/c1138/c1138.htm'],
['USGS OFR 94-458','河床沉积物取样、设备清洁和质量控制','https://water.usgs.gov/nawqa/pnsp/pubs/ofr94-458/'],
['Geoscience Australia AIMR 2025','矿产资源与金矿化背景；资料采用 CC BY 4.0','https://www.ga.gov.au/aimr2025'],
['Wikimedia Commons','本站图鉴图片的作者、原图与逐张许可记录','https://commons.wikimedia.org/']
 ,['WIPO《伯尔尼公约》概要','国际版权的国民待遇、自动保护和独立保护原则','https://www.wipo.int/en/web/treaties/ip/berne/summary_berne']
 ,['Wikimedia Commons 外部复用指南','逐张图片核对署名、许可链接、改编和相同方式共享要求','https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia/en']
 ,['USAGov 政府资料版权说明','政府网站内容、美国政府作品及境外使用的版权边界','https://www.usa.gov/government-copyright']
];
export default function Sources(){return <><div className="page-head"><p className="eyebrow">REFERENCES & LICENCES</p><h1>参考资料与图片来源</h1><p className="lead">优先采用地质调查机构、政府出版物与可核验开放许可图片。资料访问日期：2026-08-04。</p></div><section className="content">{sources.map(([t,d,u],i)=><article key={u}><h2>{i+1}. {t}</h2><p>{d}</p><p><a className="button secondary" href={u} target="_blank" rel="noreferrer">打开原始资料</a></p></article>)}<div className="notice">本站将“资料来源”和“图片许可”分开记录。外部资料可能更新；涉及法律、许可、资源量或安全的事项应向所在地主管部门和合资格专业人员核实。</div></section></>}
