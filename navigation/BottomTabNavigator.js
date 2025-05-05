import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

// Screens
import MyLeaguesScreen from '../screens/MyLeaguesScreen';
import SupportScreen from '../screens/SupportScreen';
import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBarContainer}>
      {Platform.OS === 'ios' ? (
        <BlurView intensity={80} tint="dark" style={styles.blurView}>
          <View style={styles.tabBar}>
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;

              const isFocused = state.index === index;

              let iconName;
              if (route.name === 'MyLeagues') iconName = 'trophy';
              else if (route.name === 'Home') iconName = 'home';
              else if (route.name === 'Support') iconName = 'help-circle';

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              };

              return (
                <View key={index} style={styles.tabItem}>
                  <View
                    style={[
                      styles.tabItemContent,
                      isFocused && styles.activeTab,
                    ]}
                  >
                    {isFocused && (
                      <LinearGradient
                        colors={['#4776E6', '#8E54E9']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.activeTabBackground}
                      />
                    )}
                    <View style={styles.tabButton} onTouchEnd={onPress}>
                      <Ionicons
                        name={iconName}
                        size={24}
                        color={isFocused ? '#ffffff' : 'rgba(255,255,255,0.6)'}
                      />
                      <Text
                        style={[
                          styles.tabLabel,
                          isFocused
                            ? styles.activeTabLabel
                            : styles.inactiveTabLabel,
                        ]}
                      >
                        {label}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </BlurView>
      ) : (
        <View style={[styles.tabBar, styles.androidTabBar]}>
          <LinearGradient
            colors={['#192f6a', '#3b5998']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.androidGradient}
          />
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            let iconName;
            if (route.name === 'MyLeagues') iconName = 'trophy';
            else if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Support') iconName = 'help-circle';

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <View key={index} style={styles.tabItem}>
                <View
                  style={[styles.tabItemContent, isFocused && styles.activeTab]}
                >
                  {isFocused && (
                    <LinearGradient
                      colors={['#4776E6', '#8E54E9']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.activeTabBackground}
                    />
                  )}
                  <View style={styles.tabButton} onTouchEnd={onPress}>
                    <Ionicons
                      name={iconName}
                      size={24}
                      color={isFocused ? '#ffffff' : 'rgba(255,255,255,0.6)'}
                    />
                    <Text
                      style={[
                        styles.tabLabel,
                        isFocused
                          ? styles.activeTabLabel
                          : styles.inactiveTabLabel,
                      ]}
                    >
                      {label}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="MyLeagues"
        component={MyLeaguesScreen}
        options={{ title: 'My Leagues' }}
      />
      <Tab.Screen name="Support" component={SupportScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    height: 70,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  blurView: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 25,
  },
  tabBar: {
    flexDirection: 'row',
    height: 70,
    borderRadius: 25,
    backgroundColor: 'rgba(30, 40, 80, 0.85)',
  },
  androidTabBar: {
    overflow: 'hidden',
  },
  androidGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItemContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  activeTabBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.2,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  activeTabLabel: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  inactiveTabLabel: {
    color: 'rgba(255,255,255,0.6)',
  },
  activeTab: {
    borderRadius: 16,
  },
});

export default BottomTabNavigator;
