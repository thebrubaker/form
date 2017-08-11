import Vue from 'vue'

let fields = Symbol['fields']
let classes = Symbol['classes']

export default class Form {

  /**
   * The constructor for the class.
   * @param  {object} options  The config, fields and dict. for the form.
   * @return {Form}
   */
  constructor (options) {
    this.options = options
    this.setClasses(options)
    this.setFields(options)
  }

  /**
   * Return the fields for the form.
   * @return {Object}
   */
  get fields () {
    return Object.keys(this.options.fields).reduce((carry, key) => {
      carry[key] = this[fields][key]
      return carry
    }, {})
  }

  /**
   * Return the fields for the form.
   * @return {Object}
   */
  get classes () {
    return this[classes]
  }

  /**
   * Return the form's fields.
   * @return {Object}
   */
  mapFields (keys = null) {
    return (keys || Object.keys(this.options.fields)).reduce((computed, key) => {
      computed[key] = {
        get: () => {
          return this[fields][key]
        },
        set: (value) => {
          this[fields][key] = value
        }
      }
      return computed
    }, {})
  }

  /**
   * Set the fields for the form.
   * @param {object} options.fields
   */
  setFields (options) {
    let form = this

    if (!options.fields) {
      return console.error('You did not specify fields on your Form.')
    }

    let computed = Object.keys(options.fields).reduce((computed, key) => {
      computed[key] = {
        get () {
          return this.fields[key].value
        },
        set (value) {
          this.fields[key].value = value
          form[classes][key].valid = true
          form[classes][key].modified = value !== this.fields[key].originalValue
          form[classes][key].dirty = true
        }
      }

      return computed
    }, {})

    this[fields] = new Vue({
      data () {
        let data = {
          fields: {}
        }

        Object.keys(options.fields).forEach(key => {
          data.fields[key] = {
            value: '',
            originalValue: ''
          }
        })

        return data
      },
      computed
    })
  }

  /**
   * Set the fields for the form.
   * @param {object} options.fields
   */
  setClasses (options) {
    if (!options.fields) {
      return console.error('You did not specify fields on your Form.')
    }

    this[classes] = new Vue({
      data () {
        return Object.keys(options.fields).reduce((carry, key) => {
          carry[key] = {
            valid: false,
            modified: false,
            dirty: false
          }
          return carry
        }, {})
      }
    })
  }

  /**
   * Return the form's classes.
   * @return {Object}
   */
  mapClasses (keys = null) {

  }
}
