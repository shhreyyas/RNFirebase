import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator, // Import ActivityIndicator
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import { SIGNUP } from '../../navigtion/ScreenName';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('user2@mailinator.com');
  const [password, setPassword] = useState('user@1234');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both fields.');
      return;
    }

    setIsLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const currentUser = userCredential.user;
        currentUser.reload().then(()=>{
          if (currentUser.emailVerified) {
            setIsLoading(false);
            Alert.alert('Success', 'You are now logged in!');
            // Navigate to the home screen or dashboard
          } else {
            setIsLoading(false);
            Alert.alert('Error', 'Please verify your email before logging in.');
          }
        });
      })
      .catch(error => {
        setIsLoading(false);
        if (error.code === 'auth/invalid-email') {
          Alert.alert('Error', 'That email address is invalid.');
        } else if (error.code === 'auth/user-not-found') {
          Alert.alert('Error', 'No user found with this email.');
        } else {
          Alert.alert('Error', error.message);
        }
      });
  };

  const handleGoogleSignIn = () => {
    // Add Google sign-in logic here
    Alert.alert('Google Sign-In', 'Google sign-in pressed');
  };

  const handleFacebookSignIn = () => {
    // Add Facebook sign-in logic here
    Alert.alert('Facebook Sign-In', 'Facebook sign-in pressed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Food App</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        textContentType="password"
      />

      <TouchableOpacity style={styles.button} onPress={handleSignIn} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign In</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleGoogleSignIn}>
          <FontAwesome
            name="google"
            size={30}
            color="#db4a39"
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFacebookSignIn}>
          <FontAwesome
            name="facebook"
            size={30}
            color="#3b5998"
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Sign-up navigation */}
      <TouchableOpacity onPress={() => navigation.navigate(SIGNUP)}>
        <Text style={styles.signupText}>Don't have an account? Sign up here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ff6347',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#ff6347',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 16,
    color: '#666',
    marginVertical: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%',
    marginTop: 10,
  },
  socialIcon: {
    marginHorizontal: 15,
  },
  signupText: {
    fontSize: 16,
    color: '#ff6347',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});

export default SignInScreen;
