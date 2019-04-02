import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const listItem = props => (
  <TouchableOpacity onPress={props.onItemPressed}>
    <View style={styles.container}>
      <Image resizeMode="cover" source={props.image} style={styles.inputImage} />
      <Text style={styles.text}>{props.price}</Text>
      <Text style={styles.text}>{props.name}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: 190,
    height: 230,
    backgroundColor: "white",
    padding: 10,
    margin: 5,
    marginTop: 10,
    borderRadius: 15
  },
  inputImage: {
    width: "100%",
    height: 150,
    marginBottom: 15
  },
  text: {
    color: "black"
  }
});

export default listItem;
