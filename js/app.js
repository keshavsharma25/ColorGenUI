var loadFile = function (event) {
  var output = document.getElementById('output')
  output.src = URL.createObjectURL(event.target.files[0])
  output.onload = function () {
    URL.revokeObjectURL(output.src)
  }
}

async function getFileResponse () {
  try {
    const response = await fetch(img.src)
    const blob = await response.blob()
    file = new File([blob], 'image.jpg', { type: 'image/jpeg' })
    return file
  } catch (error) {
    console.log('error', error)
  }
}

async function fetchColors (endPoint, formdata) {
  try {
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
      headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json'
      }
    }
    const response = fetch(endPoint, requestOptions)

    const colors = (await response).json()
    return colors
  } catch (error) {
    console.log('error', error)
  }
}

function formdata () {
  return new Promise((resolve, reject) => {
    if (inpFile.files[0] !== undefined) {
      var formdata = new FormData()
      formdata.append('image', inpFile.files[0])
      resolve(formdata)
    } else {
      let file = async () => {
        var formdata = new FormData()
        const file = await getFileResponse()
        formdata.append('image', file)
        return formdata
      }
      file().then(formdata => {
        resolve(formdata)
      })
    }
  })
}

const endPoint = 'https://colorgenapi.herokuapp.com/upload'
// const endPoint = 'http://127.0.0.1:8000/upload'

const myForm = document.getElementById('myForm')
const inpFile = document.getElementById('inpFile')

var img = document.getElementById('output')

img.addEventListener('load', function () {
  try {
    formdata().then(formdata => {
      fetchColors(endPoint, formdata).then(colors => {
        document.getElementById('color1').style.background = colors[0]
        document.getElementById('color2').style.background = colors[1]
        document.getElementById('color3').style.background = colors[2]
        document.getElementById('color4').style.background = colors[3]
      })
    })
  } catch (error) {
    console.log('error', error)
  }
})
