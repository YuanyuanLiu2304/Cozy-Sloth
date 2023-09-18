import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { id, amount, color, product } = action.payload;
      const { carts } = state;
      const item = carts.find((i) => i.id === id + color);

      if (item) {
        const newCarts = carts.map((item) => {
          if (item.id === id + color) {
            let newAmount = item.amount + amount;
            if (newAmount > item.max) {
              newAmount = item.max;
            }
            return { ...item, amount: newAmount };
          } else {
            return item;
          }
        });

        return { ...state, carts: newCarts };
      } else {
        const newItem = {
          id: id + color,
          productId: id,
          name: product.name,
          color,
          amount,
          image: product.images[0].url,
          price: product.price,
          max: product.stock,
        };

        return {
          ...state,
          carts: [...state.carts, newItem],
          total_items: state.total_items + 1,
        };
      }
    }
    case TOGGLE_CART_ITEM_AMOUNT: {
      const { id, newAmount } = action.payload;
      const newCarts = state.carts.map((item) => {
        if (item.id === id) {
          return { ...item, amount: newAmount };
        } else {
          return item;
        }
      });

      return { ...state, carts: newCarts };
    }
    case REMOVE_CART_ITEM: {
      const id = action.payload;
      const newCarts = state.carts.filter((item) => item.id !== id);
      return { ...state, carts: newCarts };
    }

    case CLEAR_CART:
      return { ...state, carts: [] };

    case COUNT_CART_TOTALS: {
      let total = 0;
      const items = state.carts.length;
      // eslint-disable-next-line
      state.carts.map((item) => {
        total += item.price * item.amount;
      });
      return { ...state, total_amount: total, total_items: items };
    }
    default:
      return state;
  }
};

export default cart_reducer;
