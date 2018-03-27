import Form from './form'
import {getElemInScope, formatSpeakerPayload} from './utils'
import {postToZapier, uploadImg} from './api'
import uuid from 'uuid/v4'

(() => {
  const getElem = getElemInScope('#speaker-application-form')
  const elems = {
    form: getElem(''),
    name: getElem('[name="full-name"]'),
    city: getElem('[name="based-city"]'),
    email: getElem('[name="email"]'),
    title: getElem('[name="personal-title"]'),
    mobile: getElem('[name="mobile"]'),
    social: getElem('[name="social-media"]'),
    bio: getElem('[name="bio"]'),
    reason: getElem('[name="motivation"]'),
    topic: getElem('[name="talk-topic"]'),
    desc: getElem('[name="talk-desc"]'),
    talks: getElem('[name="prev-talks"]'),
    sponsored: getElem('[name="sponsorship"]'),
    preference: getElem('[name="presentation"]'),
  }

  const speakerForm = new Form(elems)
  speakerForm.headshot = getElem('[name="headshot"]')
  speakerForm.headshotPreview = getElem('#headshot-preview')

  speakerForm.headshot.change((evt) => {

    if (!speakerForm.headshot.val()) return

    const file = speakerForm.headshot[0].files[0]
    const id = uuid()
    const filename = `${id}-${file.name}`

    const data = new FormData()
    data.append('key', filename)
    data.append('acl', 'bucket-owner-full-control')
    data.append('Content-Type', file.type)
    data.append('file', file)

    uploadImg(data)
      .done(() => {
        const headshotLink = `https://s3-ap-northeast-2.amazonaws.com/wiredcraft-com/${filename}`
        speakerForm.headshotLink = headshotLink
        speakerForm.headshotPreview.css({background: `url(${headshotLink})`})
      })
      .fail(() => {
        alert('Img upload Failed')
      })
  })

  speakerForm.submit((evt) => {
    evt.preventDefault()

    postToZapier(formatSpeakerPayload({...speakerForm.getPayload(), headshot: speakerForm.headshotLink}))
      .done(() => {
        alert('Success')
        speakerForm.setBackToDefault()
      })
      .fail(() => {
        alert('Fail')
      })
  })
})()
