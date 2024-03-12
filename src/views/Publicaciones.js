import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image} from 'react-native'
import {globalStyles} from '../../globalStyles';
import BuscadorHeader from '../components/BuscadorHeader';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Publicaciones = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() =>{
      fetchData("https://randomuser.me/api/?results=20")
    }, []);
    
    const fetchData = async(url) => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json.results);
        setFilteredData(json.results);
        console.log(json.results);
      }catch(error){
        console.error(error);
      }
    }

    const verPublicacion = (item) => {
      navigation.navigate("VerPublicacion", { datos: item })
    };

    return (
      <View>
        <BuscadorHeader/>
        <View style={[globalStyles.form, {padding: 3},]}>
          <ScrollView>
              {
                filteredData.map((item, index) =>{
                  return (
                      <View key={index} > 
                        <TouchableOpacity style={styles.itemConteiner} onPress={() => verPublicacion(item)}>
                          <Image
                            source={{uri: item.picture.large}}
                            style={styles.image}
                          />
                          <View>
                            <Text style={styles.textName}>Tostilocos preparados al gusto</Text>
                            <Text style={styles.textEmail}>Lugar: {item.location.state}</Text>
                            <Text style={styles.textEmail}>Días: L-V</Text>
                            <Text style={styles.textEmail}>Horario: {item.registered.date}</Text>
                            <Text style={styles.textEmail}>Contacto Externo: {item.cell}</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                  )
                })
              }
          </ScrollView>
        </View>
      </View>
    );
}
const styles = StyleSheet.create({
  itemConteiner:{
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    elevation: 5,
    marginBottom: 10,
    width: wp("96%"),
  },
  image:{
    margin: 7,
    marginRight: 5,
    marginLeft: 10,
    width: wp("30%"),
    height: hp("15%"),
  },
  textName:{
    fontSize: 17,
    fontWeight: "600",
  },
  textEmail:{
    fontSize: 14,
  }
});

export default Publicaciones;