import { View, Text, Button } from 'react-native'
import React from 'react'
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import Details from './Details';

/*

List Screen:
- A simple screen with two buttons
- One button to navigate to the Details screen
- One button to log out the user

*/

const List = ({ navigation }) => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Button onPress={() => navigation.navigate('Details')} title="Open Details" />
            <View style={{height: 15}} />
            <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" style={{paddingTop: '1em'}}/>
        </View>
    )
}

export default List