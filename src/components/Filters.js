import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";

const Filters = () => {
  const {
    all_products,
    updateFilters,
    clearFilters,
    filters: { text, category, color, min_price, max_price, price, shipping },
  } = useFilterContext();
  const categories = getUniqueValues(all_products, "category");
  const companies = getUniqueValues(all_products, "company");
  const colors = getUniqueValues(all_products, "colors");

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-control">
            <input
              type="text"
              name="text"
              value={text}
              className="search-input"
              placeholder="search"
              onChange={updateFilters}
            />
          </div>
          <div className="form-control">
            <h5>category</h5>
            {categories.map((c) => (
              <button
                type="button"
                key={c}
                name="category"
                value={c}
                className={category === c.toLowerCase() ? "active" : null}
                onClick={updateFilters}
              >
                {c}
              </button>
            ))}
          </div>
          {/* companies */}
          <div className="form-control">
            <h5>company</h5>
            <select name="company" className="company" onChange={updateFilters}>
              {companies.map((company, index) => (
                <option key={index} value={company} className="company">
                  {company}
                </option>
              ))}
            </select>
          </div>
          {/* colors */}
          <div className="form-control">
            <h5>colors</h5>
            <div className="colors">
              {colors.map((c, index) => {
                if (c === "all") {
                  return (
                    <button
                      key={index}
                      type="button"
                      name="color"
                      value="all"
                      className={color === c ? "all-btn active" : "all-btn"}
                      onClick={updateFilters}
                    >
                      all
                    </button>
                  );
                }
                return (
                  <button
                    name="color"
                    type="button"
                    key={index}
                    value={c}
                    className={color === c ? "color-btn active" : "color-btn"}
                    style={{ background: c }}
                    onClick={updateFilters}
                  >
                    {color === c ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>

          {/* price */}
          <div className="form-control">
            <h5>price</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              value={price}
              min={min_price}
              max={max_price}
              onChange={updateFilters}
            />
          </div>
          <div className="form-control shipping">
            <label htmlFor="shipping">free shipping</label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              checked={shipping}
              onChange={updateFilters}
            />
          </div>
          <button
            type="button"
            name="clear"
            className="clear-btn"
            onClick={clearFilters}
          >
            clear filter
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-top: 0.25rem;
    margin-bottom: 0.5rem;
  }
  .shipping {
    display: flex;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;

    label {
      margin-right: 0.5rem;
    }
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
