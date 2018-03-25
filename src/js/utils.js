import $ from 'jquery'

export const getElemInScope = (scope) => (el) => $(`${scope} ${el}`)
