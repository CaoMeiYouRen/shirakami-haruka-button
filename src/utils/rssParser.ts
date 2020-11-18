import Parser from 'rss-parser'
import queryString from 'query-string'
export const rssParser = new Parser()
/**
 * 从 url 解析 xml
 *
 * @author CaoMeiYouRen
 * @date 2020-10-17
 * @export
 * @param {string} url
 * @param {any} [query]
 * @returns
 */
export async function rssParserURL(url: string, query: any = {}) {
    const _url = queryString.parseUrl(url)
    const rss = await rssParser.parseURL(`${_url.url}?${queryString.stringify(Object.assign({}, _url.query, query))}`)
    rss.description = rss.description?.trim()
    rss.title = rss.title?.trim()
    if (rss.image) {
        rss.image.title = rss.image.title?.trim()
    }
    rss.items = rss.items?.map(e => {
        e.title = e.title?.trim()
        e.content = e.content?.trim()
        e.contentSnippet = e.contentSnippet?.trim()
        e.guid = e.guid?.trim()
        return e
    })
    return rss
}

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
    rss.items = rss.items?.map(e => {
        e.title = e.title?.trim()
        e.content = e.content?.trim()
        e.guid = e.guid?.trim()
        return e
    })
    return rss
}