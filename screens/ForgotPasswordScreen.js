import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { BACKEND_URL } from '../services/config';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // 1: Email entry, 2: OTP verification & new password
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [message, setMessage] = useState(''); // To hold success or error message

  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const handleSendOtp = async () => {
    // Validate email
    if (!email || !email.includes('@')) {
      setMessage('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await axios.post(
        `${BACKEND_URL}/auth/forgot-password/send-otp`,
        { email }
      );
      console.log('OTP sent to:', email);
      setIsLoading(false);
      setStep(2); // Move to OTP verification step
      setMessage('OTP sent successfully. Please check your email.');
    } catch (error) {
      setIsLoading(false);
      setMessage(
        error.response?.data?.message ||
          'Something went wrong, please try again'
      );
    }
  };

  const handlePasswordReset = async () => {
    console.log('Resetting password for:', email, otp, newPassword);

    // Validate inputs
    if (!otp) {
      setMessage('Please enter the OTP sent to your email');
      return;
    }

    if (!newPassword) {
      setMessage('Please enter a new password');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await axios.post(
        `${BACKEND_URL}/auth/forgot-password/reset`,
        {
          email,
          otp,
          newPassword,
        }
      );
      console.log('Password reset for:', response);
      setIsLoading(false);
      setMessage('Password reset successful!'); // Display success message

      // Delay navigation to Login screen to give the user time to see the success message
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000); // 2-second delay to allow the success message to show
    } catch (error) {
      setIsLoading(false);
      setMessage(
        error.response?.data?.message ||
          'Something went wrong, please try again'
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.background}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.formContainer}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => (step === 1 ? navigation.goBack() : setStep(1))}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerText}>Forgot Password</Text>
        <Text style={styles.subtitleText}>
          {step === 1
            ? 'Enter your email to receive a verification code'
            : 'Enter the verification code and set a new password'}
        </Text>

        {message ? <Text style={styles.messageText}>{message}</Text> : null}

        {step === 1 ? (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#9ea4b0"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleSendOtp}
              disabled={isLoading}
            >
              <LinearGradient
                colors={['#4776E6', '#8E54E9']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
              >
                {isLoading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text style={styles.actionButtonText}>
                    Send Verification Code
                  </Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Verification Code</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter OTP code"
                  placeholderTextColor="#9ea4b0"
                  value={otp}
                  onChangeText={setOtp}
                  keyboardType="number-pad"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>New Password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter new password"
                  placeholderTextColor="#9ea4b0"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <Text style={styles.eyeIcon}>
                    {isPasswordVisible ? '👁' : '👁‍🗨'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm new password"
                  placeholderTextColor="#9ea4b0"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!isConfirmPasswordVisible}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                >
                  <Text style={styles.eyeIcon}>
                    {isConfirmPasswordVisible ? '👁' : '👁‍🗨'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handlePasswordReset}
              disabled={isLoading}
            >
              <LinearGradient
                colors={['#4776E6', '#8E54E9']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
              >
                {isLoading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text style={styles.actionButtonText}>Reset Password</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.resendContainer}
              onPress={() => {
                alert('OTP resent to your email');
              }}
            >
              <Text style={styles.resendText}>Didn't receive code? Resend</Text>
            </TouchableOpacity>
          </>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  backButton: {
    position: 'absolute',
    top: 24,
    left: 24,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 16,
    color: '#e0e0e0',
    marginBottom: 32,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 6,
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  input: {
    flex: 1,
    padding: 16,
    color: '#ffffff',
    fontSize: 16,
  },
  eyeButton: {
    padding: 16,
  },
  eyeIcon: {
    fontSize: 18,
    color: '#ffffff',
  },
  actionButton: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 16,
  },
  gradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  resendText: {
    color: '#e0e0e0',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default ForgotPasswordScreen;
