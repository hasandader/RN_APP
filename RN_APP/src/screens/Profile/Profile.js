import React,{ Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getOrders, updateOrders, deleteOrder } from '../../store/actions/index';

import ShowOrder from '../../components/ShowOrder/ShowOrder';

class Profile extends Component {
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.items !== this.props.items){
      this.props.onLoadItems(this.props.userID)
    }
  }
  componentDidMount() {
  this.props.onLoadItems(this.props.userID);
}

  itemSelectedHandler = name => {
    const chosen = this.props.items.find(item => {
      return item.name === name;
    });

    this.props.navigator.push({
      screen: "display-items.ItemDetailScreen",
      title: chosen.name,
      passProps: {
        selectedItem: chosen
      }
    });
  };

  incrementHandler = name => {
    const chosen = this.props.items.find(item => {
      return item.name === name;
    });

    this.props.onUpdateOerder(
      chosen.key,
      chosen.name,
      chosen.price,
      chosen.image,
      chosen.amount+1,
      this.props.userID
    );

    setTimeout(() => this.props.onLoadItems(this.props.userID), 1);
  }

  decrementHandler = name => {
    const chosen = this.props.items.find(item => {
      return item.name === name;
    });

    if(chosen.amount-1 === 0){
      this.props.onDeleteItem(chosen.key, this.props.userID);
    }else{
      this.props.onUpdateOerder(
        chosen.key,
        chosen.name,
        chosen.price,
        chosen.image,
        chosen.amount-1,
        this.props.userID
      );
    }

    setTimeout(() => this.props.onLoadItems(this.props.userID), 1);
  }

  itemDeleteHandler = (key) => {
    this.props.onDeleteItem(key, this.props.userID);
  }

  render() {
    return(
      <ScrollView>
        <ShowOrder
          onItemSelected={this.itemSelectedHandler}
          data={this.props.items}
          increment={this.incrementHandler}
          decrement={this.decrementHandler}
          onItemDeleted={this.itemDeleteHandler}
          />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 20,
    color: "black"
  }
});

const mapStateToProps = state => {
  return {
    items: state.items.cartItems,
    userID: state.auth.uid
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadItems: (uid) => dispatch(getOrders(uid)),
    onUpdateOerder: (key, name, price, image, amount, uid) => dispatch(updateOrders(key, name, price, image, amount, uid)),
    onDeleteItem: (key, uid) => dispatch(deleteOrder(key, uid))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
