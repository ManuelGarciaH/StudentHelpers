import React, { Component } from 'react';
import { View, Button } from 'react-native'
import {globalStyles} from '../../globalStyles';
import { FIREBASE_AUTH } from "../../Firebase.js";

const Menu = () => {
  return (
    <View>
        <View style={globalStyles.form}>
          <Button onPress={ () => FIREBASE_AUTH.signOut() } title='LogOut'/>
        </View>
    </View>
  )
}

export default Menu