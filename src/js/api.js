import $ from 'jquery'

const host = 'https://hooks.zapier.com/hooks/catch/66762'

const genPostApi = (endpoint) => (payload) => $.post(`${host}${endpoint}`, payload)

export const createSponsor = genPostApi('/kfv3ii')
export const createSpeaker = genPostApi('/kaylki')

export const uploadImg = (data) =>
  $.ajax({
    type: 'POST',
    url:  '//wiredcraft-com.s3.ap-northeast-2.amazonaws.com/',
    data,
    processData: false,
    contentType: false,
  })
