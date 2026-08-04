export type Guide={id:string;title:string;summary:string;signals:string[];verify:string;warning:string};
export const guides:Guide[]=[
{id:"basics",title:"黄金与常见假金",summary:"自然金密度高、延展性强，常呈不规则片粒；黄铁矿有晶形且脆，云母会剥成薄片。",signals:["金：金黄色、压后变形、不易碎","黄铁矿：黄铜色、常见立方晶体、条痕深色","云母：闪光随角度变化、可剥片","磁铁矿：黑色且有磁性"],verify:"先用放大镜观察晶形，再做非破坏性磁性、硬度和延展性测试；关键样品送实验室。",warning:"肉眼识别不能给出含金品位。"},
{id:"formation",title:"黄金如何形成",summary:"岩金常与热液、构造通道和蚀变有关；砂金来自原生矿化风化搬运后的重力富集。",signals:["断层或剪切带提供流体通道","石英脉本身不代表含金","河流会按密度与水动力分选重矿物"],verify:"把区域地质、露头观察、系统取样和化验结果组合判断。",warning:"孤立标本不能证明连续矿体。"}
];
