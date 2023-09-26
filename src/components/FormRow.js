const FormRow = ({ type, handleChange }) => {
  return (
    <>
      {type === "register" && (
        <div className="form-row">
          <label htmlFor="name" className="form-label">
            name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            onChange={handleChange}
          />
        </div>
      )}

      <div className="form-row">
        <label htmlFor="email" className="form-label">
          email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-input"
          onChange={handleChange}
        />
      </div>
      <div className="form-row">
        <label htmlFor="password" className="form-label">
          password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="form-input"
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default FormRow;
