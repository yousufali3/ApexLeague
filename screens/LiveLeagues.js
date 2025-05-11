import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTournamentStore } from '../store/tournamentStore';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const { width } = Dimensions.get('window');

const LiveLeagues = () => {
  const navigation = useNavigation();
  const { live, loadTournaments } = useTournamentStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadTournaments();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTournaments();
    setRefreshing(false);
  };

  // Format date string
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format time string
  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  const renderTournamentCard = ({ item }) => (
    <TouchableOpacity
      style={styles.tournamentCard}
      onPress={() =>
        navigation.navigate('MyUpcomingLeaguesDetails', {
          tournament: item,
        })
      }
    >
      <LinearGradient
        colors={['#b71c1c', '#8e0000']}
        style={styles.cardGradient}
      >
        {/* Game Type and Status */}
        <View style={styles.cardHeader}>
          <Text style={styles.gameType}>{item.gameType}</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>LIVE</Text>
          </View>
        </View>

        {/* Title or Team Name */}
        <Text style={styles.tournamentTitle}>
          {item.teamName || item.username || item.title}
        </Text>

        {/* Tournament Info */}
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Map</Text>
              <Text style={styles.infoValue}>{item.map}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Started At</Text>
              <Text style={styles.infoValue}>
                {formatDate(item.startTime || item.matchDateTime)}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Time</Text>
              <Text style={styles.infoValue}>
                {formatTime(item.startTime || item.matchDateTime)}
              </Text>
            </View>
            {item.participantsCount && (
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Participants</Text>
                <Text style={styles.infoValue}>
                  {item.participantsCount}/{item.maxParticipants}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Prize and Entry Fee */}
        <View style={styles.prizeContainer}>
          <View style={styles.prizeItem}>
            <Text style={styles.prizeLabel}>Prize Pool</Text>
            <Text style={styles.prizeValue}>
              <FontAwesome5 name="coins" size={18} color="gold" />
              {'  '}
              {item.prizePool}
            </Text>
          </View>
          <View style={styles.prizeItem}>
            <Text style={styles.prizeLabel}>Entry Fee</Text>
            <Text style={styles.prizeValue}>
              <FontAwesome5 name="coins" size={18} color="gold" />
              {'  '}
              {item.entryFee}
            </Text>
          </View>
        </View>

        {/* Watch Now Button */}
        <TouchableOpacity
          style={styles.viewDetailsButton}
          onPress={() =>
            navigation.navigate('MyUpcomingLeaguesDetails', {
              tournament: item,
            })
          }
        >
          <Text style={styles.viewDetailsText}> View Details</Text>
        </TouchableOpacity>
      </LinearGradient>
    </TouchableOpacity>
  );

  const EmptyListComponent = () => (
    <View style={styles.emptyContainer}>
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }}
        style={styles.emptyImage}
      />
      <Text style={styles.emptyText}>No live tournaments right now</Text>
      <Text style={styles.emptySubText}>
        Check back later for live tournaments
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#1a2a3a', '#2a3a4a']} style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Live Tournaments</Text>
        </View>

        <FlatList
          data={live}
          renderItem={renderTournamentCard}
          keyExtractor={(item) => item.tournamentId || item._id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#fff"
              colors={['#b71c1c']}
            />
          }
          ListEmptyComponent={EmptyListComponent}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a2a3a',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(26, 42, 58, 0.95)',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  tournamentCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardGradient: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  gameType: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statusBadge: {
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  tournamentTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoItem: {
    width: '48%',
  },
  infoLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    marginBottom: 2,
  },
  infoValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  prizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  prizeItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    width: '48%',
  },
  prizeLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    marginBottom: 4,
  },
  prizeValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewDetailsButton: {
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  viewDetailsText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
    opacity: 0.7,
    tintColor: '#b71c1c',
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default LiveLeagues;
