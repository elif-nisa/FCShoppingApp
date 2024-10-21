import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import ProductList from './src/screens/ProductList';
import RegisterScreen from './src/screens/RegisterScreen';
import NewPassword from './src/screens/NewPassword';
import ProductDetail from './src/screens/ProductDetail';
import BasketScreen from './src/screens/BasketScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ProductList" component={ProductList} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="NewPassword" component={NewPassword} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="BasketScreen" component={BasketScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
