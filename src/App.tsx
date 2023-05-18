/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeContainer from './containers/HomeContainer';
import {Provider} from 'react-redux';
import {store} from './store';
import CartContainer from './containers/CartContainer';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.fill}>
        <StatusBar barStyle={'light-content'} backgroundColor={'#2dcc70'} />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={HomeContainer} />
            <Stack.Screen name="Cart" component={CartContainer} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: '#2dcc70',
  },
});

export default App;
