import { createStore, combineReducers } from 'redux';

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CART_ITEMS':
      return { ...state, cartItems: action.payload };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    case 'DELETE_SELECTED':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => !action.payload.includes(item.id)),
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cart: cartReducer,
});

const store = createStore(rootReducer);

export default store;
