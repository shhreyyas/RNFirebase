import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,  // Import ActivityIndicator
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import { SIGNIN } from '../../navigtion/ScreenName';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('user2@mailinator.com');
  const [password, setPassword] = useState('user@1234');
  const [confirmPassword, setConfirmPassword] = useState('user@1234');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    setIsLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const currentUser = auth().currentUser;
        currentUser.sendEmailVerification()
        .then(() => {
          setIsLoading(false);
          Alert.alert('Success', 'Account created! A verification email has been sent to your email address.', [
            {
              text: 'Do Sign',
              onPress: () => navigation.navigate(SIGNIN),
            },
          ]);
        })
        .catch(error => {
          setIsLoading(false);
          Alert.alert('Error', error.message);
        });
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Error', 'That email address is already in use.');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('Error', 'That email address is invalid.');
        } else {
          Alert.alert('Error', error.message);
        }
      });
  };

  const handleGoogleSignUp = async() => {
    // Add Google sign-up logic here
    GoogleSignin.configure({
      webClientId: '243630893696-ubdgd3rqmgrf1mc3srp0tpa0490d9bls.apps.googleusercontent.com',
    });
     // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Get the users ID token
    const signInResult = await GoogleSignin.signIn();
    console.log('signInResult', signInResult);

    // let idToken = signInResult.data?.idToken;
    // if (!idToken) {
    //   // if you are using older versions of google-signin, try old style result
    //   idToken = signInResult.idToken;
    // }

    // if (!idToken) {
    //   throw new Error('No ID token found');
    // }

    const googleCredential = auth.GoogleAuthProvider.credential(signInResult.data.idToken);
    console.log('googleCredential', googleCredential);

    Alert.alert('Google Sign-Up', 'Google sign-up pressed');
  };

  const handleFacebookSignUp = () => {
    // Add Facebook sign-up logic here
    Alert.alert('Facebook Sign-Up', 'Facebook sign-up pressed');
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

      <TextInput
        style={styles.input}
        placeholder="Confirm your password"
        placeholderTextColor="#999"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        textContentType="password"
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={isLoading}>
        {/* Show the loader inside the button while loading */}
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleGoogleSignUp}>
          <FontAwesome
            name="google"
            size={30}
            color="#db4a39"
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFacebookSignUp}>
          <FontAwesome
            name="facebook"
            size={30}
            color="#3b5998"
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Login navigation */}
      <TouchableOpacity onPress={() => navigation.navigate(SIGNIN)}>
        <Text style={styles.loginText}>Already have an account? Log in here</Text>
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
  loginText: {
    fontSize: 16,
    color: '#ff6347',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;
