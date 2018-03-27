import Form from './form'
import {getElemInScope, formatMediaPayload} from './utils'
import {postToZapier} from './api'

(() => {
  const getElem = getElemInScope('#media-application-form')
  const elems = {
    form: getElem(''),
    name: getElem('[name="fullname"]'),
    organization: getElem('[name="organization"]'),
    email: getElem('[name="email"]'),
    mobile: getElem('[name="mobile"]'),
  }

  const mediaForm = new Form(elems)

  mediaForm.submit((evt) => {
    evt.preventDefault()
    postToZapier(formatMediaPayload(mediaForm.getPayload()))
      .done(() => {
        // TODO: modal
        alert('Success')
        mediaForm.setBackToDefault()
      })
      .fail(() => {
        alert('Fail')
      })
  })
})()
