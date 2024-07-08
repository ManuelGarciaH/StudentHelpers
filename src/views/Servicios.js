import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { TraceRouteBotton } from '/seePublicationModals/TraceRouteBotton.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FIREBASE_DB } from '../../Firebase';

const serviciosData = [
  { 
    nombre: 'Biblioteca', 
    descripcion: 'Biblioteca del Centro Universitario de Ciencias Exactas e Ingenierías (CUCEI)',
    telefono: 'Telefono: (33) 13785900 ext. 27489',
    coreo: 'ubiblio@cucei.udg.mx',
    horario: '8:00 a 19:45 horas, de lunes a viernes y los sábados de 8:00 a 13:45 horas',
    imagen: require('../../Img/biblioteca.png') 
  },
  { 
    nombre: 'Rectoria', 
    descripcion: 'Dr. Marco Antonio Pérez Cisneros', 
    telefono: 'Telefono:  33 1378 5900, Ext: 27402, 27405 y 27429 m',
    coreo: 'rector@cucei.udg.mx',
    horario: '9:a.m.-5:p.m.',
    imagen: require('../../Img/rectoria.png') 
  },
  { 
    nombre: 'Complejo Deportivo Universitario (CDU)', 
    descripcion: 'Descripción del CDU', 
    telefono: 'Telefono: (33)13785900 ext. 27424.',
    coreo: 'cdext.deportes@red.cucei.udg.mx',
    horario: '8:00 a 19:45 horas, de lunes a viernes y los sábados de 8:00 a 13:45 horas',
    imagen: require('../../Img/cdu.png') 
  },
  { 
    nombre: 'Enfermeria', 
    descripcion: 'Servicios medicos y de enfermeria', 
    telefono: 'Telefono: (33) 1378 5900 ext. 27603',
    coreo: 'Área médica: psocucei@cucei.udg.mx\n Área nutricional: Nutripso-cucei@cucei.udg.mx \nÁrea psicológica: Psicopso-cucei@cucei.udg.mx',
    horario: '8:00 a 20:00 horas.',
    imagen: require('../../Img/enfermeria.png') 
  },
  { 
    nombre: 'Coordinacion INCO (Ingenieria en Computacion)', 
    descripcion: 'Descripción de la coordinación INCO', 
    telefono: 'Telefono: (33) 13785900 ext. 27489',
    coreo: 'ubiblio@cucei.udg.mx',
    horario: '8:00 a 19:45 horas, de lunes a viernes y los sábados de 8:00 a 13:45 horas',
    imagen: require('../../Img/inco.png') 
  },
];

const Servicios = () => {
  // const [downloadedPosts, setDownloadedPosts] = useState([]);
  // const [showNoPostsMessage, setShowNoPostsMessage] = useState(false);

  // useEffect(() => {
  //   const postsCollection = collection(FIREBASE_DB, "publicaciones");
  //   const postsQuery = query(postsCollection, where("category", "==", "Viaje"));

  //   const unsubscribe = onSnapshot(postsQuery, (querySnapshot) => {
  //     console.log("A");
  //     setDownloadedPosts([]);
  //     if (querySnapshot.empty) {
  //       console.log("No hay documentos en la colección 'modulos'");
  //       setShowNoPostsMessage(true);
  //     } else {
  //       const newPosts = [];
  //       querySnapshot.forEach((doc) => {
  //         console.log("Datos del documento:", doc.data());
  //         const postData = {
  //           id: doc.id,
  //           nombre: doc.data().title,
  //           descripcion: doc.data().description,
  //           coreo: doc.data().mail,
  //           horaio: doc.data().schedule,
  //           telefono: doc.data().phone,
  //           images: doc.data().image 
  //         };
  //         newPosts.push(postData);
  //       });
  //       console.log(newPosts);
  //       setDownloadedPosts(newPosts);
  //       setShowNoPostsMessage(false);
  //     }
  //   }, (error) => {
  //     console.error("Error al obtener documentos:", error);
  //   });

  //   return () => unsubscribe(); // Cleanup on unmount
  // }, []);

  //   const verPublicacion = (item) => {
  //     navigation.navigate("VerPublicacion", { datos: item })
  //   };

  //   useEffect(() => {
  //     const timeout = setTimeout(() => {
  //       mostrar()
  //     }, 5000);
  //     return () => clearTimeout(timeout);
  //   });

  //   const mostrar = () => {
  //     if (downloadedPosts.length === 0) {
  //       setShowNoPostsMessage(true);
  //     }else{
  //       setShowNoPostsMessage(false);
  //     }
  //     console.log("algo")
  //   }
  return (
    <View style={styles.scrollContainer}>
      <ScrollView >

        <View style={styles.content}>
          <Text style={styles.titulo}>Servicios Generales</Text>
          {serviciosData.map((servicio, index) => (
            <View key={index} style={styles.cuadro}>
              <TouchableOpacity style={styles.itemConteiner} >
                  <View style={styles.contenido}>
                    <Text style={styles.nombre}>{servicio.nombre}</Text>
                    <Text>{servicio.descripcion}</Text>
                    <Text>{servicio.telefono}</Text>
                    <Text>{servicio.coreo}</Text>
                    <Text>{servicio.horario}</Text>
                  </View>
                  <View style={styles.imageButton} >
                    <Image source={servicio.imagen} style={styles.imagen} />
                    <View style={styles.buttonUbication} >
                      <Icon name="map-marker" style={styles.dataIcon}/>
                    </View>
                  </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  buttonUbication: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor: '#A7DBCB',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 20,
    height: 50,
    width: 50,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#A7DBCB',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'grey',
  },
  cuadro: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: 'grey',
    padding: 20,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.8,
    shadowRadius: 0,
    elevation: 10,
  },
  contenido: {
    flex: 1, 
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemConteiner:{
    flexDirection: "row",
    alignItems: "center",
    width: 300,
  },
  imagen: {
    width: 80,
    height: 80,
    marginLeft: 20,
    borderRadius: 5,
  },
  dataIcon:{
    color: "white",
    fontSize: 20,
    marginRight: 0,
  },
  imageButton:{
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Servicios;
