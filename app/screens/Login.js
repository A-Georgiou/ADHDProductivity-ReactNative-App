import { View, TextInput, StyleSheet, ActivityIndicator, Button, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try{
            const response = signInWithEmailAndPassword(auth, email, password);
        } catch(error){
            console.log(error);
            alert('Login Failed, please try again.');
        } finally{
            alert('Login Success!');
            setLoading(false);
        }
    }

    const signUp = async () => {
        setLoading(true);
        try{
            const response = createUserWithEmailAndPassword(auth, email, password);
        } catch(error){
            console.log(error);
            alert('Sign Up Failed, please try again.');
        } finally{
            alert('Welcome to ADHD Productivity!')
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior='padding'>
            <TextInput value={email} style={styles.input} placeholder="email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
            <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder="password" autoCapitalize="none" onChangeText={(text) => setPassword(text)}></TextInput>
            { loading ?
                <ActivityIndicator size="large" color="#0000ff"/>
            : <>
                <Button title="Login" onPress={signIn} />
                <Button title="Create Account" onPress={signUp} />
            </>
            }
            </KeyboardAvoidingView>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        marginVertical: 3,
        marginHorizontal: 5
    }

})