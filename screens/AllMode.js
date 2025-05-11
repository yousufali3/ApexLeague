import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import ClashSqlad from '../assets/ClashSquad.jpg';
import FullMap from '../assets/FullMap.jpg';
import LoneWolf from '../assets/LoneWolf.jpg';
import Craftland from '../assets/CraftLand.jpg';

const AllMode = () => {
  const gameModes = [
    {
      id: 1,
      name: 'CLASH SQUAD',
      image: ClashSqlad,
      color: '#0e6ee3',
    },
    {
      id: 2,
      name: 'FULL MAP',
      image: FullMap,
      color: '#ff8a00',
    },
    {
      id: 3,
      name: 'LONE WOLF',
      image: LoneWolf,
      color: '#e31616',
    },
    {
      id: 4,
      name: 'CRAFT LAND',
      image: Craftland,
      color: '#0e6ee3',
    },
    {
      id: 5,
      name: 'FREE MATCH',
      image: require('../assets/free.jpg'), // Placeholder image
      color: '#ff8a00',
    },
  ];

  const navigation = useNavigation();
  const [selectedMode, setSelectedMode] = useState(null);
  const [activeTab, setActiveTab] = useState('games'); // Track active bottom tab

  const handleCardPress = (mode) => {
    setSelectedMode(mode);
    console.log(`Selected Mode: ${mode.name}`);
    navigation.navigate('GameScreen', { mode });
  };

  // Handle bottom navigation presses
  const handleNavPress = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case 'refer':
        navigation.navigate('ReferScreen'); // Navigate to Refer & Earn screen
        break;
      case 'upcoming':
        navigation.navigate('UpcomingTournaments'); // Navigate to Upcoming screen
        break;
      case 'completed':
        navigation.navigate('CompletedTournaments'); // Navigate to Completed screen
        break;
      default:
        // Stay on current screen
        break;
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        style={styles.background}
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>eSport Games</Text>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="sports-esports" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.topNav}>
        {' '}
        {/* ← Moved outside header */}
        {/* Nav Items */}
        <TouchableOpacity
          style={[
            styles.navItem,
            activeTab === 'refer' && styles.activeNavItem,
          ]}
          onPress={() => handleNavPress('refer')}
        >
          <MaterialIcons
            name="card-giftcard"
            size={24}
            color={activeTab === 'refer' ? '#ff9e00' : '#fff'}
          />
          <Text
            style={[
              styles.navLabel,
              activeTab === 'refer' && styles.activeNavLabel,
            ]}
          >
            Refer & Earn
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navItem,
            activeTab === 'upcoming' && styles.activeNavItem,
          ]}
          onPress={() => handleNavPress('upcoming')}
        >
          <MaterialIcons
            name="event"
            size={24}
            color={activeTab === 'upcoming' ? '#ff9e00' : '#fff'}
          />
          <Text
            style={[
              styles.navLabel,
              activeTab === 'upcoming' && styles.activeNavLabel,
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navItem,
            activeTab === 'completed' && styles.activeNavItem,
          ]}
          onPress={() => handleNavPress('completed')}
        >
          <MaterialIcons
            name="check-circle"
            size={24}
            color={activeTab === 'completed' ? '#ff9e00' : '#fff'}
          />
          <Text
            style={[
              styles.navLabel,
              activeTab === 'completed' && styles.activeNavLabel,
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {/* Enhanced Bottom Navigation Bar */}

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.gameGrid}>
          {gameModes.map((mode) => (
            <TouchableOpacity
              key={mode.id}
              style={styles.gameCard}
              onPress={() => handleCardPress(mode)}
            >
              <View style={styles.imageContainer}>
                <Image source={mode.image} style={styles.gameImage} />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  style={styles.gradient}
                />
                <View
                  style={[styles.gameBanner, { backgroundColor: mode.color }]}
                >
                  <Text style={styles.gameText}>{mode.name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
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
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 8,
    paddingBottom: 80, // Ensure content doesn't hide behind bottom nav
  },
  gameGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gameCard: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  imageContainer: {
    position: 'relative',
    height: 150,
  },
  gameImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  gameBanner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 6,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  topNav: {
    flexDirection: 'row',
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeNavItem: {
    borderBottomWidth: 2,
    borderBottomColor: '#ff9e00',
  },
  navLabel: {
    color: '#fff',
    fontSize: 11,
    marginTop: 4,
    textAlign: 'center',
  },
  activeNavLabel: {
    color: '#ff9e00',
    fontWeight: 'bold',
  },
});

export default AllMode;
