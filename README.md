# StudentHelpers

## COMANDOS

*Iniciar la aplicacion*

npm start //

*Iniciar la aplicacion en dispositivo fisico*

adb reverse tcp:8081 tcp:8081 
//8081 es el puerto pero puedes elegir el que quieras

npm start //

https://www.youtube.com/watch?v=pnfeBM9FSEE    //Link de video de referencia

*Librerias necesarias*

npm install @react-navigation/native

npm install react-native-screens react-native-safe-area-context

npm install @react-navigation/native-stack

npm install react-native-responsive-screen --save


SerchBar
npm install react-native-paper

Iconos
npm install --save react-native-vector-icons

https://github.com/oblador/react-native-vector-icons

En android studio en en el gradle scripts colocar
abrir el build gradle(module app)
Y al final lo agregamos y damos Sync Now
apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")

https://oblador.github.io/react-native-vector-icons/

Para poner fondo difuminado
npm install @react-native-community/blur


npm install react-native-date-picker

npm install @react-navigation/bottom-tabs