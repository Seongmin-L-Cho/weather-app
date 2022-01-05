import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Loading() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Getting Weather</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 30, // RN 전용 CSS
    paddingVertical: 100, // RN 전용 CSS
    backgroundColor: "#FDF6AA",
  },
  text: {
    color: "#2c2c2c",
    fontSize: 20, //px를 사용할 경우 "20px"라고 스트링으로 입력해야함
  },
});
