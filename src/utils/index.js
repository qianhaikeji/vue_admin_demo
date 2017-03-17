/**
 * Created by zuozhuo on 2016/12/8.
 */
'use strict'

function formatDate (timeStamp) {
  const date = new Date(timeStamp)
  return date.toLocaleString()
}

function readFile (files) {
  return new Promise((resolve, reject) => {
    if (files.length) {
      var file = files[0]
      var reader = new window.FileReader()

      reader.onload = function () {
        resolve(reader.result)
      }
      reader.readAsText(file)
    }
  })
}

export default {
  formatDate,
  readFile
}

