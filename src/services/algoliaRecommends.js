import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../globalStyles'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import recommend from '@algolia/recommend'; // Importar Algolia Recommend
import { ALGOLIA_APP_ID, ALGOLIA_API_KEY, ALGOLIA_INDEX_NAME } from '@env';
import { FIREBASE_DB } from '../../Firebase';
import { doc, getDoc } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification';


export default function RelatedProducts({ productId }) {
  const [relatedItems, setRelatedItems] = useState([]);
  const navigation = useNavigation();
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
      //   //console.log('Título:', product.titulo); 
      // });
    }).catch((error) => {
      console.error('Error al obtener productos relacionados:', error);
    })
  };

  async function verPublicacion(publicationId) {
    const docRef = doc(FIREBASE_DB, "publicaciones", publicationId)
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const postData = {
        id: docSnap.id,
        userName: docSnap.data().nombreUsuario,
        idUser: docSnap.data().id_usuario,
        title: docSnap.data().titulo,
        details: docSnap.data().detalles,
        cost: docSnap.data().costo,
        maxCost: docSnap.data().costoMaximo,
        cantidad: docSnap.data().cantidad,
        category: docSnap.data().category,
        schedule: docSnap.data().horario,
        scheduleEnd: docSnap.data().horarioFin,
        coordinates: docSnap.data().coordenadas,
        location: docSnap.data().lugar,
        days: docSnap.data().dias,
        contact: docSnap.data().contacto,
        images: docSnap.data().image, // Agregar las URLs de las imágenes al objeto postD
        total_views: docSnap.data().total_views
      };
      navigation.navigate("VerPublicacion", { datos: postData })
    } else {
      Toast.show({
        message: 'Error al obtener el producto intente mas tarde',
        type: ALERT_TYPE.ERROR,
        duration: 3000,
      });
    }
  }

  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity style={styles.itemContainer} onPress={() => verPublicacion(item.objectID)}>
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
