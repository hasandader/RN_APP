import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
  //var number = 0;
const OrderList = props => {
  return (
    <TouchableOpacity onPress={alert("Nothing to do!")}>
      <View style={styles.container}>
        <View><Image resizeMode="cover" source={props.image} style={styles.image}/></View>
        <View style={styles.discription}>
          <Text style={styles.text}>{props.price}</Text>
          <Text style={styles.text}>{props.name}</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={alert("Nothing to do!")}>
            <View style={styles.arrow}>
              <Icon size={20} name="ios-arrow-dropup-circle" color="#006400" />
            </View>
          </TouchableOpacity>
          <Text>1</Text>
          <TouchableOpacity onPress={alert("Nothing to do!")}>
            <View style={styles.arrow}>
              <Icon size={20} name="ios-arrow-dropdown-circle" color="#228B22" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
  },
  image: {
    width: "100%",
    height: 80
  },
  discription: {
    flexDirection: "column",
    padding: 5,
    alignItems: "center"
  },
  text: {
    fontWeight: "bold"
  },
  buttons: {
    flexDirection: "column",
    padding: 5,
    alignItems: "center"
  },
  arrow: {
    alignItems: "center"
  }
});

export default OrderList;
