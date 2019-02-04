import React from 'react';
import { View, Image, Text, StyleSheet, Modal, Button } from 'react-native';

const ItemDetail = props => {
  let content = null;

  if(props.selectedItem){
    content = (
      <View style={styles.contentStyle}>
        <Image
          resizeMode="cover"
          source={props.selectedItem.image}
          style={styles.imageStyle}
        />
        <Text>{props.selectedItem.price}</Text>
        <Text>{props.selectedItem.name}</Text>
      </View>
    );
  }
return(
  <Modal
  onRequestClose={props.onClosed}
    visible={props.selectedItem !== null}
    animationType="slide"
  >
      {content}
      <View >
        <Text style={styles.header}>Product Information</Text>
        <Text>Weight: </Text>
        <Text>Recommended age: </Text>
        <Text>Gender: </Text>
      </View>
      <View>
        <Button title="Close" onPress={props.onClosed} />
      </View>
  </Modal>
  );

};

const styles = StyleSheet.create({
  contentStyle: {
    width: "100%",
    margin: 15,
    justifyContent: "center",
    //alignItems: "center",
    backgroundColor: "white"
  },
  imageStyle: {
    width: "100%",
    height: 250
  },
  header: {
    fontWeight: "bold",
    fontSize: 18,
    color: "black"
  }
});

export default ItemDetail;
