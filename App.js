import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './app/screens/Login';
import { useState, useEffect } from 'react';
import { FIREBASE_AUTH } from './FirebaseConfig';
import Details from './app/screens/Details';
import List from './app/screens/List';
import { User, onAuthStateChanged } from 'firebase/auth';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return(
    <InsideStack.Navigator>
      <InsideStack.Screen name="My Todos" component={List} />
      <InsideStack.Screen name="Details" component={Details} />
    </InsideStack.Navigator>
  )
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? 
        (
          <Stack.Screen name='Login' component={InsideLayout} options={{ headerShown: false }}/>
        ) :
        (
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
        )}
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
