import React,{ Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getOrders } from '../../store/actions/index';

import ShowOrder from '../../components/ShowOrder/ShowOrder';

class Profile extends Component {
  componentDidMount() {
  this.props.onLoadItems();
}

  itemSelectedHandler = key => {
    const chosen = this.props.items.find(item => {
      return item.key === key;
    });
  };

  render() {
    return(
      <ScrollView>
        <ShowOrder onItemSelected={this.itemSelectedHandler} data={this.props.items} />
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
    onLoadItems: () => dispatch(getOrders())
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
