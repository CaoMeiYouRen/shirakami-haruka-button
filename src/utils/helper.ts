/**
 * 安全的打开一个新的页面，设置新窗口的 opener 为 null
 *
 * @author CaoMeiYouRen
 * @date 2021-02-10
 * @export
 * @param {string} url
 */
export function safeOpenUrl(url: string): void {
    const open = window.open(url)
    if (open) {
        open.opener = null
    }
}
