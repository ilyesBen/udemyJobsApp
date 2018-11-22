import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'; // eslint-disable-line
import { Icon } from 'react-native-elements';
import { Provider } from 'react-redux';

import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

const ReviewStack = createStackNavigator({
  review: { screen: ReviewScreen },
  settings: { screen: SettingsScreen }
});

const MainNavigator = createBottomTabNavigator({
  welcome: { screen: WelcomeScreen },
  auth: { screen: AuthScreen },
  main: {
    screen: createBottomTabNavigator({
        map: { screen: MapScreen },
        deck: { screen: DeckScreen },
        review: ReviewStack
    }, {
      tabBarOptions: {
        labelStyle: { fontSize: 12 }
      }
    })
  }
}, {
  navigationOptions: {
    tabBarVisible: false
  }
});

ReviewStack.navigationOptions = {
  title: 'Review Jobs',
  tabBarIcon: ({ tintColor }) => <Icon size={30} name="favorite" color={tintColor} />
};

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}

export default App;
