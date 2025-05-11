import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  SafeAreaView,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { BACKEND_URL } from '../services/config';
const { width } = Dimensions.get('window');
import { useAuthStore } from '../store/authStore';

const TournamentDetailsScreen = ({ route, navigation }) => {
  const { tournament } = route.params;

  // State for registration form data
  const [registrationExpanded, setRegistrationExpanded] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [players, setPlayers] = useState([{ username: '', userId: '' }]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Initialize players array based on tournament mode
  useEffect(() => {
    if (tournament.mode === 'solo') {
      setPlayers([{ username: '', userId: '' }]);
    } else if (tournament.mode === 'duo') {
      setPlayers([
        { username: '', userId: '' },
        { username: '', userId: '' },
      ]);
    } else if (tournament.mode === 'squad') {
      setPlayers([
        { username: '', userId: '' },
        { username: '', userId: '' },
        { username: '', userId: '' },
        { username: '', userId: '' },
      ]);
    }

    // Reset team name whenever mode changes
    setTeamName('');
  }, [tournament.mode]);

  const updatePlayerDetail = (index, field, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = { ...updatedPlayers[index], [field]: value };
    setPlayers(updatedPlayers);
  };

  const toggleRegistrationExpanded = () => {
    setRegistrationExpanded(!registrationExpanded);
  };

  const validateFormData = () => {
    // Check team name for duo and squad
    if (
      (tournament.mode === 'duo' || tournament.mode === 'squad') &&
      !teamName.trim()
    ) {
      Alert.alert('Missing Information', 'Please enter a team name');
      return false;
    }

    // Validate player details
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      if (!player.username.trim()) {
        Alert.alert(
          'Missing Information',
          `Please enter username for Player ${i + 1}`
        );
        return false;
      }
      if (!player.userId.trim()) {
        Alert.alert(
          'Missing Information',
          `Please enter user ID for Player ${i + 1}`
        );
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateFormData()) {
      return;
    }

    const isTeamMode = tournament.mode === 'duo' || tournament.mode === 'squad';
    const tournamentId = tournament._id; // Make sure this exists
    const token = useAuthStore.getState().token;
    const balance = useAuthStore.getState().balance;
    const setBalance = useAuthStore.getState().setBalance;

    let url = '';
    let payload = {};

    if (tournament.mode === 'solo') {
      url = `${BACKEND_URL}/tournaments/register/solo`;
      payload = {
        tournamentId,
        username: players[0].username,
        gameUid: players[0].userId,
      };
    } else {
      url = `${BACKEND_URL}/tournaments/register/team`;
      payload = {
        tournamentId,
        teamName,
        players: players.map((p) => ({
          username: p.username,
          gameUid: p.userId,
        })),
      };
    }

    try {
      const { data } = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBalance(balance - tournament.entryFee);

      console.log('Registration Success:', data);
      Alert.alert('Registration Successful', 'You have joined the tournament!');
      setFormSubmitted(true);
      setRegistrationExpanded(false);
    } catch (error) {
      console.error(
        'Registration Error:',
        error?.response?.data || error.message
      );
      Alert.alert(
        'Registration Failed',
        error?.response?.data?.message ||
          'Something went wrong. Please try again.'
      );
    }
  };

  const renderPlayerInputs = () => {
    return players.map((player, index) => (
      <View key={index} style={styles.playerSection}>
        <View style={styles.playerTitleContainer}>
          <Text style={styles.playerTitle}>Player {index + 1}</Text>
          {index === 0 && tournament.mode !== 'solo' && (
            <Text style={styles.captainBadge}>Captain</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Username <Text style={styles.requiredStar}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter in-game username"
            placeholderTextColor="#9e9e9e"
            value={player.username}
            onChangeText={(text) => updatePlayerDetail(index, 'username', text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            User ID <Text style={styles.requiredStar}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter numeric ID"
            placeholderTextColor="#9e9e9e"
            value={player.userId}
            onChangeText={(text) => updatePlayerDetail(index, 'userId', text)}
            keyboardType="numeric"
          />
        </View>
      </View>
    ));
  };

  // Format date string
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderRegistrationForm = () => {
    return (
      <View style={styles.registrationFormCard}>
        <Text style={styles.registrationTitle}>
          {tournament.mode === 'solo'
            ? 'Player Registration'
            : 'Team Registration'}
        </Text>

        {/* Team Name Input (for Duo and Squad) */}
        {(tournament.mode === 'duo' || tournament.mode === 'squad') && (
          <View style={styles.teamNameContainer}>
            <Text style={styles.teamNameLabel}>Team Name *</Text>
            <TextInput
              style={styles.teamNameInput}
              placeholder="Enter your team name"
              placeholderTextColor="#9e9e9e"
              value={teamName}
              onChangeText={setTeamName}
            />
          </View>
        )}

        {/* Player details */}
        <Text style={styles.playerSectionTitle}>
          {tournament.mode === 'solo' ? 'Player Details' : 'Players Details'}
        </Text>

        {renderPlayerInputs()}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#1a2a3a', '#2a3a4a']} style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Tournament Details</Text>
          <View style={styles.placeholderView} />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Tournament Banner */}
            <View style={styles.banner}>
              <LinearGradient
                colors={['#3b5998', '#4a6eb5']}
                style={styles.bannerGradient}
              >
                <View style={styles.bannerContent}>
                  <Text style={styles.gameType}>{tournament.gameType}</Text>
                  <View style={styles.modeContainer}>
                    <View style={styles.modeBadge}>
                      <Text style={styles.modeText}>{tournament.mode}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.participantsBadge}>
                  <Text style={styles.participantsText}>
                    {tournament.participantsCount}/{tournament.maxParticipants}{' '}
                    Players
                  </Text>
                </View>
              </LinearGradient>
            </View>

            {/* Prize Information */}
            <View style={styles.prizeSection}>
              <View style={styles.prizeCard}>
                <Text style={styles.prizeLabel}>Entry Fee</Text>
                <Text style={styles.prizeAmount}>
                  <FontAwesome5 name="coins" size={18} color="gold" />
                  {tournament.entryFee}
                </Text>
              </View>
              <View style={styles.prizeCard}>
                <Text style={styles.prizeLabel}>Prize Pool</Text>
                <Text style={styles.prizeAmount}>
                  <FontAwesome5 name="coins" size={18} color="gold" />
                  {tournament.prizePool}
                </Text>
              </View>
            </View>

            {/* Tournament Details */}
            <View style={styles.detailsCard}>
              <Text style={styles.sectionTitle}>Tournament Details</Text>

              <View style={styles.detailsGrid}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Per Kill</Text>
                  <Text style={styles.detailValue}>
                    <FontAwesome5 name="coins" size={18} color="gold" />
                    {'  '}
                    {tournament.prizeBreakup?.perKillAmount || 0}
                  </Text>
                </View>

                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Map</Text>
                  <Text style={styles.detailValue}>{tournament.map}</Text>
                </View>

                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Date</Text>
                  <Text style={styles.detailValue}>May 5, 2025</Text>
                </View>

                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Time</Text>
                  <Text style={styles.detailValue}>8:00 PM</Text>
                </View>
              </View>
            </View>

            {/* Registration Section */}
            {!formSubmitted ? (
              <View style={styles.registrationSection}>
                <TouchableOpacity
                  style={styles.joinButton}
                  onPress={toggleRegistrationExpanded}
                >
                  <LinearGradient
                    colors={['#4a6eb5', '#3b5998']}
                    style={styles.joinButtonGradient}
                  >
                    <Text style={styles.joinButtonText}>
                      {registrationExpanded
                        ? 'HIDE REGISTRATION FORM'
                        : 'JOIN TOURNAMENT'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                {registrationExpanded && renderRegistrationForm()}
              </View>
            ) : (
              <View style={styles.registeredCard}>
                <LinearGradient
                  colors={['#43a047', '#2e7d32']}
                  style={styles.registeredGradient}
                >
                  <Text style={styles.registeredText}>
                    You're registered for this tournament!
                  </Text>
                  <Text style={styles.registeredInfo}>
                    Tournament details will be shared 10 minutes before the
                    start time
                  </Text>
                </LinearGradient>
              </View>
            )}

            <View style={styles.detailsCard}>
              <Text style={styles.sectionTitle}>Tournament Prize Breakup</Text>

              {/* Table Header */}
              <View style={[styles.row, styles.headerRow]}>
                <Text style={[styles.cell, styles.headerCell]}>Standing</Text>
                <Text style={[styles.cell, styles.headerCell]}>Prize</Text>
              </View>

              {/* Table Rows */}
              {tournament.prizeBreakup?.rankPrizes?.map((prize, index) => (
                <View key={index} style={styles.row}>
                  <Text style={styles.cell}>
                    {prize.from} - {prize.to}
                  </Text>
                  <Text style={styles.cell}>
                    <FontAwesome5 name="coins" size={18} color="gold" />
                    {'  '}
                    {prize.amount}
                  </Text>
                </View>
              ))}
            </View>

            {/* Tournament Description */}
            <View style={styles.rulesCard}>
              <Text style={styles.sectionTitle}>Tournament Description</Text>
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>
                  {tournament.description}
                </Text>
              </View>
            </View>

            {/* Rules Section */}
            <View style={styles.rulesCard}>
              <Text style={styles.sectionTitle}>Tournament Rules</Text>
              <View style={styles.ruleItem}>
                <View style={styles.ruleBullet}></View>
                <Text style={styles.ruleText}>
                  No teaming with other players
                </Text>
              </View>
              <View style={styles.ruleItem}>
                <View style={styles.ruleBullet}></View>
                <Text style={styles.ruleText}>
                  Hacking or using modified clients is prohibited
                </Text>
              </View>
              <View style={styles.ruleItem}>
                <View style={styles.ruleBullet}></View>
                <Text style={styles.ruleText}>
                  Be online 15 minutes before the tournament starts
                </Text>
              </View>
              <View style={styles.ruleItem}>
                <View style={styles.ruleBullet}></View>
                <Text style={styles.ruleText}>
                  Tournament ID and password will be shared 10 minutes before
                  start
                </Text>
              </View>
            </View>

            {/* Bottom Spacing */}
            <View style={{ height: 30 }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a2a3a', // Dark blue background
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(26, 42, 58, 0.95)',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  placeholderView: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  banner: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  bannerGradient: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerContent: {
    flex: 1,
  },
  gameType: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modeContainer: {
    flexDirection: 'row',
  },
  modeBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  modeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  participantsBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  participantsText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  prizeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  prizeCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  prizeAmount: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 4,
  },
  prizeLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginBottom: 4,
  },
  detailsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  detailItem: {
    width: '50%',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  detailLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginBottom: 4,
  },
  detailValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  rulesCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  descriptionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 12,
  },
  descriptionText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    lineHeight: 20,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ruleBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4a6eb5',
    marginRight: 10,
  },
  ruleText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    flex: 1,
  },
  registrationSection: {
    marginBottom: 24,
  },
  joinButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  joinButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  joinButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 1,
  },
  registrationFormCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  registrationTitle: {
    color: '#333',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  playerSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    marginTop: 8,
  },
  playerSection: {
    marginBottom: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  playerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  playerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4a6eb5',
  },
  captainBadge: {
    fontSize: 12,
    color: 'white',
    backgroundColor: '#ff9800',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  requiredStar: {
    color: '#ff5252',
    fontWeight: 'bold',
  },
  teamNameContainer: {
    marginBottom: 20,
    backgroundColor: '#f5f8ff',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e8ff',
  },
  teamNameLabel: {
    color: '#4a6eb5',
    fontSize: 15,
    marginBottom: 8,
    fontWeight: '600',
  },
  teamNameInput: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#d0d8e8',
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputLabel: {
    color: '#555',
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  submitButton: {
    backgroundColor: '#4a6eb5',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  registeredCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  registeredGradient: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  registeredText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 8,
  },
  registeredInfo: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  headerRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#444', // Subtle border for dark mode
    marginBottom: 6,
  },
  cell: {
    flex: 1,
    fontSize: 14,
    color: '#ccc', // Light text for dark background
  },
  headerCell: {
    fontWeight: 'bold',
    color: '#fff', // Brighter header for contrast
  },
});

export default TournamentDetailsScreen;
