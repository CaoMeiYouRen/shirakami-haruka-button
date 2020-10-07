<h1 align="center">shirakami-haruka-button(豹按钮(:3っ)∋) </h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
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

### 🏠 [主页](https://github.com/CaoMeiYouRen/shirakami-haruka-button#readme)


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

所有音频在 `src\config\voices.ts` 中配置，只要增加符合以下格式的对象即可

```ts
interface VoiceInfo {
    /**
     * 标题翻译
     */
    messages: {
        zh: string
        en?: string
    }
    /**
     * 音声路径。相对于 public/voices 的路径
     */
    path: string
    /**
     * 分类标签，i18n 路径
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
