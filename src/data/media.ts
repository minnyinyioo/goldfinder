export type AtlasItem = {
  slug: string;
  name: string;
  image: string;
  alt: string;
  observe: string;
  notProof: string;
  author: string;
  license: string;
  source: string;
};
export const atlasItems: AtlasItem[] = [
  {
    slug: "native-gold",
    name: "自然金与石英",
    image: "/images/gold-native.jpg",
    alt: "黑色背景下石英标本上的自然金颗粒",
    observe: "金呈不规则片状或枝状，金黄色，不显示黄铁矿常见的完整立方晶形。",
    notProof: "照片只能帮助建立视觉概念；颜色、反光和相机白平衡都会误导。",
    author: "Rama",
    license: "CC BY-SA 3.0 FR",
    source:
      "https://commons.wikimedia.org/wiki/File:Native_gold-Jenisch_95875-IMG_7459-black.jpg",
  },
  {
    slug: "pyrite",
    name: "黄铁矿（愚人金）",
    image: "/images/pyrite.jpg",
    alt: "具有明显晶面的黄铁矿标本",
    observe: "常见清楚晶面和条纹，颜色偏黄铜色；敲击后脆裂，深色条痕。",
    notProof: "黄铁矿可与某些金矿化共生，但看到黄铁矿不等于样品含金。",
    author: "Uoaei1",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Pyrit_01.jpg",
  },
  {
    slug: "chalcopyrite",
    name: "黄铜矿",
    image: "/images/chalcopyrite.jpg",
    alt: "葡萄状表面的黄铜矿标本",
    observe: "黄铜色，常有虹彩氧化膜，硬度通常低于黄铁矿。",
    notProof: "外观可能与黄金或黄铁矿混淆，需结合条痕、硬度与实验室分析。",
    author: "Didier Descouens",
    license: "CC BY-SA 3.0",
    source:
      "https://commons.wikimedia.org/wiki/File:Chalcopyrite_botro%C3%AFdale.jpg",
  },
  {
    slug: "magnetite",
    name: "磁铁矿与黑砂",
    image: "/images/magnetite.jpg",
    alt: "黑色磁铁矿晶体标本",
    observe: "黑色、强磁性，是黑砂中常见的重矿物之一。",
    notProof: "黑砂表示水动力分选了重矿物，但它本身不能证明同层存在黄金。",
    author: "Darla Sondrol / GeoDIL",
    license: "CC0",
    source:
      "https://commons.wikimedia.org/wiki/File:Magnetite_(GeoDIL_number_-_1393).jpg",
  },
  {
    slug: "muscovite",
    name: "白云母",
    image: "/images/muscovite.jpg",
    alt: "可剥成薄片的浅色云母标本",
    observe: "片状解理明显，闪光随观察角度改变，可以剥成弹性薄片。",
    notProof: "细小云母片在水中会闪亮，是常见的“假金”误判来源。",
    author: "Luis Miguel Bugallo Sánchez",
    license: "CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Mineral_Mica_GDFL006.JPG",
  },
  {
    slug: "quartz-vein",
    name: "含金热液石英脉露头",
    image: "/images/quartz-vein.jpg",
    alt: "格陵兰 Nalunaq 金矿的热液石英金矿脉露头",
    observe:
      "记录矿脉与围岩接触、厚度、走向、连续性、构造和蚀变，而非只看白色石英。",
    notProof:
      "这是已知矿山的实例；普通石英脉极其常见，不能照图推断自己的露头含金。",
    author: "James St. John",
    license: "CC BY 2.0",
    source:
      "https://commons.wikimedia.org/wiki/File:Main_Vein_(hydrothermal_quartz-gold_vein),_outcrop_exposure_at_Nalunaq_Gold_Mine.jpg",
  },
  {
    slug: "panning",
    name: "河流淘金盘操作",
    image: "/images/panning.jpg",
    alt: "BLM Alaska 人员在溪流边使用淘金盘",
    observe: "淘洗利用密度差逐步移除轻矿物，最终留下重矿物精矿。",
    notProof:
      "一盘看见金不能代表整个河段平均品位，必须记录样品体积并做重复样。",
    author: "BLM Alaska",
    license: "Public Domain",
    source:
      "https://commons.wikimedia.org/wiki/File:Gold_panning_on_Jack_Wade_Creek_(24785190007).jpg",
  },
  {
    slug: "sluice",
    name: "淘金溜槽",
    image: "/images/sluice.jpg",
    alt: "1898 年阿拉斯加矿工使用淘金盘和溜槽的历史照片",
    observe:
      "溜槽借助水流、格栅和衬垫截留较重颗粒；流量、坡度和进料决定回收效果。",
    notProof:
      "设备回收率必须用已知样或尾矿检查验证；历史照片不是现代安全操作指南。",
    author: "Unknown / University of Washington Libraries",
    license: "Public Domain",
    source:
      "https://commons.wikimedia.org/wiki/File:Gold_mining_operation_showing_miners_using_gold_pan_and_a_sluice,_Alaska,_circa_1898_(AL%2BCA_343).jpg",
  },
  {
    slug: "laterite-red",
    name: "红色富铁风化土",
    image: "/images/laterite-red.jpg",
    alt: "关岛山地的红色红土型富铁风化土实景",
    observe:
      "红至红褐色通常来自铁氧化物富集。记录土层厚度、结构、砾石含量、母岩和上下层接触关系。",
    notProof:
      "红色只说明氧化与风化环境；土色不能证明存在黄金，也不能代替系统取样和化验。",
    author: "David Burdick / NOAA",
    license: "Public Domain",
    source:
      "https://commons.wikimedia.org/wiki/File:Red_lateritic_soil_in_the_mountains_of_Guam_(line378776781).jpg",
  },
  {
    slug: "laterite-profile",
    name: "褐铁矿—腐岩—基岩风化剖面",
    image: "/images/laterite-profile.jpg",
    alt: "展示褐铁矿层、腐岩层和基岩的红土风化剖面",
    observe:
      "从上至下辨认富铁褐铁矿层、保留母岩结构的腐岩和较完整基岩；接触带应分层、等体积取样。",
    notProof:
      "照片来自镍红土研究实例；相似层序不等于含金，也不能仅凭颜色推定矿种或品位。",
    author: "Ulva Ria Irfan, Ilham Alimuddin & Irfan Bondo Pasalli",
    license: "CC BY 3.0",
    source:
      "https://commons.wikimedia.org/wiki/File:Laterite-profile-at-observation-station-11.jpg",
  },
  {
    slug: "hematite",
    name: "赤铁矿",
    image: "/images/hematite.jpg",
    alt: "博物馆收藏的金属光泽赤铁矿标本",
    observe:
      "主要成分为 Fe₂O₃，外观可呈钢灰至红褐色，条痕通常为红褐色；多数标本磁性弱或无明显磁性。",
    notProof:
      "赤铁矿可代表富铁或氧化环境，但不证明含金；颜色与光泽鉴定须结合条痕、硬度和分析。",
    author: "TomWG00",
    license: "CC0 1.0",
    source:
      "https://commons.wikimedia.org/wiki/File:Lapworth_Museum_of_Geology_-_Hematite.jpg",
  },
  {
    slug: "grey-clay-profile",
    name: "灰色黏土与河流冲积剖面",
    image: "/images/grey-clay-profile.jpg",
    alt: "河漫滩冲积物中灰色斑驳黏土与下伏砂砾层剖面",
    observe:
      "辨认表土、灰色斑驳黏土、浅色钙质黏土及下伏砂砾层。黏土顶、砂砾底和层间接触应分别取样。",
    notProof:
      "低渗黏土有时形成“假基岩”并截留重矿物，但并非所有灰黏土都是含金层或有效陷阱。",
    author: "Rodney Burton",
    license: "CC BY-SA 2.0",
    source:
      "https://commons.wikimedia.org/wiki/File:Soil_profile_in_river_alluvium,_Gt_Ouse_floodplain_SE_of_Bedford_-_geograph.org.uk_-_225985.jpg",
  },
  {
    slug: "conglomerate",
    name: "砾岩与古河道类比",
    image: "/images/conglomerate.jpg",
    alt: "含圆磨砾石和砂质基质的砾岩露头",
    observe:
      "观察砾石圆度、粒径、分选、层理、基质和侵蚀底界；只有结合几何形态与区域沉积关系才能讨论古河道。",
    notProof:
      "砾岩并不自动等于古河道或含金层；此照片仅展示外观类比，不是含金砾岩证据。",
    author: "David Medcalf",
    license: "CC BY-SA 2.0",
    source:
      "https://commons.wikimedia.org/wiki/File:A_conglomerate_outcrop_-_geograph.org.uk_-_6739240.jpg",
  },
  {
    slug: "black-sand-field",
    name: "黑砂外观实景",
    image: "/images/black-sand.jpg",
    alt: "火山海滩上黑色砂层的实景",
    observe:
      "黑砂可由磁铁矿、钛铁矿或火山岩碎屑等组成。用磁性、放大观察、密度分选和实验室分析判定成分。",
    notProof:
      "本图是火山海滩，只用于认识外观。黑砂表示重矿物或暗色碎屑富集，与黄金没有固定比例，也不能证明含金。",
    author: "Rennett Stowe",
    license: "CC BY 2.0",
    source:
      "https://commons.wikimedia.org/wiki/File:Black_Sand_Beach_(36321991232).jpg",
  },
  {
    slug: "weathered-bedrock",
    name: "风化基岩与裂隙",
    image: "/images/weathered-bedrock.jpg",
    alt: "节理被风化作用扩大的花岗岩露头",
    observe:
      "记录节理、裂隙充填、风化壳厚度及腐岩—完整岩石界线；裂隙和基岩顶面可作为重颗粒机械陷阱的取样位置。",
    notProof:
      "风化或裂隙本身不证明含金；必须用对照样、重复样和化验结果验证异常。",
    author: "Dexter Perkins / GeoDIL",
    license: "CC0 1.0",
    source:
      "https://commons.wikimedia.org/wiki/File:Weathered_granite_outcrop_(GeoDIL_number_-_1786).jpg",
  },
  {
    slug: "fresh-bedrock",
    name: "较完整的新鲜基岩",
    image: "/images/fresh-bedrock.jpg",
    alt: "较完整的新鲜花岗岩基岩露头",
    observe:
      "以锤击声、强度、矿物新鲜度和较少土化来区分新鲜基岩与腐岩，并记录节理、接触和覆盖层厚度。",
    notProof:
      "到达基岩不等于到达含金层；新鲜花岗岩也不是金矿化证据，仍需地质填图和代表性取样。",
    author: "Dexter Perkins / GeoDIL",
    license: "CC0 1.0",
    source:
      "https://commons.wikimedia.org/wiki/File:Granite_outcrop_(GeoDIL_number_-_827).jpg",
  },
  {
    slug: "ilmenite-sand",
    name: "钛铁矿砂",
    image: "/images/ilmenite-sand.jpg",
    alt: "博物馆收藏的黑色钛铁矿砂颗粒",
    observe:
      "钛铁矿通常呈黑色至棕黑色、金属或半金属光泽，磁性多弱于磁铁矿。细砂鉴定需结合磁选、显微镜和成分分析。",
    notProof:
      "黑色和较大密度不是钛铁矿的唯一特征；钛铁矿富集也不能证明同一精矿含金。",
    author: "Mx. Granger",
    license: "CC0 1.0",
    source: "https://commons.wikimedia.org/wiki/File:Ilmenite_sand.jpg",
  },
  {
    slug: "garnet",
    name: "石榴子石",
    image: "/images/garnet.jpg",
    alt: "贝尔格莱德矿物博物馆收藏的红褐色石榴子石标本",
    observe:
      "常见等轴晶形、玻璃光泽，颜色可红、褐、绿或黑；硬度通常较高且无磁性。砂级颗粒可成为重矿物组合的一部分。",
    notProof:
      "红褐色重砂不一定都是石榴子石；石榴子石是搬运与源区线索，不是黄金品位指标。",
    author: "Geologicharka",
    license: "CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Garnet_mineral.JPG",
  },
  {
    slug: "zircon",
    name: "锆石",
    image: "/images/zircon.jpg",
    alt: "南非博物馆收藏的锆石晶体标本",
    observe:
      "锆石硬度高、密度较大，可呈褐、红、黄或无色，常见四方柱状晶形；砂粒级识别通常需要放大观察或实验室矿物学。",
    notProof:
      "肉眼很难可靠识别细小锆石；其存在反映耐风化重矿物来源，不代表样品含金。",
    author: "Nkansahrexford",
    license: "CC BY 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Iziko_Mineral_Zircon.JPG",
  },
  {
    slug: "chromite",
    name: "铬铁矿",
    image: "/images/chromite.jpg",
    alt: "美国地质调查局收藏的黑色铬铁矿标本",
    observe:
      "通常黑至棕黑色、条痕深棕，呈块状或粒状，磁性可变。与磁铁矿等黑色矿物区分需依靠条痕和成分分析。",
    notProof:
      "黑色重颗粒不能仅凭外观判作铬铁矿；铬铁矿组合也不能证明伴生黄金。",
    author: "U.S. Geological Survey",
    license: "Public Domain",
    source:
      "https://commons.wikimedia.org/wiki/File:Chromite_-_USGS_Mineral_Specimens_294.jpg",
  },
  {
    slug: "placer-flakes",
    name: "细片状砂金与磁铁矿",
    image: "/images/placer-flakes.jpg",
    alt: "匈牙利德拉瓦河砂金薄片与细小黑色磁铁矿颗粒",
    observe:
      "砂金常因搬运和锤展性呈扁平薄片；图中细小黑粒为磁铁矿。用比例尺记录最大粒径、片数和形态。",
    notProof:
      "照片中的金片来自已确认标本；现场闪光颗粒不一定是金，片数也不能直接换算为 g/m³。",
    author: "James St. John",
    license: "CC BY 2.0",
    source:
      "https://commons.wikimedia.org/wiki/File:Placer_gold_flakes_(Drava_River,_Murakereszt%C3%BAr,_Hungary).jpg",
  },
  {
    slug: "coarse-pan-gold",
    name: "淘金盘中的较粗砂金",
    image: "/images/gold-pan-coarse.jpg",
    alt: "淘金盘中经淘洗集中后的较粗砂金颗粒",
    observe:
      "较粗金粒在盘中移动慢、保持金黄色且可压扁。记录原始样品体积、筛分粒级、回收过程和最终称量。",
    notProof:
      "一盘富集物不能代表河段平均品位；粗金效应会造成样间差异，必须采用足量重复样和质量控制。",
    author: "Mike Beauregard",
    license: "CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Gold_in_the_pan.jpg",
  },
  {
    slug: "arsenopyrite",
    name: "毒砂（砷黄铁矿）",
    image: "/images/arsenopyrite.jpg",
    alt: "美国地质调查局矿物标本中的银灰色毒砂",
    observe:
      "常呈银白至钢灰色金属光泽、柱状或块状晶体，硬而脆；外观可能与黄铁矿及其他灰色硫化物混淆，现场肉眼不能可靠定名。",
    notProof:
      "毒砂可出现在某些金矿化系统中，但单独出现不证明含金。含砷粉尘有毒，不要徒手研磨、加热或嗅闻碎屑。",
    author: "U.S. Geological Survey",
    license: "Public Domain",
    source:
      "https://commons.wikimedia.org/wiki/File:Arsenopyrite_-_USGS_Mineral_Specimens_073.jpg",
  },
  {
    slug: "stibnite",
    name: "辉锑矿",
    image: "/images/stibnite.jpg",
    alt: "博物馆收藏的铅灰色针柱状辉锑矿晶体",
    observe:
      "铅灰至钢灰色金属光泽，常见细长柱状或针状晶体，质软且脆。应记录它与石英、碳酸盐脉、断裂和蚀变围岩的关系。",
    notProof:
      "辉锑矿是锑矿物，某些热液金矿系统可伴生，但没有固定含金关系。避免产生粉尘，并通过代表性取样和实验室分析确认元素组合。",
    author: "Pepperedjane",
    license: "Public Domain",
    source: "https://commons.wikimedia.org/wiki/File:Stibnite.jpg",
  },
  {
    slug: "scheelite",
    name: "白钨矿",
    image: "/images/scheelite.jpg",
    alt: "加拿大安大略省白钨矿真实晶体标本",
    observe:
      "白钨矿为钨酸钙，颜色可白、黄、橙褐或灰，密度较高；部分标本在短波紫外灯下呈强烈蓝白荧光，但荧光会因成分而变化。",
    notProof:
      "白钨矿主要是钨矿物，可出现在某些矽卡岩或热液系统中，但不是黄金指示剂。紫外荧光只能帮助筛查，不能代替矿物学和化验。",
    author: "James St. John",
    license: "CC BY 2.0",
    source:
      "https://commons.wikimedia.org/wiki/File:Scheelite_(Timmins,_Ontario,_Canada)_1.jpg",
  },
  {
    slug: "galena",
    name: "方铅矿",
    image: "/images/galena.jpg",
    alt: "美国地质调查局公共领域方铅矿标本",
    observe:
      "铅灰色金属光泽、密度很高，常见立方体或直角解理面。新鲜面明亮，风化后可能失去光泽；应与磁铁矿及其他灰黑色硫化物区分。",
    notProof:
      "方铅矿是含铅矿物，某些多金属脉可能同时含金银，但没有固定比例。铅尘有害：不要现场研磨、吹扫粉末或接触后进食。",
    author: "U.S. Geological Survey / Mineral Information Institute",
    license: "Public Domain",
    source: "https://commons.wikimedia.org/wiki/File:Galena.jpg",
  },
  {
    slug: "sphalerite",
    name: "闪锌矿",
    image: "/images/sphalerite.jpg",
    alt: "美国地质调查局公共领域闪锌矿标本",
    observe:
      "颜色变化很大，可浅黄、蜜褐、红褐至近黑，树脂至金刚光泽，解理明显；深色闪锌矿可能被误认为普通黑色矿物。",
    notProof:
      "闪锌矿是主要锌矿物，可与方铅矿、黄铜矿和黄铁矿共生；这种组合提示多金属系统，不等于存在黄金或达到可采品位。",
    author: "U.S. Geological Survey / Mineral Information Institute",
    license: "Public Domain",
    source: "https://commons.wikimedia.org/wiki/File:Sphalerite.jpg",
  },
];
