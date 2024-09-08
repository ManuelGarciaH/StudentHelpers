import si from 'search-insights'
import { ALGOLIA_APP_ID, ALGOLIA_API_KEY, ALGOLIA_INDEX_NAME } from '@env';

si('init', {
    appId: ALGOLIA_APP_ID,
    apiKey: ALGOLIA_API_KEY,
    useCookie: false,
})

export default function useAlgoliaInsights() {
    const sendProductView = (objectID, userId) => {
        si('clickedObjectIDs', {
            authenticatedUserToken: userId,
            index: ALGOLIA_INDEX_NAME,
            eventName: 'Product Viewed',
            objectIDs: [objectID]
        })
    }
    return{
        sendProductView
    }
}

