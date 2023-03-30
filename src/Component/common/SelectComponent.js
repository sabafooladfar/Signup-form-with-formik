const SelectComponent = ({ selectOptions, formik, name }) => {
  return (
    <div className="select">
      <select {...formik.getFieldProps(name)} name={name}>
        {selectOptions.map((item) => {
          return (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
      {formik.errors[name] && formik.touched[name] && (
        <div className="error">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default SelectComponent;
