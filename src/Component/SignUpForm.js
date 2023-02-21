import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import Input from "./common/Input";
import Radio from "./common/Radio";
import SelectComponent from "./common/SelectComponent";
import CheckBox from "./common/CheckBox";

const radioOptions = [
  { label: "male", value: "0" },
  { label: "female", value: "1" },
];
const selectOptions = [
  { label: "select nationality", value: "" },
  { label: "Iranian", value: "IR" },
  { label: "German", value: "GR" },
  { label: "American", value: "US" },
];

const checkBoxOptions = [
  { label: "React.js", value: "react" },
  { label: "JavaScript", value: "js" },
];
// console.log(selectOptions);
const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirm: "",
  gender: "",
  nationality: "",
  intrests: [],
  terms: false,
};

const onSubmit = (values) => {
  //   console.log(values);
  axios
    .post("http://localhost:3001/users", values)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(6, "Must be at least 6 characters"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .required("Phone Number is Required")
    .matches(/^[0-9]{11}$/, "Must be only digits"),
  password: Yup.string().required("Password is required"),
  passwordConfirm: Yup.string()
    .required("Password Confirmation is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  gender: Yup.string().required("gender is required"),
  nationality: Yup.string().required("select your nationality"),
  intrests: Yup.array().min(1).required("select at least one intrest"),
  terms: Yup.boolean().required("terms and conditions must be checked"),
});

const SignUpForm = () => {
  const [formValues, setFormValues] = useState(null);

  const formik = useFormik({
    initialValues: formValues || initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/1")
      .then((res) => setFormValues(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <form className="formContainer" onSubmit={formik.handleSubmit}>
      <Input label="Name" name="name" formik={formik} />
      <Input label="Email" name="email" formik={formik} />
      <Input label="Phone Number" name="phoneNumber" formik={formik} />
      <Input label="Password" name="password" formik={formik} type="password" />
      <Input
        label="Password confirmation"
        name="passwordConfirm"
        formik={formik}
        type="password"
      />
      <div className="radioContainer">
        <Radio name="gender" formik={formik} options={radioOptions} />
      </div>
      <SelectComponent
        selectOptions={selectOptions}
        formik={formik}
        name="nationality"
      />
      <CheckBox options={checkBoxOptions} name="intrests" formik={formik} />
      <div>
        <label htmlFor="terms">Terms and Conditions</label>
        <input
          type="checkbox"
          id="terms"
          name="terms"
          value={true}
          onChange={formik.handleChange}
          checked={formik.values.terms}
        />
      </div>
      <button type="submit" disabled={!formik.isValid}>
        Submit
      </button>
    </form>
  );
};

export default SignUpForm;
