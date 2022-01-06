import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { Alert } from "react-native";
import * as Location from "expo-location";
import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "75e30da1add10c5eb5de39cdf6e265fd";

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [ok, setOk] = useState();
  const [days, setDays] = useState([]);
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
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alert&units=metric&appid=${API_KEY}`
    );
    const json = await response.json();
    console.log(json);
    setDays(json.daily);
  };

  useEffect(() => {
    getWeather();
  }, []);

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
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator
              color="white"
              style={{ marginTop: 10 }}
              size="large"
            />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <Text style={styles.temp}>
                {parseFloat(day.temp.day).toFixed(1)}
              </Text>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
            </View>
          ))
        )}
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
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontWeight: "600",
    fontSize: 178,
  },
  description: {
    marginTop: -30,
    fontSize: 60,
  },
  tinyText: {
    fontSize: 20,
  },
});
