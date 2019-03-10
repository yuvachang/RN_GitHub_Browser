import React, { Component } from 'react'
import { DrawerItems } from 'react-navigation'
import { SafeAreaView, ScrollView, Image, View, Text } from 'react-native'

const DrawerComp = props => (
  <SafeAreaView
    style={{ flex: 1 }}
    forceInset={{ top: 'always', horizontal: 'never' }}>
    <View>
      <Image source={require('../img/logo.png')} />
    </View>

    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
)

export default DrawerComp
