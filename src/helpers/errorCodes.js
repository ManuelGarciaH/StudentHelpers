export default function validErrorCodes(errorCode) {
    console.log(errorCode);
    switch (errorCode) {
        case 'auth/invalid-email':
            return 'El correo electrónico proporcionado no es válido.';
        case 'auth/user-not-found':
            return 'No se encontró ningún usuario con ese correo electrónico.';
        case 'auth/wrong-password':
            return 'La contraseña proporcionada es incorrecta.';
        case 'auth/invalid-credential':
            return 'Las credenciales proporcionadas son incorrectas';
        case 'auth/missing-password':
            return 'La contraseña es un campo obligatorio.';
        case 'auth/invalid-password':
            return 'La contraseña proporcionada es incorrecta.';
        default:
        return 'Ocurrió un error desconocido. Por favor, inténtalo de nuevo mas tarde.';
    }
}