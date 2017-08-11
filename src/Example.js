let fields = Symbol('fields')
let errors = Symbol('errors')
let classes = Symbol('classes')
let validation = Symbol('validation')

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
    let validator = new Vue({
      data () {
        return {
          rules: {
            name: {
              required: (value) => {
                return new Promise((resolve, reject) => {
                  if (value !== undefined && value !== null && value !== '') {
                    resolve({ 
                      rule: 'required',
                      isValid: true 
                    })
                  } else {
                    reject({ 
                      rule: 'required',
                      isValid: false 
                    })
                  }
                })
              },
              unique: (value) => {
                return new Promise((resolve, reject) => {
                  if (value !== 'Product') {
                    resolve({ 
                      rule: 'unique',
                      isValid: true 
                    })
                  } else {
                    reject({ 
                      rule: 'unique',
                      isValid: false 
                    })
                  }
                })
              }
            }
          }
        }
      },
      methods: {
        attempt (field, value) {
          return Promise.all(
            Object.keys(this.rules[field]).map( rule => this.rules[field][rule](value) )
          )
        }
      }
    })
    let fields = new Vue({
      data () {
        return {
          fields: {
            name: {
              value: '',
              originalValue: '',
              isValid: false,
              isModified: false,
              isDirty: false
            },
            sku: {
              value: '',
              originalValue: '',
              isValid: false,
              isModified: false,
              isDirty: false
            }
          }
        }
      },
      computed: {
        name: {
          get () {
            return this.fields['name'].value
          },
          set (value) {
            validator.attempt('name', value).then(({ isValid, errors }) => {
              this.fields['name'].value = value
              this.fields['name'].isValid = isValid
              this.fields['name'].isModified = value !== this.fields['name'].originalValue
              this.fields['name'].isDirty = true
              errors.push('name', errors)
            })
          }
        },
        sku: {
          get () {
            return this.fields['sku'].value
          },
          set (value) {
            validator.attempt('sku', value).then(result => {
              this.fields['sku'].value = value
              this.fields['sku'].isValid = result.isValid
              this.fields['sku'].isModified = value !== this.fields['sku'].originalValue
              this.fields['sku'].isDirty = true
              this.setErrors('sku', result)
            })
          }
        }
      },
      methods: {
        validate (validators, value) {
          return Promise.all(validators).then(results => {

          })
        },
        setErrors (key, errors) {

        }
      }
    })
    let errors = new Vue({
      data () {
        return {
          failedAttempt: false,
          bag: {
            name: {
              required: 'This field is required.',
              unique: 'This name is already taken.'
            },
            sku: {
              required: 'This field is required.',
              unique: 'This sku is already taken.'
            }
          }
        }
      },
      computed: {
        name () {
          return this.bag['name']
        },
        sku () {
          return this.bag['sku']
        }
      },
      methods: {
        first (key) {
          this.bag[key][Object.keys(this.bag[key])[0]]
        },
        any () {
          Object.keys(this.bag).length > 0
        }
      }
    })
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