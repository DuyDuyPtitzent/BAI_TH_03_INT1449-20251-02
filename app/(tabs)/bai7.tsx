import { useState } from 'react';
import { Alert, FlatList, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

interface CongViec {
  id: string;
  ten: string;
}

export default function Bai7Screen() {
  const [congViecMoi, setCongViecMoi] = useState('');
  const [danhSachCongViec, setDanhSachCongViec] = useState<CongViec[]>([]);

  const themCongViec = () => {
    if (congViecMoi.trim() === '') {
      alert('Vui lòng nhập công việc!');
      return;
    }

    const congViec: CongViec = {
      id: Date.now().toString(),
      ten: congViecMoi.trim(),
    };

    setDanhSachCongViec([...danhSachCongViec, congViec]);
    setCongViecMoi('');
  };

  const xoaCongViec = (id: string) => {
    Alert.alert(
      'Xóa công việc',
      'Bạn có chắc muốn xóa công việc này?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () => {
            setDanhSachCongViec((prevList) => prevList.filter((cv) => cv.id !== id));
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: CongViec }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.itemContent}
        onLongPress={() => xoaCongViec(item.id)}
        activeOpacity={0.7}
      >
        <ThemedText type="default" style={styles.itemText}>
          {item.ten}
        </ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => xoaCongViec(item.id)}
        activeOpacity={0.7}
      >
        <ThemedText style={styles.deleteButtonText}>X</ThemedText>
      </TouchableOpacity>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Danh Sách Công Việc
      </ThemedText>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập công việc mới..."
          placeholderTextColor="#999"
          value={congViecMoi}
          onChangeText={setCongViecMoi}
          onSubmitEditing={themCongViec}
        />
        <TouchableOpacity style={styles.addButton} onPress={themCongViec}>
          <ThemedText type="defaultSemiBold" style={styles.addButtonText}>
            Thêm
          </ThemedText>
        </TouchableOpacity>
      </View>

      <FlatList
        data={danhSachCongViec}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <ThemedText style={styles.emptyText}>
            Chưa có công việc nào. Hãy thêm công việc mới!
          </ThemedText>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#000',
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    paddingHorizontal: 24,
    justifyContent: 'center',
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
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
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
  itemContent: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    color: '#000',
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ff3b30',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
  },
});

