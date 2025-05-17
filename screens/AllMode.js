import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  Dimensions,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import ClashSqlad from "../assets/ClashSquad.jpg";
import FullMap from "../assets/FullMap.jpg";
import LoneWolf from "../assets/LoneWolf.jpg";
import Craftland from "../assets/CraftLand.jpg";

const AllMode = () => {
  const gameModes = [
    {
      id: 1,
      name: "CLASH SQUAD",
      image: ClashSqlad,
      color: "#0e6ee3",
    },
    {
      id: 2,
      name: "FULL MAP",
      image: FullMap,
      color: "#ff8a00",
    },
    {
      id: 3,
      name: "LONE WOLF",
      image: LoneWolf,
      color: "#e31616",
    },
    {
      id: 4,
      name: "CRAFT LAND",
      image: Craftland,
      color: "#0e6ee3",
    },
    {
      id: 5,
      name: "FREE MATCH",
      image: require("../assets/free.jpg"), // Placeholder image
      color: "#ff8a00",
    },
  ];

  const navigation = useNavigation();
  const [selectedMode, setSelectedMode] = useState(null);
  const [activeTab, setActiveTab] = useState("games"); // Track active bottom tab
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const bannerWidth = Dimensions.get("window").width;
  const isScrolling = useRef(false);

  const banners = [
    require("../assets/banner.jpg"),
    require("../assets/banner2.jpg"),
  ];

  const autoSlide = () => {
    if (isScrolling.current) return;

    let nextIndex = currentBannerIndex + 1;

    if (nextIndex >= banners.length) {
      // Smoothly scroll to first slide
      isScrolling.current = true;
      scrollViewRef.current?.scrollTo({
        x: 0,
        animated: true,
      });
      nextIndex = 0;
      setTimeout(() => {
        isScrolling.current = false;
      }, 500);
    } else {
      scrollViewRef.current?.scrollTo({
        x: nextIndex * bannerWidth,
        animated: true,
      });
    }

    setCurrentBannerIndex(nextIndex);
  };

  useEffect(() => {
    const interval = setInterval(autoSlide, 3000);
    return () => clearInterval(interval);
  }, [currentBannerIndex]);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / bannerWidth);

    if (newIndex !== currentBannerIndex) {
      setCurrentBannerIndex(newIndex);
    }
  };

  const handleCardPress = (mode) => {
    setSelectedMode(mode);
    console.log(`Selected Mode: ${mode.name}`);
    navigation.navigate("GameScreen", { mode });
  };

  // Handle bottom navigation presses
  const handleNavPress = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case "refer":
        navigation.navigate("ReferScreen"); // Navigate to Refer & Earn screen
        break;
      case "upcoming":
        navigation.navigate("UpcomingTournaments"); // Navigate to Upcoming screen
        break;
      case "completed":
        navigation.navigate("CompletedTournaments"); // Navigate to Completed screen
        break;
      default:
        // Stay on current screen
        break;
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#1a1a2e", "#16213e", "#0f3460"]}
        style={styles.background}
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>eSport Games</Text>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="sports-esports" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.topNav}>
        {/* Nav Items */}
        <TouchableOpacity
          style={[
            styles.navItem,
            activeTab === "refer" && styles.activeNavItem,
          ]}
          onPress={() => handleNavPress("refer")}
        >
          <MaterialIcons
            name="card-giftcard"
            size={24}
            color={activeTab === "refer" ? "#ff9e00" : "#ff9e00"}
          />
          <Text
            style={[
              styles.navLabel,
              activeTab === "refer" && styles.activeNavLabel,
            ]}
          >
            Refer & Earn
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navItem,
            activeTab === "upcoming" && styles.activeNavItem,
          ]}
          onPress={() => handleNavPress("upcoming")}
        >
          <MaterialIcons
            name="emoji-events"
            size={24}
            color={activeTab === "upcoming" ? "#ff9e00" : "#ff9e00"}
          />
          <Text
            style={[
              styles.navLabel,
              activeTab === "upcoming" && styles.activeNavLabel,
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navItem,
            activeTab === "completed" && styles.activeNavItem,
          ]}
          onPress={() => handleNavPress("completed")}
        >
          <MaterialIcons
            name="emoji-events"
            size={24}
            color={activeTab === "completed" ? "#ff9e00" : "#ff9e00"}
          />
          <Text
            style={[
              styles.navLabel,
              activeTab === "completed" && styles.activeNavLabel,
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.bannerContainer}>
          <Animated.ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.bannerScroll}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            onMomentumScrollEnd={(event) => {
              const offsetX = event.nativeEvent.contentOffset.x;
              const newIndex = Math.round(offsetX / bannerWidth);
              setCurrentBannerIndex(newIndex);
            }}
          >
            {banners.map((banner, index) => (
              <TouchableOpacity
                key={index}
                style={styles.promoContainer}
                onPress={() => {
                  Linking.openURL(
                    "https://www.instagram.com/apexleagueofficial?igsh=Znp0YmpkOHJ1Z3ow"
                  );
                }}
              >
                <Image
                  source={banner}
                  style={styles.promoImage}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.7)"]}
                  style={styles.promoGradient}
                />
              </TouchableOpacity>
            ))}
          </Animated.ScrollView>

          <View style={styles.bannerIndicators}>
            {banners.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  currentBannerIndex === index && styles.activeIndicator,
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.gameGrid}>
          {gameModes.map((mode) => (
            <TouchableOpacity
              key={mode.id}
              style={styles.gameCard}
              onPress={() => handleCardPress(mode)}
            >
              <View style={styles.imageContainer}>
                <Image source={mode.image} style={styles.gameImage} />
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.8)"]}
                  style={styles.gradient}
                />
                <View
                  style={[styles.gameBanner, { backgroundColor: mode.color }]}
                >
                  <Text style={styles.gameText}>{mode.name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    padding: 8,
    paddingBottom: 80, // Ensure content doesn't hide behind bottom nav
  },
  gameGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gameCard: {
    width: "48%",
    marginBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  imageContainer: {
    position: "relative",
    height: 150,
  },
  gameImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    alignSelf: "center",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "50%",
  },
  gameBanner: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 6,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  gameText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  topNav: {
    flexDirection: "row",
    backgroundColor: "rgba(15, 23, 42, 0.95)",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  navItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  activeNavItem: {
    borderBottomWidth: 2,
    borderBottomColor: "#ff9e00",
  },
  navLabel: {
    color: "#fff",
    fontSize: 11,
    marginTop: 4,
    textAlign: "center",
  },
  activeNavLabel: {
    color: "#ff9e00",
    fontWeight: "bold",
  },
  bannerContainer: {
    width: "100%",
    height: 200,
    marginTop: 16,
    marginBottom: 16,
    position: "relative",
    overflow: "hidden",
  },
  bannerScroll: {
    width: "100%",
    height: "100%",
  },
  promoContainer: {
    width: Dimensions.get("window").width,
    height: 200,
    overflow: "hidden",
  },
  promoImage: {
    width: "100%",
    height: "100%",
  },
  promoGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "50%",
  },
  promoContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  promoText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  bannerIndicators: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    width: "100%",
    zIndex: 1,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: 4,
  },
  activeIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#ff9e00",
  },
});

export default AllMode;
