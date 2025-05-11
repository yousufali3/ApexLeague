import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../store/authStore';
import { BACKEND_URL } from '../services/config';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  return date.toLocaleDateString('en-US', options);
};

const TournamentCard = ({ tournament }) => {
  const navigator = useNavigation();
  const registrationProgress =
    (tournament.participantsCount / tournament.maxParticipants) * 100;

  return (
    <View style={styles.tournamentCard}>
      <TouchableOpacity
        onPress={() => {
          navigator.navigate('TournamentDetails', { tournament });
        }}
      >
        {/* Header with game type and ID */}
        <View style={styles.cardHeader}>
          <View style={styles.gameTypeContainer}>
            <Icon name="lightning-bolt" size={16} color="#FFD700" />
            <Text style={styles.gameTypeText}>
              {tournament.gameType}{' '}
              {tournament.mode.charAt(0).toUpperCase() +
                tournament.mode.slice(1)}
              {tournament.gameType === 'Freefire Survival' &&
                ' (🚗Vehicle + Air Drop NOT ALLOWED 🚗)'}
            </Text>
          </View>
          <Text style={styles.idText}>#{tournament._id.slice(-6)}</Text>
        </View>

        {/* Tournament details section */}
        <View style={styles.cardBody}>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <View style={styles.statHeader}>
                <Icon name="trophy-outline" size={16} color="#FFD700" />
                <Text style={styles.statLabel}>Entry</Text>
              </View>
              <Text style={styles.statValue}>
                <FontAwesome5 name="coins" size={18} color="gold" />{' '}
                {tournament.entryFee}
              </Text>
            </View>

            <View style={styles.statBox}>
              <View style={styles.statHeader}>
                <Icon name="gift-outline" size={16} color="#FFD700" />
                <Text style={styles.statLabel}>Prizes</Text>
              </View>
              <Text style={styles.statValue}>
                <FontAwesome5 name="coins" size={18} color="gold" />
                {'  '}
                {tournament.prizePool}
              </Text>
            </View>

            <View style={styles.statBox}>
              <View style={styles.statHeader}>
                <Icon name="skull-outline" size={16} color="#FFD700" />
                <Text style={styles.statLabel}>Kill Point</Text>
              </View>
              <Text style={styles.statValue}>
                <FontAwesome5 name="coins" size={18} color="gold" />
                {'  '}
                {tournament.prizeBreakup.perKillAmount}/Kill
              </Text>
            </View>
          </View>

          {/* Progress bar for registration */}
          <View style={styles.progressContainer}>
            <View
              style={[
                styles.progressBar,
                { width: `${registrationProgress}%` },
              ]}
            />
            <Text style={styles.progressText}>
              Filling Fast {tournament.participantsCount}/
              {tournament.maxParticipants}
            </Text>
          </View>

          {/* Bottom row with date, participants, and map info */}
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Icon name="clock-outline" size={14} color="#888" />
              <Text style={styles.infoText}>
                {formatDate(tournament.matchDateTime)}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Icon name="account-group" size={14} color="#888" />
              <Text style={styles.infoText}>
                {tournament.participantsCount}/{tournament.maxParticipants}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Icon name="map-marker" size={14} color="#888" />
              <Text style={styles.infoText}>
                {tournament.map.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>

        {/* Action button */}
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => {
            navigator.navigate('TournamentDetails', { tournament });
          }}
        >
          <Text style={styles.viewButtonText}>Join Now</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const DuoScreen = ({ mode }) => {
  const navigation = useNavigation();
  const logout = useAuthStore((state) => state.logout);

  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Convert "CLASH SQUAD" to "Clash Squad"
  const formatGameType = (text) =>
    text
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`${BACKEND_URL}/tournaments/filter`, {
          gameType: formatGameType(mode.name),
          mode: 'duo',
        });

        console.log(response);
        setTournaments(response.data.tournaments || []);
      } catch (error) {
        console.error('Error fetching tournament data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mode]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{mode.name} - Duo Tournaments</Text>
        <Text style={styles.headerSubtitle}>
          Join competitive matches and win prizes
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#E91E63"
            style={styles.loader}
          />
        ) : tournaments.length > 0 ? (
          tournaments.map((tournament) => (
            <TournamentCard key={tournament._id} tournament={tournament} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No tournaments available right now.
            </Text>
            <Text style={styles.emptyStateSubtext}>
              Check back later for upcoming matches!
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    backgroundColor: '#8B0000', // Maroon color similar to image
    padding: 16,
    paddingTop: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  scrollContent: {
    padding: 12,
  },
  tournamentCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#8B0000', // Maroon color from image
    padding: 10,
  },
  gameTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  gameTypeText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 6,
    fontSize: 12,
  },
  idText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
  cardBody: {
    padding: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#555',
    marginLeft: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
  },
  progressContainer: {
    height: 24,
    backgroundColor: '#eee',
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 12,
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50', // Green progress bar
    position: 'absolute',
    left: 0,
    top: 0,
  },
  progressText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#555',
  },
  viewButton: {
    backgroundColor: '#8B0000', // Maroon button
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  loader: {
    marginTop: 40,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default DuoScreen;
