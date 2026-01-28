// const yup = require("yup")

// const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/

// const validationSchema =  yup.object({
//     username:yup.string().min(3, "Username can not be less than three characters").matches(usernameRegex, "username must be unique").required("Username  is required"),
//     password:yup.string().trim().min(3, "password cannot be less than three characters").required("password is required"),
//     email:yup.string().trim().email("Must be a valid email address").required("email is required"),
// })

// module.exports = validationSchema

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
