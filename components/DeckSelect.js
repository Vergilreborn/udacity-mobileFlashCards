import React, { Component } from 'react'
import {connect} from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons' 
import { TabNavigator} from 'react-navigation'
import Button from './Button'
import { white, black, mediumGray } from '../utils/colors'
//navigation.goBack()

class DeckSelect extends Component{

  static navigationOptions= ({navigation}) => {
    const {deckTitle} = navigation.state.params;
   
    return {
      title: deckTitle,

    }
  }

  render(){
    const {navigation,decks} = this.props
    const {deckTitle} = navigation.state.params
    const deck = decks[deckTitle]
    const isEmpty = deck.questions.length === 0
    
    return (
       
       <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.deckTitle}>{deck.title}</Text>
          <Text style={styles.deckCount}>{deck.questions.length} {deck.questions.length === 1 ? 'card': 'cards'}</Text>
        </View>
        <View style={styles.subContainer}>
          <Button onPress={()=> navigation.navigate('EditDeck',{deck})} style={styles.btnStyle} disabled={isEmpty} textColor={black}>Edit Deck</Button>
          <Button onPress={()=> navigation.navigate('AddCard',{deckTitle})} style={styles.btnStyle} textColor={black}>Add Card</Button>
          <Button onPress={()=> navigation.navigate('Quiz',{deck})} disabled={isEmpty}>Start Quiz</Button>
        </View>
       </View>)
    
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  deckCount:{
    color: mediumGray,
    fontSize:16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  deckTitle:{
    fontSize:30,
    fontWeight: 'bold'
  },
  subContainer:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStyle: {
    borderWidth:1,
    backgroundColor:white,
    marginBottom:5

  }
})

const ViewTabs = TabNavigator({
  DeckMain : {
    screen: TestDeck,
    navigationOptions: {
      tabBarLabel: 'Deck',
      tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
    }
  },
  DeckCards : {
    screen: TestDeck,
    navigationOptions: {
      tabBarLabel: 'Deck',
      tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
    }
  }
})



function TestDeck(){
  return (<View><Text>This is a test deck for the tabs within tabs</Text></View>)
}

function mapStateToProps(decks){
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckSelect)