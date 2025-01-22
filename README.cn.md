# **mdVditor Readme**

[English](README.md)

mdVditor 是一款基于 Neutralinojs 框架开发的桌面 Markdown 笔记应用。它结合了 JavaScript/TypeScript 的前端技术和 Neutralinojs 提供的原生桌面应用能力，提供流畅、高效的 Markdown 编辑体验。

**主要功能：**

* **即时渲染：** 采用 Vditor Markdown 编辑器，实现输入即时渲染，所见即所得，无需手动切换预览。
* **丰富的 Markdown 语法支持：** Vditor 支持标准 Markdown 语法，并提供多种扩展语法，例如：
  * **GFM** (GitHub Flavored Markdown)
  * **数学公式：** 支持 KaTeX 和 MathJax 两种数学公式渲染引擎。
  * **流程图、时序图、甘特图：** 使用 mermaid 语法绘制流程图。
  * **脑图：** 使用 markmap 语法绘制脑图。
  * **图表：** 支持 ECharts 图表库。
  * **五线谱：** 支持 ABC.js 渲染五线谱。
* **桌面应用体验：** 基于 Neutralinojs 构建，提供原生桌面应用的性能和体验，体积小巧，启动速度快。
* **跨平台支持：** Neutralinojs 支持跨平台构建，mdVditor 可以在 Windows、macOS 和 Linux 等操作系统上运行。

**使用方法：**

1. **下载安装：** 从发布页面下载对应操作系统的安装包并安装。
2. **启动 mdVditor：** 运行应用程序。
3. **编辑 Markdown：** 在编辑器区域输入 Markdown 文本，会即时显示渲染后的效果。
4. **保存/打开：** 使用提供的保存和打开功能管理笔记。

**mdVditor 开发说明**

mdVditor 基于 Neutralinojs 框架构建，前端使用 Vditor.js Markdown 编辑器。

**技术栈：**

* **前端：** HTML、CSS、JavaScript/TypeScript、[Vditor](https://github.com/Vanessa219/vditor)
* **框架：**[Neutralinojs](https://www.google.com/url?sa=E&source=gmail&q=https://neutralino.js.org/)
* **构建工具：** (根据项目实际情况，通常 Neutralinojs 项目使用其自带的 CLI 工具)

**开发环境搭建：**

1. **安装 bun 或 npm/yarn/pnpm：** 或安装 Node.js 和包管理器。
2. **安装 Neutralinojs CLI：**`bun install -g @neutralinojs/cli` 或 `yarn global add @neutralinojs/cli` 或 `pnpm add -g @neutralinojs/cli`
3. **克隆代码库：**
   **Bash**

   ```
   git clone https://github.com/stxh/mdVditor.git  # 假设你仍然使用相同的仓库
   cd mdPad
   ```
4. **初始化 Neutralinojs 项目（如果需要）：** 如果是从零开始，可以使用 `neu create my-app` 创建项目。

   **注意** 本项目要使用有 `server.setVDocRoot` 的`neutralinojs`,请使用[这个PR](https://github.com/neutralinojs/neutralinojs/pull/1365)
5. **安装前端依赖：**
   **Bash**

   ```
   cd frontend
   bun install  # 或 npm install 或 yarn install 或 pnpm install
   ```
6. **运行开发服务器：**
   **Bash**

   ```
   neu run
   ```

**代码结构：**

(根据项目实际情况进行描述，以下是一个示例)

```
mdVditor/
├── neutralino.config.json         // Neutralinojs 配置文件
├── frontend/          // 前端代码
│   ├── index.html
│   ├── src/           // JavaScript/TypeScript 源代码
│   │   ├── main.js      // 或 main.ts
│   │   └── components/  // 组件
│   │       └── ...
│   ├── package.json
│   └── ...
├── main.js        // Neutralinojs 主进程入口 (可选)
└── ...
```

**关键代码片段：**

* **前端 Vditor 集成：**
  **JavaScript**

  ```
  import Vditor from 'vditor'

  const vditor = new Vditor('vditor', {
      // Vditor 配置项，例如：
      mode: 'ir', // 即时渲染模式
      height: '100%',
      // ...其他配置
  })
  ```
* **Neutralinojs API 使用：** (例如文件操作)
  **JavaScript**

  ```
  Neutralino.filesystem.readFile('./my-file.txt', (err, data) => {
      if (err) {
          console.error(err);
      } else {
          console.log(data);
      }
  });
  ```

**贡献代码、构建、其他说明**

与其他开源项目类似，你可以通过 Fork 代码库、创建分支、提交 Pull Request 的方式贡献代码。

构建应用需要使用 Neutralinojs CLI：

**Bash**

```
neu build
```

这将生成对应平台的二进制文件。

**重要变更和说明：**

* 框架已更改为 Neutralinojs。
* 前端模块使用 Vditor.js。
* 构建和运行命令使用 `neu` CLI。
* 不再使用 Go 后端。

这个更新后的文档更准确地描述了使用 Neutralinojs 和 Vditor.js 构建的 mdVditor 应用。请根据实际项目代码进行调整。
