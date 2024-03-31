import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, ScrollView} from 'react-native'
import {globalStyles} from '../../globalStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import PerfilHeader from '../components/PerfilHeader';
import { Alert } from 'react-native';
import { Button, TextInput} from 'react-native-paper';
import DatePicker from 'react-native-date-picker'
import ModalSelector from 'react-native-modal-selector';
import {Controller, useForm} from 'react-hook-form';

const Perfil = () => {
  //States for modals
  const [modalCreatePost, setModalCreatePost] = useState(false);
  const [open, setOpen] = useState(false) //Open for datePicker
  const [modalLocation, setModalLocation] = useState(false);
  const [modalDays, setModalDays] = useState(false);
  const [modalContact, setModalContact] = useState(false);
  const [modalImage, setModalImage] = useState(false);

  //Auxiliar State for cast
  const [date, setDate] = useState(new Date())

  //States for inputs
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedDetails, setSelectedDetails] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedContact, setSelectedContact] = useState('');
  
  //Auxiliar states for display
  const [showDays, setShowDays] = useState([]);
  const [showContact, setShowContact] = useState([]);

  //List for modalSelector
  const [modulesList, setModulesList] = useState([]);

  const handleCategorySelect = (option) => {
    setSelectedCategory(option);
  };
  const handleTitleInput = (texto) => {
    setSelectedTitle(texto);
  };
  const handleDetailsInput = (texto) => {
    setSelectedDetails(texto);
  };

  const filterDaysSelector = (dia) => {
    const updateDays = selectedDays.includes(dia)
      ? selectedDays.filter((selectedDay) => selectedDay !== dia)
      : [...selectedDays, dia];

    const weeklyDays = ['L', 'M', 'I', 'J', 'V', 'S'];
    const sortedDays = weeklyDays.filter((dia) => updateDays.includes(dia));
    
    setSelectedDays(sortedDays);
  };

  const buttonConfirmDays = () =>{
    setShowDays(selectedDays);
    setValue('dias', selectedDays)
    setModalDays(!modalDays);
    trigger('dias')
  }

  //Run when window opens
  useEffect(() =>{
    setModulesList([]);
    const moduleOptions = [];
    let j=0;
    for (let i = 65; i <= 90; i++) {
      moduleOptions.push({
        key: i + j - 65,
        label: 'Modulo ' + String.fromCharCode(i),
      });
      if (String.fromCharCode(i) == 'V') {
        j++;
        moduleOptions.push({key: i + j - 65, label: 'Modulo V2'});
      }
    }

    moduleOptions.push({key: 27, label: 'Modulo Z2'});
    moduleOptions.push({key: 28, label: 'Modulo Alpha(DUCT1)'});
    moduleOptions.push({key: 29, label: 'Modulo Beta(DUCT2)'});
    setModulesList(moduleOptions);
  }, [])

  const { handleSubmit, control, getValues, setValue, formState: { errors }, trigger } = useForm();

  const onSubmit = (data) => {
    // Validar que al menos una categoría haya sido seleccionada
    // if (!selectedCategory) {
    //   console.log("hola")
    //   setError('category', { type: 'required', message: 'Selecciona al menos una categoría' });
    //   return;
    // }

    // Aquí puedes continuar con el envío del formulario si todo está bien
    console.log(data);
  };

  //console.log('errors ', errors)
  return (
    <View>
        {/*Perfil screen*/}
        <PerfilHeader/>
        <View style={[globalStyles.form, {padding: 5}]}>
          <Text style={styles.titleName}>Nombre de Usuario</Text>
          <View style={styles.descriptionContainer}>
            <Image
              source={require("../../Img/Sin-foto-Perfil.png")}
              style={styles.image}
            />
            <Text style={styles.textDescription}>In et ullamco consectetur minim exercitation officia proident aliquip tempor voluptate ut anim sunt velit. Elit et eiusmod sunt proident. Do ad aute proident non aute consequat consectetur irure fugiat dolor.</Text>
          </View>
          <Text style={styles.titleName}>Publicaciones</Text>
          <View style={styles.descriptionContainer}>
            <View style={[globalStyles.centrar, styles.buttonCreatePost]}>
              <Icon.Button name="plus"
                onPress={() => setModalCreatePost(true)}
              >Crear Publicación</Icon.Button>
            </View>
          </View>
        {/*Perfil screen*/}

          {/*Open Modal create post*/}
          <Modal animationType="slide" transparent={true} visible={modalCreatePost}
            onRequestClose={() => {
              setModalCreatePost(!modalCreatePost);
            }}>
            <View style={styles.centerContainer}>
              <View style={styles.modalContainer}>
                <Text style={styles.tituloModal}>Crear Publicación</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text style={styles.textModal}>Elige una categoria</Text>
                  <Controller
                    name="category"
                    control={control}
                    rules={{ required: "Selecciona una categoria" }}
                    defaultValue=""
                    render={({ field: { value, onChange } }) => (
                      <>
                        <View style={styles.buttonContainer}>
                          <Button mode={value === 'Comida' ? 'contained' : 'outlined'}
                            onPress={() => onChange('Comida')} style={styles.boton}
                          >Comida</Button>

                          <Button mode={value === 'Accesorios' ? 'contained' : 'outlined'}
                            onPress={() => onChange('Accesorios')} style={styles.boton}
                          >Accesorios</Button>

                          <Button mode={value === 'Viaje' ? 'contained' : 'outlined'}
                            onPress={() => onChange('Viaje')} style={[styles.boton, {width: wp("26%")}]}
                          >Viaje</Button>
                        </View>

                        <View style={styles.buttonContainer}>
                          <Button mode={value === 'Intercambio' ? 'contained' : 'outlined'}
                            onPress={() => onChange('Intercambio')} style={styles.boton}
                          >Intercambio</Button>

                          <Button mode={value === 'Producto' ? 'contained' : 'outlined'}
                            onPress={() => onChange('Producto')} style={styles.boton}
                          >Producto</Button>

                          <Button mode={value === 'Otro' ? 'contained' : 'outlined'}
                            onPress={() => onChange('Otro')} style={[styles.boton, {width: wp("26%")}]}
                          >Otro</Button>
                        </View>

                        <Text>Opción seleccionada: {value}</Text>
                        {errors.category && <Text style={{ color: 'red' }}>{errors.category.message}</Text>}
                      </>
                    )}
                  />
                  <Text>Titulo</Text>
                  <Controller
                    name="titulo"
                    control={control}
                    rules={{ required: "Campo requerido", minLength: 2 }}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <>
                        <TextInput
                          value={value}
                          onChangeText={(text) => onChange(text)}
                        />
                        {errors.titulo && <Text style={{ color: 'red' }}>{errors.titulo.message}</Text>}
                      </>
                    )}
                  />
                  {/* <TextInput onChangeText={handleTitleInput} value={selectedTitle}></TextInput> */}

                  <Text>Detalles</Text>
                  <Controller
                    name="detalles"
                    control={control}
                    rules={{ required: "Campo requerido" }}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <>
                        <TextInput multiline={true} numberOfLines={3}
                          value={value}
                          onChangeText={(text) => onChange(text)}
                        />
                        {errors.detalles && <Text style={{ color: 'red' }}>{errors.detalles.message}</Text>}
                      </>
                    )}
                  />
                  

                  <View style={[styles.buttonContainer, {marginTop: 15}]}>
                    <View style={globalStyles.centrar}>
                      <Icon.Button name="clock-o" style={styles.botonDatos} borderRadius={13}
                      onPress={() => setOpen(true)}>Horarios</Icon.Button>
                      {/*Open datePicker schedule*/}
                      <Controller
                        name="horario"
                        control={control}
                        rules={{required: "Campo requerido"}}
                        defaultValue=""
                        render={({field: {onChange, value}})=>(
                          <>
                            <DatePicker modal open={open} date={date} mode="time"
                              onConfirm={(date) => {
                                setOpen(false)
                                setDate(date)
                                onChange(date.toLocaleTimeString());
                              }}
                              onCancel={() => {
                                setOpen(false)
                              }}
                            />
                            <Text>{value}</Text> 
                            {errors.horario && <Text style={{ color: 'red' }}>{errors.horario.message}</Text>}
                          </>
                        )}
                      />
                      {/*Close datePicker schedule*/}
                    </View>

                    <View style={globalStyles.centrar}>
                      <Icon.Button name="map-marker"style={styles.botonDatos} borderRadius={13}
                        onPress={() => setModalLocation(true)}>Lugar</Icon.Button>
                      {/*Open modal selector location*/}
                      {modalLocation && (
                        <ModalSelector data={modulesList} visible={true} style={{height: hp("0%"), width: wp("0%")}}
                          onModalClose={() => {
                            setModalLocation(false)
                          }}
                          onChange={option => {
                            setSelectedLocation(option.label);
                            setModalLocation(false); // Cierra el modal después de seleccionar una opción
                            setValue("lugar", option.label);
                            trigger('lugar')
                          }}
                        />
                      )}
                      <Controller
                        name="lugar"
                        control={control}
                        rules={{ required: "Campo requerido" }}
                        defaultValue=""
                        render={({ field: { value } }) => (
                          <>
                            <Text>{value}</Text>
                            {errors.lugar && <Text style={{ color: 'red' }}>{errors.lugar.message}</Text>}
                          </>
                        )}
                      />
                      {/*Close modal selector location*/}
                      
                    </View>
                    
                    <View style={globalStyles.centrar}>
                      <Icon.Button name="calendar" style={styles.botonDatos} borderRadius={13}
                      onPress={() => setModalDays(true)}>Días</Icon.Button>
                      <Controller
                        name="dias"
                        control={control}
                        defaultValue={""}
                        rules={{required: "Campo requerido"}}
                        render={({field:{value}})=> (
                          <>
                            <Text>{value ? value.join(' - ') : ''}</Text>
                            {errors.dias && <Text style={{ color: 'red' }}>{errors.dias.message}</Text>}
                          </>
                        )}
                      />
                      
                    </View>
                  </View>

                  <View style={styles.buttonContainer}>
                    <View style={globalStyles.centrar}>
                      <Icon.Button name="mobile-phone" style={styles.botonDatos} borderRadius={13}
                      onPress={() => setModalContact(true)}>Contacto</Icon.Button>
                      <Controller
                        name="contacto"
                        control={control}
                        rules={{ required: "Campo requerido" }}
                        defaultValue=""
                        render={({ field: { value } }) => (
                          <>
                            <Text>{value}</Text>
                            {errors.contacto && <Text style={{ color: 'red' }}>{errors.contacto.message}</Text>}
                          </>
                        )}
                      />
                    </View>
                    <View style={{ marginHorizontal: -15}}></View>
                    <View style={globalStyles.centrar}>
                      <Icon.Button name="image" style={styles.botonDatos} borderRadius={13}
                      onPress={() => setModalImage(true)}>Imagen</Icon.Button>
                      <Text>{showContact}</Text>
                    </View>
                  </View>

                  <View style={[styles.buttonContainer, {justifyContent: "center"}]}>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose, { marginHorizontal: 0}]}
                      onPress={() => setModalCreatePost(false)}>
                      <Text style={styles.textStyle}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose]}
                      // onPress={() => setModalCreatePost(false)}>
                      onPress={handleSubmit(onSubmit)}>
                      <Text style={styles.textStyle}>Crear Publicación</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
          {/*Close Modal create post*/}

          {/*Open Modal select days*/}
          <Modal animationType="fade" transparent={true} visible={modalDays}
            onRequestClose={() => {
              setModalDays(!modalDays);
            }}>
              <View style={[styles.centerContainer, {backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: "center"}]}>
                <View style={[styles.modalContainerDays, {justifyContent: "center"}]}>
                  <Text style={styles.textModal}>Escoge los días que estarás disponible</Text>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => filterDaysSelector('L')}>
                      <View style={[styles.dayButton, selectedDays.includes('L') && styles.selectedDay]}>
                        <Text style={styles.dayText}>Lunes</Text>
                      </View>
                    </TouchableOpacity>
                    <View style={{ marginHorizontal: 10}}></View>
                    <TouchableOpacity onPress={() => filterDaysSelector('M')}>
                      <View style={[styles.dayButton, selectedDays.includes('M') && styles.selectedDay]}>
                        <Text style={styles.dayText}>Martes</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => filterDaysSelector('I')}>
                      <View style={[styles.dayButton, selectedDays.includes('I') && styles.selectedDay]}>
                        <Text style={styles.dayText}>Miercoles</Text>
                      </View>
                    </TouchableOpacity>
                    <View style={{ marginHorizontal: 10}}></View>
                    <TouchableOpacity onPress={() => filterDaysSelector('J')}>
                      <View style={[styles.dayButton, selectedDays.includes('J') && styles.selectedDay]}>
                        <Text style={styles.dayText}>Jueves</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => filterDaysSelector('V')}>
                      <View style={[styles.dayButton, selectedDays.includes('V') && styles.selectedDay]}>
                        <Text style={styles.dayText}>Viernes</Text>
                      </View>
                    </TouchableOpacity>
                      <View style={{ marginHorizontal: 10}}></View>
                    <TouchableOpacity onPress={() => filterDaysSelector('S')}>
                      <View style={[styles.dayButton, selectedDays.includes('S') && styles.selectedDay]}>
                        <Text style={styles.dayText}>Sabado</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  
                  <View style={[styles.buttonContainer, {justifyContent: "flex-end"}]}>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose, { marginHorizontal: 0}]}
                      onPress={() => setModalDays(false)}>
                      <Text style={styles.textStyle}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => buttonConfirmDays()}>
                      <Text style={styles.textStyle}>Seleccionar Días</Text>
                    </TouchableOpacity>
                  </View>
                  
                </View>
              </View>
          </Modal> 
          {/*Close Modal select days*/}

          {/*Open Modal select contact*/}
          <Modal animationType="slide" transparent={true} visible={modalContact}
            onRequestClose={() => {
              setModalContact(!modalContact);
            }}>
              <View style={[styles.centerContainer, {backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: "center"}]}>
                <View style={[styles.modalContainerContact, {justifyContent: "center"}]}>
                  <Text style={[globalStyles.txtInput, {textAlign: "center"}]}>Ingrese su numero con el que desea que lo contacten:</Text>
                  <TextInput keyboardType="numeric" style={[globalStyles.txtInput, styles.inputContact]} 
                  value={selectedContact} onChangeText={text => setSelectedContact(text)}></TextInput>

                  <View style={[styles.buttonContainer, {justifyContent: "flex-end"}]}>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose, { marginHorizontal: 0}]}
                      onPress={() => setModalContact(false)}>
                      <Text style={styles.textStyle}>Cancelar</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {setModalContact(false); setShowContact(selectedContact); setValue("contacto", selectedContact), trigger("contacto")}}>
                      <Text style={styles.textStyle}>Guardar contacto</Text>
                    </TouchableOpacity>
                  </View>
                  
                </View>
              </View>
          </Modal>

          <Modal animationType="slide" transparent={true} visible={modalImage}
            onRequestClose={() => {
              setModalImage(!modalImage);
            }}>
              <View style={styles.centerContainer}>
                <View style={styles.modalContainerImage}>
                  <Text>Imagen</Text>
                </View>
              </View>
          </Modal>

        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  descriptionContainer:{
    flexDirection: "row",
    alignItems: "center",
    width: wp("100%"),
    margin: 2,
    borderWidth: 1,
    borderColor: "grey",
  },
  titleName:{
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 4,
    color: "black",
  },
  textDescription:{
   // marginRight: 150,
   width: wp("55%"),
   marginLeft: 5,
   marginRight: 4,
   textAlign: "justify",
  },
  image:{
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    width: wp("40%"),
    height: hp("20%"),
  },
  contenedorCrearPubliacion:{
    flexDirection: "row",
    alignItems: "center",
    height: 45,
  },
  buttonCreatePost:{
    margin: 5,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 55,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    height: hp("60%"),
    width: wp("97%"),
    padding: 10,
    elevation: 5,
  },
  button: {
    padding: 10,
    elevation: 2,
    marginLeft: 20,
    marginRight: 10,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tituloModal: {
    marginBottom: 8,
    textAlign: "left",
    fontWeight: 'bold',
    color: "black",
    fontSize: 30,
  },
  textModal: {
    textAlign: "center",
    fontSize: 14,
    color: "grey",
  },
  buttonContainer:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Distribuye automáticamente el espacio entre los botones
    marginVertical: 5
  },
  boton:{
    width: wp("32%"),
  },
  botonDatos:{
    width: wp("27%"),
    backgroundColor: "green",
    textAlign: "center",
  },
  modalContainerLocation: {
    backgroundColor: 'white',
    borderRadius: 20,
    height: hp("50%"),
    width: wp("97%"),
    padding: 10,
    elevation: 5,
    marginBottom: 80,
  },
  modalContainerDays: {
    backgroundColor: 'white',
    height: hp("35%"),
    width: wp("90%"),
    padding: 10,
    elevation: 5,
    alignItems: "center",
  },
  modalContainerContact: {
    backgroundColor: 'white',
    borderRadius: 20,
    height: hp("25%"),
    width: wp("80%"),
    padding: 10,
    elevation: 5,
    alignItems: "center",
  },
  modalContainerImage: {
    backgroundColor: 'white',
    borderRadius: 20,
    height: hp("30%"),
    width: wp("97%"),
    padding: 10,
    elevation: 5,
    marginBottom: 80,
  },

  dayButton: {
    alignItems: "center",
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    marginBottom: 10,
    width: wp("30%"),
  },
  selectedDay: {
    backgroundColor: 'lightblue',
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainerSelector: {
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0074B7', // Color de fondo
  },
  modalSelector: {
    width: wp('50%'), // Ancho del selector
    backgroundColor: '#1B3F7D', // Color de fondo del selector
    marginBottom: 10,
  },
  optionText: {
    fontSize: 25, // Tamaño de fuente de las opciones
  },
  selectTextStyle: {
    fontSize: 20,
    color: 'white', // Cambia el color aquí para hacerlo más claro
  },
  inputContact:{
    width: wp("60%"),
    marginVertical: 8,
    textAlign: "center",
    fontSize: 32,
  },
});

export default Perfil;