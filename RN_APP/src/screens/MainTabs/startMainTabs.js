import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const startTabs = () => {
  Promise.all([
    Icon.getImageSource("ios-home", 30),
    Icon.getImageSource("ios-cart", 30),
    Icon.getImageSource("ios-contact", 30)
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: "display-items.HomeScreen",
          label: "Home",
          title: "Home",
          icon: sources[0]
        },
        {
          screen: "display-items.ProfileScreen",
          label: "Cart",
          title: "Cart",
          icon: sources[1]
        },
        {
          screen: "display-items.LogOutScreen",
          label: "Log Out",
          title: "Log Out",
          icon: sources[2]
        }
      ]
    });
  })

};

export default startTabs;
