import React from 'react'
import { View } from 'react-native'
import { Icon, Header, Left, Right } from 'native-base'
import styles from '../styles';

const HeaderC = props => {
  return (
    <Header style={styles.header}>
      <Left>
        <Icon
          name='menu'
          onPress={() => props.navigation.toggleDrawer()}
        />
      </Left>
      <Right>
        <View />
      </Right>
    </Header>
  )
}

export default HeaderC
