import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
//import {data} from '../../config/dummyData.json';
import ListItem from '../ListItem/ListItem';

//var data = require('../../config/dummyData.json');

const CardList = props => {
  return(
    <FlatList
      style={styles.listStyle}
      numColumns={2}
      data={props.data}
      renderItem={(info) => (
        <ListItem
          image={info.item.image}
          price={info.item.price}
          name={info.item.name}
          onItemPressed={() => props.onItemSelected(info.item.key)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  listStyle: {
    width: "100%"
  }
});

export default CardList;
