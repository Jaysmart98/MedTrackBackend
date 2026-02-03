const yup = require("yup");

const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;

const validationSchema = yup.object({
  username: yup
    .string()
    .matches(
      usernameRegex,
      "Username must be 3–16 characters and contain only letters, numbers, or underscores"
    )
    .required("Username is required"),

  email: yup
    .string()
    .trim()
    .email("Must be a valid email address")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .matches(/^\S*$/, "Password must not contain spaces")
    .required("Password is required"),
});

module.exports = validationSchema;
