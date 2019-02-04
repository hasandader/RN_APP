import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import CardList from '../../components/CardList/CardList';
import ItemDetail from '../../components/ItemDetail/ItemDetail';
import { selectItem, closePage } from '../../store/actions/index';

class Home extends Component {
// state = {
//   itemChosen: null
// };

  itemSelectedHandler = key => {
    // const chosen = this.props.items.find(item => {
    //   return item.id === id
    // });
    // this.setState({itemChosen: chosen})
    this.props.onSelectItem(key);
  };

  onCloseHandler = () => {
    this.props.onClosePage();
  };

  //an error I got
  //undefined is not a function (evaluating '(0, _index2.selectItem)(id)')

  render() {
    return(
      <ScrollView>
      <CardList onItemSelected={this.itemSelectedHandler} data={this.props.items} />
      <ItemDetail selectedItem={this.props.selectedItem} onClosed={this.onCloseHandler} />
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
    onClosePage: () => dispatch(closePage())
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Home);
