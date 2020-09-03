import fetch from 'node-fetch'

import {mkdirP} from '@actions/io'
import {promises as fs} from 'fs'
import {dirname} from 'path'

const DEV_TO_URL = 'https://dev.to/api'

interface DevToArticleStats {
  public_reactions_count: number
  page_views_count: number
  comments_count: number
}

export async function getArticleStats(
  apiKey: string
): Promise<DevToArticleStats> {
  const articles = await fetchArticles(apiKey)
  return aggregateCounts(articles)
}

export async function exportStats(
  data: DevToArticleStats,
  outFile: string
): Promise<void> {
  const output = JSON.stringify(data)
  await mkdirP(dirname(outFile))
  await fs.writeFile(outFile, output, 'utf8')
}

export function aggregateCounts(
  articles: DevToArticleStats[]
): DevToArticleStats {
  return articles.reduce(
    (prev, curr) => {
      const ret = {...prev}
      ret.comments_count += curr.comments_count
      ret.page_views_count += curr.page_views_count
      ret.public_reactions_count += curr.public_reactions_count
      return ret
    },
    {public_reactions_count: 0, page_views_count: 0, comments_count: 0}
  )
}

async function fetchArticles(apiKey: string): Promise<DevToArticleStats[]> {
  let articles: DevToArticleStats[] = []
  const headers = {'api-key': apiKey}
  let result: DevToArticleStats[] = []
  let page = 1
  do {
    const response = await fetch(
      `${DEV_TO_URL}/articles/me/published?page=${page}`,
      {headers}
    )
    if (!response.ok) {
      throw Error(`Invalid response status: ${response.status}`)
    }

    result = await response.json()

    articles = articles.concat(...result)
    page++

    // wait 500ms to avoid rate-limit
    await new Promise(r => setTimeout(r, 500))
  } while (result.length > 0)

  return articles
}
