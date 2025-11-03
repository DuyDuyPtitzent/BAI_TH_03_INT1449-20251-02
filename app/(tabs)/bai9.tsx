import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, NavigationIndependentTree, useNavigationContainerRef } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const Tab = createBottomTabNavigator();

// Màn hình Home
function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Trang Chủ
      </ThemedText>
      <ThemedText style={styles.content}>
        Đây là màn hình Home. Bạn có thể xem các thông tin chính tại đây.
      </ThemedText>
      <ThemedView style={styles.card}>
        <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
          Chào mừng!
        </ThemedText>
        <ThemedText style={styles.cardText}>
          Đây là nội dung của tab Home trong ứng dụng.
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

// Màn hình Search
function SearchScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Tìm Kiếm
      </ThemedText>
      <ThemedText style={styles.content}>
        Đây là màn hình Search. Bạn có thể tìm kiếm thông tin tại đây.
      </ThemedText>
      <ThemedView style={styles.card}>
        <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
          Tìm kiếm
        </ThemedText>
        <ThemedText style={styles.cardText}>
          Nhập từ khóa để tìm kiếm trong ứng dụng.
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

// Màn hình Settings
function SettingsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Cài Đặt
      </ThemedText>
      <ThemedText style={styles.content}>
        Đây là màn hình Settings. Bạn có thể cấu hình ứng dụng tại đây.
      </ThemedText>
      <ThemedView style={styles.card}>
        <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
          Cài đặt
        </ThemedText>
        <ThemedText style={styles.cardText}>
          Tùy chỉnh các thiết lập của ứng dụng theo nhu cầu của bạn.
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

// Component chính với Bottom Tab Navigator
export default function Bai9Screen() {
  const navigationRef = useNavigationContainerRef();
  
  return (
    <NavigationIndependentTree>
      <NavigationContainer ref={navigationRef}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Search') {
                iconName = focused ? 'search' : 'search-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline';
              } else {
                iconName = 'help-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: '#8E8E93',
            headerStyle: {
              backgroundColor: '#007AFF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ title: 'Trang Chủ' }}
          />
          <Tab.Screen 
            name="Search" 
            component={SearchScreen}
            options={{ title: 'Tìm Kiếm' }}
          />
          <Tab.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{ title: 'Cài Đặt' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  content: {
    fontSize: 16,
    marginBottom: 30,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 350,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    marginBottom: 10,
    color: '#000',
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

