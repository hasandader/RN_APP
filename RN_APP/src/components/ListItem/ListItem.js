import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const listItem = props => (
  <TouchableOpacity onPress={props.onItemPressed}>
    <View style={styles.container}>
      <Image resizeMode="cover" source={props.image} style={styles.inputImage} />
      <Text>{props.price}</Text>
      <Text>{props.name}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: 190,
    backgroundColor: "white",
    padding: 5,
    margin: 5,
    marginTop: 10,
    borderRadius: 15
    //justifyContent: "center"
  },
  inputImage: {
    width: "100%",
    height: 100,
    //margin: 8
  }
});

export default listItem;
