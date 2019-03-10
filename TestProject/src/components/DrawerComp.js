import React from 'react'
import { DrawerItems } from 'react-navigation'
import { SafeAreaView, ScrollView, Image, View, Text } from 'react-native'
import { Header } from 'native-base'

const DrawerComp = props => (
  <SafeAreaView
    style={{ flex: 1 }}
    forceInset={{ top: 'always', horizontal: 'never' }}>
    <View>
      <Image source={require('../img/logo.png')} />
    </View>
    {/* <Header>
      <Left onPress={navigate navdrawer} />
      <Right onPress={navigate reposDrawer} /> 
    </Header> */}

    <ScrollView>
        <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
)

export default DrawerComp
