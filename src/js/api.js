import $ from 'jquery'

export const postToZapier = (payload) => {
  const url = 'https://hooks.zapier.com/hooks/catch/66762/kqkp1y/'
  return $.post(url, payload)
}

export const uploadImg = (data) =>
  $.ajax({
    type: 'POST',
    url:  '//wiredcraft-com.s3.ap-northeast-2.amazonaws.com/',
    data,
    processData: false,
    contentType: false,
  })
