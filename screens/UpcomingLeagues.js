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

const UpcomingLeagues = () => {
  const navigation = useNavigation();

  const { upcoming, loadTournaments } = useTournamentStore();
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

  const getParticipantCount = (item) => {
    // Sometimes the participant count might be in the description field by mistake
    // This is a fallback based on your original code
    return item.participantsCount || 0;
  };

  const renderTournamentCard = ({ item }) => (
    <TouchableOpacity
      style={styles.tournamentCard}
      onPress={() =>
        navigation.navigate('MyUpcomingLeaguesDetails', { tournament: item })
      }
    >
      <LinearGradient
        colors={['#2c3e50', '#34495e']}
        style={styles.cardGradient}
      >
        {/* Game Type and Mode */}
        <View style={styles.cardHeader}>
          <Text style={styles.gameType}>{item.gameType}</Text>
          <View style={styles.modeBadge}>
            <Text style={styles.modeText}>{item.mode}</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.tournamentTitle}>{item.title}</Text>

        {/* Tournament Info */}
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Map</Text>
              <Text style={styles.infoValue}>{item.map}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Date</Text>
              <Text style={styles.infoValue}>
                {formatDate(item.matchDateTime)}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Time</Text>
              <Text style={styles.infoValue}>
                {formatTime(item.matchDateTime)}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Participants</Text>
              <Text style={styles.infoValue}>
                {getParticipantCount(item)}/{item.maxParticipants}
              </Text>
            </View>
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

        {/* View Details Button */}
        <TouchableOpacity
          style={styles.viewDetailsButton}
          onPress={() =>
            navigation.navigate('MyUpcomingLeaguesDetails', {
              tournament: item,
            })
          }
        >
          <Text style={styles.viewDetailsText}>VIEW DETAILS</Text>
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
      <Text style={styles.emptyText}>No upcoming tournaments found</Text>
      <Text style={styles.emptySubText}>
        Pull down to refresh or check back later
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#1a2a3a', '#2a3a4a']} style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Upcoming Tournaments</Text>
        </View>

        <FlatList
          data={upcoming}
          renderItem={renderTournamentCard}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#fff"
              colors={['#4a6eb5']}
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
  modeBadge: {
    backgroundColor: 'rgba(74, 110, 181, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  modeText: {
    color: '#fff',
    fontWeight: '600',
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
    backgroundColor: 'rgba(74, 110, 181, 0.8)',
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
    tintColor: '#4a6eb5',
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

export default UpcomingLeagues;
