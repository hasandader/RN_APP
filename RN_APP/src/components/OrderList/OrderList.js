import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const OrderList = props => {
  return (
    <View style={styles.main}>
      <TouchableOpacity onPress={props.onItemPressed}>
        <View style={styles.container}>
          <View><Image resizeMode="cover" source={props.image} style={styles.image}/></View>
          <View style={styles.discription}>
            <Text style={styles.text}>{props.price}</Text>
            <Text style={styles.text}>{props.name}</Text>
              <TouchableOpacity onPress={props.delete}>
                <View style={styles.arrow}>
                  <Icon size={25} name={Platform.OS === "android" ? "md-trash" : "ios-trash"} color="red" />
                </View>
              </TouchableOpacity>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity onPress={props.increment}>
              <View style={styles.arrow}>
                <Icon size={30} name="ios-arrow-dropup-circle" color="#006400" />
              </View>
            </TouchableOpacity>
            <Text>{props.amount}</Text>
            <TouchableOpacity onPress={props.decrement}>
              <View style={styles.arrow}>
                <Icon size={30} name="ios-arrow-dropdown-circle" color="#228B22" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "white"
  },
  image: {
    width: 90,
    height: 90
  },
  discription: {
    flexDirection: "column",
    padding: 5,
    alignItems: "center"
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: "black"
  },
  buttons: {
    flexDirection: "column",
    padding: 5,
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#32CD32"
  },
  arrow: {
    alignItems: "center"
  }
});

export default OrderList;
