import { API_URL } from './firebaseConfig/Config'
import {Alert} from 'react-native'

export async function fetchPublishablekey() {
    try {
        const response = await fetch(`${API_URL}/firebaseConfig/config`)
        const { publishableKey } = await response.json()
        return publishableKey
    } catch (e) {
        console.log(e)
        console.warn('Unable to fetch publishable key. Is your server running?')
        Alert.alert('Error', 'Unable to fetch publishable key. Is your server running?')
    }
}