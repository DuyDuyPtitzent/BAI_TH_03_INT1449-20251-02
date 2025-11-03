import { NavigationContainer, NavigationIndependentTree, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const Stack = createNativeStackNavigator();

// Màn hình Home
function HomeScreen({ navigation }: any) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Trang Chủ
      </ThemedText>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Profile')}
      >
        <ThemedText type="defaultSemiBold" style={styles.buttonText}>
          Xem Hồ Sơ
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

// Màn hình Profile
function ProfileScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.scrollContainer}>
      <ThemedView style={styles.profileContainer}>
        <ThemedText type="title" style={styles.profileTitle}>
          Hồ Sơ Cá Nhân
        </ThemedText>

        <View style={styles.infoSection}>
          <ThemedText type="defaultSemiBold" style={styles.label}>
            Họ và tên:
          </ThemedText>
          <ThemedText type="default" style={styles.value}>
            Nguyễn Minh Quân
          </ThemedText>
        </View>

        <View style={styles.infoSection}>
          <ThemedText type="defaultSemiBold" style={styles.label}>
            Nghề nghiệp:
          </ThemedText>
          <ThemedText type="default" style={styles.value}>
            Công an Nhân dân
          </ThemedText>
        </View>

        <View style={styles.infoSection}>
          <ThemedText type="defaultSemiBold" style={styles.label}>
            Email:
          </ThemedText>
          <ThemedText type="default" style={styles.value}>
            nguyenminhquan@gmail.com
          </ThemedText>
        </View>

        <View style={styles.infoSection}>
          <ThemedText type="defaultSemiBold" style={styles.label}>
            Số điện thoại:
          </ThemedText>
          <ThemedText type="default" style={styles.value}>
            0385062005
          </ThemedText>
        </View>

        <View style={styles.infoSection}>
          <ThemedText type="defaultSemiBold" style={styles.label}>
            Địa chỉ:
          </ThemedText>
          <ThemedText type="default" style={styles.value}>
            Việt Nam
          </ThemedText>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ThemedText type="defaultSemiBold" style={styles.backButtonText}>
            Quay Lại
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
}

// Component chính với Stack Navigator
export default function Bai8Screen() {
  const navigationRef = useNavigationContainerRef();
  
  return (
    <NavigationIndependentTree>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#007AFF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Trang Chủ' }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ 
              title: 'Hồ Sơ',
              headerBackTitle: 'Trang Chủ'
            }}
          />
        </Stack.Navigator>
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
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    marginBottom: 40,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    paddingHorizontal: 40,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileContainer: {
    flex: 1,
    padding: 20,
  },
  profileTitle: {
    fontSize: 28,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#666',
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    color: '#000',
  },
  backButton: {
    backgroundColor: '#ff3b30',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

