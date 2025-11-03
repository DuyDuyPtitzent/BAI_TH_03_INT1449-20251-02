import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';

export default function Bai3Screen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/react-logo.png')}
        style={styles.logo}
      />
      <ThemedText type="title" style={styles.text}>
        Hello React Native
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  text: {
    textAlign: 'center',
  },
});

