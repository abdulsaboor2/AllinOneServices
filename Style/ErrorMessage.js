import { showMessage, hideMessage } from "react-native-flash-message";

const ShowError = (message) => {
    showMessage({
        message,
        type: 'danger',
        icon:'danger'
    })
}

const ShowSuccess = (message) => {
    showMessage({
        message,
        type: 'success',
        icon:'success'
    })
}
export {
    ShowError,
    ShowSuccess
}