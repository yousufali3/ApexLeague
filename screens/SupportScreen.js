import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";

const SupportScreen = () => {
  const handleTelegramSupport = () => {
    Linking.openURL("https://t.me/Apexleagueturnamet").catch((err) =>
      console.error("Error opening Telegram:", err)
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#1a1a2e", "#16213e", "#0f3460"]}
        style={styles.background}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>Support Center</Text>
          <Text style={styles.subtitleText}>How can we help you today?</Text>
        </View>

        <View style={styles.supportOptionsContainer}>
          <Text style={styles.sectionTitle}>Contact Options</Text>

          {/* Telegram Support Option */}
          <TouchableOpacity onPress={handleTelegramSupport}>
            <View style={styles.supportOption}>
              <View style={styles.iconContainer}>
                <Feather name="message-circle" size={24} color="#ffffff" />
              </View>
              <View style={styles.supportOptionContent}>
                <Text style={styles.optionTitle}>Telegram Support</Text>
                <Text style={styles.optionDescription}>
                  @Apexleagueturnamet
                </Text>
                <Text style={styles.optionSubtext}>
                  Get instant support via Telegram
                </Text>
              </View>
              <View style={styles.arrowContainer}>
                <Feather name="chevron-right" size={20} color="#ffffff" />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.comingSoonContainer}>
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>Coming Soon</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.comingSoonCard}>
            <Feather
              name="message-circle"
              size={24}
              color="rgba(255,255,255,0.6)"
            />
            <Text style={styles.comingSoonTitle}>Live Chat Support</Text>
            <Text style={styles.comingSoonDescription}>
              We're working on implementing live chat for faster assistance.
              Stay tuned!
            </Text>
          </View>
        </View>
        {/* 
        <View style={styles.faqContainer}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

          <TouchableOpacity>
            <View style={styles.faqItem}>
              <Text style={styles.faqQuestion}>
                How do I reset my password?
              </Text>
              <Feather name="plus" size={18} color="#ffffff" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.faqItem}>
              <Text style={styles.faqQuestion}>
                How do I update my account details?
              </Text>
              <Feather name="plus" size={18} color="#ffffff" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.faqItem}>
              <Text style={styles.faqQuestion}>
                How do I change my subscription plan?
              </Text>
              <Feather name="plus" size={18} color="#ffffff" />
            </View>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scrollContent: {
    padding: 24,
  },
  headerContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 32,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: "#e0e0e0",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 16,
  },
  supportOptionsContainer: {
    marginBottom: 32,
  },
  supportOption: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  supportOptionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 15,
    color: "#ffffff",
    marginBottom: 2,
  },
  optionSubtext: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
  },
  arrowContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  faqContainer: {
    marginBottom: 32,
  },
  faqItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    padding: 16,
    marginBottom: 12,
  },
  faqQuestion: {
    flex: 1,
    fontSize: 14,
    color: "#ffffff",
  },
  loginButton: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 32,
  },
  gradient: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  comingSoonContainer: {
    marginBottom: 40,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  dividerText: {
    color: "#ffffff",
    paddingHorizontal: 16,
    fontSize: 14,
  },
  comingSoonCard: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "rgba(255,255,255,0.2)",
    padding: 20,
    alignItems: "center",
  },
  comingSoonTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "rgba(255,255,255,0.8)",
    marginTop: 12,
    marginBottom: 8,
  },
  comingSoonDescription: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
    lineHeight: 20,
  },
});

export default SupportScreen;
