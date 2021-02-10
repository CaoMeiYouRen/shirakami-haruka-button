const env = process.env

export const NODE_ENV = env.NODE_ENV || ''

export const BASE_URL = env.BASE_URL || ''

export const HTML_TITLE = env.VUE_APP_HTML_TITLE || ''

export const RSS_BASE_URL = env.VUE_APP_RSS_BASE_URL || ''

export const BILI_UID = env.VUE_APP_BILI_UID || ''

export const PRIMARY_COLOR = env.VUE_APP_PRIMARY_COLOR || '#fff'

export const AUTHOR = env.VUE_APP_AUTHOR || ''

export const AUTHOR_BILI_UID = env.VUE_APP_AUTHOR_BILI_UID || ''

export const GITHUB_NAME = env.VUE_APP_GITHUB_NAME || ''

export const GITHUB_REPOSITORIE = env.VUE_APP_GITHUB_REPOSITORIE || ''

export const REPOSITORIE_NAME = `${GITHUB_NAME}/${GITHUB_REPOSITORIE}`

export const CDN_PATH = `https://cdn.jsdelivr.net/gh/${REPOSITORIE_NAME}@latest/public`

export const GITHUB_LINK = `https://github.com/${REPOSITORIE_NAME}`

export const COPYRIGHT = env.VUE_APP_COPYRIGHT || ''

export const POLICE = env.VUE_APP_POLICE || ''

export const ICP = env.VUE_APP_ICP || ''
