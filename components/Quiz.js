import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import Card from './Card'
import Button from './Button'

class Quiz extends Component{
  state = {
    correct: 0,
    currentQuestion:0,
    showQuestion: true
  }

  CorrectIncorrectSubmit(isCorrect){
    let {correct,currentQuestion} = this.state;
     if(isCorrect){
       correct++;
       this.setState({correct})
     }

     this.setState({showQuestion:true,currentQuestion:currentQuestion+1})
   }

   restartQuiz(){
     this.setState({correct:0,currentQuestion:0})
   }


  render(){
    let {navigation} = this.props;
    let {deck} = navigation.state.params;
    let {correct,currentQuestion} = this.state;
    
    if(currentQuestion === deck.questions.length){
      return (<View style={styles.container}>
                <View style={styles.centerContainer}>
                  <Text style={styles.centerText}>You answered {correct} out of {deck.questions.length} correct!</Text>
                  <Text style={styles.centerText}>{Math.round((correct/deck.questions.length) * 100)}%</Text>
                </View>
                <View style={styles.centerContainer}>
                    <Button style={{marginTop:10}} onPress={() => this.restartQuiz()}>Restart Quiz</Button>
                    <Button style={{marginTop:10}} onPress={() => navigation.goBack()}>Back to Deck</Button>
                </View>
              </View>)
    }

    let {question, answer} = deck.questions[currentQuestion]
    let {showQuestion} = this.state

    return (
      <View style={{flex:1}}>
        <Text style={{fontSize:20}}>{currentQuestion+1}/{deck.questions.length}</Text>
        <Card question={question} answer={answer} incorrectPress={() => this.CorrectIncorrectSubmit(false)} correctPress={() => this.CorrectIncorrectSubmit(true)}/>
      </View>
     )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  centerContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  centerText:{
    textAlign: 'center',
    fontSize:26
  }
})

export default Quiz;