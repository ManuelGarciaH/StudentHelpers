import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { globalStyles } from '../../../globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
import { FIREBASE_DB } from '../../../Firebase';
import { collection, doc, deleteDoc} from "firebase/firestore";
import { getStorage, ref, deleteObject} from "firebase/storage";


const DeleteConfirmModal = ({userName, item}) => {
const [modalDeleteConfirm, setModalDeleteConfirm] = useState(false);

  const onCancel = () => {
    onClose();
  };
  async function deleteDocument(idDocument) {
    try {
      const publicacionesCollection = collection(FIREBASE_DB, 'publicaciones');
      const docRef = doc(publicacionesCollection, idDocument);
      await deleteDoc(docRef);
  
      console.log('Documento eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar el documento: ', error);
    }
  }

  async function deleteDirectory(title) {
    try {
      const storage = getStorage();
      const directoryRef = ref(storage, `publicaciones/${userName}/${title}/image_0.png`);
      await deleteObject(directoryRef);
      console.log('Directorio eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar el directorio: ', error);
    }
  }
  const confirmButton = () => {
    console.log(item.id)
    deleteDocument(item.id)
    deleteDirectory(item.title)
    onClose();
  }
  const openDeletePosts = ()=>{
    setModalDeleteConfirm(true);
  }
  const onClose=() => {
    setModalDeleteConfirm(false)
  }

  return (
    <View>
        <TouchableOpacity onPress={() => openDeletePosts()} >
            <View>
                <Icon name="trash" style={styles.deleteButton} size={25}/>
            </View>
        </TouchableOpacity>

    <Modal animationType="fade" transparent={true} visible={modalDeleteConfirm}
        onRequestClose={() => {
        onClose()
        }}>
            <View style={globalStyles.centerContainer}>
                <View style={styles.modalContainer}>
                    <Text style={styles.textAsk}>¿Estás seguro de que quieres borrar la publicación?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose, { marginHorizontal: 0}]}
                            onPress={onCancel}>
                            <Text style={styles.textStyle}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.button, styles.buttonClose]}
                            // onPress={() => setModalCreatePost(false)}>
                            onPress={confirmButton}>
                            <Text style={styles.textStyle}>Borrar Publicación</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    </View>
   
    
  )
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#E5422C',
        borderRadius: 20,
        height: hp("18%"),
        width: wp("92%"),
        padding: 10,
        elevation: 5,
        justifyContent: 'space-between',
    },
    textAsk:{
        color:"black",
        fontWeight: "bold",
        fontSize: 27,
        textAlign: "center",
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
    deleteButton:{
        padding: 8,
        backgroundColor:"red",
        borderRadius: 5,
        color: "black",
    },
})

export default DeleteConfirmModal