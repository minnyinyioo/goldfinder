# 探金 Goldfinder

[Goldfinder](https://goldfinder.vercel.app) 是一个面向野外黄金地质观察、规范取样和样品记录的三语工具型知识库。网站以证据链为核心，帮助用户从现场迹象进入可复核的取样、计算、检测和 QA/QC 流程。

> 现场迹象只能用于确定后续验证优先级，不能单独证明存在矿体、品位或经济开采价值。

## 当前功能

- **看图识别**：用本地真实照片对照自然金、常见假金矿物、黑砂、石英脉、土质、河床和重矿物。
- **现场评分**：分别记录砂金和山金证据，输出取样优先级，不把评分表述成储量或开采结论。
- **品位计算**：计算砂金 `g/m³`，换算山金 `ppm` 与 `g/t`，并提供输入清空和示例恢复。
- **样品档案**：在设备本地保存 GPS、样品编号、照片、地层描述、淘洗或化验结果。
- **地图与样点**：管理样点、河流上下游关系、矿脉方向、异常等级和位置隐私。
- **取样规划**：覆盖定体积河床样、点样、槽样、沟槽样、混合样及上下游对照。
- **QA/QC**：记录空白样、重复样、标准样、交接链和实验室复核要求。
- **现场报告**：根据本地档案生成可打印的样点、河段、山体矿脉和送检资料。
- **备份与迁移**：导出和恢复浏览器本地数据，支持旧版记录迁移。
- **全离线应用包**：提前下载三语页面、真实图片、字体和程序资源，可在 iPhone、iPad、Android 与 Windows 上安装为独立应用。
- **知识与安全**：包含砂金、山金、地质、矿物、工具、防骗、许可、环保和现场风险资料。

## 语言与界面

- 中文：主语言和完整工具入口。
- English：专业英文页面与工具。
- မြန်မာ：专业缅甸语页面，使用 **Noto Serif Myanmar** 字体。
- 深色与浅色模式、手机／平板／电脑响应式布局、键盘操作和可访问性焦点样式。
- 全站使用真实图标，不使用表情符号作为界面图标。

## 核心计算原则

砂金体积品位：

```text
g/m³ = 黄金重量（g）÷ 原位采样体积（m³）
```

山金化验换算：

```text
1 ppm Au = 1 g/t Au
```

松散体积、原位体积、含水状态、回收率和代表性都会影响结果。单点样、单盘可见金或单张照片不能外推为整个河段或山体的平均品位。

## 数据与隐私

现场记录、样点和工具状态默认保存在浏览器本地存储中，不会自动上传到服务器。清除浏览器数据可能删除记录，请使用站内备份功能定期导出。公开报告前应隐藏敏感矿点坐标和个人信息。

## 离线安装

在进入无信号区域前打开“数据备份与隐私”，点击“下载完整离线资料”，等待进度完成，再按照页面提示安装：

- iPhone / iPad：使用 Safari 的“分享 → 添加到主屏幕”。
- Android：使用浏览器菜单中的“安装应用”。
- Windows：使用 Edge 或 Chrome 地址栏中的“安装”。

离线包包含站内三语页面、知识资料、图片、计算器和本地记录工具。地图底图由外部地图服务提供，未提前浏览过的区域断网后可能无法显示；样点坐标和本机记录不会因此丢失。首次下载和版本更新必须联网完成。

## Telegram Mini App

Goldfinder 可直接作为 Telegram Mini App 运行，生产 URL 为：

```text
https://goldfinder.vercel.app
```

在 `@BotFather` 中依次进入 `/mybots` → 选择机器人 → **Bot Settings** → **Configure Mini App** → **Enable Mini App**，并填写上述 HTTPS URL。也可以使用 `/setmenubutton` 将它设置为聊天菜单按钮。

站点已适配 Telegram 的实时深浅主题、内容安全区域、展开视口、关闭确认、原生返回按钮和 `start_param`。当前适配不会读取、储存或上传 Telegram 用户资料。后续若增加账号绑定或服务器接口，必须在服务器端验证 `Telegram.WebApp.initData`；不得信任前端的 `initDataUnsafe`，也不得把 Bot Token 写入仓库。

机器人 webhook 支持 `/start`、`/app`、`/offline` 与 `/help`，会按用户语言返回中、英或缅语欢迎说明和 Mini App 按钮。部署前在 Vercel Production 环境设置 `TELEGRAM_BOT_TOKEN` 与 `TELEGRAM_WEBHOOK_SECRET`，部署后在安全的本机终端以同名环境变量运行：

```bash
npm run telegram:setup
```

该命令会设置命令菜单、简介、聊天菜单按钮和带 secret header 验证的 webhook。不要把 Token 写进 `.env.example`、README、Issue、提交记录或聊天消息。

如果 Token 和 webhook secret 已配置在 Vercel Production，可直接从安全终端调用服务器端初始化，不必把 Bot Token 再复制到本机：

```powershell
Invoke-RestMethod -Method Post -Uri "https://goldfinder.vercel.app/api/telegram/setup" -Headers @{ Authorization = "Bearer $env:TELEGRAM_WEBHOOK_SECRET" }
```

初始化端点只接受与 Vercel `TELEGRAM_WEBHOOK_SECRET` 完全一致的 Bearer 值，并采用常量时间比较；它不会返回 Bot Token。

## 图片、资料与版权

第三方图片和资料的权利归原作者或权利人，网站按各来源页标注的许可进行教育性整理与聚合。图片版权、原始链接和资料引用集中列在站内“资料与图片来源”及“版权与免责声明”页面。

项目不构成法律、地质勘查、采矿、储量、投资或安全操作建议。用户必须遵守所在地的矿权、土地、环保、水资源、文物和职业安全规定。

## 技术架构

- Next.js App Router
- React + TypeScript
- 响应式 CSS 与深浅主题
- Leaflet 地图
- 浏览器 Local Storage 本地记录
- Next.js 字体优化与 Noto Serif Myanmar
- Vercel 自动构建和生产部署

## 本地开发

需要 Node.js 和 npm：

```bash
npm install
npm run dev
```

常用检查：

```bash
npm run typecheck
npm test
npm run build
npm run verify:deployment -- https://goldfinder.vercel.app
```

## 生产部署

仓库连接 Vercel 后，推送到默认分支会触发生产构建。框架使用 Next.js，构建命令为 `npm run build`。

- 生产站点：https://goldfinder.vercel.app
- GitHub：https://github.com/minnyinyioo/goldfinder

## 安全报告

请不要在公开 Issue 中提交密钥、私人坐标、个人身份信息或未公开矿点。安全问题和披露流程见 [SECURITY.md](SECURITY.md)。

## 许可证

仓库代码和原创内容的适用条款见 [LICENSE](LICENSE)。第三方图片、数据和引用不自动包含在仓库许可证的授权范围内，仍受各自来源许可约束。
