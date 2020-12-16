const { object, string } = require('yup')

const schema = object().shape({
  body: object().shape({
    email: string().email().required(),
    password: string().required(),
  }).required(),
})

module.exports = schema
