import { View, TextInput, StyleSheet, ActivityIndicator, Button, KeyboardAvoidingView, ImageBackground, Text } from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useFonts } from 'expo-font';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [fontsLoaded, fontError] = useFonts({
        'raleway-medium': require('../../assets/fonts/Raleway-Medium.ttf'),
        'RalewayMedium': require('../../assets/fonts/Raleway-Medium.ttf'),
      });
    const auth = FIREBASE_AUTH;
    
    /*
    * Function to handle errors when signing in or creating an account
    */
    function handleSignInLoginErrors(error) {
        if (error.code === 'auth/invalid-credential') {
            alert('Incorrect password, please try again.');
        }
      
        if (error.code === 'auth/too-many-requests') {
            alert('Too many requests, Please wait before trying again.');
        }

        if (error.code === 'auth/email-already-in-use') {
            alert('That email address is already in use.');
        }

        if (error.code === 'auth/invalid-email') {
            alert('That email address is invalid.');
        }
    }

    /*
    * Async FireBase sign in function
    */
    const signIn = async () => {
        setLoading(true);
        const response = signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('Welcome back to ADHD Productivity!');
        }).catch((error) => {
            handleSignInLoginErrors(error);
        }).finally(() => {
            setLoading(false);
        });
    }

    /*
    * Async FireBase sign up function
    */
    const signUp = async () => {
        setLoading(true);
        const response = createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('Welcome to ADHD Productivity!');
        }).catch((error) => {
            handleSignInLoginErrors(error);
        }).finally(() => {
            setLoading(false);
        });
    }  

    if (!fontsLoaded) {
        return null;
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/background1.webp')} resizeMode='cover' style={styles.image}>
            <View style={{height:"20%"}} />
            <KeyboardAvoidingView behavior='padding'>
            <Text style={{fontSize: 25, color: 'grey', fontFamily: 'Raleway-Medium'}}>Login or Create an account</Text>
            <View style={{height: 30}} />
            <TextInput value={email} style={styles.input} placeholder="email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
            <View style={styles.space} />
            <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder="password" autoCapitalize="none" onChangeText={(text) => setPassword(text)}></TextInput>
            <View style={styles.space} />
            { loading ?
                <ActivityIndicator size="large" color="#0000ff"/>
            : <>
                <Button title="Login" onPress={signIn} />
                <View style={styles.space} />
                <Button title="Create Account" onPress={signUp} />
            </>
            }
            </KeyboardAvoidingView>
            </ImageBackground>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: 40,
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: 'gray',
        paddingHorizontal: 10
    },
    button: {
        marginBottom: 10 
    },
    space: {
        width: 20,
        height: 10,
    },
    image: {
        flex: 1,
        width: "100%",
        justifyContent: "flex-start",
        alignItems: 'center'
      },
});
