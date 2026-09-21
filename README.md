# Algorithm Sprint 30

为 Java / Agent / 全栈开发面试定制的 30 天算法手撕训练页。

## 特点

- 30 天递进路线：记忆重启 → 结构硬化 → 中档突破 → 综合变式 → 手撕模拟
- 参考牛客模板速刷 TOP101、面试高频 TOP202 与算法进阶题单
- 结合现有力扣画像定制：286 题、Hot100 约 50 题、遗忘与重复提交明显
- 浅色简洁界面；今日训练与 30 天题库均可直接跳转力扣中文站
- 浏览器本地保存进度、错题与复盘笔记
- 纯 HTML / CSS / JavaScript，无构建步骤

## 本地预览

直接打开 `dist/index.html`，或在仓库根目录运行任意静态服务器并将目录指向 `dist/`。

## 发布到 GitHub Pages（Windows 11 / PowerShell 7）

1. 在 GitHub 新建一个空仓库，建议命名为 `algorithm-sprint-30`，不要勾选 README、`.gitignore` 或 License。
2. 解压项目，在该目录打开 PowerShell 7。
3. 复制空仓库的 HTTPS 地址，然后执行：

```powershell
./publish.ps1 -Repository 'https://github.com/<你的用户名>/algorithm-sprint-30.git'
```

4. 首次推送后，打开仓库的 **Settings → Pages**，将 **Source** 设为 **GitHub Actions**。
5. 回到 **Actions**。若第一次部署因 Pages 尚未开启而失败，点击失败任务右上角的 **Re-run all jobs**。

仓库已包含完整的 Pages 工作流，后续每次推送到 `main` 都会自动更新网站。
