import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UpcomingTournaments = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        Upcoming Tournaments will be displayed here!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  message: {
    fontSize: 18,
    color: '#333',
  },
});

export default UpcomingTournaments;
