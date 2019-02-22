import React from 'react';
import { Modal, View, Image, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import logo from "../../assets/logo.png";
import Icon from "react-native-vector-icons/Ionicons";

const Contact = props => {
  return (
    <Modal
      onRequestClose={props.onModalClosed}
      visible={props.modalVisibile === "yes"}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View>
        <TouchableOpacity onPress={props.onModalClosed}>
        <Icon
          name="md-close"
          size={25}
          color="black"
          style={[{paddingTop: 10}, {paddingLeft: 10}]}
        />
        </TouchableOpacity>
        </View>
        <View>
          <Image source={logo} style={styles.placeImage} />
        </View>
        <View style={styles.information}>
          <Text style={[styles.text, {marginBottom: 15}]}>Email: info@company.com</Text>
          <Text style={styles.text}>Phone number: xxx-xxx-xxxx</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 22
  },
  placeImage: {
    width: "100%",
    height: 200
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  information: {
    marginTop: 70,
    marginLeft: 15
  },
  text: {
    color: "black",
    fontSize: 17
  }
});

export default Contact;
