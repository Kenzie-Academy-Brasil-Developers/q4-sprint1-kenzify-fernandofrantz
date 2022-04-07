export const validateSchema = (schema) => async (req, res, next) => {
  const recieved_data = req.body;

  try {
    await schema.validate(recieved_data);
    next();
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: e.errors.join(", ")
    });
  }
};