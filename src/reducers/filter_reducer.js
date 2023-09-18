import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      const prices = action.payload.map((product) => product.price);
      const maxPrice = Math.max(...prices);

      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
      };
    }
    case SET_GRIDVIEW:
      return { ...state, listView: false };
    case SET_LISTVIEW:
      return { ...state, listView: true };
    case SORT_PRODUCTS: {
      const { filtered_products } = state;
      let sort = action.payload;
      let temp = [...filtered_products];

      if (!sort) {
        sort = state.sort;
      }

      if (sort === "price-lowest") {
        temp = temp.sort((a, b) => a.price - b.price);
      }
      if (sort === "price-highest") {
        temp = temp.sort((a, b) => b.price - a.price);
      }
      if (sort === "name-a") {
        temp = temp.sort((a, b) => a.name.localeCompare(b.name));
      }
      if (sort === "name-z") {
        temp = temp.sort((a, b) => b.name.localeCompare(a.name));
      }
      return { ...state, sort: sort, filtered_products: temp };
    }
    case UPDATE_FILTERS: {
      let { name, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };
    }
    case FILTER_PRODUCTS: {
      const { all_products } = state;
      const { text, category, company, color, price, shipping } = state.filters;

      let filteredProducts = [...all_products];

      if (text) {
        filteredProducts = filteredProducts.filter((product) =>
          product.name.toLowerCase().startsWith(text)
        );
      }
      if (category !== "all") {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === category
        );
      }
      if (company !== "all") {
        filteredProducts = filteredProducts.filter(
          (product) => product.company === company
        );
      }
      if (color !== "all") {
        filteredProducts = filteredProducts.filter((product) =>
          product.colors.includes(color)
        );
      }

      filteredProducts = filteredProducts.filter(
        (product) => product.price <= price
      );

      if (shipping) {
        filteredProducts = filteredProducts.filter(
          (product) => product.shipping === true
        );
      }

      return {
        ...state,
        filtered_products: filteredProducts,
      };
    }
    case CLEAR_FILTERS:
      return {
        ...state,
        filtered_products: state.all_products,
        filters: {
          ...state.filters,
          text: "",
          company: "all",
          category: "all",
          color: "all",
          price: state.filters.max_price,
          shipping: false,
        },
      };

    default:
      return state;
  }
};

export default filter_reducer;
