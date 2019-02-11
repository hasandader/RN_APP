import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';


import HomeScreen from './src/screens/Home/Home';
import ProfileScreen from './src/screens/Profile/Profile';
import ItemDetailScreen from './src/screens/ItemDetail/ItemDetail';
import LoginScreen from './src/screens/Login/Login';
import SignUpScreen from './src/screens/SignUp/SignUp';
import configureStore from './src/store/configureStore';

const store = configureStore();

//Register screens

Navigation.registerComponent("display-items.HomeScreen",
() => HomeScreen,
store,
Provider  //what was the function of the Provider ???!
);
Navigation.registerComponent("display-items.ProfileScreen",
() => ProfileScreen,
store,
Provider
);
Navigation.registerComponent("display-items.ItemDetailScreen",
() => ItemDetailScreen,
store,
Provider
);
Navigation.registerComponent("display-items.LoginScreen",
() => LoginScreen,
store,
Provider
);
Navigation.registerComponent("display-items.SignUpScreen",
() => SignUpScreen,
store,
Provider
);


//Start an App
Navigation.startSingleScreenApp({
  screen: {
    screen: "display-items.SignUpScreen",
    title: "Sign Up"
  }
  });
