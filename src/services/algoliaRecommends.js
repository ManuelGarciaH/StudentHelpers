import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import recommend from '@algolia/recommend'; // Importar Algolia Recommend
import { ALGOLIA_APP_ID, ALGOLIA_API_KEY, ALGOLIA_INDEX_NAME } from '@env';


export default function RelatedProducts({ productId }) {
  const [relatedItems, setRelatedItems] = useState([]);
  useEffect(() => {
    // Obtener productos relacionados cuando el componente se monta
    fetchRelatedProducts(productId);
  }, [productId]);

  const fetchRelatedProducts = async (productId) => {
    const recommendClient = recommend (
      ALGOLIA_APP_ID,
      ALGOLIA_API_KEY,
    );
    recommendClient.getRelatedProducts([
      {
        indexName: ALGOLIA_INDEX_NAME,
        objectID: productId,
        maxRecommendations: 5,
      }
    ]).then((recommendations) =>{ 
      const relatedProducts = recommendations.results[0].hits;
      relatedProducts.forEach((product) => {
        console.log('ID:', product.objectID);
        console.log('Título:', product.titulo); // Ajusta 'title' según el campo que uses para el título en tu índice
      });
    }).catch((error) => {
      console.error('Error fetching related products:', error);
    })

    // try {
    //   const { results } = await recommendClient.getRelatedProducts([{
    //     indexName: ALGOLIA_INDEX_NAME,  
    //     objectIDs: [productId],  // Producto visto por el usuario
    //     maxRecommendations: 5,
    //   }]);
    //   console.log('Related products:', results);
    //   //setRelatedItems(results[0].hits);
    // } catch (error) {
    //   console.error('Error fetching related products:', error);
    // }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item.objectID}</Text>
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>
    </View>
  );

  return (
    <View>
      <Text>Holaa</Text>
    </View>
    // <FlatList
    //   data={relatedItems}
    //   keyExtractor={(item) => item.objectID}
    //   renderItem={renderItem}
    // />
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
