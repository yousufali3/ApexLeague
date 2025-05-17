import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Image,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAuthStore } from "../store/authStore";
import qr from "../assets/wallet.png"; // Placeholder for QR code image
import axios from "axios";
import moment from "moment";

import { BACKEND_URL } from "../services/config";
const WalletScreen = () => {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [activeTab, setActiveTab] = useState("deposit");
  const [showQRModal, setShowQRModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [withdrawalMethod, setWithdrawalMethod] = useState("upi");
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const balance = useAuthStore((state) => state.balance);

  const walletBalance = balance || 0; // Replace with actual balance

  // Replace with actual balance

  // Sample UPI IDs for the platform
  const platformUpiId = "apexleague@axl";

  useEffect(() => {
    // Fetch transaction history when the component mounts
    fetchTransactionHistory();

    // console.log(transactionHistory);
  }, []);
  // const mockQrCodeUri = ; // Placeholder for QR code

  const [transactionHistory, setTransactionHistory] = useState([]);

  const fetchTransactionHistory = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/wallet/transactions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(res.data);

      const { deposits, withdrawals, balance } = res.data.data;
      await useAuthStore.getState().setBalance(balance);
      console.log(balance, "balance");

      // Transform both deposits and withdrawals into one array
      const transactions = [
        ...deposits.map((item) => ({
          id: item._id,
          type: "deposit",
          amount: item.amount,
          date: moment(item.requestedAt).format("DD MMM, YYYY"),
          status: item.status,
          timestamp: new Date(item.requestedAt).getTime(), // used for sorting
        })),
        ...withdrawals.map((item) => ({
          id: item._id,
          type: "withdraw",
          amount: item.amount,
          date: moment(item.requestedAt).format("DD MMM, YYYY"),
          status: item.status,
          timestamp: new Date(item.requestedAt).getTime(), // used for sorting
        })),
      ];

      // Sort by timestamp in descending order (most recent first)
      const sortedTransactions = transactions.sort(
        (a, b) => b.timestamp - a.timestamp
      );

      // console.log(sortedTransactions, 'sorted transactions');

      // Now you can set this to state
      setTransactionHistory(sortedTransactions);
      // console.log('Transaction history:', transactionHistory);
    } catch (err) {
      console.error(
        "Failed to fetch transaction history",
        err.response?.data || err.message
      );
    }
  };

  const handleDeposit = async () => {
    console.log("Deposit amount:", depositAmount);

    if (Number(depositAmount) < 30) {
      Alert.alert("Error", "Minimum deposit amount is 30");
      return;
    }

    if (!transactionId) {
      Alert.alert("Error", "Please enter the transaction ID");
      return;
    }

    try {
      // Replace this with your actual token fetching logic
      // const token = await AsyncStorage.getItem('token')
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/wallet/deposit`,
        {
          amount: Number(depositAmount),
          transactionId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);

      Alert.alert(
        "Deposit Initiated",
        "Your deposit request has been submitted. Admin will verify and approve your transaction.",
        [{ text: "OK" }]
      );

      console.log("Deposit submitted:", response.data);

      // Clear inputs
      setDepositAmount("");
      setTransactionId("");
      fetchTransactionHistory();
    } catch (error) {
      console.error("Deposit error:", error.response?.data || error.message);
      Alert.alert(
        "Error",
        error.response?.data?.error || "Something went wrong"
      );
    }
  };

  const handleWithdraw = async () => {
    if (Number(withdrawAmount) < 50) {
      Alert.alert("Error", "Minimum withdrawal amount is 50");
      return;
    }

    if (Number(withdrawAmount) > walletBalance) {
      Alert.alert("Error", "Insufficient balance");
      return;
    }

    // Validate withdrawal details
    if (withdrawalMethod === "upi" && !upiId) {
      Alert.alert("Error", "Please enter your UPI ID");
      return;
    }

    if (
      withdrawalMethod === "bank" &&
      (!bankName || !accountNumber || !ifscCode || !accountHolderName)
    ) {
      Alert.alert("Error", "Please fill in all bank details");
      return;
    }

    try {
      // Replace this with your actual token fetching logic
      // const token = await AsyncStorage.getItem('token');

      const requestBody =
        withdrawalMethod === "bank"
          ? {
              amount: Number(withdrawAmount),
              paymentMethod: "bank",
              bankDetails: {
                bankName,
                accountNumber,
                ifscCode,
                accountHolderName,
              },
            }
          : {
              amount: Number(withdrawAmount),
              paymentMethod: "upi",
              upiDetails: {
                upiId,
              },
            };
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/wallet/withdraw`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);

      Alert.alert(
        "Withdrawal Requested",
        "Your withdrawal request has been submitted. Admin will process your request within 24 hours.",
        [{ text: "OK" }]
      );

      console.log("Withdrawal submitted:", response.data);

      // Clear inputs
      setWithdrawAmount("");
      setUpiId("");
      setBankName("");
      setAccountNumber("");
      setIfscCode("");
      setAccountHolderName("");
      fetchTransactionHistory();
    } catch (error) {
      console.error("Withdrawal error:", error.response?.data || error.message);
      Alert.alert(
        "Error",
        error.response?.data?.error || "Something went wrong"
      );
    }
  };

  const renderTransactionHistory = () => {
    // Sample transaction data - replace with actual data
    const transactions = [
      {
        id: 1,
        type: "deposit",
        amount: 500,
        date: "27 Apr, 2025",
        status: "completed",
      },
      {
        id: 2,
        type: "withdraw",
        amount: 200,
        date: "25 Apr, 2025",
        status: "pending",
      },
      {
        id: 3,
        type: "deposit",
        amount: 1000,
        date: "20 Apr, 2025",
        status: "completed",
      },
      {
        id: 4,
        type: "withdraw",
        amount: 300,
        date: "15 Apr, 2025",
        status: "rejected",
      },
    ];

    return (
      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Transaction History</Text>

        {transactionHistory.map((transaction) => (
          <View key={transaction.id} style={styles.transactionItem}>
            <View style={styles.transactionIconContainer}>
              <View
                style={[
                  styles.transactionIcon,
                  transaction.type === "deposit"
                    ? styles.depositIcon
                    : styles.withdrawIcon,
                ]}
              >
                <Feather
                  name={
                    transaction.type === "deposit" ? "arrow-down" : "arrow-up"
                  }
                  size={16}
                  color="#fff"
                />
              </View>
            </View>

            <View style={styles.transactionDetails}>
              <Text style={styles.transactionType}>
                {transaction.type === "deposit" ? "Deposit" : "Withdrawal"}
              </Text>
              <Text style={styles.transactionDate}>{transaction.date}</Text>
              <Text
                style={[
                  styles.statusText,
                  transaction.status === "approved"
                    ? styles.statusCompleted
                    : transaction.status === "pending"
                    ? styles.statusPending
                    : styles.statusRejected,
                ]}
              >
                {transaction.status.toUpperCase()}
              </Text>
            </View>

            <Text
              style={[
                styles.transactionAmount,
                transaction.type === "deposit"
                  ? styles.depositText
                  : styles.withdrawText,
              ]}
            >
              {transaction.type === "deposit" ? "+" : "-"}{" "}
              <FontAwesome5 name="coins" size={18} color="gold" />
              {"  "}
              {transaction.amount}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const renderDepositForm = () => {
    return (
      <View>
        <Text style={styles.inputLabel}>Enter Deposit Amount</Text>
        <View style={styles.inputWrapper}>
          <Text style={styles.currencySymbol}>
            {" "}
            <FontAwesome5 name="coins" size={18} color="gold" />
          </Text>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
            keyboardType="numeric"
            value={depositAmount}
            onChangeText={setDepositAmount}
            editable={!loading}
          />
        </View>

        <View style={styles.quickAmounts}>
          {[100, 500, 1000, 2000].map((amount) => (
            <TouchableOpacity
              key={amount}
              style={styles.quickAmountButton}
              onPress={() => setDepositAmount(amount.toString())}
              disabled={loading}
            >
              <Text style={styles.quickAmountText}>
                {" "}
                <FontAwesome5 name="coins" size={18} color="gold" />
                {"  "}
                {amount}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.paymentMethodContainer}>
          <Text style={styles.sectionTitle}>Select Payment Method</Text>
          <View style={styles.paymentToggle}>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === "upi" && styles.activePaymentOption,
              ]}
              onPress={() => setPaymentMethod("upi")}
              disabled={loading}
            >
              <Text
                style={[
                  styles.paymentOptionText,
                  paymentMethod === "upi" && styles.activePaymentOptionText,
                ]}
              >
                UPI ID
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === "qr" && styles.activePaymentOption,
              ]}
              onPress={() => setPaymentMethod("qr")}
              disabled={loading}
            >
              <Text
                style={[
                  styles.paymentOptionText,
                  paymentMethod === "qr" && styles.activePaymentOptionText,
                ]}
              >
                QR Code
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {paymentMethod === "upi" ? (
          <View style={styles.upiContainer}>
            <Text style={styles.upiLabel}>Pay to this UPI ID:</Text>
            <View style={styles.upiIdContainer}>
              <Text style={styles.upiIdText}>{platformUpiId}</Text>
              <TouchableOpacity style={styles.copyButton} disabled={loading}>
                <Feather name="copy" size={16} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.qrButton}
            onPress={() => setShowQRModal(true)}
            disabled={loading}
          >
            <Feather name="maximize" size={16} color="#ffffff" />
            <Text style={styles.qrButtonText}>View QR Code</Text>
          </TouchableOpacity>
        )}

        <View style={styles.divider} />

        <Text style={styles.inputLabel}>Enter Transaction ID</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Enter transaction ID or reference number"
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
            value={transactionId}
            onChangeText={setTransactionId}
            editable={!loading}
          />
        </View>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleDeposit}
          disabled={
            loading ||
            !depositAmount ||
            !transactionId ||
            Number(depositAmount) < 30
          }
        >
          <LinearGradient
            colors={["#4CAF50", "#388E3C"]}
            style={[
              styles.gradient,
              (loading ||
                !depositAmount ||
                !transactionId ||
                Number(depositAmount) < 30) &&
                styles.disabledGradient,
            ]}
          >
            <Text style={styles.actionButtonText}>Submit Deposit Request</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 8,
            justifyContent: "center",
          }}
        >
          <Text style={styles.noteText}>* Minimum Deposit amount is{"  "}</Text>
          <FontAwesome5 name="coins" size={14} color="#FFD700" />
          <Text style={styles.noteText}> 30</Text>
        </View>

        <Text style={styles.noteText}>
          * Funds will be added to your wallet after admin verification
        </Text>
      </View>
    );
  };

  const renderWithdrawForm = () => {
    return (
      <View>
        <Text style={styles.inputLabel}>Enter Withdrawal Amount</Text>
        <View style={styles.inputWrapper}>
          <Text style={styles.currencySymbol}>
            {" "}
            <FontAwesome5 name="coins" size={18} color="gold" />
            {""}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
            keyboardType="numeric"
            value={withdrawAmount}
            onChangeText={setWithdrawAmount}
            editable={!loading}
          />
        </View>

        <View style={styles.quickAmounts}>
          {[100, 500, 1000, walletBalance].map((amount) => (
            <TouchableOpacity
              key={amount}
              style={styles.quickAmountButton}
              onPress={() => setWithdrawAmount(amount.toString())}
              disabled={loading}
            >
              <Text style={styles.quickAmountText}>
                {amount === walletBalance ? (
                  <Text>ALL</Text>
                ) : (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <FontAwesome5 name="coins" size={18} color="gold" />

                    <Text style={{ marginLeft: 4, color: "white" }}>
                      {" "}
                      {amount}
                    </Text>
                  </View>
                )}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.paymentMethodContainer}>
          <Text style={styles.sectionTitle}>Select Withdrawal Method</Text>
          <View style={styles.paymentToggle}>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                withdrawalMethod === "upi" && styles.activePaymentOption,
              ]}
              onPress={() => setWithdrawalMethod("upi")}
              disabled={loading}
            >
              <Text
                style={[
                  styles.paymentOptionText,
                  withdrawalMethod === "upi" && styles.activePaymentOptionText,
                ]}
              >
                UPI ID
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                withdrawalMethod === "bank" && styles.activePaymentOption,
              ]}
              onPress={() => setWithdrawalMethod("bank")}
              disabled={loading}
            >
              <Text
                style={[
                  styles.paymentOptionText,
                  withdrawalMethod === "bank" && styles.activePaymentOptionText,
                ]}
              >
                Bank Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {withdrawalMethod === "upi" ? (
          <View>
            <Text style={styles.inputLabel}>Enter Your UPI ID</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="yourname@bank"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
                value={upiId}
                onChangeText={setUpiId}
                editable={!loading}
              />
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.inputLabel}>Bank Account Details</Text>

            <Text style={styles.subLabel}>Account Holder Name</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter account holder name"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
                value={accountHolderName}
                onChangeText={setAccountHolderName}
                editable={!loading}
              />
            </View>

            <Text style={styles.subLabel}>Bank Name</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter bank name"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
                value={bankName}
                onChangeText={setBankName}
                editable={!loading}
              />
            </View>

            <Text style={styles.subLabel}>Account Number</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter account number"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
                keyboardType="numeric"
                value={accountNumber}
                onChangeText={setAccountNumber}
                editable={!loading}
              />
            </View>

            <Text style={styles.subLabel}>IFSC Code</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter IFSC code"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
                autoCapitalize="characters"
                value={ifscCode}
                onChangeText={setIfscCode}
                editable={!loading}
              />
            </View>
          </View>
        )}

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleWithdraw}
          disabled={
            loading ||
            !withdrawAmount ||
            Number(withdrawAmount) < 50 ||
            Number(withdrawAmount) > walletBalance ||
            (withdrawalMethod === "upi" && !upiId) ||
            (withdrawalMethod === "bank" &&
              (!bankName || !accountNumber || !ifscCode || !accountHolderName))
          }
        >
          <LinearGradient
            colors={["#4a69bd", "#1e3799"]}
            style={[
              styles.gradient,
              (loading ||
                !withdrawAmount ||
                Number(withdrawAmount) < 50 ||
                Number(withdrawAmount) > walletBalance ||
                (withdrawalMethod === "upi" && !upiId) ||
                (withdrawalMethod === "bank" &&
                  (!bankName ||
                    !accountNumber ||
                    !ifscCode ||
                    !accountHolderName))) &&
                styles.disabledGradient,
            ]}
          >
            <Text style={styles.actionButtonText}>
              Submit Withdrawal Request
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 8,
            justifyContent: "center",
          }}
        >
          <Text style={styles.noteText}>
            * Minimum withdrawal amount is{"       "}
          </Text>
          <FontAwesome5 name="coins" size={14} color="#FFD700" />
          <Text style={styles.noteText}>{"  "} 50</Text>
        </View>
        <Text style={styles.noteText}>
          * Withdrawals are processed within 24 hours after admin approval
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <LinearGradient
        colors={["#1a1a2e", "#16213e", "#0f3460"]}
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
          colors={["#4a69bd", "#1e3799"]}
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
            {"  "}
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
            style={[styles.tab, activeTab === "deposit" && styles.activeTab]}
            onPress={() => setActiveTab("deposit")}
          >
            <Feather
              name="arrow-down-circle"
              size={18}
              color={
                activeTab === "deposit" ? "#ffffff" : "rgba(255, 255, 255, 0.6)"
              }
            />
            <Text
              style={[
                styles.tabText,
                activeTab === "deposit" && styles.activeTabText,
              ]}
            >
              Deposit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "withdraw" && styles.activeTab]}
            onPress={() => setActiveTab("withdraw")}
          >
            <Feather
              name="arrow-up-circle"
              size={18}
              color={
                activeTab === "withdraw"
                  ? "#ffffff"
                  : "rgba(255, 255, 255, 0.6)"
              }
            />
            <Text
              style={[
                styles.tabText,
                activeTab === "withdraw" && styles.activeTabText,
              ]}
            >
              Withdraw
            </Text>
          </TouchableOpacity>
        </View>

        {/* Transaction Form */}
        <View style={styles.formContainer}>
          {activeTab === "deposit" ? renderDepositForm() : renderWithdrawForm()}
        </View>

        {/* Transaction History */}
        {renderTransactionHistory()}
      </ScrollView>

      {/* QR Code Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showQRModal}
        onRequestClose={() => setShowQRModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Scan QR Code to Pay</Text>
              <TouchableOpacity onPress={() => setShowQRModal(false)}>
                <Feather name="x" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>

            <View style={styles.qrContainer}>
              <Image source={qr} style={styles.qrImage} />
            </View>

            <Text style={styles.modalUpiId}>{platformUpiId}</Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowQRModal(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 120,
  },
  balanceCard: {
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
  },
  balanceTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  refreshIcon: {
    opacity: 0.8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 16,
  },
  balanceActions: {
    flexDirection: "row",
    marginTop: 8,
  },
  quickAction: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  quickActionText: {
    color: "#ffffff",
    marginLeft: 6,
    fontSize: 14,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  tabText: {
    color: "rgba(255, 255, 255, 0.6)",
    marginLeft: 8,
    fontWeight: "500",
  },
  activeTabText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 8,
  },
  subLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 6,
    marginTop: 10,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    marginBottom: 16,
  },
  currencySymbol: {
    paddingLeft: 16,
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "500",
  },
  input: {
    flex: 1,
    padding: 16,
    color: "#ffffff",
    fontSize: 16,
  },
  quickAmounts: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  quickAmountButton: {
    width: "48%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    paddingVertical: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  quickAmountText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
  actionButton: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gradient: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledGradient: {
    opacity: 0.5,
  },
  actionButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  noteText: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 12,
    fontStyle: "italic",
    textAlign: "center",
  },
  historyContainer: {
    marginBottom: 16,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 16,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
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
    justifyContent: "center",
    alignItems: "center",
  },
  depositIcon: {
    backgroundColor: "#4CAF50",
  },
  withdrawIcon: {
    backgroundColor: "#4a69bd",
  },
  transactionDetails: {
    flex: 1,
  },
  transactionType: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  transactionDate: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 5,
  },
  statusCompleted: {
    color: "#4CAF50",
  },
  statusPending: {
    color: "#FFC107",
  },
  statusRejected: {
    color: "#F44336",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  depositText: {
    color: "#4CAF50",
  },
  withdrawText: {
    color: "#4a69bd",
  },
  paymentMethodContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 8,
  },
  paymentToggle: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 8,
    overflow: "hidden",
  },
  paymentOption: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activePaymentOption: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  paymentOptionText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: "500",
  },
  activePaymentOptionText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  upiContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  upiLabel: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 12,
    marginBottom: 8,
  },
  upiIdContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 8,
    padding: 12,
  },
  upiIdText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
  copyButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  qrButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 8,
    marginBottom: 20,
  },
  qrButtonText: {
    color: "#ffffff",
    marginLeft: 8,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginVertical: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#16213e",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  modalTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  qrContainer: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  qrImage: {
    width: 200,
    height: 200,
  },
  modalUpiId: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  modalButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});
export default WalletScreen;
