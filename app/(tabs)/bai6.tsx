import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function Bai6Screen() {
  const [mauNen, setMauNen] = useState('#3498db');

  const taoMauNgauNhien = () => {
    const mauHex = '0123456789ABCDEF';
    let mau = '#';
    for (let i = 0; i < 6; i++) {
      mau += mauHex[Math.floor(Math.random() * 16)];
    }
    return mau;
  };

  const doiMau = () => {
    const mauMoi = taoMauNgauNhien();
    setMauNen(mauMoi);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Đổi Màu Nền
      </ThemedText>

      <View style={[styles.khoiMau, { backgroundColor: mauNen }]}>
        <ThemedText type="defaultSemiBold" style={styles.mauText}>
          {mauNen}
        </ThemedText>
      </View>

      <TouchableOpacity style={styles.button} onPress={doiMau}>
        <ThemedText type="defaultSemiBold" style={styles.buttonText}>
          Đổi Màu
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
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
    fontSize: 28,
    marginBottom: 40,
    fontWeight: 'bold',
    color: '#000',
  },
  khoiMau: {
    width: '100%',
    height: 300,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
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
  mauText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
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
});

