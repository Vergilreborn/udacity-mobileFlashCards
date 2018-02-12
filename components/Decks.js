import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator,Alert } from 'react-native'
import { lightBlue, black, mediumGray, darkGray } from '../utils/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { fetchDecks,removeDeckItem } from '../utils/api'
import { setDecks,deleteDeck } from '../actions'

class Decks extends Component{

  state = {
    ready: false
  }

  componentWillMount(){
    const {dispatch} = this.props;
    fetchDecks()
      .then((decks) => dispatch(setDecks(decks)))
      .then(({decks}) => this.setState({ready:true}))
  }

  deleteAlert(title){
    const {dispatch} = this.props;
    Alert.alert(`Delete ${title}`, 'Are you sure?',
    [
      { text: 'Yes', onPress:() =>{
        removeDeckItem(title)
            .then(() => dispatch(deleteDeck(title)))
        }}
     ,{ text: 'No', onPress:() =>{}}

    ])
  }

  renderDeckItem(item,navigation){
    
    const {title,questions} = item;
  
    return (
      <View style={styles.deckItemContainer} key={title}> 
        <TouchableOpacity onLongPress={() => this.deleteAlert(title)} onPress={() => navigation.navigate('DeckSelect',{deckTitle:title})}>
          <Text style={styles.deckItemTitle}>{title}</Text>
          <Text style={styles.deckItemCardCount}>{questions.length} {questions.length === 1 ? 'card': 'cards'}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render(){

    const { ready } = this.state;
    const { decks,navigation } = this.props;
    const keys = Object.keys(decks);
   
    if(ready === false){
      return <ActivityIndicator color={black} size="large"/>
    }
   
    if(keys === null || keys.length === 0){
      return (
        <View style={styles.emptyDeckContainer}>
          <Text style={styles.emptyDeckMessage}>No decks available.</Text>
          <TouchableOpacity onPress={()=> navigation.navigate('NewDeck')}>
            <Text style={styles.emptyDeckCreateBtn}><MaterialCommunityIcons name='cards-outline' size={18}/>Create Deck</Text>
          </TouchableOpacity>
        </View>) 
    }

    return (
      <FlatList 
        data={keys.reduce((obj,current) => {obj.push(decks[current]); return obj},[])}
        keyExtractor={(item,index)=> index}
        renderItem={({item}) => this.renderDeckItem(item,navigation)}
        />
    ) 
  }
}

const styles = StyleSheet.create({
  emptyDeckContainer : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyDeckMessage: {
    fontSize:16
  },
  emptyDeckCreateBtn: {
    color: lightBlue
  },
  deckItemContainer:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth:1,
    padding:30
  },
  deckItemTitle:{
    color:black,
    fontSize:26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: darkGray
  },
  deckItemCardCount:{
    color: mediumGray,
    fontSize:16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

function mapStateToProps(decks){
  return {
    decks
  }
}

export default connect(mapStateToProps)(Decks)