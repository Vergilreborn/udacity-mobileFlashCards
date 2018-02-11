import { ADD_DECK, SET_DECKS, ADD_CARD } from '../actions';
// export const GET_DECKS = 'GET_DECK'
// export const GET_DECK = 'GET_DECK'
// export const ADD_DECK = 'ADD_DECK'
// export const UPDATE_DECK = 'UPDATE_DECK'
// export const DELETE_DECK = 'DELETE_DECK'
// export const ADD_CARD = 'ADD_CARD'
// export const UPDATE_CARD = 'UPDATE_CARD'
// export const DELETE_CARD = 'DELETE_CARD'

function decks(state = {}, action){
  const { decks, deck, deckTitle, card } = action;

  switch(action.type){
    case ADD_DECK:
      return { ...state,
                [deck.title]:deck};
    case SET_DECKS: 
      return { ...state,
               ...decks};
    case ADD_CARD:
       
        return  {
          ...state,
          [deckTitle] :{
            ...state[deckTitle],
            questions :[
              ...state[deckTitle].questions,
              card
            ]
            
          }
        }
        
    default:
      return state;
  }
}

export default decks;