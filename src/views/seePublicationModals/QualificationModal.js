import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../../../globalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Modal } from 'react-native';
import { FIREBASE_DB } from '../../../Firebase';
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

const QualificationModal = ({datos, id}) => {
  const [modalQualification, setModalQualification] = useState(false);
  const [qualification, setQualification] = useState(0);

  const handleOpenModal = () =>{
    setModalQualification(true)
  }

  const handleCloseModal = () => {
    setModalQualification(false);
  };

  const handleStarPress = (star) => {
    setQualification(star);
  };

  const handleSavePress = () => {
    console.log(datos.id.length)
    if(datos.id.length==0){
      const newData = {
        id_publicacion: id,
        cinco_estrellas: 0,
        cuatro_estrellas: 0,
        tres_estrellas: 0,
        dos_estrellas: 0,
        una_estrella: 0,
      };
  
      // Incrementar el contador correspondiente según la estrella seleccionada
      switch (qualification) {
        case 5: newData.cinco_estrellas++;  break;
        case 4: newData.cuatro_estrellas++; break;
        case 3: newData.tres_estrellas++;   break;
        case 2: newData.dos_estrellas++;    break;
        case 1: newData.una_estrella++;     break;
        default:                            break;
      }
      console.log("a")
      addDoc(collection(FIREBASE_DB, 'calificacion'), newData);
    }else{
      //Actualizar
      const newData = {
        id_publicacion: id,
        cinco_estrellas:  datos.countFiveStars,
        cuatro_estrellas:  datos.countFourStars,
        tres_estrellas:  datos.countThreeStars,
        dos_estrellas:  datos.countTwoStars,
        una_estrella:  datos.countOneStars,
      };
  
      // Incrementar el contador correspondiente según la estrella seleccionada
      switch (qualification) {
        case 5: newData.cinco_estrellas++;  break;
        case 4: newData.cuatro_estrellas++; break;
        case 3: newData.tres_estrellas++;   break;
        case 2: newData.dos_estrellas++;    break;
        case 1: newData.una_estrella++;     break;
        default:                            break;
      }
      const calificacionCollection = collection(FIREBASE_DB, 'calificacion');
      const docRef = doc(calificacionCollection, datos.id);
      updateDoc(docRef, newData);

      console.log("Documento actualizado exitosamente.");
    }
    setModalQualification(false);
  }

  return (
    <View>
      <TouchableOpacity onPress={handleOpenModal}>
        <View style={[globalStyles.dataButton,  styles.buttonGetModule, styles.buttonClose]}>
          <Icon name="star" style={globalStyles.dataIcon}/>
          <Text style={globalStyles.dataTxtButton}>Calificar Publicación</Text>
        </View>
      </TouchableOpacity>

        <Modal animationType="fade" transparent={true} visible={modalQualification} onRequestClose={handleCloseModal}>
        <View style={[globalStyles.centerContainer]}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Calificar publicación</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
                  <Icon name={star <= qualification ? "star" : "star-outline"} style={styles.starIcon} />
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.buttonClose, { marginHorizontal: 0}]}
                    onPress={handleCloseModal}>
                    <Text style={styles.textStyle}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.button, styles.buttonClose]}
                    // onPress={() => setModalCreatePost(false)}>
                    onPress={handleSavePress}>
                    <Text style={styles.textStyle}>Guardar</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonGetModule:{
    padding: 9,
    elevation: 1,
    alignSelf: "center",
    width: wp("95%"),
    marginTop: 5,
    marginBottom: 10,
  },
  modalContainer: {
    backgroundColor: '#B5D8C3',
    borderRadius: 20,
    height: hp("20%"),
    width: wp("92%"),
    padding: 10,
    elevation: 5,
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  starIcon: {
    fontSize: 40,
    color: '#FABE3C',
    marginHorizontal: 5,
  },
  closeButton: {
    fontSize: 18,
    color: '#0ABEDC',
    fontWeight: 'bold',
  },
  buttonContainer:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  button: {
    padding: 10,
    elevation: 2,
    marginLeft: 20,
    marginRight: 10,
  },
  buttonClose: {
    backgroundColor: '#0ABEDC',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
  },
})

export default QualificationModal