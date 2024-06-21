import { View, Text, StyleSheet, Image, TouchableOpacity  } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useEffect, useState } from 'react';
import { globalStyles } from '../../globalStyles'
import PerfilHeader from '../components/PerfilHeader';
import Swiper from 'react-native-swiper';
import TraceRouteBotton from './seePublicationModals/TraceRouteBotton';
import SeeRouteTravel from './seePublicationModals/SeeRouteTravel';
import { ScrollView } from 'react-native-virtualized-view';
import PorcentageBar from '../components/PorcentageBar';
import AverageStars from '../components/AverageStars';
import QualificationModal from './seePublicationModals/QualificationModal';

import { FIREBASE_DB } from '../../Firebase';
import { collection, getDocs, query, where } from "firebase/firestore";
import ModalLoading from '../components/ModalLoading';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import GenerateCode from './seePublicationModals/GenerateCode';

const VerPublicacion = ({navigation, route}) => {
    const { datos } = route.params;
    const isOwner = route.params.isOwner
    const [currentPage, setCurrentPage] = useState(0);
    const percentage = (50 / 100) * 100;
    const [downloadedStarsCounter, setDownloadedStarsCounter] = useState([]);
    const [totalStars, setTotalStars] = useState(0)

    const imagenes = datos.images.map(image => ({ uri: image }));

    useEffect(() => {
        const getQualification = async () => {
          try {
            const postsCollection = collection(FIREBASE_DB, "calificacion");
            const querySnapshot = await getDocs(query(postsCollection, where("id_publicacion", "==", datos.id)));
            if (querySnapshot.empty) {
              console.log("No hay documentos en la colección 'calificacion'");
              const defaultStarsData = {
                id: '',
                countFiveStars: 0,
                countFourStars: 0,
                countThreeStars: 0,
                countTwoStars: 0,
                countOneStars: 0,
              };
              setTotalStars(0); // Establecer total en 0 cuando no hay documentos
              setDownloadedStarsCounter([defaultStarsData]);
            } else {
              const doc = querySnapshot.docs[0];
              const starsData = {
                id: doc.id,
                countFiveStars: doc.data().cinco_estrellas,
                countFourStars: doc.data().cuatro_estrellas,
                countThreeStars: doc.data().tres_estrellas,
                countTwoStars: doc.data().dos_estrellas,
                countOneStars: doc.data().una_estrella,
              };
              const total = starsData["countFiveStars"] + starsData["countFourStars"] + starsData["countThreeStars"] + starsData    ["countTwoStars"] + starsData["countOneStars"]
              setTotalStars(total)
              setDownloadedStarsCounter([starsData]); // Establecer como arreglo con un solo elemento
            }
          } catch (error) {
            console.error("Error al obtener documentos:", error);
          }
        }
      
        getQualification();
      }, []);

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const timeout = setTimeout(() => {
            waiting()
        }, 1500);
        return () => clearTimeout(timeout);
    }, []);

    const waiting = () => {
        setLoading(false)
    }

    const watchSellerProfile = () => {
        navigation.navigate("ProfileSeller", {userName: datos.userName})
    }

    return (
        <View style={globalStyles.mainContainer}>
            <View>
                {loading ? (
                // <ActivityIndicator size="large" color="#0000ff" />
                <ModalLoading visible={true}/>
                ) : (
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                    <View style={{width: wp("95%")}}>
                        <Text style={styles.titulo}>{datos.title}</Text>
                    </View>
                    <View style={styles.contendorImagenes}>
                        <Swiper style={styles.wrapper} showsButtons={false} 
                            loop={false}
                            loopClonesPerSide={1}>
                            {imagenes.map((imagen, index) => (
                                <View key={index} style={styles.slide}>
                                    <Image source={imagen} style={styles.image} />
                                </View>
                            ))}
                        </Swiper>
                    </View>
                    <View style={{width: wp("95%")}}>
                        {datos.category!="Intercambio" && <Text style={styles.textCost}>$ {datos.cost} - $ {datos.maxCost}</Text>}
                        <View style={styles.centerText}>
                            <Text style={[styles.textoDatos, styles.bold]}>Detalles: </Text>
                            <Text style={styles.textoDatos} multiline={true}>{datos.details}</Text>
                        </View>

                        <View style={styles.centerText}>
                            <Text style={[styles.textoDatos, styles.bold]}>Días: </Text>
                            <Text style={styles.textoDatos}>{datos.days.join('-')}</Text>
                        </View>

                        <View style={styles.centerText}>
                            <Text style={[styles.textoDatos, styles.bold]}>Horario: </Text>
                            <Text style={styles.textoDatos}>{datos.schedule} - {datos.scheduleEnd}</Text>
                        </View>

                        <View style={styles.centerText}>
                            <Text style={[styles.textoDatos, styles.bold]}>Contacto: </Text>   
                            <Text style={styles.textoDatos}>{datos.contact}</Text>   
                        </View>
                        <View style={styles.centerText}>
                            {datos.category != "Viaje" ? (
                                <>
                                <Text style={[styles.textoDatos, styles.bold]}>Artículos disponibles: </Text>
                                <Text style={styles.textoDatos}>{datos.cantidad}</Text>
                                </>
                            ) : (
                                <>
                                <Text style={[styles.textoDatos, styles.bold]}>Asientos disponibles: </Text>
                                <Text style={styles.textoDatos}>{datos.cantidad}</Text>
                                </>
                            )}
                        </View>
                        
                        {datos.category !="Viaje" && (
                            <View style={styles.centerText}>
                                <Text style={[styles.textoDatos, styles.bold]}>Lugar: </Text> 
                                <Text style={styles.textoDatos}>{datos.location} </Text> 
                            </View>
                        )}
                        {datos.category !="Viaje" && <TraceRouteBotton modulo={datos.location} />}
                        {datos.category =="Viaje" && <SeeRouteTravel location={datos.coordinates} />}

                        <View style={styles.containerQualification}>
                            <TouchableOpacity onPress={watchSellerProfile}>
                                <View style={styles.containerUserName}>
                                    <Text style={styles.textSell}>Vendido por: </Text>
                                    <Text style={styles.textUserName}>{datos.userName}</Text>
                                </View> 
                            </TouchableOpacity>

                            <View style={styles.starsContainer}>
                                <View style={styles.averageStarsContainer}>
                                    <AverageStars starsCounter={downloadedStarsCounter} total={totalStars} />
                                </View>
                                <View style={styles.barsStarsContainer}>
                                    <PorcentageBar quantity={downloadedStarsCounter[0].countFiveStars} total={totalStars} textStars={"5"}/>
                                    <PorcentageBar quantity={downloadedStarsCounter[0].countFourStars} total={totalStars} textStars={"4"}/>
                                    <PorcentageBar quantity={downloadedStarsCounter[0].countThreeStars} total={totalStars} textStars={"3"}/>
                                    <PorcentageBar quantity={downloadedStarsCounter[0].countTwoStars} total={totalStars} textStars={"2"}/>
                                    <PorcentageBar quantity={downloadedStarsCounter[0].countOneStars} total={totalStars} textStars={"1"} />
                                </View>
                            </View>
                            {isOwner && <GenerateCode idPost={datos.id}/>}
                        </View>
                        
                    </View>
                    {!isOwner && <QualificationModal datos={downloadedStarsCounter[0]} id={datos.id} />}
                </ScrollView>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contendorImagenes:{
        width: wp("94%"),
        height: hp("48%"),
    },
    titulo:{
        fontSize: 40,
        fontWeight: "bold",
        marginBottom: 4,
        color: "black",
        textAlign: "justify",
        alignSelf: "flex-start",
    },
    textoDatos:{
        fontSize: 18,
        color: "black",
        textAlign: "justify",
        // borderWidth: 2,
    },
    image: {
        width: wp("94%"),
        height: hp("48%"),
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerText:{
        flexDirection: "row",
        alignItems: "center",
    },
    bold:{
        fontWeight: "bold",
        fontSize: 20,
    },
    textCost:{
        marginTop: 15,
        fontSize: 28,
        fontWeight: "bold",
        color: "black",
    },
    scrollView: {
        marginTop: 5,
        flex: 1,
    },
    starsContainer:{
        flexDirection: "row",
        flex: 1,
        // marginBottom: 10,
        // marginTop: 15,
    },
    averageStarsContainer:{
        width: wp("24%"),
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "2%",
        borderRightWidth: 0.5,
        borderColor:"gray",
    },
    barsStarsContainer:{
        width: wp("70%"),
        marginLeft: "3%"
    },
    containerUserName:{
        backgroundColor: "#8CD1A9",
        padding: 5,
        flexDirection: "row",
        alignItems: "center",
        // borderRadius: 6, 
        width: "99%",
        alignSelf: "center",
        marginTop: 2,
        borderWidth: 0.5,
        borderColor: "gray",
    },
    textSell:{
        fontSize: 18,
        color: "black",
        fontWeight: "bold",
    },
    textUserName:{
        fontSize: 16,
        color: "black",
    },
    containerQualification:{
        borderColor: "black",
        elevation: 2,
        marginBottom: 10,
    }
})

export default VerPublicacion;