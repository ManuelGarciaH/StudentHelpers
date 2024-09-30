import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../globalStyles'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
      setRelatedItems(relatedProducts);
      // relatedProducts.forEach((product) => {
      //   console.log('Producto:', product.image);
      //   //console.log('ID:', product.objectID);
      //   //console.log('Título:', product.titulo); // Ajusta 'title' según el campo que uses para el título en tu índice
      // });
    }).catch((error) => {
      console.error('Error fetching related products:', error);
    })
  };

  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity style={styles.itemContainer}>
        <View>
            <Image source={{
              uri: item.image
              
            }} style={styles.image}/>
        </View>
        <Text style={styles.textProduct}>{item.titulo}</Text>
        <Text style={styles.textInfo}>{item.costo}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{width: wp("95%")}}>
      <View style={styles.dataContainer}>
        <View style={styles.containerTitle}>
          <Text style={styles.textTitle}>Productos Relacionados</Text>
        </View>
        <FlatList
          data={relatedItems}
          keyExtractor={item => item.objectID}
          renderItem={renderItem}
          horizontal={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: wp("92%"),
    elevation: 4,
    marginVertical: 5,
    alignItems: "center",
  },
  dataContainer:{
    borderWidth: 1,
    borderColor: "gray",
    marginVertical: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  textTitle:{
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },
  containerTitle:{
    backgroundColor: "#8CD1A9",
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    borderWidth: 0.5,
    borderColor: "gray",
  },
  image: {
    width: wp("80%"),
    height: hp("40%"),
  },
  textInfo:{
    fontSize: 15,
    color: "black",
    textAlign: "justify",
  },
  textProduct:{
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    textAlign: "justify",
  },
});
