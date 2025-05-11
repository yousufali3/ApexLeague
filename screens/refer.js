import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  MaterialCommunityIcons,
  Feather,
  MaterialIcons,
} from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

const { width } = Dimensions.get('window');

const ReferAndEarnScreen = () => {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const referralCode = 'YOUR2025BONUS';

  const handleCopyCode = async () => {
    await Clipboard.setStringAsync(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0b1a32" />
      <LinearGradient
        colors={['#0b1a32', '#0d2148', '#102a4e']}
        style={styles.background}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.brandName}>Apex League</Text>
          {/* <TouchableOpacity style={styles.signInButton}> */}
          {/* <Text style={styles.signInText}></Text> */}
          {/* </TouchableOpacity> */}
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mainCard}>
            {/* Icon Header */}
            <View style={styles.iconHeaderContainer}>
              <View style={styles.iconCircle}>
                <Feather name="share-2" size={32} color="#d6e4ff" />
              </View>
            </View>

            {/* Title and Description */}
            <Text style={styles.title}>Refer & Earn Coming Soon</Text>
            <Text style={styles.subtitle}>
              Our referral program is launching soon. Be among the first to
              invite friends and start earning rewards!
            </Text>

            {/* Features */}
            <View style={styles.featuresContainer}>
              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <Feather name="gift" size={20} color="#d6e4ff" />
                </View>
                <View style={styles.featureTextContainer}>
                  <Text style={styles.featureTitle}>Earn Rewards</Text>
                  <Text style={styles.featureDescription}>
                    Get up to 5 for each friend who joins
                  </Text>
                </View>
              </View>

              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <Feather name="mail" size={20} color="#d6e4ff" />
                </View>
                <View style={styles.featureTextContainer}>
                  <Text style={styles.featureTitle}>Easy Sharing</Text>
                  <Text style={styles.featureDescription}>
                    Share via email, social or direct link
                  </Text>
                </View>
              </View>
            </View>

            {/* Early Access Code */}
            <View style={styles.codeContainer}>
              <Text style={styles.codeLabel}>
                Your Early Access Referral Code:
              </Text>
              <View style={styles.codeRow}>
                <View style={styles.codeBox}>
                  <Text style={styles.code}>{referralCode}</Text>
                </View>
                <TouchableOpacity
                  style={styles.copyButton}
                  onPress={handleCopyCode}
                >
                  {copied ? (
                    <MaterialIcons name="check-circle" size={22} color="#fff" />
                  ) : (
                    <Feather name="copy" size={22} color="#fff" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Get Notified */}
            <View style={styles.notifyContainer}>
              <Text style={styles.notifyLabel}>
                Get notified when we launch:
              </Text>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.emailInput}
                  placeholder="Your email address"
                  placeholderTextColor="#8ba3d4"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TouchableOpacity style={styles.notifyButton}>
                  <Text style={styles.notifyButtonText}>Notify Me</Text>
                  <Feather name="arrow-right" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Progress Indicator */}
            <View style={styles.progressContainer}>
              <View style={styles.progressLabelRow}>
                <Text style={styles.progressLabel}>Program Progress</Text>
                <Text style={styles.progressPercentage}>85% Complete</Text>
              </View>
              <View style={styles.progressBarBackground}>
                <View style={[styles.progressBarFill, { width: '85%' }]} />
              </View>
              <Text style={styles.launchingText}>Launching in 14 days</Text>
            </View>
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2025 BrandName. All rights reserved.
          </Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  brandName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  signInButton: {
    backgroundColor: '#1e40af',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  // signInText: {
  //   color: '#ffffff',
  //   fontWeight: '600',
  // },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
    justifyContent: 'center',
  },
  mainCard: {
    backgroundColor: 'rgba(30, 58, 138, 0.3)',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(59, 89, 152, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconHeaderContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircle: {
    backgroundColor: 'rgba(59, 130, 246, 0.5)',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#bdd3ff',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  featuresContainer: {
    marginBottom: 24,
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  featureIconContainer: {
    backgroundColor: 'rgba(59, 130, 246, 0.3)',
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 13,
    color: '#bdd3ff',
  },
  codeContainer: {
    backgroundColor: 'rgba(30, 64, 175, 0.3)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  codeLabel: {
    fontSize: 13,
    color: '#bdd3ff',
    marginBottom: 8,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeBox: {
    flex: 1,
    backgroundColor: 'rgba(23, 37, 84, 0.7)',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(30, 64, 175, 0.5)',
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#d6e4ff',
  },
  copyButton: {
    backgroundColor: '#2563eb',
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  notifyContainer: {
    marginBottom: 24,
  },
  notifyLabel: {
    fontSize: 13,
    color: '#bdd3ff',
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailInput: {
    flex: 1,
    backgroundColor: 'rgba(23, 37, 84, 0.7)',
    borderRadius: 8,
    padding: 12,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(30, 64, 175, 0.5)',
  },
  notifyButton: {
    backgroundColor: '#2563eb',
    height: 48,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginLeft: 8,
  },
  notifyButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    marginRight: 4,
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 12,
    color: '#bdd3ff',
  },
  progressPercentage: {
    fontSize: 12,
    color: '#bdd3ff',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: 'rgba(30, 64, 175, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
  launchingText: {
    fontSize: 13,
    color: '#bdd3ff',
    textAlign: 'center',
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#bdd3ff',
  },
});

export default ReferAndEarnScreen;
