import * as core from '@actions/core'
import {getArticleStats, exportStats} from './dev-to'

async function run(): Promise<void> {
  try {
    const apiKey: string = core.getInput('apiKey', {required: true})
    core.setSecret(apiKey)

    const outFile: string = core.getInput('outFile')

    core.info('Fetching stats...')
    const stats = await getArticleStats(apiKey)
    core.debug(JSON.stringify(stats))

    core.info('Writing stats...')
    await exportStats(stats, outFile)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
