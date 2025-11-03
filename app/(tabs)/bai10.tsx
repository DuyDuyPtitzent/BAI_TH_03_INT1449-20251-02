import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, FlatList, ScrollView, Platform } from 'react-native';
import { NavigationContainer, NavigationIndependentTree, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const Stack = createNativeStackNavigator();

interface SinhVien {
  id: string;
  hoTen: string;
  mssv: string;
  lop: string;
  email: string;
  sdt: string;
}

// Dữ liệu mẫu
const danhSachMacDinh: SinhVien[] = [
  {
    id: '1',
    hoTen: 'Nguyễn Văn A',
    mssv: 'SV001',
    lop: 'CNTT01',
    email: 'nguyenvana@example.com',
    sdt: '0901234567',
  },
  {
    id: '2',
    hoTen: 'Trần Thị B',
    mssv: 'SV002',
    lop: 'CNTT02',
    email: 'tranthib@example.com',
    sdt: '0901234568',
  },
];

// Màn hình danh sách sinh viên
function DanhSachScreen({ navigation, route }: any) {
  const [danhSachSinhVien, setDanhSachSinhVien] = useState<SinhVien[]>(danhSachMacDinh);
  const [hoTen, setHoTen] = useState('');
  const [mssv, setMssv] = useState('');
  const [lop, setLop] = useState('');
  const [email, setEmail] = useState('');
  const [sdt, setSdt] = useState('');
  const [hienForm, setHienForm] = useState(false);

  // Lấy danh sách mới từ params nếu có
  useEffect(() => {
    if (route.params?.sinhVienMoi) {
      setDanhSachSinhVien((prev) => [...prev, route.params.sinhVienMoi]);
      route.params.sinhVienMoi = null; // Reset để tránh thêm lại
    }
  }, [route.params]);

  const themSinhVien = () => {
    if (!hoTen.trim() || !mssv.trim() || !lop.trim()) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const sinhVienMoi: SinhVien = {
      id: Date.now().toString(),
      hoTen: hoTen.trim(),
      mssv: mssv.trim(),
      lop: lop.trim(),
      email: email.trim() || 'Chưa có',
      sdt: sdt.trim() || 'Chưa có',
    };

    setDanhSachSinhVien([...danhSachSinhVien, sinhVienMoi]);
    setHoTen('');
    setMssv('');
    setLop('');
    setEmail('');
    setSdt('');
    setHienForm(false);
  };

  const renderItem = ({ item }: { item: SinhVien }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('ChiTiet', { sinhVien: item })}
    >
      <View style={styles.itemContent}>
        <ThemedText type="defaultSemiBold" style={styles.itemName}>
          {item.hoTen}
        </ThemedText>
        <ThemedText style={styles.itemInfo}>MSSV: {item.mssv}</ThemedText>
        <ThemedText style={styles.itemInfo}>Lớp: {item.lop}</ThemedText>
      </View>
      <ThemedText style={styles.arrow}>{'>'}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Danh Sách Sinh Viên
        </ThemedText>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setHienForm(!hienForm)}
        >
          <ThemedText type="defaultSemiBold" style={styles.addButtonText}>
            {hienForm ? 'Hủy' : '+ Thêm SV'}
          </ThemedText>
        </TouchableOpacity>
      </View>

      {hienForm && (
        <View style={styles.formContainer}>
          <ThemedText type="defaultSemiBold" style={styles.formTitle}>
            Thêm Sinh Viên Mới
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Họ và tên *"
            placeholderTextColor="#999"
            value={hoTen}
            onChangeText={setHoTen}
          />
          <TextInput
            style={styles.input}
            placeholder="Mã số sinh viên *"
            placeholderTextColor="#999"
            value={mssv}
            onChangeText={setMssv}
          />
          <TextInput
            style={styles.input}
            placeholder="Lớp *"
            placeholderTextColor="#999"
            value={lop}
            onChangeText={setLop}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            placeholderTextColor="#999"
            value={sdt}
            onChangeText={setSdt}
            keyboardType="phone-pad"
          />
          <TouchableOpacity style={styles.submitButton} onPress={themSinhVien}>
            <ThemedText type="defaultSemiBold" style={styles.submitButtonText}>
              Thêm
            </ThemedText>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={danhSachSinhVien}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <ThemedText style={styles.emptyText}>
            Chưa có sinh viên nào. Hãy thêm sinh viên mới!
          </ThemedText>
        }
      />
    </ThemedView>
  );
}

// Màn hình chi tiết sinh viên
function ChiTietScreen({ route }: any) {
  const { sinhVien } = route.params;

  return (
    <ScrollView style={styles.scrollContainer}>
      <ThemedView style={styles.detailContainer}>
        <ThemedText type="title" style={styles.detailTitle}>
          Chi Tiết Sinh Viên
        </ThemedText>

        <View style={styles.detailSection}>
          <ThemedText type="defaultSemiBold" style={styles.detailLabel}>
            Họ và tên:
          </ThemedText>
          <ThemedText type="default" style={styles.detailValue}>
            {sinhVien.hoTen}
          </ThemedText>
        </View>

        <View style={styles.detailSection}>
          <ThemedText type="defaultSemiBold" style={styles.detailLabel}>
            Mã số sinh viên:
          </ThemedText>
          <ThemedText type="default" style={styles.detailValue}>
            {sinhVien.mssv}
          </ThemedText>
        </View>

        <View style={styles.detailSection}>
          <ThemedText type="defaultSemiBold" style={styles.detailLabel}>
            Lớp:
          </ThemedText>
          <ThemedText type="default" style={styles.detailValue}>
            {sinhVien.lop}
          </ThemedText>
        </View>

        <View style={styles.detailSection}>
          <ThemedText type="defaultSemiBold" style={styles.detailLabel}>
            Email:
          </ThemedText>
          <ThemedText type="default" style={styles.detailValue}>
            {sinhVien.email}
          </ThemedText>
        </View>

        <View style={styles.detailSection}>
          <ThemedText type="defaultSemiBold" style={styles.detailLabel}>
            Số điện thoại:
          </ThemedText>
          <ThemedText type="default" style={styles.detailValue}>
            {sinhVien.sdt}
          </ThemedText>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

// Component chính với Stack Navigator
export default function Bai10Screen() {
  const navigationRef = useNavigationContainerRef();
  
  return (
    <NavigationIndependentTree>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="DanhSach"
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
            name="DanhSach"
            component={DanhSachScreen}
            options={{ title: 'Danh Sách Sinh Viên' }}
          />
          <Stack.Screen
            name="ChiTiet"
            component={ChiTietScreen}
            options={{ title: 'Chi Tiết Sinh Viên' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  formTitle: {
    fontSize: 18,
    marginBottom: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#000',
  },
  submitButton: {
    backgroundColor: '#28a745',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
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
  itemName: {
    fontSize: 18,
    marginBottom: 4,
    color: '#000',
    fontWeight: 'bold',
  },
  itemInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  arrow: {
    fontSize: 24,
    color: '#999',
    marginLeft: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  detailContainer: {
    flex: 1,
    padding: 20,
  },
  detailTitle: {
    fontSize: 28,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  detailSection: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  detailLabel: {
    fontSize: 14,
    marginBottom: 8,
    color: '#666',
    fontWeight: 'bold',
  },
  detailValue: {
    fontSize: 16,
    color: '#000',
  },
});
