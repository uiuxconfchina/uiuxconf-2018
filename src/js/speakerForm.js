import {getElemInScope} from './utils'
import {createSpeaker, uploadImg} from './api'
import uuid from 'uuid/v4'

(() => {
  class SpeakerForm {
    constructor(elems) {
      this.form = elems.form
      this.headshot = elems.headshot
      this._name = elems.name
      this._city = elems.city
      this._email = elems.email
      this._title = elems.title
      this._mobile = elems.mobile
      this._social = elems.social
      this._bio = elems.bio
      this._reason = elems.reason
      this._topic = elems.topic
      this._desc = elems.desc
      this._talks = elems.talks
      this._sponsored = elems.sponsored
      this._preference = elems.preference
      this._defaultPayload = this.getPayload()
    }

    getPayload = () => (
      {
        name: this._name.val(),
        city: this._city.val(),
        email: this._email.val(),
        title: this._title.val(),
        mobile: this._mobile.val(),
        social: this._social.val(),
        bio: this._bio.val(),
        reason: this._reason.val(),
        topic: this._topic.val(),
        desc: this._desc.val(),
        talks: this._talks.val(),
        sponsored: this._sponsored.filter(':checked').val(),
        preference: this._preference.filter(':checked').val(),
      }
    )

    setBackToDefault = () => {
      const {
        name,
        city,
        email,
        title,
        mobile,
        social,
        bio,
        reason,
        topic,
        desc,
        talks,
        sponsored,
        preference,
      } = this._defaultPayload
      this._name.val(name)
      this._city.val(city)
      this._email.val(email)
      this._title.val(title)
      this._mobile.val(mobile)
      this._social.val(social)
      this._bio.val(bio)
      this._reason.val(reason)
      this._topic.val(topic)
      this._desc.val(desc)
      this._talks.val(talks)
      this._sponsored.filter(`[value="${sponsored}"]`).prop('checked', true)
      this._preference.filter(`[value="${preference}"]`).prop('checked', true)
    }
  }

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
    headshot: getElem('[name="headshot"]'),
    topic: getElem('[name="talk-topic"]'),
    desc: getElem('[name="talk-desc"]'),
    talks: getElem('[name="prev-talks"]'),
    sponsored: getElem('[name="sponsorship"]'),
    preference: getElem('[name="presentation"]'),
  }
  const headshotPreview = getElem('#headshot-preview')

  const speakerForm = new SpeakerForm(elems)

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
        headshotPreview.css({background: `url(${headshotLink})`})
      })
      .fail(() => {
        alert('Img upload Failed')
      })
  })

  speakerForm.form.submit((evt) => {
    evt.preventDefault()

    createSpeaker({...speakerForm.getPayload(), headshot: speakerForm.headshotLink})
      .done(() => {
        alert('Success')
        speakerForm.setBackToDefault()
      })
      .fail(() => {
        alert('Fail')
      })
  })
})()
