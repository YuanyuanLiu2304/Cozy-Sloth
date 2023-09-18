import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";

const getLocalStorage = () => {
  const data = localStorage.getItem("carts");

  return data ? JSON.parse(data) : [];
};
const initialState = {
  carts: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, amount, color, product) => {
    dispatch({ type: ADD_TO_CART, payload: { id, amount, color, product } });
  };

  const removeCartItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };

  const toggleItemAmount = (id, newAmount) => {
    if (newAmount === 0) {
      removeCartItem(id);
      return;
    }
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, newAmount } });
  };

  const countCartTotal = () => {
    dispatch({ type: COUNT_CART_TOTALS });
  };
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  useEffect(() => {
    localStorage.setItem("carts", JSON.stringify(state.carts));
    countCartTotal();
  }, [state.carts]);
  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        clearCart,
        removeCartItem,
        toggleItemAmount,
        countCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
