import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MatchCard = ({ match }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{match.title}</Text>
      <View style={styles.detailsRow}>
        <Text>
          Entry: <FontAwesome5 name="coins" size={18} color="gold" />
          {match.entry}
        </Text>
        <Text>
          Prizes: <FontAwesome5 name="coins" size={18} color="gold" />
          {match.prizes}
        </Text>
        <Text>
          Kill: <FontAwesome5 name="coins" size={18} color="gold" />
          {match.kill}
        </Text>
      </View>
      <View style={styles.detailsRow}>
        <Text>Start: {match.startDate}</Text>
        <Text>Participants: {match.participants}</Text>
        <Text>Map: {match.map}</Text>
      </View>
      <TouchableOpacity style={styles.viewButton}>
        <Text style={styles.viewButtonText}>View</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 16,
    elevation: 3,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  viewButton: {
    backgroundColor: '#8B0000',
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 10,
  },
  viewButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default MatchCard;
