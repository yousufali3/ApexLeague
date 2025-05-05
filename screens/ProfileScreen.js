import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '../store/authStore';

const ProfileScreen = () => {
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    console.log('Logged out');
    logout(); // Call the logout function from the store
    // Handle logout logic here (e.g., clear user token, state, etc.)
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://wallpaperaccess.com/full/1099445.jpg' }}
        style={styles.background}
        blurRadius={5}
      >
        <View style={styles.overlay}>
          <View style={styles.scrollContent}>
            <View style={styles.headerContainer}>
              <View style={styles.profileImageContainer}>
                <View style={styles.profileImagePlaceholder}>
                  <FontAwesome
                    name="user"
                    size={75}
                    color="rgba(0, 0, 0, 0.8)"
                  />
                </View>
              </View>
              <Text style={styles.welcomeText}>John Doe</Text>
              <Text style={styles.subtitleText}>@johndoe</Text>
            </View>

            <Text style={styles.sectionTitle}>Contact Information</Text>
            <View style={styles.supportOption}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="email" size={24} color="#ffffff" />
              </View>
              <View style={styles.supportOptionContent}>
                <Text style={styles.optionTitle}>Email</Text>
                <Text style={styles.optionDescription}>
                  john.doe@example.com
                </Text>
              </View>
            </View>

            <View style={styles.supportOption}>
              <View style={styles.iconContainer}>
                <FontAwesome name="phone" size={24} color="#ffffff" />
              </View>
              <View style={styles.supportOptionContent}>
                <Text style={styles.optionTitle}>Phone</Text>
                <Text style={styles.optionDescription}>123-456-7890</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Account</Text>
            <TouchableOpacity style={styles.faqItem}>
              <Text style={styles.faqQuestion}>Settings</Text>
              <View style={styles.arrowContainer}>
                <MaterialIcons name="chevron-right" size={24} color="#ffffff" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogout}>
              <LinearGradient
                colors={['#3b4b74', '#2d3b6f', '#1a2d5e']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
              >
                <Text style={styles.loginButtonText}>Logout</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
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
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(56, 33, 108, 0.65)',
  },
  scrollContent: {
    padding: 24,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 32,
  },
  profileImageContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 50,
    padding: 10,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 12,
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 16,
    color: '#e0e0e0',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  supportOption: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  supportOptionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 15,
    color: '#ffffff',
    marginBottom: 2,
  },
  arrowContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  faqItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    padding: 16,
    marginBottom: 12,
  },
  faqQuestion: {
    flex: 1,
    fontSize: 14,
    color: '#ffffff',
  },
  loginButton: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 32,
  },
  gradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
