import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { Alert } from "react-native";
import * as Location from "expo-location";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync(); // 현재 위지 알기
      // Send to Api and get Weather
      setIsLoading(false);
    } catch (e) {
      Alert.alert("cant find you", "So sad");
    }
  };

  useEffect(() => {
    getLocation();
  });

  return isLoading ? <Loading /> : <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 30, // RN 전용 CSS
    paddingVertical: 100, // RN 전용 CSS
    backgroundColor: "red",
  },
  text: {
    color: "#2c2c2c",
    fontSize: 20, //px를 사용할 경우 "20px"라고 스트링으로 입력해야함
  },
});
