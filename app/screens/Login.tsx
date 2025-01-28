import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();

  const validateInput = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in both fields");
      return false;
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      Alert.alert("Error", "Please enter a valid email");
      return false;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const signUp = async () => {
    if (!validateInput()) return;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Account created. Please check your email for verification.');
      setEmail('');
      setPassword('');
    } catch (error: any) {
      Alert.alert('Signup Failed', error?.message || "Unexpected error occurred");
    }
  };

  const signIn = async () => {
    if (!validateInput()) return;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Successfully signed in!');
    } catch (error: any) {
      Alert.alert('Login Failed', error?.message || "Unexpected error occurred");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#555"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#555"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Button onPress={signUp} title="Create Account" />
      <Button onPress={signIn} title="Sign In" />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flexDirection: 'column',
    marginVertical: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
});
