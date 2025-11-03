import { Image } from 'expo-image';
import { StyleSheet, View, Platform } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function Bai4Screen() {
  return (
    <View style={styles.container}>
      <ThemedView style={styles.card}>
        <Image
          source={require('@/assets/images/CSGT.jpg')}
          style={styles.avatar}
        />
        <ThemedText type="title" style={styles.name}>
          Nguyễn Minh Quân 
        </ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.job}>
          Công an Nhân dân 
        </ThemedText>
        <ThemedText type="default" style={styles.contact}>
          nguyenminhquan@gmail.com
        </ThemedText>
        <ThemedText type="default" style={styles.contact}>
          0385062005
        </ThemedText>
      </ThemedView>
    </View>
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
  card: {
    width: '100%',
    maxWidth: 350,
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#0000000',
  },
  job: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  contact: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#2a2a2a',
  },
});

