import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import UpcomingLeagues from './UpcomingLeagues';
import LiveLeagues from './LiveLeagues';
import CompletedLeagues from './CompletedLeagues';

const MyLeaguesScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Upcoming');

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const renderTopTabs = () => (
    <View style={styles.tabsOuterContainer}>
      <View style={styles.tabButtonsContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'Upcoming' && styles.activeTabButton,
          ]}
          onPress={() => handleTabChange('Upcoming')}
        >
          {selectedTab === 'Upcoming' && (
            <LinearGradient
              colors={['#1e3799', '#4a69bd']}
              style={styles.activeTabGradient}
            />
          )}
          <Feather
            name="calendar"
            size={18}
            color={
              selectedTab === 'Upcoming' ? '#ffffff' : 'rgba(255,255,255,0.6)'
            }
            style={styles.tabIcon}
          />
          <Text
            style={[
              styles.tabButtonText,
              selectedTab === 'Upcoming' && styles.activeTabButtonText,
            ]}
          >
            Upcoming
          </Text>
          {selectedTab === 'Upcoming' && (
            <View style={styles.activeIndicator} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'Live' && styles.activeTabButton,
          ]}
          onPress={() => handleTabChange('Live')}
        >
          {selectedTab === 'Live' && (
            <LinearGradient
              colors={['#e1164a', '#ff416c']}
              style={styles.activeTabGradient}
            />
          )}
          <Feather
            name="radio"
            size={18}
            color={selectedTab === 'Live' ? '#ffffff' : 'rgba(255,255,255,0.6)'}
            style={styles.tabIcon}
          />
          <Text
            style={[
              styles.tabButtonText,
              selectedTab === 'Live' && styles.activeTabButtonText,
            ]}
          >
            Live
          </Text>
          {selectedTab === 'Live' && (
            <View
              style={[styles.activeIndicator, { backgroundColor: '#FF416C' }]}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'Completed' && styles.activeTabButton,
          ]}
          onPress={() => handleTabChange('Completed')}
        >
          {selectedTab === 'Completed' && (
            <LinearGradient
              colors={['#27ae60', '#2ecc71']}
              style={styles.activeTabGradient}
            />
          )}
          <Feather
            name="check-circle"
            size={18}
            color={
              selectedTab === 'Completed' ? '#ffffff' : 'rgba(255,255,255,0.6)'
            }
            style={styles.tabIcon}
          />
          <Text
            style={[
              styles.tabButtonText,
              selectedTab === 'Completed' && styles.activeTabButtonText,
            ]}
          >
            Completed
          </Text>
          {selectedTab === 'Completed' && (
            <View
              style={[styles.activeIndicator, { backgroundColor: '#2ecc71' }]}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (selectedTab) {
      case 'Upcoming':
        return <UpcomingLeagues />;
      case 'Live':
        return <LiveLeagues />;
      case 'Completed':
        return <CompletedLeagues />;
      default:
        return (
          <View style={styles.noContentContainer}>
            <Feather name="inbox" size={48} color="rgba(255,255,255,0.2)" />
            <Text style={styles.noContentText}>No Content Available</Text>
          </View>
        );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        style={styles.background}
      />
      {/* {renderHeader()} */}
      {renderTopTabs()}

      <View style={styles.contentContainer}>{renderContent()}</View>

      <TouchableOpacity style={styles.floatingButton}>
        <LinearGradient
          colors={['#1e3799', '#4a69bd']}
          style={styles.floatingGradient}
        >
          <Feather name="plus" size={24} color="#ffffff" />
        </LinearGradient>
      </TouchableOpacity>
    </KeyboardAvoidingView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerTitle: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  tabsOuterContainer: {
    paddingHorizontal: 20,
    marginTop: 40,
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
    borderRadius: 12,
    overflow: 'hidden',
  },
  activeTabButton: {
    // Style is applied through gradient
  },
  activeTabGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  tabIcon: {
    marginBottom: 4,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.6)',
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
    backgroundColor: '#4a69bd',
    borderRadius: 2,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  noContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  noContentText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 12,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  floatingGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyLeaguesScreen;
