import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';

import SoloScreen from './SoloScreen';
import DuoScreen from './DuoScreen';
import SquadScreen from './SquadScreen';
import AllMode from './AllMode';
import { useAuthStore } from '../store/authStore';

const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Solo');
  const navigation = useNavigation();

  const user = useAuthStore((state) => state.user);
  console.log(user);

  const balance = useAuthStore((state) => state.balance);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleWalletClick = () => {
    navigation.navigate('Wallet');
  };

  const handleProfileClick = () => {
    navigation.navigate('Profile');
  };

  const renderTopBar = () => (
    <View style={styles.topBar}>
      {/* App Title/Logo */}
      <Text style={styles.appTitle}>Apex League</Text>

      <View style={styles.topBarRight}>
        {/* Wallet Balance */}
        <TouchableOpacity
          onPress={handleWalletClick}
          style={styles.walletContainer}
        >
          <LinearGradient
            colors={['#FF416C', '#FF4B2B']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.walletGradient}
          >
            <Text style={styles.walletText}>{balance || user.wallet}</Text>

            <FontAwesome5
              name="coins"
              size={20}
              color="#FFD700"
              style={styles.walletIcon}
            />
          </LinearGradient>
        </TouchableOpacity>

        {/* Profile Icon */}
        <TouchableOpacity
          onPress={handleProfileClick}
          style={styles.profileContainer}
        >
          <LinearGradient
            colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
            style={styles.profileGradient}
          >
            <Text style={styles.profileIcon}>👤</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.background}
      />
      <View style={styles.container}>
        {/* Top Bar with Wallet Balance and Profile Icon */}
        {renderTopBar()}

        {/* Show Top Tabs */}
        {/* {renderTopTabs()} */}

        {/* Content based on selected tab */}
        {/* <View style={styles.content}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {selectedTab === 'Solo' && <SoloScreen />}
            {selectedTab === 'Duo' && <DuoScreen />}
            {selectedTab === 'Squad' && <SquadScreen />}
          </ScrollView>
        </View> */}

        <AllMode />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletContainer: {
    marginRight: 12,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  walletGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  walletText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 6,
  },
  walletIcon: {
    fontSize: 16,
  },
  profileContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  profileGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 20,
  },
  tabsOuterContainer: {
    paddingHorizontal: 20,
  },
  tabButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 4,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    position: 'relative',
  },
  activeTabButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  activeTabButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 4,
    width: 20,
    height: 3,
    backgroundColor: '#FF416C',
    borderRadius: 2,
  },
  content: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginHorizontal: 8,
    paddingHorizontal: 12,
    overflow: 'hidden',
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 16,
  },
});

export default HomeScreen;
