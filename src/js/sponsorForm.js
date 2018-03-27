import Form from './form'
import {getElemInScope, formatSponsorPayload} from './utils'
import {postToZapier} from './api'

(() => {
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

  const sponsorForm = new Form(elems)

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
