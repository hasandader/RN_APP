import React,{ Component } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux';
import { getOrders, updateOrders, deleteOrder } from '../../store/actions/index';
import backgroundImage from "../../assets/emptycart.png";

import ShowOrder from '../../components/ShowOrder/ShowOrder';

let items;
class Profile extends Component {
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
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.items !== this.props.items){
      items = this.props.onLoadItems(this.props.userID);
      items = this.props.items;
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
    items = this.props.items;
  }

  itemDeleteHandler = (key) => {
    this.props.onDeleteItem(key, this.props.userID);
    items = this.props.items;
  }

  render() {
    let cartContent;
    if(items && items.length){
      cartContent = (
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
    } else {
      cartContent = (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
          <View style={styles.imageView}>
            <TouchableOpacity style={styles.touch} onPress={() => this.props.navigator.push({
            screen: "display-items.HomeScreen",
            title: "Home"
          })}>
              <View style={styles.viewButton}>
                <Text style={styles.text}>Back To Home</Text>
              </View>
            </TouchableOpacity>
          </View>

        </ImageBackground>
      );
    }


    return(
      <View style={styles.view}>
        {cartContent}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  imageView: {
    marginBottom: 80,
    width: "70%"
  },
  touch: {
    //flex: 1,
    //width: "100%"
  },
  viewButton: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#AFEEEE", //B0C4DE
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: 60,
    // marginLeft: 60,
    width: "100%",
  },
  view: {
    flex: 1
  },
  backgroundImage: {
    width: "100%",
    flexDirection: "column-reverse",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1
  },
  text: {
    fontSize: 20,
    color: "black"
  },
  button: {
    alignItems: "center",
    width: "70%"
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
