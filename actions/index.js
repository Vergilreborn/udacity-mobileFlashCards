export const SET_DECKS = 'SET_DECK'
export const GET_DECK = 'GET_DECK'
export const ADD_DECK = 'ADD_DECK'
export const UPDATE_DECK = 'UPDATE_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const ADD_CARD = 'ADD_CARD'
export const UPDATE_CARD = 'UPDATE_CARD'
export const DELETE_CARD = 'DELETE_CARD'

export function deleteCard(title,index){
  return {
    type: DELETE_CARD,
    title,
    index
  }
}

export function deleteDeck(title){
  return {type: DELETE_DECK,
  title}
}

export function setDecks(decks){
  return {
    type: SET_DECKS,
    decks
  }
}

export function addDeck(deck){
  return {
    type: ADD_DECK,
    deck
   }
}

export function addCard(deckTitle,card){
  return {
    type: ADD_CARD,
    deckTitle,
    card
  }
}