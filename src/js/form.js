import $ from 'jquery'

export default class Form {
  // utils for detect whether the element is normal or radio input type
  // the logic doesn't cover all the edge cases
  static isTypeRadio = ($el) => $el.length > 1

  // the _defaultPayload is not meant for outer access
  _defaultPayload = {}

  constructor(elems) {
    // validation
    if (!elems instanceof Object) {
      throw 'An object should be passed to init the form object'
    }
    if (!('form' in elems)) {
      throw 'The form element should be passed'
    }
    for (const field in elems) {
      const $el = elems[field]
      // only the jquery element is valid
      if ($el instanceof $) {
        // the elements are meant to be hidden
        this[`_${field}`] = elems[field]
      }
    }
    this._defaultPayload = this.getPayload()
  }

  getPayload = () => {
    const payload = {}
    for (const key in this) {
      // the value of the form element won't be included in the form's payload data
      if (!/_form/.test(key)) {
        const $el = this[key]
        // only the jquery element is valid
        if ($el instanceof $) {
          payload[key.slice(1)] = Form.isTypeRadio($el) ? $el.filter(':checked').val() : $el.val()
        }
      }
    }
    return payload
  }

  setBackToDefault = () => {
    for (const field in this._defaultPayload) {
      const $el = this[`_${field}`]
      const defaultValue = this._defaultPayload[field]
      if (Form.isTypeRadio($el)) {
        $el.filter(`[value="${defaultValue}"]`).prop('checked', true)
      } else {
        $el.val(defaultValue)
      }
    }
  }

  // simply expose the $form.submit method
  submit = (...rest) => this._form.submit(...rest)
}
