import { useEffect, useContext, useReducer, createContext } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  listView: false,
  filtered_products: [],
  all_products: [],
  sort: "",
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  const setListView = (state) => {
    dispatch({ type: SET_LISTVIEW });
  };
  const setGridView = (state) => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const sortProducts = (e) => {
    const value = e.target.value;
    dispatch({ type: SORT_PRODUCTS, payload: value });
  };

  const updateFilters = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "shipping") {
      value = e.target.checked;
    }
    if (name === "price") {
      value = Number(value);
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const filterProducts = () => {
    dispatch({ type: FILTER_PRODUCTS });
  };

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [state.filters]);

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        sortProducts,
        updateFilters,
        clearFilters,
        filterProducts,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
