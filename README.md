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

npm install react-native-swiper

npm install @react-navigation/bottom-tabs

npm install mapbox-gl --save

// android/build.gradle
allprojects {
    repositories {
        maven {
            url 'https://api.mapbox.com/downloads/v2/releases/maven'
            authentication {
                basic(BasicAuthentication)
            }
            credentials {
                // Do not change the username below.
                // This should always be `mapbox` (not your username).
                username = 'mapbox'
                // Use the secret token you stored in gradle.properties as the password
                password = project.properties['MAPBOX_DOWNLOADS_TOKEN'] ?: ""
            }
        }
    }
}

npm install @react-native-community/geolocation