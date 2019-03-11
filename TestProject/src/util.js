import base64 from 'react-native-base64'
import { AsyncStorage } from 'react-native'


export const grabUsername = async () => {
  let user = await JSON.parse(AsyncStorage.getItem('userObj'))
  return user.login
}