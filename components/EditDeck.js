import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, FlatList, Alert} from 'react-native'
import { darkGray, black } from '../utils/colors'
import { deleteCard} from '../actions'
import { removeDeckCard } from '../utils/api'
import { connect } from 'react-redux'

class EditDeck extends Component{

  static navigationOptions= ({navigation}) => {
   
    let {deck} = navigation.state.params;
   
    return {
      title : `Edit: ${deck.title}`
    }
  }

  deleteAlert(title,index){
    const {dispatch,navigation} = this.props;
    
    Alert.alert(`Delete Card`, 'Are you sure?',
    [
      { text: 'Yes', onPress:() =>{
        removeDeckCard(title,index)
            .then(() => {
                if(navigation.state.params.deck.questions.length == 1){
                  navigation.goBack()
                }
                dispatch(deleteCard(title,index))
              })
            
        }}
     ,{ text: 'No', onPress:() =>{}}

    ])
  }

  renderDeckItem(item,deck,index){
    
    const {question,answer} = item;
    const {title} = deck;

    return (
      <View style={styles.deckItemContainer}> 
        <TouchableOpacity onLongPress={() => this.deleteAlert(title,index)}>
          <View style={{flexDirection:'row', flexWrap:'wrap'}}><Text style={{fontSize:18,fontWeight:'bold'}}>Question:</Text><Text style={styles.deckCardInfo}>{question}</Text></View>
          <View style={{flexDirection:'row', flexWrap:'wrap'}}><Text style={{fontSize:18,fontWeight:'bold'}}>Answer:</Text><Text style={styles.deckCardInfo}>{answer}</Text></View>
        </TouchableOpacity>
      </View>
    )
  }


  render(){

    let {deck} = this.props.navigation.state.params;
    return (
      <FlatList
        data={deck.questions}
        keyExtractor={(item,index)=> index}
        renderItem={({item,index}) => this.renderDeckItem(item,deck,index)}
      />
    )
  }
}




const styles = StyleSheet.create({
  deckItemContainer:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth:1,
    padding:30
  },
  deckCardInfo:{
    fontSize:18,
    color: darkGray
  }
})

function mapStateToProps(decks){
  return {
    decks
  }
}

export default connect(mapStateToProps)(EditDeck)