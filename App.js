import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { FindValueSubscriber } from "rxjs/operators/find";
import Svg, { Polygon } from "react-native-svg";

export default function App() {
  const [errorMessages, setErrorMessages] = useState("");
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [coordinates, setCoordinates] = useState("");

  useEffect(() => {
    generatePolygon();
  }, [a]);

  useEffect(() => {
    generatePolygon();
  }, [b])

  const generatePolygon = () => {
    let coordinates = getCoordinates()
      .map(({ radius, angle }) => [
        100 + radius * Math.cos(angle),
        100 + radius * Math.sin(angle)
      ])
      .join(" ");
    setCoordinates(coordinates);
  };

  function degreesToRadians(angleInDegrees) {
    return (Math.PI * angleInDegrees) / 180;
  }

  const getCoordinates = () => {
    const angle = 360 / (a + b);
    const arrayOfIndeces = Array.from(Array(a + b).keys());
    const offset = degreesToRadians(90 - (180 - angle) / 2);

    return arrayOfIndeces.map(index => {
      return {
        angle: offset + degreesToRadians(angle * index),
        radius: 50
      };
    });
  };

  const handleAChange = value => {
    if (validValue) {
      setA(parseInt(value) || 0);
      setErrorMessages("");
    }
  };

  const handleBChange = value => {
    if (validValue && value <= 10) {
      setB(parseInt(value) || 0);
      setErrorMessages("");
    } else {
      setErrorMessages("Value must be less than or equal to 10");
    }
  };

  const validValue = value => {
    let validValue = value !== ".";
    valueValid ? true : false;
  };

  return (
    <View style={styles.container}>
      <Svg height="200" width="200">
        <Polygon
          points={coordinates}
          fill="lime"
          stroke="purple"
          strokeWidth="1"
        />
      </Svg>

      <Text>{a + b}</Text>
      <Text>{coordinates}</Text>
      
      <Text>{errorMessages}</Text>

      <TextInput
        style={styles.textInput}
        keyboardType="numeric"
        onChangeText={input => handleAChange(input)}
        value={a.toString()}
      />
      <TextInput
        style={styles.textInput}
        keyboardType="numeric"
        onChangeText={input => handleBChange(input)}
        value={b.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  textInput: {
    height: 40,
    width: 100,
    borderColor: "gray",
    borderWidth: 1
  }
});
