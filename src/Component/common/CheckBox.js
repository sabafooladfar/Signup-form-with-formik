import React from "react";

const CheckBox = ({ formik, name, options }) => {
  return (
    <div className="checkbox">
      {options.map((option) => {
        return (
          <React.Fragment key={option.value}>
            <label htmlFor={option.value}>{option.label}</label>
            <input
              type="checkbox"
              id={option.value}
              name={name}
              value={option.value}
              onChange={formik.handleChange}
              checked={formik.values[name].includes(option.value)}
            />
          </React.Fragment>
        );
      })}
      {formik.errors[name] && formik.touched[name] && (
        <div className="error">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default CheckBox;
