/* eslint-disable no-nested-ternary */
import moment from "moment"

const stringSimplfier = (str) => {
  return str
    .trim()
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

const getStrByFilter = (word, filter) => {
  if (word) {
    return filter && filter !== "" ? stringSimplfier(word).includes(stringSimplfier(filter)) : true
  }
  return false
}

const getOneByFilterMany = (word, filter) => {
  return filter && filter.length > 0 ? filter.includes(word) : true
}

const getManyByFilterMany = (words, filter) => {
  let result = true
  if (filter && filter.length > 0) {
    if (words) {
      filter.map((one) => {
        if (!words.includes(one)) {
          result = false
        }
      })
    } else {
      result = false
    }
  }
  return result
}

const getDateBeetweenTwoFilter = (date, filterDate) => {
  return filterDate && filterDate.length > 0 ? moment(date).isBetween(filterDate[0], filterDate[1], "day", "[]") : true
}

const getTwoDateBeetweenTwoFilter = (one, two, filterDate) => {
  return filterDate && filterDate.length > 0
    ? moment(one).isBetween(filterDate[0], filterDate[1], "day", "[]") ||
        moment(two).isBetween(filterDate[0], filterDate[1], "day", "[]")
    : true
}

const specialFilterByNested = (wordsObj, filter, nested) => {
  let result = true
  const words = []
  if (wordsObj) {
    wordsObj.map((word) => words.push(word[nested]))
  }

  if (filter && filter.length > 0) {
    if (words) {
      filter.map((one) => {
        if (!words.includes(one)) {
          result = false
        }
      })
    } else {
      result = false
    }
  }
  return result
}

const specialFilterByNestedExternal = (wordsObj, filter, nested, external) => {
  let result = true
  const words = []
  if (wordsObj) {
    wordsObj.map((word) => words.push(word[nested]))
  }

  if (filter && filter.length > 0) {
    if (words) {
      external.map((couple) => {
        let flag = false
        couple.map((one) => {
          if (words.includes(one)) {
            flag = true
          }
        })
        if (flag === false) {
          result = false
        }
      })
    } else {
      result = false
    }
  }
  return result
}

export {
  stringSimplfier,
  getStrByFilter,
  getOneByFilterMany,
  getDateBeetweenTwoFilter,
  getManyByFilterMany,
  specialFilterByNested,
  specialFilterByNestedExternal,
  getTwoDateBeetweenTwoFilter,
}
