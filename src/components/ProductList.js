import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";
import { useEffect } from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";
const ProductList = () => {
  const {
    filtered_products,
    listView,
    setListView,
    setGridView,
    sort,
    sortProducts,
    filterProducts,
  } = useFilterContext();

  useEffect(() => {
    filterProducts();
  }, []);

  if (filtered_products.length < 1) {
    return (
      <h5 style={{ textTransform: "none" }}>
        no products matched your search...
      </h5>
    );
  }

  return (
    <Wrapper>
      <div className="sort-container">
        <div className="btn-container">
          <button onClick={setGridView} className={!listView ? "active" : null}>
            <BsFillGridFill />
          </button>
          <button onClick={setListView} className={listView ? "active" : null}>
            <BsList />
          </button>
        </div>
        <div>{filtered_products.length} products found</div>
        <hr />
        <div>
          <label className="sort">sort by</label>
          <select
            name="sort"
            id="sort"
            className="sort-input"
            value={sort}
            onChange={sortProducts}
          >
            <option value="">select sort</option>
            <option value="price-lowest">price (lowest)</option>
            <option value="price-highest">price (highest)</option>
            <option value="name-a">name (a-z)</option>
            <option value="name-z">name (z-a)</option>
          </select>
        </div>
      </div>
      {listView ? (
        <ListView products={filtered_products} />
      ) : (
        <GridView products={filtered_products}>product list</GridView>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .sort-container {
    display: grid;
    grid-template-columns: auto auto 1fr auto;
    align-items: center;
    margin-bottom: 2rem;
    column-gap: 2rem;
  }
  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.75rem;
    .btn-container {
      width: 50px;
    }
    label {
      display: inline-block;
      margin-right: 0.5rem;
    }
  }
  @media (min-width: 768px) {
    column-gap: 2rem;
  }
  p {
    margin-bottom: 0;
  }

  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;
    button {
      background: transparent;
      border: 1px solid var(--clr-black);
      color: var(--clr-black);
      width: 1.5rem;
      border-radius: var(--radius);
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        font-size: 1rem;
      }
    }
    .active {
      background: var(--clr-black);
      color: var(--clr-white);
    }
  }

  .sort-input {
    border-color: transparent;
    font-size: 1rem;
    /* text-transform: capitalize; */
    padding: 0.25rem 0.5rem;
  }
  label {
    font-size: 1rem;
    text-transform: capitalize;
  }
`;

export default ProductList;
