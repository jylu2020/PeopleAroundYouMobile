import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const MapsScreen = props => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Embed Map</Text>
    </View>
  );
};

MapsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Filter Meals',
    headerLeft: () =>
      <Ionicons
      style={{ paddingLeft: 10 }}
      onPress={() => navData.navigation.openDrawer()} 
      name="ios-menu" 
      size={20} 
      color={Colors.primaryColor}
      />
    ,
    headerTitleStyle: {
      fontFamily: 'pacifico',
      fontSize: 23
    }
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    margin: 20,
    textAlign: 'center'
  }
});

export default MapsScreen;