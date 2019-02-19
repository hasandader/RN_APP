import React, { Component } from 'react';
import { View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Keyboard,
  ImageBackground,
  TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';

import backgroundImage from "../../assets/toys.jpg";
import NewButton from '../../components/UI/NewButton/NewButton';
import validate from '../../utility/validation';
import { tryAuth, authAutoSignIn } from '../../store/actions/index';

class LoginScreen extends Component {
  state = {
    authMode: "login",
    controls: {
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      },
      confirmPassword: {
        value: "",
        valid: false,
        validationRules: {
          equalTo: "password"
        },
        touched: false
      }
    }
  };

  authHandler = () => {
  const authData = {
    email: this.state.controls.email.value,
    password: this.state.controls.password.value
  };
  this.props.onTryAuth(authData, this.state.authMode);
};

updateInputState = (key, value) => {
  let connectedValue = {};
  if (this.state.controls[key].validationRules.equalTo) {
    const equalControl = this.state.controls[key].validationRules.equalTo;
    const equalValue = this.state.controls[equalControl].value;
    connectedValue = {
      ...connectedValue,
      equalTo: equalValue
    };
  }
  if (key === "password") {
    connectedValue = {
      ...connectedValue,
      equalTo: value
    };
  }
  this.setState(prevState => {
    return {
      controls: {
        ...prevState.controls,
        confirmPassword: {
          ...prevState.controls.confirmPassword,
          valid:
            key === "password"
              ? validate(
                  prevState.controls.confirmPassword.value,
                  prevState.controls.confirmPassword.validationRules,
                  connectedValue
                )
              : prevState.controls.confirmPassword.valid
        },
        [key]: {
          ...prevState.controls[key],
          value: value,
          valid: validate(
            value,
            prevState.controls[key].validationRules,
            connectedValue
          ),
          touched: true
        }
      }
    };
  });
};

  render() {
    let submitButton = (
      <NewButton
        color="#29aaf4"
        onPress={this.authHandler}
        disabled={
          (!this.state.controls.confirmPassword.valid &&
            this.state.authMode === "signup") ||
          !this.state.controls.email.valid ||
          !this.state.controls.password.valid
        }
      >
        Submit
      </NewButton>
    );
    return(
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.header}>Login</Text>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={this.state.controls.email.value}
          onChangeText={val => this.updateInputState("email", val)}
          valid={this.state.controls.email.valid}
          touched={this.state.controls.email.touched}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={this.state.controls.password.value}
          onChangeText={val => this.updateInputState("password", val)}
          valid={this.state.controls.password.valid}
          touched={this.state.controls.password.touched}
          autoCapitalize="none"
          secureTextEntry
        />
        </View>
        </TouchableWithoutFeedback>
        {submitButton}
        <Text style={styles.text}>Don't have an account?<Text onPress = {() => this.props.navigator.push({
        screen: "display-items.SignUpScreen",
        title: "Login"
      })} style={styles.textNav}>Sign Up</Text></Text>
        </View>
        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  backgroundImage: {
    width: "100%",
    flex: 1
  },
  inputContainer: {
    width: "80%"
  },
  input: {
    backgroundColor: "#F0FFF0",  // F0FFFF F0FFF0 E6E6FA
    borderColor: "#bbb",
    borderWidth: 1,
    margin: 5,
    height: 40,
    borderRadius: 7
  },
  header: {
    backgroundColor: "transparent",
    fontSize: 22,
    color: "#e93766"
  },
  text: {
    backgroundColor: "transparent",
    color: "black",
    fontSize: 15
  },
  textNav: {
    color:'#e93766',
    fontSize: 18,
    backgroundColor: "transparent"
  }
});


const mapDispatchToProps = dispatch => {
  return {
    onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode)),
    onAutoSignIn: () => dispatch(authAutoSignIn())
  };
};

export default connect(null, mapDispatchToProps)(LoginScreen);
