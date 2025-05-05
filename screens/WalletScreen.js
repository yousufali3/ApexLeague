import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
const WalletScreen = () => {
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [activeTab, setActiveTab] = useState('deposit'); // 'deposit' or 'withdraw'
  const walletBalance = 546; // Replace with actual balance

  const handleDeposit = () => {
    console.log(`Deposited: ₹${depositAmount}`);
    // Integrate Razorpay logic here
    setDepositAmount('');
  };

  const handleWithdraw = () => {
    if (Number(withdrawAmount) < 50) {
      alert('Minimum withdrawal amount is ₹50');
      return;
    }

    console.log(`Withdrew: ₹${withdrawAmount}`);
    // Your withdrawal logic here
    setWithdrawAmount('');
  };

  const renderTransactionHistory = () => {
    // Sample transaction data - replace with actual data
    const transactions = [
      {
        id: 1,
        type: 'deposit',
        amount: 500,
        date: '27 Apr, 2025',
        status: 'completed',
      },
      {
        id: 2,
        type: 'withdraw',
        amount: 200,
        date: '25 Apr, 2025',
        status: 'completed',
      },
      {
        id: 3,
        type: 'deposit',
        amount: 1000,
        date: '20 Apr, 2025',
        status: 'completed',
      },
      {
        id: 4,
        type: 'withdraw',
        amount: 300,
        date: '15 Apr, 2025',
        status: 'completed',
      },
    ];

    return (
      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Transaction History</Text>

        {transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionItem}>
            <View style={styles.transactionIconContainer}>
              <View
                style={[
                  styles.transactionIcon,
                  transaction.type === 'deposit'
                    ? styles.depositIcon
                    : styles.withdrawIcon,
                ]}
              >
                <Feather
                  name={
                    transaction.type === 'deposit' ? 'arrow-down' : 'arrow-up'
                  }
                  size={16}
                  color="#fff"
                />
              </View>
            </View>

            <View style={styles.transactionDetails}>
              <Text style={styles.transactionType}>
                {transaction.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
              </Text>
              <Text style={styles.transactionDate}>{transaction.date}</Text>
            </View>

            <Text
              style={[
                styles.transactionAmount,
                transaction.type === 'deposit'
                  ? styles.depositText
                  : styles.withdrawText,
              ]}
            >
              {transaction.type === 'deposit' ? '+' : '-'}{' '}
              <FontAwesome5 name="coins" size={18} color="gold" />
              {'  '}
              {transaction.amount}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        style={styles.background}
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Wallet</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="help-circle" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Balance Card */}
        <LinearGradient
          colors={['#4a69bd', '#1e3799']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.balanceCard}
        >
          <View style={styles.balanceTopRow}>
            <Text style={styles.balanceLabel}>Available Balance</Text>
            <Feather
              name="refresh-cw"
              size={18}
              color="#ffffff"
              style={styles.refreshIcon}
            />
          </View>
          <Text style={styles.balanceAmount}>
            {walletBalance}
            {'  '}
            <FontAwesome5
              name="coins"
              size={35}
              color="#FFD700"
              style={styles.walletIcon}
            />
          </Text>
          <View style={styles.balanceActions}>
            <TouchableOpacity style={styles.quickAction}>
              <Feather name="clock" size={16} color="#ffffff" />
              <Text style={styles.quickActionText}>History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <Feather name="share-2" size={16} color="#ffffff" />
              <Text style={styles.quickActionText}>Share</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Tabs for Deposit/Withdraw */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'deposit' && styles.activeTab]}
            onPress={() => setActiveTab('deposit')}
          >
            <Feather
              name="arrow-down-circle"
              size={18}
              color={
                activeTab === 'deposit' ? '#ffffff' : 'rgba(255, 255, 255, 0.6)'
              }
            />
            <Text
              style={[
                styles.tabText,
                activeTab === 'deposit' && styles.activeTabText,
              ]}
            >
              Deposit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'withdraw' && styles.activeTab]}
            onPress={() => setActiveTab('withdraw')}
          >
            <Feather
              name="arrow-up-circle"
              size={18}
              color={
                activeTab === 'withdraw'
                  ? '#ffffff'
                  : 'rgba(255, 255, 255, 0.6)'
              }
            />
            <Text
              style={[
                styles.tabText,
                activeTab === 'withdraw' && styles.activeTabText,
              ]}
            >
              Withdraw
            </Text>
          </TouchableOpacity>
        </View>

        {/* Transaction Form */}
        <View style={styles.formContainer}>
          {activeTab === 'deposit' ? (
            <View>
              <Text style={styles.inputLabel}>Enter Deposit Amount</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.currencySymbol}>
                  {' '}
                  <FontAwesome5 name="coins" size={18} color="gold" />
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="0.00"
                  placeholderTextColor="rgba(255, 255, 255, 0.3)"
                  keyboardType="numeric"
                  value={depositAmount}
                  onChangeText={setDepositAmount}
                />
              </View>

              <View style={styles.quickAmounts}>
                {[100, 500, 1000, 2000].map((amount) => (
                  <TouchableOpacity
                    key={amount}
                    style={styles.quickAmountButton}
                    onPress={() => setDepositAmount(amount.toString())}
                  >
                    <Text style={styles.quickAmountText}>
                      {' '}
                      <FontAwesome5 name="coins" size={18} color="gold" />
                      {'  '}
                      {amount}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleDeposit}
                disabled={!depositAmount}
              >
                <LinearGradient
                  colors={['#4CAF50', '#388E3C']}
                  style={[
                    styles.gradient,
                    !depositAmount && styles.disabledGradient,
                  ]}
                >
                  <Text style={styles.actionButtonText}>
                    Deposit with Razorpay
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8,
                }}
              >
                <Text style={styles.noteText}>
                  * Minimum Deposit amount is{'  '}
                </Text>
                <FontAwesome5 name="coins" size={14} color="#FFD700" />
                <Text style={styles.noteText}> 30</Text>
              </View>

              <Text style={styles.noteText}>
                * Funds will be added to your wallet after successful payment
              </Text>
            </View>
          ) : (
            <View>
              <Text style={styles.inputLabel}>Enter Withdrawal Amount</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.currencySymbol}>
                  {' '}
                  <FontAwesome5 name="coins" size={18} color="gold" />
                  {''}
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="0.00"
                  placeholderTextColor="rgba(255, 255, 255, 0.3)"
                  keyboardType="numeric"
                  value={withdrawAmount}
                  onChangeText={setWithdrawAmount}
                />
              </View>

              <View style={styles.quickAmounts}>
                {[100, 500, 1500, walletBalance].map((amount) => (
                  <TouchableOpacity
                    key={amount}
                    style={styles.quickAmountButton}
                    onPress={() => setWithdrawAmount(amount.toString())}
                  >
                    <Text style={styles.quickAmountText}>
                      {amount === walletBalance ? (
                        <Text>ALL</Text>
                      ) : (
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}
                        >
                          <FontAwesome5 name="coins" size={18} color="gold" />

                          <Text style={{ marginLeft: 4, color: 'white' }}>
                            {' '}
                            {amount}
                          </Text>
                        </View>
                      )}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleWithdraw}
                disabled={
                  !withdrawAmount ||
                  Number(withdrawAmount) < 50 ||
                  Number(withdrawAmount) > walletBalance
                }
              >
                <LinearGradient
                  colors={['#4a69bd', '#1e3799']}
                  style={[
                    styles.gradient,
                    (!withdrawAmount ||
                      Number(withdrawAmount) < 50 ||
                      Number(withdrawAmount) > walletBalance) &&
                      styles.disabledGradient,
                  ]}
                >
                  <Text style={styles.actionButtonText}>Withdraw Funds</Text>
                </LinearGradient>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8,
                }}
              >
                <Text style={styles.noteText}>
                  * Minimum withdrawal amount is{'       '}
                </Text>
                <FontAwesome5 name="coins" size={14} color="#FFD700" />
                <Text style={styles.noteText}>{'  '} 50</Text>
              </View>
            </View>
          )}
        </View>

        {/* Transaction History */}
        {renderTransactionHistory()}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 16,
  },
  balanceCard: {
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
  },
  balanceTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  refreshIcon: {
    opacity: 0.8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  balanceActions: {
    flexDirection: 'row',
    marginTop: 8,
  },
  quickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  quickActionText: {
    color: '#ffffff',
    marginLeft: 6,
    fontSize: 14,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  tabText: {
    color: 'rgba(255, 255, 255, 0.6)',
    marginLeft: 8,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 16,
  },
  currencySymbol: {
    paddingLeft: 16,
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
  },
  input: {
    flex: 1,
    padding: 16,
    color: '#ffffff',
    fontSize: 18,
  },
  quickAmounts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quickAmountButton: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    paddingVertical: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  quickAmountText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  actionButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledGradient: {
    opacity: 0.5,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noteText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  historyContainer: {
    marginBottom: 16,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  transactionIconContainer: {
    marginRight: 16,
  },
  transactionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  depositIcon: {
    backgroundColor: '#4CAF50',
  },
  withdrawIcon: {
    backgroundColor: '#4a69bd',
  },
  transactionDetails: {
    flex: 1,
  },
  transactionType: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  transactionDate: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  depositText: {
    color: '#4CAF50',
  },
  withdrawText: {
    color: '#4a69bd',
  },
});

export default WalletScreen;
