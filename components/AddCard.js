import React, { Component } from 'react'
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native'
import Button from './Button'
import { connect } from 'react-redux'
import { black, white, lightBlue } from '../utils/colors'
import { addCard } from '../actions'
import { mergeDeck } from '../utils/api'

class AddCard extends Component{

  state={
    question:'',
    answer:''
  }
  
  static navigationOptions= ({navigation}) => {
    const {deckTitle} = navigation.state.params;
   
    return {
      title: `Add Card: ${deckTitle}`,

    }
  }

  submitAnswer(deckTitle,question,answer){
    
    const { dispatch, navigation,decks} = this.props; 
    
    let card = {question,answer}
    let deck = {...decks[deckTitle],
                questions: [
                  ...decks[deckTitle].questions,
                  card
                ]};
    mergeDeck(deck)
      .then(() => dispatch(addCard(deckTitle,card)))
      .then(() => navigation.goBack());
    
  }

  render(){

    const {answer,question} = this.state;
    const {navigation} = this.props;
    const {deckTitle} = navigation.state.params;

    let disabled = answer == null || answer.length == 0 || question== null || question.length == 0;

    return (
      <View style={[styles.container,{marginTop:20}]}>
        <TextInput value={question} onChangeText={(text) => this.setState({question:text}) } maxLength={160} style={styles.textInputField} placeholderColor={lightBlue} placeholder={'Question'}/>
        <TextInput value={answer} onChangeText={(text) => this.setState({answer:text})} maxLength={160} style={styles.textInputField} placeholderColor={lightBlue} placeholder={'Answer'}/>
        <Button disabled={disabled} onPress={()=> this.submitAnswer(deckTitle,question,answer)} style={{marginTop:20}}>Submit</Button>
      </View>)
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center'
  },
  textInputField: {
    width:300,
    borderWidth: 1,
    borderColor: black,
    padding:5,
    fontSize: 16,
    marginBottom:10,
    backgroundColor: white,
    borderRadius:5,
    marginTop:10
  }
})

function mapStateToProps(decks){
  return {
    decks
  }
}

export default connect(mapStateToProps)(AddCard)