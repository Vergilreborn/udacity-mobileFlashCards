import React, { Component } from 'react'
import { Text, KeyboardAvoidingView, View, StyleSheet, TextInput } from 'react-native'
import Button from '../components/Button'
import { connect } from 'react-redux'
import { lightBlue, black, white, red } from '../utils/colors'
import { addDeck } from '../actions'
import { mergeDeck } from '../utils/api'


class NewDeck extends Component{

  state = {
    deckTitle: null,
    disableBooks : true
  }

  submitDeckTitle(deckTitle){
  
    const { dispatch, navigation } = this.props;
    
    mergeDeck({ title: deckTitle , questions: [] })
      .then((deck)=> dispatch(addDeck(deck)))
      .then(() => {
          this.setState({deckTitle:null})
          navigation.navigate('Decks')
          navigation.navigate('DeckSelect',{ deckTitle})})
  }

  textChanged(text,decks){
    const disableBooks = (!text || text === '') || (text && decks[text] !== undefined )
    
    this.setState({deckTitle:text,disableBooks})
  }

  render(){

    const { decks } = this.props;
    const { deckTitle, disableBooks } = this.state;
    const invalidText = (deckTitle !== null && deckTitle !== '' && deckTitle.trim() === '') || (deckTitle !== null && decks[deckTitle] !== undefined)
    const alreadyExists = (deckTitle !== undefined && deckTitle !== null && decks[deckTitle] !== undefined); 
   
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>What is the title of your new deck?</Text>
        </View>
        <View style={styles.inputContainer}>
          {invalidText && <Text style={{color: red}}>{alreadyExists ? `Deck with title '${deckTitle}' already exists!` : 'Enter a valid title!'}</Text>}
          <TextInput style={styles.textInputField} value={deckTitle} maxLength={40} onChangeText={(text) => this.textChanged(text,decks)} autoFocus={true} placeholder={'Deck Title'} placeholderTextColor={lightBlue}></TextInput>
          <Button style={{backgroundColor: black }} disabled={disableBooks} onPress={() => this.submitDeckTitle(deckTitle)}>Submit</Button>
        </View>
      </KeyboardAvoidingView>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  questionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',  
    padding: 30
  },
  questionText: {
    fontSize: 28,
    paddingBottom: 20,
    textAlign: 'center'
  },
  inputContainer:{
    flex:1,
    alignItems: 'center',
    
  },
  textInputField: {
    width:300,
    borderWidth: 1,
    borderColor: black,
    padding:5,
    fontSize: 16,
    marginBottom:10,
    backgroundColor: white,
    borderRadius:5
  }

})

function mapStateToProps(decks){
  return {
    decks
  }
}

export default connect(mapStateToProps)(NewDeck)