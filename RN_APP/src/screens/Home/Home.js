import React, { Component } from 'react';
import { View, ScrollView, Button } from 'react-native';
import { connect } from 'react-redux';

import CardList from '../../components/CardList/CardList';
import { selectItem, closePage, getItems } from '../../store/actions/index';

class Home extends Component {
  constructor(props) {
  super(props);
  this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
}

onNavigatorEvent = event => {
  if (event.type === "NavBarButtonPress") {
    if (event.id === "sideDrawerToggle") {
      this.props.navigator.toggleDrawer({
        side: "left"
      });
    }
  }
};
  componentDidMount() {
  this.props.onLoadPlaces();
}

  itemSelectedHandler = key => {
    const chosen = this.props.items.find(item => {
      return item.key === key;
    });
    this.props.navigator.push({
      screen: "display-items.ItemDetailScreen",
      title: chosen.name,
      passProps: {
        selectedItem: chosen
      }
    });
  };

  render() {
    return(
      <ScrollView>
      <CardList onItemSelected={this.itemSelectedHandler} data={this.props.items} />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items.data,
    selectedItem: state.items.selectedItem
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelectItem: key => dispatch(selectItem(key)),
    onClosePage: () => dispatch(closePage()),
    onLoadPlaces: () => dispatch(getItems())
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Home);
