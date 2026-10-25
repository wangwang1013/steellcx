# STEELLCX Cookie 同意与隐私实施复核（本地，未发布）

**2026-10-25 暂缓发布状态：** 英／阿发布页已移除 `consent.js` 与 `consent.css` 的加载入口；下述同意机制源码、样式与测试保留，当前网页不初始化横幅，也不加载可选 Google 标签。旧浏览器中保存的同意记录不被读取。本文件其余测试结果描述此前的“启用同意界面”本地候选版，不代表当前暂缓发布版的行为。当前版本仍待核实法定公司名称、询盘数据保留规则及跨境处理事实，未获部署放行。

日期：2026-10-24。范围：静态英文／阿文页面、两种语言的装饰屏风广告落地页、`/api/rfq`、当前公开 GTM 容器及浏览器网络／Cookie。此文是工程与事实审计，不是任何国家的法律合规结论。

## 1. 实测基线与技术清单

全新 Chrome 配置、未作任何同意操作，访问当时已上线的英文广告页 `https://steellcx.com/lp/decorative-screens/`：加载 `GTM-PRR39HDN`；出现 `G-1TGM03Q2TM` 的 GA4 收集、Google Ads／DoubleClick 请求（含 `viewthroughconversion/18356233348`）；观察到 `_ga`、`_ga_1TGM03Q2TM`、`_gcl_au`、DoubleClick `test_cookie`。这是一次会话的实际网络和存储记录，不代表所有国家、浏览器或 Cookie 的完整清单。不能仅因装了 GTM 就推断特定 Cookie。Cloudflare 自动注入的电子邮件解码脚本也出现在该线上请求中，但本地 HTML 未引入其他外部脚本。

源码中除 Google Tag Manager 外未发现独立硬编码的 GA4、Google Ads、其他营销像素或外部 JS。公开 GTM 容器此前已观察到 GA4 及 `whatsapp_click`、`email_click`、`screen_quote_click`、`rfq_submit` 相关标签；账户侧的发布版本、Ads 转化目标、GA4 数据保留与受众配置未获访问，须由账户所有者核对。WhatsApp 为点击后离站链接，不是嵌入式聊天脚本。

RFQ 向 `/api/rfq` POST 姓名、公司、邮箱、电话、国家／地区、项目类型及说明；Cloudflare Function 使用 Resend 发送至销售邮箱。表单不上传文件、不要求追踪同意。`rfq_submit` 仅在 HTTP 成功且服务器返回 `{success:true}` 后触发一次；当前本地实现还要求访客已同意可选追踪，否则仍提交成功但不向 GTM 排队补报。

## 2. 本地实现

**本轮文件范围：** 英文源页 `index.html`、`pages/*.html`、`pages/products/screens/*/index.html`、`pages/lp/decorative-screens/index.html`；阿文源页 `ar/**/*.html`（新增 `ar/privacy/index.html`）；对应 37 个 `public/**/*.html`／`public/index.html`；新增 `assets/js/consent.js`、`assets/css/consent.css` 及其 `public/assets/` 副本；为成功后事件的同意闸门修改 `assets/js/contact.js`、`assets/js/lp-decorative-screens.js`、`assets/js/lp-decorative-screens-ar.js` 及部署副本；修改 `scripts/build-arabic-site.mjs`、`scripts/qa-language.mjs`、`pages/privacy.html`、`public/privacy/index.html`、本文件和 `docs/pre-release-decisions.md` 的历史状态说明。此前工作区已有其他未提交改动，本轮没有清理或提交它们。

- 对所有 HTML，移除立即执行的 GTM 和无 JavaScript 时的 `noscript` iframe（后者无法等候同意），改为在 `<head>` 同步加载站内轻量 `consent.js`。未同意、拒绝或 GPC 信号生效时，不请求 GTM、GA4 或广告标签；无 JS 时同样不加载 GTM。
- 仅在明确接受后载入一次现有 `GTM-PRR39HDN`；载入前向 dataLayer 提供 Consent Mode v2 的 `analytics_storage`、`ad_storage`、`ad_user_data`、`ad_personalization` 默认拒绝及同意更新。此为 **Basic** 模式：未同意时不启动 Google 标签，不发送无 Cookie 测量 ping。
- 英／阿文底部提示提供同层级的接受、拒绝、管理；管理对话框的可选项默认未勾选；页面保留可再次打开的隐私设置入口。键盘焦点样式与至少 44px 按钮、移动安全区域和 RTL 均已处理。关闭后记忆选择的站内 `localStorage` 键为 `steellcx_consent_v1`，有效期最多 180 天；无可用存储则仅对当前页生效。
- 撤回时立即更新 Google 同意状态、尝试删除本站可控制的 `_ga*`、`_gcl_*` 等第一方 Cookie 并重载，重载后不再请求 Google。站点不能删除 Google 设在第三方域的 Cookie；隐私告知提示可使用浏览器控制。若浏览器提供 Global Privacy Control 信号，保守地将旧同意改记为拒绝并阻止可选标签。
- 现有 RFQ API、Resend、事件名称和 `site_language` 参数未改。拒绝或未选择只影响可选事件收集，不影响询盘发送。
- 英文隐私政策改正“未使用分析／广告”的错误描述；新增对应阿文隐私页 `/ar/privacy/`，均为 `noindex, follow`、自指 canonical、不入 sitemap。未虚构邮件、GA4 或服务商的数据保留期限。

### 市场假设及必须由当地法律顾问确认的事项

**运行策略对所有地区均采用同一较严格的先同意后加载规则**，不依赖可能不准确的 IP／浏览器地区猜测；这是为 UK、EU、US、Australia、Canada、Saudi Arabia 和 UAE 提供保守基线，不等于一个配置自动满足各地法律。站点没有结账或固定商业条款，这不豁免 RFQ 与追踪义务。

| 地区 | 本地保护措施 | 发布前待定事项 |
| --- | --- | --- |
| 英国／欧盟 | 非必要 Google 标签先阻断；明确接受／拒绝；可撤回。 | 由顾问确认适用的电子隐私／UK GDPR／GDPR 规则、控制者身份、目的细分、记录与保存期限、跨境传输。英国统计用途可能存在条件性例外，不应未经判断直接套用。 |
| 美国 | 全球先同意；检测到 GPC 即禁用可选 Google 标签。 | 按目标州评估是否适用分享／出售／定向广告退出义务、GPC 和隐私权请求；不能仅凭全球 opt-in 推断覆盖所有州法。 |
| 澳大利亚 | 先同意；RFQ 与追踪分离。 | 评估 APP 适用范围、像素披露、敏感信息泄露风险及境外披露。 |
| 加拿大 | 先同意并允许拒绝、撤回。 | 核对 PIPEDA／省级规则、行为广告告知与有效同意、跨境服务商。 |
| 沙特阿拉伯 | 阿文提示与隐私页；先同意；RFQ 不以营销同意为条件。 | PDPL 下逐目的同意／其他合法依据、处理者合同、跨境传输和阿文文本审校。当前分析＋广告**合并选项需要拆分审查**。 |
| 阿联酋 | 阿文提示与隐私页；先同意。 | 核对联邦及可能适用的自由区规则、合法依据、跨境处理、必要告知及阿文文案。 |

**重要发布阻断：** 当前 GTM 容器未获权限做逐目的标签隔离，因此本地 UI 如实提供一个“分析与广告”合并可选类别，只有同意全部才载入容器。欧洲／沙特等市场可能要求按目的更细粒度的单独同意；业主、法律顾问和 GTM 管理员须决定是否拆分标签及界面。未完成该审查前，不应把此本地实现称为已合规或直接部署。还需核实法律主体／联系地址、RFQ 邮件及服务商实际保留期限、处理地点与传输依据，并由海湾阿语母语审阅隐私文案。

参考官方资料：[Google Basic／Advanced Consent Mode](https://developers.google.com/tag-platform/security/concepts/consent-mode)、[ICO 存储与访问技术指南](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/)、[EDPB Cookie Banner Taskforce](https://www.edpb.europa.eu/system/files/2023-01/edpb_20230118_report_cookie_banner_taskforce_en.pdf)、[California CPPA FAQ](https://cppa.ca.gov/faq)、[澳大利亚 OAIC 像素指南](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/organisations/tracking-pixels-and-privacy-obligations)、[加拿大 OPC 行为广告指南](https://www.priv.gc.ca/en/privacy-topics/technology/online-privacy-tracking-cookies/tracking-and-ads/gl_ba_1112/)、[沙特 SDAIA 实施条例](https://dgp.sdaia.gov.sa/wps/portal/pdp/knowledgecenter/details/PDPL2/!ut/p/z1/jZBJC8IwEIV_i4cedcaE1uUWF7BqpaLWmouk0g20KTEq-usNehH3uc3wPea9BxxC4IU45qnQuSzE1uwr7qxd1ncG9RmSetCx0aHexLZHlOC8AcsnYBG0DDAl3pC5FH0K_B89fhiGv_TDX4BJQJTX9VLgpdBZNS8SCaHf88fEPOdf5U36ArzmuwFfAhiH6VZG9zJZEdGmsaLiJFaxqh2UOWdal_u2hRZuMqHTUtc2cmfhOz6Tew3hAwblbhFexsnMrfLofGKVKzKSG4w!/dz/d5/L0lDUmlTUSEhL3dHa0FKRnNBLzROV3FpQSEhL2Vu/)、[阿联酋个人数据保护法](https://www.uaelegislation.gov.ae/en/legislations/1972/download)。

## 3. 质量验证

| 状态 | 证据 |
| --- | --- |
| PASS | 全新本地 Chrome：首页未选择、阿文广告页直达未选择、明确拒绝和拒绝后刷新：GTM 请求 0、GA4／Ads 请求 0、Google Cookie 0。 |
| PASS | 接受后仅有 1 个 GTM 脚本；接受后刷新观察到 GTM、GA4 与 Ads 请求及 `_ga*`、`_gcl_au`。阿文广告页从拒绝通过管理面板改为接受，亦观察到 Google 请求与 Cookie。 |
| PASS | 接受后撤回并重载：GTM／GA4／Ads 请求 0、Google Cookie 0；RFQ 在拒绝状态下成功／失败模拟保持原提交逻辑，而 `rfq_submit` 不触发。 |
| PASS | 模拟 GPC 信号且浏览器已有旧的同意记录：可选标签被覆盖为关闭，GTM 请求 0、Google Cookie 0、接受按钮不可用。 |
| PASS | `node scripts/build-arabic-site.mjs`、`node scripts/qa-language.mjs`：37 个部署 HTML 的语言、SEO、资产、源码同步及 RFQ 模拟通过；另以假的 Resend 请求测试 `/api/rfq` 正常请求成功、无效邮箱被拒绝，未发送真实邮件。JS 语法检查通过。390／430／768／1440px 英／阿提示无横向溢出，按钮高度 ≥44px。 |
| WARNING | 本地静态服务器不能发送真实 Cloudflare／Resend 邮件；未核对 GA4、Ads、GTM 后台设置／保留期限；未通过各目标国家实地网络或母语审校。 |
| FAIL／发布阻断 | 合并分析／广告目的的法律充分性、隐私政策法律主体和保留／跨境细节未获批准；全新线上站点在本次审计时仍有预同意追踪（本地改动未部署）。 |

本轮未提交、推送、部署或更改 Google Ads 活动设置。生产步骤须等业主、GTM 管理员及适用市场法律顾问确认后另行授权。
