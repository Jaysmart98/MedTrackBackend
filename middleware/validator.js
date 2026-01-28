
// const validateUser = (schema) => async (req, res, next) => {
//     try {
//         const body = req.body
//         if (body) {
//            const validated = await schema.validate(body)
//            if (validated) {
//             next()
//            }
//         }
//     } catch(error){
//         return res.status(400).json({message:error.message, status:false})
//     }
// }

// module.exports = validateUser


const validateUser = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    next();
  } catch (error) {
    return res.status(400).json({
      message: "Validation failed",
      errors: error.errors || [],
      status: false
    });
  }
};

module.exports = validateUser;
