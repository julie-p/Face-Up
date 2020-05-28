console.disableYellowBox = true;

import React from 'react';
import HomeScreen from './Screens/HomeScreen';
import GalleryScreen from './Screens/GalleryScreen ';
import SnapScreen from './Screens/SnapScreen ';
//Import des modules de navigation & icônes
import {createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons'; 

//Redux
import imageList from './reducers/image.reducer';
import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';

const store = createStore(combineReducers({imageList}));


const BottomNavigator = createBottomTabNavigator({
  Gallery: GalleryScreen,
  Snap: SnapScreen
 },
 {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      let iconName;
      switch (navigation.state.routeName) {
        case 'Gallery' :
            iconName = 'md-photos'; //Icône gallery
            break;
        case 'Snap' :
            iconName = 'ios-camera'; //Icône snap
            break;
      };
      return <Ionicons name={iconName} size={24} color="black" />;
    },
  }),
  tabBarOptions: {
    activeTintColor: '#009788', //couleur icône active
    inactiveTintColor: '#FFFFFF', //couleur icône inactive
    style: {
      backgroundColor: '#111224', //couleur du menu
    }
  }
});
 
 const StackNavigator = createStackNavigator(
   {
  Home: HomeScreen,  
  BottomNavigator: BottomNavigator
  },
  {
  headerMode: 'none' //Désactivation du menu du haut
  }
 );  
 
const Navigation = createAppContainer(StackNavigator);

export default function App() {
  return (
    
    <Provider store={store}>

      <Navigation />

    </Provider>

  );
};

