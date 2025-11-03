import { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function Bai5Screen() {
  const [toan, setToan] = useState('');
  const [ly, setLy] = useState('');
  const [hoa, setHoa] = useState('');
  const [diemTrungBinh, setDiemTrungBinh] = useState<number | null>(null);

  const tinhDiemTrungBinh = () => {
    const diemToan = parseFloat(toan);
    const diemLy = parseFloat(ly);
    const diemHoa = parseFloat(hoa);

    if (
      isNaN(diemToan) || 
      isNaN(diemLy) || 
      isNaN(diemHoa) ||
      diemToan < 0 || diemToan > 10 ||
      diemLy < 0 || diemLy > 10 ||
      diemHoa < 0 || diemHoa > 10
    ) {
      alert('Vui lòng nhập điểm hợp lệ (0-10) cho cả 3 môn!');
      return;
    }

    const trungBinh = (diemToan + diemLy + diemHoa) / 3;
    setDiemTrungBinh(trungBinh);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Tính Điểm Trung Bình
        </ThemedText>

        <View style={styles.inputContainer}>
          <ThemedText type="defaultSemiBold" style={styles.label}>
            Điểm Toán:
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Nhập điểm Toán (0-10)"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={toan}
            onChangeText={setToan}
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText type="defaultSemiBold" style={styles.label}>
            Điểm Lý:
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Nhập điểm Lý (0-10)"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={ly}
            onChangeText={setLy}
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText type="defaultSemiBold" style={styles.label}>
            Điểm Hóa:
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Nhập điểm Hóa (0-10)"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={hoa}
            onChangeText={setHoa}
          />
        </View>

        <View style={styles.summaryContainer}>
          <ThemedText type="defaultSemiBold" style={styles.summaryTitle}>
            Điểm đã nhập:
          </ThemedText>
          <ThemedText type="default" style={styles.summaryText}>
            Toán: {toan || 'Chưa nhập'}
          </ThemedText>
          <ThemedText type="default" style={styles.summaryText}>
            Lý: {ly || 'Chưa nhập'}
          </ThemedText>
          <ThemedText type="default" style={styles.summaryText}>
            Hóa: {hoa || 'Chưa nhập'}
          </ThemedText>
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={tinhDiemTrungBinh}
        >
          <ThemedText type="defaultSemiBold" style={styles.buttonText}>
            Tính Điểm
          </ThemedText>
        </TouchableOpacity>

        {diemTrungBinh !== null && (
          <View style={styles.resultContainer}>
            <ThemedText type="subtitle" style={styles.resultLabel}>
              Điểm Trung Bình:
            </ThemedText>
            <ThemedText type="title" style={styles.resultValue}>
              {diemTrungBinh.toFixed(2)}
            </ThemedText>
          </View>
        )}
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#000',
  },
  summaryContainer: {
    marginTop: 10,
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff3cd',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffc107',
  },
  summaryTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#856404',
    fontWeight: 'bold',
  },
  summaryText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#856404',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
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
  resultContainer: {
    marginTop: 30,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e8f5e9',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4caf50',
  },
  resultLabel: {
    fontSize: 18,
    marginBottom: 10,
    color: '#2e7d32',
    fontWeight: 'bold',
  },
  resultValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1b5e20',
  },
});

