import Form from '~/Form'

export default new Form({
  config: {
    driver: 'vue',
    validateOnChange: true,
    validateOnInput: true,
    applyClassNames: true,
    debounce: 500
  },
  fields: {
    name: {
      type: String,
      default: '',
      required: true,
      unique (value) {
        return value !== 'Product A'
      }
    },
    sku: {
      type: String,
      default: '',
      required: true
    }
  },
  dictionaries: {
    name: {
      unique: 'This name is taken. Please choose a unique name.'
    }
  }
})