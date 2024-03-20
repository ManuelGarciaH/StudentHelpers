import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PUBLICACIONES from '../views/Publicaciones.js';
import VIAJES from '../views/Viajes.js';
import PERFIL from '../views/Perfil.js';
import MENU from '../views/Menu.js';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

function TabNavigator({navigation}) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Publicaciones" component={PUBLICACIONES}
        options={{
            headerShown:false,
            tabBarIcon:({ color, size }) => ( // Define el icono dentro de una función
                <Icon name="newspaper" color={color} size={size} />
            ),
        }}
        
      />
      <Tab.Screen name="Viajes" component={VIAJES}
        options={{
            headerShown:false,
            tabBarIcon:({ color, size }) => ( // Define el icono dentro de una función
                <Icon name="map" color={color} size={size} />
            ),
        }}
        
      />
      <Tab.Screen name="Perfil" component={PERFIL} 
        options={{
            headerShown:false,
            tabBarIcon:({ color, size }) => ( // Define el icono dentro de una función
                <Icon name="account-box" color={color} size={size} />
            ),
        }}/>
      <Tab.Screen name="Menu" component={MENU} 
        options={{
            headerShown:false,
            tabBarIcon:({ color, size }) => ( // Define el icono dentro de una función
                <Icon name="menu" color={color} size={size} />
            ),
        }}/>
    </Tab.Navigator>
  );
}

export default TabNavigator;