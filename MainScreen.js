import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet } from 'react-native';

export default function MainScreen({ navigation }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  const addTodo = (newTodo, newPhoto) => {
    console.log('New Todo:', newTodo, 'Image URL:', newPhoto); // 로그로 확인
    setTodos([...todos, { id: Date.now(), text: newTodo, url: newPhoto }]);
  };

  const handleSubmit = (item) => {
    navigation.navigate('ShowScreen', { item });
  };

  const ListScreen = () => (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id.toString()}
     
      renderItem={({ item }) => {        
        return (
          <View style={styles.itemContainer}>
            {/* 이미지 출력 */}
            {item.url ? (
              <Image
                source={{ uri: item.url }}
                style={styles.previewImage}
              />
            ) : (
              <Text>이미지 없음</Text>
            )}
            <Text style={{ fontSize: 18, padding: 10 }} onPress={() => handleSubmit(item)}>
              {item.text}
            </Text>
          </View>
        );
      }}
    />
  );

  return (
    <View>
      <Text>MainScreen</Text>
      <Button
        title="기록하기"
        onPress={() => navigation.navigate('DetailScreen', { addTodo })}
      />
      <ListScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  previewImage: {
    width: 50,  // 고정된 너비
    height: 50, // 고정된 높이
    resizeMode: 'contain', // 비율 유지하면서 크기 조정
    marginBottom: 10, // 이미지와 텍스트 사이 간격
  },
  itemContainer: {
    flexDirection: 'row', // 아이템을 수평으로 배치
    alignItems: 'center', // 이미지와 텍스트 수평 정렬
    margin: 10, // 아이템 간 간격
  },
});
