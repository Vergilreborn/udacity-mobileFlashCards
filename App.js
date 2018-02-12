import React from 'react';
import { Text, View, Platform, StatusBar} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import { FontAwesome } from '@expo/vector-icons'
import { Constants } from 'expo'
import AddCard from './components/AddCard'
import Card from './components/Card'
import Decks from './components/Decks'
import NewDeck from './components/NewDeck'
import Quiz from './components/Quiz'
import EditDeck from './components/EditDeck'
import DeckSelect from './components/DeckSelect'
import { black, white } from './utils/colors'
import { setLocalNotification} from './utils/notification'

function MainViewStatusBar ({backgroundColor,...props}){
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

const Tabs = TabNavigator({
  Decks : {
    screen : Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
    }
  },
  NewDeck:{
    screen : NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
    }
  },
  NewCard:{
    screen : Card,
    navigationOptions: {
      tabBarLabel: 'Card Preview',
      tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
    }
  },
},{
  navigationOptions: {
    header: null
  },
  tabBarOptions:{
    activeTintColor: Platform.OS ==='ios' ? '#000' : '#fff',
    style :{
      height:56, 
      backgroundColor: Platform.OS === 'ios' ? '#fff' : '#000',
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset:{
        width:0,
        height:3
      },
      shadowRadius:6,
      shadowOpacity:1
    }
  }
});

const Main = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckSelect : {
    screen: DeckSelect,
    navigationOptions:{
      headerTintColor:white,
      headerStyle:{
        backgroundColor:black
      }
    }
  },
  AddCard : {
    screen: AddCard,
    navigationOptions:{
      headerTintColor: white,
      headerStyle:{
        backgroundColor:black
      }
    }
  },
  Quiz:{
    screen : Quiz,
    navigationOptions:{
      title: 'Quiz',
      headerTintColor: white,
      headerStyle:{
        backgroundColor:black
      }
    }
  },
  EditDeck:{
    screen : EditDeck,
    navigationOptions:{
      headerTintColor:white,
      headerStyle:{
        backgroundColor:black
      }
    }
  }
})

const store = createStore(reducer);

export default class App extends React.Component {

  componentDidMount(){
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex:1}}>
          <MainViewStatusBar backgroundColor={black} barStyle='light-content' />
          <Main/>
        </View>
      </Provider>
    );
  }
}
