import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const CompletedDetails = ({ route }) => {
  const { tournament } = route.params;
  const [isExpanded, setIsExpanded] = useState(true);
  const isSoloMode = tournament?.mode === "solo";

  if (!tournament) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
        <LinearGradient
          colors={["#1a2a3a", "#2a3a4a"]}
          style={styles.container}
        >
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyMessage}>Tournament not found.</Text>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#1a2a3a", "#2a3a4a"]} style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Tournament Details</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.tournamentCard}>
            <LinearGradient
              colors={["#2c3e50", "#34495e"]}
              style={styles.cardGradient}
            >
              <TouchableOpacity
                style={styles.tournamentHeader}
                onPress={() => setIsExpanded(!isExpanded)}
              >
                <View style={styles.tournamentTitleContainer}>
                  <Text style={styles.tournamentTitle}>{tournament.title}</Text>
                  <View
                    style={[
                      styles.modeBadge,
                      isSoloMode ? styles.soloModeBadge : styles.squadModeBadge,
                    ]}
                  >
                    <Text style={styles.modeText}>
                      {tournament.mode.toUpperCase()}
                    </Text>
                  </View>
                </View>
                <View style={styles.tournamentDetails}>
                  <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                      <Text style={styles.infoLabel}>Map</Text>
                      <Text style={styles.infoValue}>{tournament.map}</Text>
                    </View>
                    <View style={styles.infoItem}>
                      <Text style={styles.infoLabel}>Date & Time</Text>
                      <Text style={styles.infoValue}>
                        {new Date(
                          tournament.matchDateTime
                        ).toLocaleDateString()}
                        {"\n"}
                        {new Date(tournament.matchDateTime).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                      <Text style={styles.infoLabel}>Prize Pool</Text>
                      <Text style={styles.prizeValue}>
                        <FontAwesome5 name="coins" size={18} color="gold" />
                        {"  "}
                        {tournament.prizePool}
                      </Text>
                    </View>
                    <View style={styles.infoItem}>
                      <Text style={styles.infoLabel}>Entry Fee</Text>
                      <Text style={styles.prizeValue}>
                        <FontAwesome5 name="coins" size={18} color="gold" />
                        {"  "}
                        {tournament.entryFee}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.expandCollapseText}>
                  {isExpanded ? "Tap to collapse" : "Tap to view details"}
                </Text>
              </TouchableOpacity>

              {isExpanded && (
                <View style={styles.expandedContent}>
                  {/* TOURNAMENT DESCRIPTION */}
                  {tournament.description && (
                    <View style={styles.section}>
                      <Text style={styles.sectionTitle}>Description</Text>
                      <Text style={styles.descriptionText}>
                        {tournament.description}
                      </Text>
                    </View>
                  )}

                  {/* PRIZE BREAKDOWN */}
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Prize Breakdown</Text>
                    <View style={styles.prizeDetails}>
                      <Text style={styles.prizeText}>Rank Prizes:</Text>
                      {tournament.prizeBreakup?.rankPrizes?.map(
                        (prize, index) => (
                          <Text key={index} style={styles.prizeItemText}>
                            {prize.from === prize.to
                              ? `Rank ${prize.from}: `
                              : `Rank ${prize.from}-${prize.to}: `}
                            <FontAwesome5 name="coins" size={14} color="gold" />
                            {"  "}
                            {prize.amount}
                          </Text>
                        )
                      )}
                      {tournament.prizeBreakup?.type === "both" && (
                        <Text style={styles.prizeItemText}>
                          Per Kill:{" "}
                          <FontAwesome5 name="coins" size={14} color="gold" />
                          {"  "}
                          {tournament.prizeBreakup.perKillAmount}
                        </Text>
                      )}
                    </View>
                  </View>

                  {/* WINNERS TABLE */}
                  {tournament.winners && tournament.winners.length > 0 && (
                    <View style={styles.section}>
                      <Text style={styles.sectionTitle}>Winners</Text>
                      <View style={styles.tableContainer}>
                        <View style={styles.tableHeader}>
                          <Text style={[styles.tableHeaderCell, { flex: 1 }]}>
                            Rank
                          </Text>
                          <Text style={[styles.tableHeaderCell, { flex: 2 }]}>
                            {isSoloMode ? "Player" : "Team"}
                          </Text>
                          <Text style={[styles.tableHeaderCell, { flex: 1 }]}>
                            Kills
                          </Text>
                          <Text style={[styles.tableHeaderCell, { flex: 1.5 }]}>
                            Amount Won
                          </Text>
                        </View>
                        <ScrollView style={styles.tableBody}>
                          {tournament.winners.map((winner, index) => (
                            <View key={index} style={styles.tableRow}>
                              <Text style={[styles.tableCell, { flex: 1 }]}>
                                {winner.rank}
                              </Text>
                              <Text style={[styles.tableCell, { flex: 2 }]}>
                                {isSoloMode
                                  ? winner.username || winner.name || "N/A"
                                  : winner.name || "N/A"}
                              </Text>
                              <Text style={[styles.tableCell, { flex: 1 }]}>
                                {winner.kills}
                              </Text>
                              <Text style={[styles.tableCell, { flex: 1.5 }]}>
                                <FontAwesome5
                                  name="coins"
                                  size={14}
                                  color="gold"
                                />
                                {"  "}
                                {winner.amountWon}
                              </Text>
                            </View>
                          ))}
                        </ScrollView>
                      </View>
                    </View>
                  )}
                </View>
              )}
            </LinearGradient>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1a2a3a",
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "rgba(26, 42, 58, 0.95)",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyMessage: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  tournamentCard: {
    borderRadius: 16,
    overflow: "hidden",
    margin: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardGradient: {
    padding: 16,
  },
  tournamentHeader: {
    padding: 8,
  },
  tournamentTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  tournamentTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
  },
  modeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  soloModeBadge: {
    backgroundColor: "rgba(255, 87, 34, 0.3)",
  },
  squadModeBadge: {
    backgroundColor: "rgba(76, 175, 80, 0.3)",
  },
  modeText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  tournamentDetails: {
    marginTop: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  infoItem: {
    width: "48%",
  },
  infoLabel: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 12,
    marginBottom: 4,
  },
  infoValue: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  prizeValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  expandCollapseText: {
    color: "#4DABF7",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  expandedContent: {
    paddingHorizontal: 8,
    paddingTop: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: 20,
  },
  prizeDetails: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    padding: 16,
    borderRadius: 12,
  },
  prizeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  prizeItemText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 6,
  },
  tableContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 12,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  tableHeaderCell: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  tableBody: {
    maxHeight: 200,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  tableCell: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  },
});

export default CompletedDetails;
