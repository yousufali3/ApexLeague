import React, { useEffect, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAllTournamentsStore } from "../store/tournaments";
import { format } from "date-fns";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const UpcomingTournaments = () => {
  const { upcoming, loadAllTournaments } = useAllTournamentsStore();
  const navigation = useNavigation();

  useEffect(() => {
    loadAllTournaments();
  }, []);

  // Sort tournaments by date (closest first)
  const sortedTournaments = useMemo(() => {
    return [...upcoming].sort((a, b) => {
      const dateA = new Date(a.matchDateTime);
      const dateB = new Date(b.matchDateTime);
      return dateA.getTime() - dateB.getTime();
    });
  }, [upcoming]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Upcoming Tournaments</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {sortedTournaments.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No upcoming tournaments found</Text>
          </View>
        ) : (
          sortedTournaments.map((tournament) => (
            <TouchableOpacity
              key={tournament._id}
              style={[
                styles.tournamentCard,
                tournament.mode === "solo"
                  ? styles.soloCard
                  : tournament.mode === "squad"
                  ? styles.squadCard
                  : styles.duoCard,
              ]}
              onPress={() =>
                navigation.navigate("TournamentDetails", { tournament })
              }
              activeOpacity={0.7}
            >
              <View style={styles.cardContent}>
                <View style={styles.tournamentHeader}>
                  <Text style={styles.tournamentTitle}>{tournament.title}</Text>
                  <View
                    style={[
                      styles.badge,
                      tournament.mode === "solo"
                        ? styles.soloBadge
                        : tournament.mode === "squad"
                        ? styles.squadBadge
                        : styles.duoBadge,
                    ]}
                  >
                    <Text style={styles.badgeText}>
                      {tournament.mode.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Map</Text>
                    <Text style={styles.infoValue}>{tournament.map}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Entry Fee</Text>
                    <Text style={styles.infoValue}>
                      {tournament.entryFee}{" "}
                      <FontAwesome5 name="coins" size={16} color="gold" />
                    </Text>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Prize Pool</Text>
                    <Text style={styles.prizeValue}>
                      {tournament.prizePool}{" "}
                      <FontAwesome5 name="coins" size={16} color="gold" />
                    </Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Players</Text>
                    <Text style={styles.infoValue}>
                      {tournament.participantsCount}/
                      {tournament.maxParticipants}
                    </Text>
                  </View>
                </View>

                <View style={styles.dateTimeContainer}>
                  <Text style={styles.dateTimeText}>
                    {format(
                      new Date(tournament.matchDateTime),
                      "MMM dd, yyyy • h:mm a"
                    )}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.joinButton}
                  onPress={() =>
                    navigation.navigate("TournamentDetails", { tournament })
                  }
                >
                  <Text style={styles.joinButtonText}>VIEW DETAILS</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071330",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginVertical: 16,
    marginHorizontal: 16,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 0,
  },
  emptyContainer: {
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "#8D9CB8",
    fontSize: 16,
  },
  tournamentCard: {
    backgroundColor: "#0D2149",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#1A3A6A",
    elevation: 5,
  },
  soloCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#FF5722",
  },
  squadCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  duoCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
  },
  cardContent: {
    padding: 16,
  },
  tournamentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  tournamentTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    flex: 1,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  soloBadge: {
    backgroundColor: "#FF5722",
  },
  squadBadge: {
    backgroundColor: "#4CAF50",
  },
  duoBadge: {
    backgroundColor: "#2196F3",
  },
  badgeText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 12,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    color: "#8D9CB8",
    fontSize: 12,
    marginBottom: 4,
  },
  infoValue: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  prizeValue: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "bold",
  },
  dateTimeContainer: {
    backgroundColor: "#0A1B3A",
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: "center",
  },
  dateTimeText: {
    color: "#4DABF7",
    fontSize: 14,
    fontWeight: "500",
  },
  joinButton: {
    backgroundColor: "#1E88E5",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  joinButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default UpcomingTournaments;
