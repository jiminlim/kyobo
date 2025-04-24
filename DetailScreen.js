import React, { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet,TextInput, Text, TouchableOpacity, View, Image, Platform } from 'react-native';

import { CameraView, Camera } from 'expo-camera';


export default function DetailScreen({ route, navigation }) {
   const [text, setText] = useState('');
   const { addTodo } = route.params;
   const [hasPermission, setHasPermission] = useState(null);
   const [type, setType] = useState(Platform.OS === 'web' ? 'user' : 'back');
   const [photo, setPhoto] = useState(null);
   const cameraRef = useRef(null);

   useEffect(() => {
      requestPermissions();
   }, []);
   // 권한 처리 함수
   const requestPermissions = async () => {
      if (Platform.OS === 'web') {
      try {
         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
         stream.getTracks().forEach(track => track.stop());
         setHasPermission(true);
      } catch (err) {
         console.error('Web camera error:', err);
         setHasPermission(false);
      }
      } else {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      }
   };

   const takePicture = async () => {
      if (!cameraRef.current) return;
      
      try {
        const data = await cameraRef.current.takePictureAsync();
        setPhoto(data.uri);
      } catch (error) {
        console.error('촬영 오류:', error);
      }
    };

    
   const handleSubmit = () => {
      if(!photo) {
         return alert("사진찍어주세용");
      }
      if(text.trim() ) {
         addTodo(text.trim(), photo);
         navigation.goBack();
      }
   };
    const renderCamera = () => {
       return (
         <CameraView 
           style={styles.camera} 
           facing={type}
           ref={cameraRef}
           useCamera2Api={false}
         >
           <View style={styles.controls}>
             <TouchableOpacity
               style={[styles.controlButton, styles.captureButton]}
               onPress={takePicture}
             >
               <Text style={styles.buttonText}>촬영</Text>
             </TouchableOpacity>
           </View>
         </CameraView>
       );
   };


  return (
     <View style={styles.container}>
        {photo ? (
            <View style={styles.previewContainer}>
               <Image source={{ uri: photo }} style={styles.previewImage} />
               <Button title="다시 찍기" onPress={() => setPhoto(null)} />
            </View>
         ) : renderCamera()}
      
        <TextInput
            placeholder="할일 입력"
            value={text}
            onChangeText={setText}
            style={{ 
            borderBottomWidth: 1, 
            padding: 10, 
            marginBottom: 20 
            }}
         />
      <Button title="입력" onPress={handleSubmit} />
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
   camera: {
     flex: 1,
     width: '100%',
   },
   previewContainer: {
     flex: 1,
     width: '100%',
   },
   previewImage: {
     flex: 1,
     resizeMode: 'contain',
   },
   controls: {
     position: 'absolute',
     bottom: 30,
     left: 20,
     right: 20,
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
   },
   controlButton: {
     backgroundColor: 'rgba(0,0,0,0.5)',
     padding: 15,
     borderRadius: 10,
     minWidth: 100,
     alignItems: 'center',
   },
   captureButton: {
     backgroundColor: 'rgba(255,255,255,0.3)',
   },
   buttonText: {
     color: 'white',
     fontSize: 18,
     fontWeight: 'bold',
   },
   permissionText: {
     fontSize: 18,
     textAlign: 'center',
     marginBottom: 20,
     lineHeight: 28,
   },
 });