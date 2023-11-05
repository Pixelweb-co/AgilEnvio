// import React in our code
import React from 'react';

// import all the components we are going to use
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';

//Import ActionButton
//import ActionButton from 'react-native-action-button';

//Import Icon for the ActionButton
import Icon from 'react-native-vector-icons/Ionicons';

const WalletNavigationFloat = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titleStyle}>
          Example of Floating Action Button
          with Multiple Option in React Native
        </Text>
        <Text style={styles.textStyle}>
          Click on Action Button to see Alert
        </Text>
 
      </View>
    </SafeAreaView>
  );
};

export default WalletNavigationFloat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  textStyle: {
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});