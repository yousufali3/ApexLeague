import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SoloScreen from './SoloScreen'; // Your solo screen
import DuoScreen from './DuoScreen'; // Your duo screen
import SquadScreen from './SquadScreen'; // Your squad screen

const Tab = createBottomTabNavigator();

const GameScreen = ({ route }) => {
  const { mode } = route.params;
  const [selectedTab, setSelectedTab] = useState('Solo'); // Manage selected tab state

  // Handle tab change
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  // Render top tabs with custom styles
  const renderTopTabs = () => (
    <View style={styles.tabsOuterContainer}>
      <View style={styles.tabButtonsContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'Solo' && styles.activeTabButton,
          ]}
          onPress={() => handleTabChange('Solo')}
        >
          <Text
            style={[
              styles.tabButtonText,
              selectedTab === 'Solo' && styles.activeTabButtonText,
            ]}
          >
            Solo
          </Text>
          {selectedTab === 'Solo' && <View style={styles.activeIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'Duo' && styles.activeTabButton,
          ]}
          onPress={() => handleTabChange('Duo')}
        >
          <Text
            style={[
              styles.tabButtonText,
              selectedTab === 'Duo' && styles.activeTabButtonText,
            ]}
          >
            Duo
          </Text>
          {selectedTab === 'Duo' && <View style={styles.activeIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'Squad' && styles.activeTabButton,
          ]}
          onPress={() => handleTabChange('Squad')}
        >
          <Text
            style={[
              styles.tabButtonText,
              selectedTab === 'Squad' && styles.activeTabButtonText,
            ]}
          >
            Squad
          </Text>
          {selectedTab === 'Squad' && <View style={styles.activeIndicator} />}
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
        {/* Show top tabs */}
        {renderTopTabs()}

        {/* Render content based on selected tab */}
        <View style={styles.content}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {selectedTab === 'Solo' && <SoloScreen mode={mode} />}
            {selectedTab === 'Duo' && <DuoScreen mode={mode} />}
            {selectedTab === 'Squad' && <SquadScreen mode={mode} />}
          </ScrollView>
        </View>
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
  tabsOuterContainer: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  tabButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 4,
    marginBottom: 16,
    // marginTop: 16,
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

export default GameScreen;
