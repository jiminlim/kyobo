import React, { useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

export default function ShowScreen({ route, navigation }) {
  const { item } = route.params; // MainScreen에서 전달한 item 받기

  // 전달된 item 데이터 확인
  useEffect(() => {
    console.log("Received item:", item);
  }, [item]);

  const handleSubmit = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>ShowScreen</Text>

      {/* 전달된 item의 image URL이 있으면 이미지 출력 */}
      {item.url ? (
        <Image source={{ uri: item.url }} style={styles.previewImage} />
      ) : (
        <Text>이미지 없음</Text>
      )}

      <Text style={styles.photoText}>{item.text}</Text>

      <Button title="뒤로가기" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  previewImage: {
    width: 300,  // 고정된 너비
    height: 300, // 고정된 높이
    resizeMode: 'contain', // 비율 유지하면서 크기 조정
    marginBottom: 10,
  },
  photoText: {
    fontSize: 18,
    padding: 10,
    textAlign: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
});
