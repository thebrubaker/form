let fields = Symbol('fields')
import Vue from 'vue'

export default class Form {

  /**
   * The constructor for the class.
   * @param  {object} options  The config, fields and dict. for the form.
   * @return {Form}
   */
  constructor (options) {
    this.options = options
    this.setFields(options)
  }

  /**
   * Return the form's fields.
   * @return {Object}
   */
  fields () {
    return Object.keys(this.options.fields).reduce((computed, key) => {
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
          this.fields[key].isValid = true
          this.fields[key].isModified = value !== this.fields[key].originalValue
          this.fields[key].isDirty = true
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
            originalValue: '',
            isValid: false,
            isModified: false,
            isDirty: false
          }
        })

        return data
      },
      computed
    })
  }
}
