# 微算工程 v2.5.1 原版公式对齐包

本公开仓库保存 2026-11-18 交付的 APK、工程页面代码和验证状态。

下载文件：[`weisuan-v2.5.1-original-formulas.apk`](weisuan-v2.5.1-original-formulas.apk)

## 文件信息

- 包名：`com.weisuangongcheng.toolbox`
- 版本：`2.5.1`（versionCode 69）
- SHA-256：`641F2FED0A730EA7E8CBBA0C30666C71E27552E7C07361C65249FBA04405E7F5`
- 公式来源：用户提供的《电力测量计算器》11.26 APK（`com.Powercalculator`）。
- 来源 APK SHA-256：`2ABC70F4785EE520DBB118AB4A14F99B1A5F9BC9C4C101E4BC666DB60C5BAAB1`

## 已进行的检查

- APK 中包含 `chuangkou1` 至 `chuangkou37` 的 37 个 HTML 和 37 个 JavaScript 文件。
- 合并目录的上述 37 个 HTML 与来源 APK 对应文件逐字节一致。
- 工程 JavaScript 从来源 APK 提取还原，进行了注册/余额门控替换；32 个脚本发生了此类替换。
- 计算页面中未搜索到原“余额不足,请充值！”文本；注册登录页仍保留该文本和原功能。文本搜索不等于全部运行路径验证。
- 保留当前微算工程的自定义公式页面和弛度工具目录。
- APK v1/v2/v3 签名校验通过。

## 待完成的验证

该版本尚未完成安装和逐页运行测试；尝试安装时 ADB 未发现连接的模拟器或真机。
37 个页面的存在及来源一致性不等于逐条公式和所有计算分支均已核算正确。尚不能宣称全部功能无误，或全部运行结果已与来源软件一致。

## 签名与安装

签名证书 SHA-256：`2c219977b4709834c4db069a4bf50fc616e7416d1e773b43ffea90b6608e3c25`。

此包使用工具随附的 pyapksigner 证书，与之前维护版签名不同。它不应被视为专有的生产签名。
覆盖安装可能因签名不一致而失败。卸载旧版会清除应用本地数据，应先备份历史记录和自定义内容。

## 工程页面代码与构建工具

- [`source/assets/apk4/`](source/assets/apk4/)：直接从本仓库交付 APK 提取的工程 HTML、JavaScript、CSS、图片和依赖文件。包含 37 对工程页面 HTML/JS，以及自定义公式和弛度工具。
- [`tools/rebuild_apk.py`](tools/rebuild_apk.py)：以仓库 APK 为容器，将修改后的工程资源打包为未签名 APK。
- [`tools/patch_calculation_gate.py`](tools/patch_calculation_gate.py)、[`tools/verify_patch.py`](tools/verify_patch.py)：原交接包提供的 DEX 定点补丁和校验工具。
- [`tools/history/`](tools/history/)：本次还原、门控修改、合并和打包使用的历史脚本，保留工作目录路径供审阅；它们依赖当时本地中间文件，不是独立构建入口。

这里提供的是可修改的工程页面代码和维护脚本。原 APK 没有提供 Android Java/Kotlin 项目源码，仓库不包含完整 Android Studio/Gradle 工程。部分未修改的原版 JS 仍为原来的混淆格式，已还原并修改的脚本以可读代码保存。

从仓库根目录执行（需要 Python 3）：

```sh
python tools/rebuild_apk.py --output build/weisuan-unsigned.apk
```

使用 Android SDK Build Tools 对齐和自行签名：

```sh
zipalign -f -p 4 build/weisuan-unsigned.apk build/weisuan-aligned.apk
apksigner sign --ks /path/to/your-keystore.jks --out build/weisuan-signed.apk build/weisuan-aligned.apk
apksigner verify --verbose build/weisuan-signed.apk
```

自行签名的安装包签名和 SHA-256 会变化。重建保留容器 APK 中已打补丁的 DEX；不得对其重复执行原 DEX 补丁脚本。

本仓库不包含签名私钥、账号凭据或 Android SDK。
