const SignUpForm = () => {
  return (
    <form className="formContainer">
      <div>
        <label>Name</label>
        <input type="text" />
      </div>
      <div>
        <label>Email</label>
        <input type="email" />
      </div>
      <div>
        <label>Password</label>
        <input type="password" />
      </div>
      <button>Submit</button>
    </form>
  );
};

export default SignUpForm;
