import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { relatedProducts , carousel } from 'instantsearch.js/es/templates';
import { ALGOLIA_APP_ID, ALGOLIA_API_KEY, ALGOLIA_INDEX_NAME } from '@env';

//const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

function Item({ item }) {
    return JSON.stringify(item);
  }


  relatedProducts({
    container: ALGOLIA_INDEX_NAME,
    objectIDs: productId,
    templates: {
      item(recommendation) {
        return(
            <View>
              <Text>{recommendation.objectID}</Text>
              <Text>{recommendation.title}</Text>
              <Text>{recommendation.description}</Text>
            </View>
          );
      },
      layout: carousel(),
    },
  });

const styles = StyleSheet.create({})



