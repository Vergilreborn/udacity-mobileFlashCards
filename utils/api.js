import {AsyncStorage} from 'react-native'
import { STORAGE_KEY_DECKS } from '../config'


export function removeDeckCard(title,index){
  return AsyncStorage.getItem(STORAGE_KEY_DECKS)
  .then(JSON.parse)
  .then((decks) => {
    decks[title].questions.splice(index,1)
    AsyncStorage.setItem(STORAGE_KEY_DECKS,JSON.stringify(decks))
    return decks;
  }) 
}

export function removeDeckItem(title){
  return AsyncStorage.getItem(STORAGE_KEY_DECKS)
    .then(JSON.parse)
    .then((decks) => {
      delete decks[title]
      AsyncStorage.setItem(STORAGE_KEY_DECKS,JSON.stringify(decks))
      return decks;
    })
}

const initializeDeck = (results) =>{
  if(results === null){
    AsyncStorage.setItem(STORAGE_KEY_DECKS,JSON.stringify({}))
  }

  return  results === null ? {} : JSON.parse(results)
}

export function mergeDeck (deck){
  return AsyncStorage.mergeItem(STORAGE_KEY_DECKS,JSON.stringify({[deck.title]:deck}))
      .then(() => deck)
}

export function fetchDecks(){
  return AsyncStorage.getItem(STORAGE_KEY_DECKS)
    .then(initializeDeck)
}


