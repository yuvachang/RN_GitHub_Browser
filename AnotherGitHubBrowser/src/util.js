import base64 from 'react-native-base64'
import { AsyncStorage } from 'react-native'


export const grabUsername = async () => {
  let userObj = await AsyncStorage.getItem('userObj')
  let user = JSON.parse(userObj)
  return user.login
}