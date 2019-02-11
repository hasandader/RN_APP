import React from 'react';
import { TouchableOpacity, View, Image, Text, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import OrderList from '../OrderList/OrderList';

const ShowOrder = props => {
  return (
    <View style={styles.ana}>
      <Text style={styles.text}>Products</Text>
    <FlatList
      style={styles.list}
      numColumns={1}
      data={props.data}
      renderItem={(info) => (
      <View style={styles.main}>
        <TouchableOpacity onPress={() => props.onItemSelected(info.item.name)}>
          <View style={styles.container}>
            <View><Image resizeMode="cover" source={info.item.image} style={styles.image}/></View>
            <View style={styles.discription}>
              <Text style={styles.text}>{info.item.price}</Text>
              <Text style={styles.text}>{info.item.name}</Text>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => props.increment(info.item.name)}>
                <View style={styles.arrow}>
                  <Icon size={30} name="ios-arrow-dropup-circle" color="#006400" />
                </View>
              </TouchableOpacity>
              <Text>{info.item.amount}</Text>
              <TouchableOpacity onPress={() => props.decrement(info.item.name)}>
                <View style={styles.arrow}>
                  <Icon size={30} name="ios-arrow-dropdown-circle" color="#228B22" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      )}
    />
  </View>
  );
};

const styles = StyleSheet.create({
  ana: {
    alignItems: "center"
  },
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
  },
  list: {
    width: "100%",
    marginTop:10
  }
});

export default ShowOrder;


// <OrderList
//   image={info.item.image}
//   price={info.item.price}
//   name={info.item.name}
//   onItemPressed={() => props.onItemSelected(info.item.key)}
// />
