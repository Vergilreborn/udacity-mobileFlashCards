import { ADD_DECK, SET_DECKS, ADD_CARD, DELETE_DECK,DELETE_CARD } from '../actions';

function decks(state = {}, action){
  const { decks, deck, deckTitle, card,title,index } = action;

  switch(action.type){
    case DELETE_CARD:
      let deletedCardDeck = {...state};
      deletedCardDeck[title].questions.splice(index,1)
    return deletedCardDeck
    case DELETE_DECK:
      let newDeck = {...state};
      delete newDeck[title]
      return newDeck;
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