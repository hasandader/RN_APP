import React,{ Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getOrders, updateOrders } from '../../store/actions/index';

import ShowOrder from '../../components/ShowOrder/ShowOrder';

class Profile extends Component {
  componentDidMount() {
  this.props.onLoadItems();
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
      chosen.amount+1
    );
  }

  decrementHandler = name => {
    const chosen = this.props.items.find(item => {
      return item.name === name;
    });

    this.props.onUpdateOerder(
      chosen.key,
      chosen.name,
      chosen.price,
      chosen.image,
      chosen.amount-1
    );
  }

  render() {
    return(
      <ScrollView>
        <ShowOrder
          onItemSelected={this.itemSelectedHandler}
          data={this.props.items}
          increment={this.incrementHandler}
          decrement={this.decrementHandler}
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
    items: state.items.cartItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadItems: () => dispatch(getOrders()),
    onUpdateOerder: (key, name, price, image, amount) => dispatch(updateOrders(key, name, price, image, amount))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
