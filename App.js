import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { Alert } from "react-native";
import * as Location from "expo-location";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import axios from "axios";

const API_KEY = "75e30da1add10c5eb5de39cdf6e265fd";

export default function App() {
  const [city, setCity] = useState("Loading");
  const [ok, setOk] = useState();
  const [days, setDays] = useState(true);
  getWeater = async (latitude, longitude) => {};

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accracy: 5 }); // 현재 위지 알기

    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].district);
  };

  // const getLocation = async () => {
  //   try {
  //     // Send to Api and get Weather
  //     setIsLoading(false);
  //     console.log(latitude, longitude);
  //   } catch (e) {
  //     Alert.alert("cant find you", "So sad");
  //   }
  // };

  useEffect(() => {
    getWeather();
    // getLocation();
  });

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 58,
    fontWeight: "500",
  },
  weather: {},
});
