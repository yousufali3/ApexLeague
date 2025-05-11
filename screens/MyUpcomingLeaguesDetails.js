import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  Alert,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const MyUpcomingLeaguesDetails = ({ route }) => {
  const { tournament } = route.params;
  console.log('tournament details:', tournament);

  if (!tournament) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>No tournament details available.</Text>
      </SafeAreaView>
    );
  }

  // Check if winners array exists and has content
  const hasWinners = tournament.winners && tournament.winners.length > 0;

  // Check if room credentials are available
  const hasRoomCredentials = tournament.roomId && tournament.roomPassword;

  // Extract rank prizes if available
  const rankPrizes = tournament.prizeBreakup?.rankPrizes?.[0] || [];

  // Format date for display
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch (e) {
      return dateString || 'Not specified';
    }
  };

  // Copy text to clipboard
  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Copied to clipboard!', ToastAndroid.SHORT);
    } else {
      Alert.alert('Copied', 'Text copied to clipboard!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Tournament Title and Basic Info */}
        <View style={styles.section}>
          <Text style={styles.title}>
            {tournament.title || tournament.name || 'Unnamed Tournament'}
          </Text>
          <Text style={styles.subtitle}>
            {tournament.gameType} - {tournament.mode}
          </Text>
        </View>
        {/* Main Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tournament Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date & Time:</Text>
            <Text style={styles.detailValue}>
              {formatDate(tournament.matchDateTime)}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Game Type:</Text>
            <Text style={styles.detailValue}>
              {tournament.gameType || 'Not specified'}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Mode:</Text>
            <Text style={styles.detailValue}>
              {tournament.mode || 'Not specified'}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Map:</Text>
            <Text style={styles.detailValue}>
              {tournament.map || 'Not specified'}
            </Text>
          </View>
        </View>
        {/* Participants Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Participants</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Max Participants:</Text>
            <Text style={styles.detailValue}>
              {tournament.maxParticipants || 'Not specified'}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Current Count:</Text>
            <Text style={styles.detailValue}>
              {tournament.participantsCount || 0}
            </Text>
          </View>
        </View>
        {/* Entry Fee & Prize Pool */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prize Information</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Entry Fee:</Text>
            <Text style={styles.detailValue}>
              <FontAwesome5 name="coins" size={14} color="gold" />
              {'  '}
              {tournament.entryFee || 0}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Prize Pool:</Text>
            <Text style={styles.detailValue}>
              {' '}
              <FontAwesome5 name="coins" size={14} color="gold" />
              {'  '}
              {tournament.prizePool || 0}
            </Text>
          </View>
          {tournament.prizeBreakup && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Prize Type:</Text>
              <Text style={styles.detailValue}>
                {tournament.prizeBreakup.type || 'Not specified'}
              </Text>
            </View>
          )}
          {tournament.prizeBreakup &&
            tournament.prizeBreakup.perKillAmount > 0 && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Per Kill Amount:</Text>
                <Text style={styles.detailValue}>
                  <FontAwesome5 name="coins" size={14} color="gold" />
                  {'  '}
                  {tournament.prizeBreakup.perKillAmount}
                </Text>
              </View>
            )}

          {/* Prize Breakdown Table */}
          {tournament.prizeBreakup?.rankPrizes &&
            tournament.prizeBreakup.rankPrizes.length > 0 && (
              <View style={styles.prizeTable}>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderCell}>Rank From</Text>
                  <Text style={styles.tableHeaderCell}>Rank To</Text>
                  <Text style={styles.tableHeaderCell}>Prize Amount</Text>
                </View>
                {tournament.prizeBreakup.rankPrizes.map((prize, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableCell}>{prize.from}</Text>
                    <Text style={styles.tableCell}>{prize.to}</Text>
                    <Text style={styles.tableCell}>
                      {' '}
                      <FontAwesome5 name="coins" size={14} color="gold" />
                      {'  '}
                      {prize.amount}
                    </Text>
                  </View>
                ))}
              </View>
            )}
        </View>
        /* Room Credentials */
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Room Details</Text>
          {hasRoomCredentials ? (
            <>
              <View style={styles.credentialContainer}>
                <View style={styles.credentialRow}>
                  <Text style={styles.detailLabelWhite}>Room ID:</Text>
                  <Text style={styles.credentialValue}>
                    {tournament.roomId}
                  </Text>
                  <TouchableOpacity
                    style={styles.copyButton}
                    onPress={() => copyToClipboard(tournament.roomId)}
                  >
                    <Text style={styles.copyButtonText}>Copy</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.credentialRow}>
                  <Text style={styles.detailLabelWhite}>Password:</Text>
                  <Text style={styles.credentialValue}>
                    {tournament.roomPassword}
                  </Text>
                  <TouchableOpacity
                    style={styles.copyButton}
                    onPress={() => copyToClipboard(tournament.roomPassword)}
                  >
                    <Text style={styles.copyButtonText}>Copy</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : (
            <Text style={styles.comingSoon}>
              Coming soon! Check back later for room credentials.
            </Text>
          )}
        </View>
        {/* Registered Players */}
        {tournament.registeredPlayers &&
          tournament.registeredPlayers.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Registered Players</Text>
              <View style={styles.prizeTable}>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderCell}>S.No</Text>
                  <Text style={styles.tableHeaderCell}>Username</Text>
                  <Text style={styles.tableHeaderCell}>Game ID</Text>
                </View>
                {tournament.registeredPlayers.map((player, index) => (
                  <View key={player._id || index} style={styles.tableRow}>
                    <Text style={styles.tableCell}>{index + 1}</Text>
                    <Text style={styles.tableCell}>
                      {player.username || 'Unknown'}
                    </Text>
                    <Text style={styles.tableCell}>
                      {player.gameUid || 'Not provided'}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        {/* Registered Teams */}
        {tournament.registeredTeams &&
          tournament.registeredTeams.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Registered Teams</Text>
              <View style={styles.prizeTable}>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderCell}>S.No</Text>
                  <Text style={styles.tableHeaderCell}>Team Name</Text>
                </View>
                {tournament.registeredTeams.map((team, index) => (
                  <View key={team._id || index} style={styles.tableRow}>
                    <Text style={styles.tableCell}>{index + 1}</Text>
                    <Text style={styles.tableCell}>
                      {team.teamName || `Team ${index + 1}`}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        {/* {tournament.registeredPlayers &&
          tournament.registeredPlayers.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Registered Players</Text>
              {tournament.registeredPlayers.map((player, index) => (
                <View key={player._id || index} style={styles.playerCard}>
                  <Text style={styles.playerName}>
                    {player.username || 'Unknown'}
                  </Text>
                  <Text style={styles.playerDetail}>
                    Game ID: {player.gameUid || 'Not provided'}
                  </Text>
                  {player.kills > 0 && (
                    <Text style={styles.playerDetail}>
                      Kills: {player.kills}
                    </Text>
                  )}
                  {player.rank > 0 && (
                    <Text style={styles.playerDetail}>Rank: {player.rank}</Text>
                  )}
                </View>
              ))}
            </View>
          )}
        Registered Teams */}
        {/* Winners Section */}
        {hasWinners ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Winners</Text>
            {tournament.winners.map((winner, index) => (
              <View key={winner._id || index} style={styles.winnerCard}>
                <Text style={styles.winnerName}>
                  {winner.username || 'Unknown'}
                </Text>
                <Text style={styles.winnerDetail}>
                  Rank: {winner.rank || 'Not ranked'}
                </Text>
                <Text style={styles.winnerDetail}>
                  Prize: {winner.prize || 'Not specified'}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Winners</Text>
            <Text style={styles.comingSoon}>Tournament not completed yet.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1929',
  },
  scrollContainer: {
    padding: 16,
  },
  section: {
    backgroundColor: '#10243e',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#a9c8e8',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#4dacff',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8fb1d6',
    width: '40%',
  },
  detailLabelWhite: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    width: '25%',
  },
  detailValue: {
    fontSize: 14,
    color: '#e0eaff',
    flex: 1,
  },
  playerCard: {
    backgroundColor: '#1a365d',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  playerDetail: {
    fontSize: 14,
    color: '#a9c8e8',
  },
  winnerCard: {
    backgroundColor: '#14385e',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ffb700',
  },
  winnerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  winnerDetail: {
    fontSize: 14,
    color: '#a9c8e8',
  },
  message: {
    fontSize: 18,
    color: '#a9c8e8',
    textAlign: 'center',
    marginTop: 20,
  },
  comingSoon: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#8fb1d6',
    marginTop: 4,
  },
  prizeTable: {
    marginTop: 12,
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#4dacff',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1a365d',
    padding: 8,
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#2d4a6d',
  },
  tableCell: {
    flex: 1,
    padding: 8,
    textAlign: 'center',
    color: '#e0eaff',
  },
  credentialContainer: {
    backgroundColor: '#1a365d',
    borderRadius: 6,
    padding: 12,
    marginTop: 8,
  },
  credentialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  credentialValue: {
    fontSize: 16,
    color: '#ffce5c',
    fontWeight: '500',
    flex: 1,
  },
  copyButton: {
    backgroundColor: '#4dacff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  copyButtonText: {
    color: '#0a1929',
    fontWeight: '600',
    fontSize: 12,
  },
});

export default MyUpcomingLeaguesDetails;
