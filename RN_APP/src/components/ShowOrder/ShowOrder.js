import React from 'react';
import { TouchableOpacity, View, Image, Text, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import OrderList from '../OrderList/OrderList';

const ShowOrder = props => {
  let count = 0;
  let i;
  let j;
  let k;
  k = 0;
  let products = props.data;
  let temp2 = products;
  let temp1 = [];
  //temp1 = temp1.concat(products);
  for(i = 0; i < products.length; i++){
    if(products[i].key !== null){
      temp1 = temp1.concat(products[i]);
      k = k++;
    }
    for(j = i+1; j < temp1.length; j++){
        if(products[i].key === products[j].key){
          // temp1[k].amount = temp1[k].amount+1;
           products[j].key = null;
          count = count++;
        }
    };
    temp1[k].amount = count;
    count = 0;
  };
  return (
    <View style={styles.ana}>
      <Text style={styles.text}>Products</Text>
    <FlatList
      style={styles.list}
      numColumns={1}
      data={temp1}
      renderItem={(info) => (
      <View style={styles.main}>
        <TouchableOpacity onPress={() => {count = count+1}}>
          <View style={styles.container}>
            <View><Image resizeMode="cover" source={info.item.image} style={styles.image}/></View>
            <View style={styles.discription}>
              <Text style={styles.text}>{info.item.price}</Text>
              <Text style={styles.text}>{info.item.name}</Text>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => {count = count++}}>
                <View style={styles.arrow}>
                  <Icon size={30} name="ios-arrow-dropup-circle" color="#006400" />
                </View>
              </TouchableOpacity>
              <Text>{info.item.amount}</Text>
              <TouchableOpacity onPress={() => {count = count+1}}>
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
