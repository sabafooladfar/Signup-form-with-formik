import React from "react";

const Radio = ({ formik, name, options }) => {
  return (
    <div>
      {options.map((option) => {
        return (
          <React.Fragment key={option.value}>
            <label htmlFor={option.value}>{option.label}</label>
            <input
              type="radio"
              id={option.value}
              name={name}
              value={option.value}
              onChange={formik.handleChange}
              checked={formik.values.gender === option.value}
            />
          </React.Fragment>
        );
      })}
      {formik.errors.name && formik.touched.name && (
        <div className="error">{formik.errors.name}</div>
      )}
    </div>
  );
};

export default Radio;
