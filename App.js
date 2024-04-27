import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './app/screens/Login';
import { useState, useEffect, useCallback } from 'react';
import { FIREBASE_AUTH } from './FirebaseConfig';
import Details from './app/screens/Details';
import List from './app/screens/List';
import { User, onAuthStateChanged } from 'firebase/auth';
import Calendar from './app/screens/Calendar';
import Agenda from './app/screens/Agenda';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return(
    <InsideStack.Navigator>
      <InsideStack.Screen name="Calendar" component={Calendar} />
      <InsideStack.Screen name="Details" component={Details} />
      <InsideStack.Screen name="Agenda" component={Agenda} />
    </InsideStack.Navigator>
  )
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

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
