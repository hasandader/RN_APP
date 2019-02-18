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
      <OrderList
        onItemPressed={() => props.onItemSelected(info.item.name)}
        image={info.item.image}
        price={info.item.price}
        name={info.item.name}
        increment={() => props.increment(info.item.name)}
        decrement={() => props.decrement(info.item.name)}
        amount={info.item.amount}
        delete={() => props.onItemDeleted(info.item.key)}
        />
      )}
    />
  </View>
  );
};

const styles = StyleSheet.create({
  ana: {
    alignItems: "center"
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: "black"
  },
  list: {
    width: "100%",
    marginTop: 10
  }
});

export default ShowOrder;
