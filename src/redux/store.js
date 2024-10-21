
import { createStore } from 'redux';

const initialState = {
  cart: [],
};

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';


const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItemIndex = state.cart.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += 1; 
        return { ...state, cart: updatedCart };
      }
      return {
        ...state,
        cart: [...state.cart, action.payload], 
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload), 
      };
    case UPDATE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
      case 'UPDATE_QUANTITY':
        return {
          ...state,
          cart: state.cart.map(item => 
            item.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item
          ),
        };
        case 'DELETE_SELECTED':
      return {
        ...state,
        cart: state.cart.filter(item => !action.payload.includes(item.id)),
      };
    default:
      return state;
  }
};

const store = createStore(cartReducer);

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    payload:{...product, quantity: 1 },
  };
};

export const removeFromCart = (productId) => {
  return {
    type: REMOVE_FROM_CART,
    payload: productId,
  };
};

export const updateCartItem = (productId, quantity) => {
  return {
    type: UPDATE_CART_ITEM,
    payload: { productId, quantity },
  };
};

export default store;
