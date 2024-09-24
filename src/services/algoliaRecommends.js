import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import algoliasearch from 'algoliasearch/lite';
import { algoliarecommend  } from '@algolia/recommend'; // Importar Algolia Recommend
import { ALGOLIA_APP_ID, ALGOLIA_API_KEY, ALGOLIA_INDEX_NAME } from '@env';


export default function RelatedProducts({ productId }) {
  const [relatedItems, setRelatedItems] = useState([]);
  useEffect(() => {
    // Obtener productos relacionados cuando el componente se monta
    fetchRelatedProducts(productId);
  }, [productId]);

  const fetchRelatedProducts = async (productId) => {
    const recommendClient = algoliarecommend ({
      ALGOLIA_APP_ID,
      ALGOLIA_API_KEY,
    });

    try {
      const recommendations = await recommendClient.getRelatedProducts({
        indexName: ALGOLIA_INDEX_NAME,  
        objectIDs: [productId],  // Producto visto por el usuario
        maxRecommendations: 5,
      });
      console.log('Related products:', recommendations);
      setRelatedItems(recommendations.hits);
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item.objectID}</Text>
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>
    </View>
  );

  return (
    <FlatList
      data={relatedItems}
      keyExtractor={(item) => item.objectID}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});
