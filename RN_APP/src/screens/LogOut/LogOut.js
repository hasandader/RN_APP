import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import Contact from "../../components/Contact/Contact";

import { authLogout } from "../../store/actions/index";

class LogOutScreen extends Component {
  state = {
    modalVisibility: "no"
  };

  modalClosedHandler = () => {
  this.setState({
    modalVisibility: "no"
  });
};
   render() {
     return (
       <View style={styles.mainView}>
         <Contact
           onModalClosed={this.modalClosedHandler}
           modalVisibile={this.state.modalVisibility}
           />
         <View style={styles.container}>
         <TouchableOpacity onPress={this.props.onLogout}>
           <View style={styles.drawerItem}>
             <Icon
               name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
               size={40}
               color="#FF1493"
               style={styles.drawerItemIcon}
             />
           <Text style={[{color: "#C71585"}, {fontSize: 16}]}>Sign Out</Text>
           </View>
         </TouchableOpacity>
         </View>
         <View style={styles.about}>
           <View style={styles.contact1}>
             <Icon
               name="ios-call"
               size={25}
               color="#C71585"
               style={[{paddingTop: 5}, {paddingLeft: 10}]}
             />
           <Text style={[styles.header, {width: "70%"}, {paddingLeft: 10}, {paddingTop:5}]}>Contact Us</Text>
             <TouchableOpacity onPress={() => this.setState({modalVisibility: "yes"})}>
               <Icon
                 name="md-arrow-forward"
                 size={30}
                 color="#C71585"
                 style={[{paddingLeft: 40}, {paddingTop: 5}]}
               />
             </TouchableOpacity>
           </View>
           <View style={styles.contact2}>
             <Icon
               name="md-map"
               size={25}
               color="#C71585"
               style={[{paddingLeft: 10}]}
             />
           <Text style={[styles.header, {paddingLeft: 10}]}>Address:</Text>
             <Text style={[styles.text, {paddingLeft: 15}]}>Some city somewhere street building no:5 some country</Text>
             <Text style={[styles.linkText, {paddingLeft: 15}, {marginBottom: 10}]}>see the map</Text>
           </View>
         </View>
       </View>
     );
   }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white"
    //alignItems: "flex-start",
  },
  container: {
    marginTop: 200,
    paddingLeft: 20,
    backgroundColor: "white",
    flex: 1,
    alignItems: "flex-start",
    //justifyContent: "flex-start"
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#eee",
    width: 170,
    height: 75,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#C71585"
  },
  drawerItemIcon: {
    marginRight: 10
  },
  about: {
    borderRadius: 5,
    margin: 20,
    marginBottom: 120,
    backgroundColor: "white"
  },
  text: {
    color: "black"
  },
  header: {
    color: "black",
    fontSize: 16
  },
  linkText: {
    color: "#4169E1"
  },
  contact1: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: "#aaa"
  },
  contact2: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 1,
    borderColor: "#aaa"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(authLogout())
  };
};

export default connect(null, mapDispatchToProps)(LogOutScreen);
