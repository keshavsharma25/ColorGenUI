var loadFile = function (event) {
  var output = document.getElementById('output')
  output.src = URL.createObjectURL(event.target.files[0])
  output.onload = function () {
    URL.revokeObjectURL(output.src)
  }
}

const myForm = document.getElementById('myForm')
const inpFile = document.getElementById('inpFile')

var img = document.getElementById('output')

img.addEventListener('load', function () {
  const endPoint = 'https://colorgenapi.herokuapp.com/upload'
  // const endPoint = 'http://127.0.0.1:8000/upload'

  var formdata = new FormData()
  formdata.append('image', inpFile.files[0])
  async function fetchColors (endPoint, formdata) {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      }

      const response = fetch(endPoint, requestOptions)

      const colors = (await response).json()
      return colors
    } catch (error) {
      console.log('error', error)
    }
  }
  const colors = fetchColors(endPoint, formdata)

  colors.then(colors => {
    document.getElementById('color1').style.background = colors[0]
    document.getElementById('color2').style.background = colors[1]
    document.getElementById('color3').style.background = colors[2]
    document.getElementById('color4').style.background = colors[3]
  })
})
