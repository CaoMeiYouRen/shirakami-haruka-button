<h1 align="center">shirakami-haruka-button(豹按钮(:3っ)∋) </h1>
<p>
  <a href="https://github.com/CaoMeiYouRen/shirakami-haruka-button" target="_blank">
    <img alt="Version" src="https://img.shields.io/github/package-json/v/CaoMeiYouRen/shirakami-haruka-button">
  </a>
  <a href="https://travis-ci.com/CaoMeiYouRen/shirakami-haruka-button" target="_blank">
    <img alt="build" src="https://travis-ci.com/CaoMeiYouRen/shirakami-haruka-button.svg?branch=master" />
  </a>
  <img src="https://img.shields.io/badge/node-%3E%3D12-blue.svg" />
  <a href="https://github.com/CaoMeiYouRen/shirakami-haruka-button#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/CaoMeiYouRen/shirakami-haruka-button/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/CaoMeiYouRen/shirakami-haruka-button/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/CaoMeiYouRen/shirakami-haruka-button" />
  </a>
</p>

> 豹按钮(:3っ)∋)  - 最近看到 [https://vtbbtn.org/](https://vtbbtn.org/) 这个网站，感觉很有意思，就想着能不能给 [白神遥Haruka](https://space.bilibili.com/477332594/) 也安排一个。目前只是立个项，什么时候写完看心情，也许会弃坑。
> 诚邀日语、英语翻译，本人日语、英语本当锤子，全靠机翻；诚邀剪辑man，一个人实在剪辑不过来
> 声明：本项目仅为 DD 作品，和 白神遥Haruka、P-SP 官方没有关联

### 🏠 [主页](https://github.com/CaoMeiYouRen/shirakami-haruka-button#readme)

## 演示页面

[https://haruka.fun/](https://haruka.fun/)


## 依赖要求

- node >=12

## 安装

```sh
npm install
```

## 开发

```sh
npm run dev
```

然后会自动打开浏览器，修改保存后即可查看效果。

### 新增音声

所有音频文件统一放在 `public/voices` 文件夹下，格式最好为 mp3，或者其他能在 Chrome 浏览器中正常播放的音频格式。

文件名称最好为音频内容，如果太长可以简略。

所有音频在 `src\config\voices.ts` 中配置，只要增加符合以下格式的对象即可，相同的 tag 最好放在一起配置

```ts
interface VoiceInfo {
    /**
     * 标题翻译
     */
    messages: {
        zh: string
        en?: string
        ja?: string
    }
    /**
     * 音声路径。相对于 public/voices 的路径
     */
    path: string
    /**
     * 分类标签，i18n 路径。会根据这个 tag 进行分类，tag 的翻译在 locales 文件夹下 zh/en/ja 文件中的 tags 字段中设置
     */
    tag: string
}
```

例如：

```ts
 {
     messages: {
         zh: '阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴',
         en: 'aba aba aba aba aba aba aba aba aba',
         ja: 'アルバアバアバアバアバアバアバアバアバアバアバ'
     },
     path: '阿巴阿巴阿巴.mp3',
     tag: 'Tone',
 }
```

## 编译

```sh
npm run build
```

## Lint

```
npm run lint
```

## commit

本项目遵从严格的 git commit 约束，这将用于自动化生成日志，所以请勿直接提交 git commit。

本项目使用 cz-conventional-changelog 工具来生成 git commit，使用 husky 约束 git commit

```sh
npm run commit 
#请勿直接提交git commit
#若觉得修改太多也可分开提交。先 git add 一部分，执行 git cz 提交后再提交另外一部分
```

关于选项，参考 [semantic-release](https://github.com/semantic-release/semantic-release) 的文档

-   若为BUG修复，则选择 `fix`
-   若为新增功能，则选择 `feat`，新增音声可以按这个提交。
-   若为移除某些功能，则选择 `perf`  或填写 `BREAKING CHANGE`
    -    `perf` 和其他破坏性更新，若不是为了修复BUG，原则上将拒绝该PR

## 作者


👤 **CaoMeiYouRen**

* Website: [https://space.bilibili.com/10822025](https://space.bilibili.com/10822025)
* GitHub: [@CaoMeiYouRen](https://github.com/CaoMeiYouRen)

## 🤝贡献

欢迎Contributions, issues and feature!<br />如有问题请查看 [issues page](https://github.com/CaoMeiYouRen/shirakami-haruka-button/issues).

## 支持

如果觉得这个项目有用的话请给一颗⭐️，非常感谢

## 📝 License

Copyright © 2020 [CaoMeiYouRen](https://github.com/CaoMeiYouRen).<br />
This project is [MIT](https://github.com/CaoMeiYouRen/shirakami-haruka-button/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
