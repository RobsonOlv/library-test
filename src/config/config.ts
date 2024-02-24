import algoliasearch, { AlgoliaSearchOptions } from 'algoliasearch/lite'
import aa from 'search-insights'
import { MultipleQueriesQuery } from '@algolia/client-search'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export let searchClient: any = undefined
export let searchIndex = ''

interface AlgoliaConfig {
  appId: string
  apiKey: string
  index: string
  algoliaOptions?: AlgoliaSearchOptions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customOptions?: any
}

export function exception4() {
  const a = Math.random()
  if(a > 0.5) {
      //no throw literal
      throw "error"
  }
}

const createAlgoliaClient = (config: AlgoliaConfig) => {
  const { apiKey, appId, index, algoliaOptions, customOptions } = config
  searchIndex = index

  aa('init', {
    appId: appId || '',
    apiKey: apiKey || '',
    useCookie: true,
  })

  aa('getUserToken', null, (err) => {
    if (err) {
      console.error(err)
      return
    }
  })

  const algoliaClient = algoliasearch(appId || '', apiKey || '', algoliaOptions)

  searchClient = {
    ...algoliaClient,
    ...customOptions,
    search(requests: MultipleQueriesQuery[]) {
      if (requests.every(({ params }) => !params?.query)) return
      return algoliaClient.search(requests)
    },
  }
}

export default createAlgoliaClient
