import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import AuthScreen from './src/screens/Auth/Auth';
import HomeScreen from './src/screens/Home/Home';
import ProfileScreen from './src/screens/Profile/Profile';
import configureStore from './src/store/configureStore';

const store = configureStore();

//Register screens
Navigation.registerComponent("display-items.AuthScreen",
() => AuthScreen,
);
Navigation.registerComponent("display-items.HomeScreen",
() => HomeScreen,
store,
Provider  //what was the function of the Provider ???!
);
Navigation.registerComponent("display-items.ProfileScreen",
() => ProfileScreen,
);

//Start an App
Navigation.startSingleScreenApp({
  screen: {
    screen: "display-items.AuthScreen",
    title: "Login"
  }
  });
