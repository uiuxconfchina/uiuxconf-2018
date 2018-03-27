import {getElemInScope, formatSponsorPayload} from './utils'
import {postToZapier} from './api'

(() => {
  class SponsorForm {
    constructor(elems) {
      this._form = elems.form
      this._name = elems.name
      this._company = elems.company
      this._email = elems.email
      this._phone = elems.phone
      this._sponsorLevel = elems.sponsorLevel
      this._comments = elems.comments
      this._defaultPayload = this.getPayload()
    }

    getPayload = () => (
      {
        name: this._name.val(),
        company: this._company.val(),
        email: this._email.val(),
        phone: this._phone.val(),
        sponsorLevel: this._sponsorLevel.filter(':checked').val(),
        comments: this._comments.val(),
      }
    )

    setBackToDefault = () => {
      const {name, company, email, phone, sponsorLevel, comments} = this._defaultPayload
      this._name.val(name)
      this._company.val(company)
      this._email.val(email)
      this._phone.val(phone)
      this._sponsorLevel.filter(`[value="${sponsorLevel}"]`).prop('checked', true)
      this._comments.val(comments)
    }

    submit = (...rest) => this._form.submit(...rest)
  }

  const getElem = getElemInScope('#sponsor-application-form')
  const elems = {
    form: getElem(''),
    name: getElem('[name="contact-name"]'),
    company: getElem('[name="company-name"]'),
    email: getElem('[name="email"]'),
    phone: getElem('[name="phone-number"]'),
    sponsorLevel: getElem('[name="sponsor-level"]'),
    comments: getElem('[name="questions"]'),
  }

  const sponsorForm = new SponsorForm(elems)

  sponsorForm.submit((evt) => {
    evt.preventDefault()
    postToZapier(formatSponsorPayload(sponsorForm.getPayload()))
      .done(() => {
        // TODO: modal
        alert('Success')
        sponsorForm.setBackToDefault()
      })
      .fail(() => {
        alert('Fail')
      })
  })
})()
