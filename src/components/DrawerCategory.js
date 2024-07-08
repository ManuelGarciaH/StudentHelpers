import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCom from 'react-native-vector-icons/MaterialCommunityIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const DrawerCategory = ({ setVisible, selectedCategory, handleCategoryChange}) => {

  const closeDrawer = () => {
    setVisible(false); // Oculta el menú cuando se cierra el cajón
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.tittleText}>Student Helpers</Text>
      </View>
      <View style={styles.delimitador}></View>

      <TouchableOpacity  onPress={() => handleCategoryChange("Tendencias")}>
          <View style={[styles.containerCategory, selectedCategory === 'Tendencias' && styles.selectedCategory]}>
            <IconFontAwesome5 name="fire-alt" color={"black"} size={30} style={styles.icon} />
            <Text style={styles.textCategories}>Todos o tendencias</Text>
          </View>
      </TouchableOpacity>

      <View style={styles.delimitador}></View>

      <TouchableOpacity onPress={() => handleCategoryChange("Comida")}>
        <View style={[styles.containerCategory, selectedCategory === 'Comida' && styles.selectedCategory]}>
          <Icon name="fastfood" color={"black"} size={28} style={styles.icon} />
          <Text style={styles.textCategories}>Comida</Text>
        </View>
      </TouchableOpacity>
      

      <View style={styles.delimitador}></View>

      <TouchableOpacity onPress={() => handleCategoryChange("Accesorios")}>
        <View style={[styles.containerCategory, selectedCategory === 'Accesorios' && styles.selectedCategory]}>
          <IconCom name="necklace" color={"black"} size={28} style={styles.icon} />
          <Text style={styles.textCategories}>Accesorios</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.delimitador}></View>

      <TouchableOpacity onPress={() => handleCategoryChange("Intercambio")}>
      <View style={[styles.containerCategory, selectedCategory === 'Intercambio' && styles.selectedCategory]}>
          <IconFontAwesome5 name="hands-helping" color={"black"} size={22} style={styles.icon} />
          <Text style={styles.textCategories}>Intercambio</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.delimitador}></View>

      <TouchableOpacity onPress={() => handleCategoryChange("Asesorias")}>
        <View style={[styles.containerCategory, selectedCategory === 'Asesorias' && styles.selectedCategory]}>
          <IconEntypo name="open-book" color={"black"} size={28} style={styles.icon} />
          <Text style={styles.textCategories}>Asesorías</Text>
        </View>
          
      </TouchableOpacity>

      <View style={styles.delimitador}></View>

      <TouchableOpacity onPress={() => handleCategoryChange("Viaje")}>
          <View style={[styles.containerCategory, selectedCategory === 'Viaje' && styles.selectedCategory]}>
            <Icon name="map" color={"black"} size={28} style={styles.icon} />
            <Text style={styles.textCategories}>Viajes</Text>
          </View>
      </TouchableOpacity>
      
      <View style={styles.delimitador}></View>

      <TouchableOpacity onPress={() => handleCategoryChange("Otro")}>
          <View style={[styles.containerCategory, selectedCategory === 'Otro' && styles.selectedCategory]}>
            <IconAntDesign name="ellipsis1" color={"black"} size={28} style={styles.icon} />
            <Text style={styles.textCategories}>Otro</Text>
          </View>
      </TouchableOpacity>

      <View style={styles.delimitador}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#A7DBCB',
    flex: 1,
  },
  animatedBox: {
    padding: 50,
  },
  tittleText:{
    fontSize: 40,
    fontWeight: "bold",
    color: "black",
    alignSelf: "center",
  },
  delimitador:{
    height: 0.4, 
    width: wp("70%"), 
    backgroundColor: "grey"
  },
  containerCategory:{
    height: hp("6%"),
    flexDirection: "row",
    alignItems: "center",
  },
  textCategories:{
    marginLeft: "8%",
    fontSize: 16,
    color: "black",
  },
  icon:{
    marginLeft: "4.5%",
  },
  selectedCategory:{
    backgroundColor: "#8CD1A9",
    elevation: 18,
  }
});

export default DrawerCategory;