import { Image } from 'expo-image';
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons'; // Sử dụng icon từ Expo

export default function Bai4Screen() {
  const email = 'nguyenminhquan@gmail.com';
  const phone = '0385062005';

  // Hàm xử lý mở link
  const handlePressEmail = () => {
    Linking.openURL(`mailto:${email}`);
  };

  const handlePressPhone = () => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    // 1. Sử dụng LinearGradient cho nền
    <LinearGradient
      colors={['#f0f4f8', '#d9e2ec']} // Màu gradient xanh-xám nhạt
      style={styles.container}
    >
      {/* 2. ThemedView giờ là card, style đã được tinh chỉnh */}
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

        {/* 3. Layout mới cho thông tin liên hệ */}
        <View style={styles.contactContainer}>
          <TouchableOpacity
            style={styles.contactRow}
            onPress={handlePressEmail}
          >
            <Feather name="mail" size={20} color="#4682B4" />
            <ThemedText type="default" style={styles.contactText}>
              {email}
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactRow}
            onPress={handlePressPhone}
          >
            <Feather name="phone" size={20} color="#4682B4" />
            <ThemedText type="default" style={styles.contactText}>
              {phone}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </LinearGradient>
  );
}

// 4. StyleSheet đã được cập nhật hoàn toàn
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    // Bỏ backgroundColor, vì đã dùng gradient
  },
  card: {
    width: '100%',
    maxWidth: 350,
    padding: 24, // Tăng padding một chút
    borderRadius: 20, // Bo góc nhiều hơn
    alignItems: 'center',
    backgroundColor: '#ffffff',
    // Đổ bóng (shadow) tinh tế hơn
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.1, // Giảm độ đậm của bóng
        shadowRadius: 12, // Tăng độ mờ của bóng
      },
      android: {
        elevation: 10, // Tăng elevation
      },
    }),
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3, // Thêm viền cho avatar
    borderColor: '#4682B4', // Màu viền
  },
  name: {
    fontSize: 24,
    marginBottom: 8, // Giảm margin
    textAlign: 'center',
    color: '#1a1a1a', // Màu chữ đậm hơn
    // Bỏ fontWeight, để ThemedText tự quản lý
  },
  job: {
    fontSize: 16,
    marginBottom: 24, // Tăng margin, tạo khoảng cách với SĐT
    textAlign: 'center',
    color: '#555', // Màu chữ xám
  },
  contactContainer: {
    width: '100%', // Chiếm toàn bộ chiều rộng của card
    marginTop: 10,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 12, // Thêm padding cho mỗi dòng
    backgroundColor: '#f9f9f9', // Nền nhẹ cho mỗi dòng
    borderRadius: 10, // Bo góc cho mỗi dòng
  },
  contactText: {
    fontSize: 14,
    marginLeft: 15, // Khoảng cách với icon
    color: '#333',
    flexShrink: 1, // Cho phép text tự xuống dòng nếu quá dài
  },
});