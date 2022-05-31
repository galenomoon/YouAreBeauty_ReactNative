import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.frame}>
      <View style={styles.cameraBox}>
        <Camera style={styles.camera} type={type}>
        </Camera>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(type === CameraType.back ? CameraType.front : CameraType.back);
              }}>
              <Text style={styles.text}> FLIP </Text>
            </TouchableOpacity>
          </View>
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    backgroundColor: '#555',
    width: 300,
    height: 300,
    borderRadius: 5,
    boxShadow: '0px 0px 10px #000',
  },
  boxCamera:{
    backgroundColor: '#555',
    width: 300,
    height: 300,
    borderRadius: 5,
    boxShadow: '0px 0px 10px #000',
    overflow: 'hidden',
  },
  frame: {
    display: 'flex',
    backgroundColor: '#fff',
    width: 320,
    height: 400,
    alignItems: 'center',
    padding: 30,
    boxShadow: '0px 0px 10px #000',
    borderRadius: 2,
  }

});
