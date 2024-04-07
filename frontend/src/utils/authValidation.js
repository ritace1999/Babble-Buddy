export const signInValidation = (values) => {
  const errors = {};

  if (!values.identifier && !values.password) {
    errors.allFields = "All fields are required";
  }
  if (!values.identifier) {
    errors.identifier = "Email or Username Required";
  }

  if (!values.password) {
    errors.password = "Password Required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  }
  return errors;
};
export const signUpValidation = (values) => {
  const errors = {};
  if (
    !values.fullName &&
    !values.email &&
    !values.userName &&
    !values.password &&
    !values.confirmPassword
  ) {
    errors.allFields = "All fields are required";
  }
  if (!values.fullName) {
    errors.fullName = "Full Name Required";
  } else if (values.fullName.length < 8) {
    errors.fullName = "Full Name must be at least 8 characters long";
  }
  if (!values.email) {
    errors.email = "Email Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.userName) {
    errors.email = "User Name Required";
  }
  if (!values.password) {
    errors.password = "Password Required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm Password Required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Password not matched";
  }

  return errors;
};

export const updatePasswordValidation = (values) => {
  const errors = {};

  if (!values.oldPassword && !values.newPassword && !values.confirmPassword) {
    errors.allFields = "All fields are required";
  }
  if (!values.oldPassword) {
    errors.identifier = "Old Password Required";
  }

  if (!values.newPassword) {
    errors.newPassword = "New Password Required";
  } else if (values.newPassword.length < 8) {
    errors.newPassword = "Password must be at least 8 characters long";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm Password Required";
  } else if (values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = "Password not matched";
  }
  return errors;
};
