import React, {Component} from 'react';
import { View, Image, Text, StyleSheet, Modal, Button, Alert } from 'react-native';

import { connect } from 'react-redux';
import { addItem, getOrders, updateOrders } from '../../store/actions/index';
import ImagePicker from 'react-native-image-picker';

class ItemDetail extends Component {

  componentDidMount() {
  this.props.onLoadItems();
}

  state = {
  pickedImaged: null,
  amount: 1
}

  itemAddedHandler = () => {
      let chosen = null;
      chosen = this.props.items.find(item => {
        return item.name === this.props.selectedItem.name;
      });

      if(chosen){
        this.props.onUpdateOerder(
          chosen.key,
          chosen.name,
          chosen.price,
          chosen.image,
          chosen.amount+1
        );
      }else{
        this.props.onAddItem(
        this.props.selectedItem.key,
        this.props.selectedItem.name,
        this.props.selectedItem.price,
        this.props.selectedItem.image,
        this.state.amount
      );
      }


  this.props.onLoadItems();
};


  render() {
    return(
      <View style={styles.container}>
      <View style={styles.contentStyle}>
        <Image
          resizeMode="cover"
          style={styles.imageStyle}
          source={this.props.selectedItem.image}
        />
      <Text style={styles.shortDesc}>{this.props.selectedItem.price}</Text>
      <Text style={styles.shortDesc}>{this.props.selectedItem.name}</Text>
      </View>
          <View >
            <Text style={styles.header}>Product Information</Text>
            <Text style={styles.text}>Weight: </Text>
            <Text style={styles.text}>Recommended age: </Text>
            <Text style={styles.text}>Gender: </Text>
          </View>
          <View style={styles.button}>
            <Button color= "#20B2AA" title="Add To Cart" onPress={this.itemAddedHandler} />
          </View>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    justifyContent: "center",
    //alignItems: "center"
  },
  contentStyle: {
    width: "100%",
    marginBottom: 20,
    justifyContent: "center",
    //backgroundColor: "white"
  },
  imageStyle: {
    width: "100%",
    height: 250,
    marginBottom: 15
  },
  header: {
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
    marginBottom: 9
  },
  text: {
    color: "black",
    marginBottom: 5
  },
  shortDesc: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold"
  },
  button: {
    // width: 50,
    // borderRadius: 10,
    margin: 10,
    marginLeft: 30,
    marginRight: 30
  }
});

const mapStateToProps = state => {
  return {
    items: state.items.cartItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddItem: (key, name, price, image, amount) =>
      dispatch(addItem(key, name, price, image, amount)),
      onLoadItems: () => dispatch(getOrders()),
      onUpdateOerder: (key, name, price, image, amount) => dispatch(updateOrders(key, name, price, image, amount))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);
