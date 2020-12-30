import Parser from 'rss-parser'
export const rssParser = new Parser()

/**
 * 从 string 解析 xml
 *
 * @author CaoMeiYouRen
 * @date 2020-10-17
 * @export
 * @param {string} xml
 * @returns
 */
export async function rssParserString(xml: string) {
    const rss = await rssParser.parseString(xml)
    rss.description = rss.description?.trim()
    rss.title = rss.title?.trim()
    if (rss.image) {
        rss.image.title = rss.image.title?.trim()
    }
    rss.items = rss.items?.map((e) => {
        e.title = e.title?.trim()
        e.content = e.content?.trim()
        e.contentSnippet = e.contentSnippet?.trim()
        e.guid = e.guid?.trim()
        return e
    })
    return rss
}