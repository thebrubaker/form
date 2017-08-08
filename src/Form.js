let fields = Symbol('fields')
let errors = Symbol('errors')
let classes = Symbol('classes')

let defaults = {
  applyClassNames: true,
  debounce: false
}

class Form {

  /**
   * The constructor for the class.
   * @param  {object} options  The config, fields and dict. for the form.
   * @return {Form}
   */
  constructor (options) {
    this.setConfig(options)
    this.setFields(options)
    this.setDictionaries(options)
    this.initReactiveData()
  }

  /**
   * Set config for the Form.
   * @param {object} options.config
   */
  setConfig (options) {
    this.config = options.config || defaults
  }

  /**
   * Set the fields for the form.
   * @param {object} options.fields
   */
  setFields (options) {
    if (!options.fields) {
      return console.error('You did not specify fields on your Form.')
    }

    this.fields = options.fields
  }

  /**
   * Set dictionaries for the form.
   * @param {object} options.dictionaries
   */
  setDictionaries (options) {
    this.dictionaries = options.dictionaries || {}
  }

  /**
   * Initialize the reactive data on the form.
   */
  initReactiveData () {

  }

  /**
   * Return reactive fields.
   * @return {Object}
   */
  fields () {
    return this[fields]
  }

  /**
   * Return reactive errors.
   * @return {Object}
   */
  errors () {
    return this[errors]
  }

  /**
   * Return reactive classes.
   * @return {Object}
   */
  classes () {
    return this[classes]
  }
}