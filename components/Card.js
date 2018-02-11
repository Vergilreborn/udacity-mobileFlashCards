import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { red, green, white } from '../utils/colors'
import TextButton from '../components/TextButton'
import Button from '../components/Button'

class Card extends Component{
  state = {
    answerRevealed : false
  }

  render(){
    let isTemplate = true
    let {answerRevealed} = this.state
    let {question,answer,correctPress, incorrectPress} = this.props;
    if(question != null && answer != null){
      isTemplate = false;
    }
    
    return (
      <View style={styles.container}>
        <View style={styles.questionContainer}>
          
            <Text style={styles.questionText}>
              {answerRevealed ? (answer != null ? answer : 'The answer will show here') : (question != null?  question: 'The question will be here!' )}
          </Text>
          <TextButton style={styles.answerText} onPress={() => this.setState({answerRevealed: !answerRevealed})}>[ {answerRevealed ? 'Show Question' : 'Show Answer'} ]</TextButton>  
        </View>
        <View style={styles.responseContainer}>
          <View style={styles.btnContainer}>
            <Button style={{backgroundColor: green}} onPress={() => correctPress && correctPress()}>Correct</Button>
            <Button style={{backgroundColor: red , marginTop:10}}  onPress={() =>  incorrectPress && incorrectPress()}>Incorrect</Button>
          </View>
        </View>
      </View>
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
  responseContainer:{
    flex: 1
  },
  btnContainer:{
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }  
})

export default Card

