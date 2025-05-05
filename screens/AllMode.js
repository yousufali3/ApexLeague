import React from 'react';
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
import { useState } from 'react';
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
  const [selectedMode, setSelectedMode] = useState(null); // State to track the selected mode

  const handleCardPress = (mode) => {
    setSelectedMode(mode); // Track the selected mode
    console.log(`Selected Mode: ${mode.name}`); // Log the selected mode for debugging
    navigation.navigate('GameScreen', { mode });
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
          {/* <Feather name="info" size={22} color="#ffffff" /> */}
          <MaterialIcons name="sports-esports" size={24} color="white" />
        </TouchableOpacity>
      </View>

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

      {/* <TouchableOpacity style={styles.floatingButton}>
        <LinearGradient
          colors={['#ff7b00', '#ff9e00']}
          style={styles.floatingGradient}
        >
          <Feather name="message-circle" size={24} color="#ffffff" />
        </LinearGradient>
      </TouchableOpacity> */}
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
    paddingBottom: 80,
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
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  floatingGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AllMode;
