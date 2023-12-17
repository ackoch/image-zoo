
function round(x){
  return Math.round(x*100)/100;
}

function getDimensions(id){
    let image = document.getElementById(id)
    let ratio = window.devicePixelRatio

    let screenWidth = window.innerWidth

    let screenWidthEm = Math.round(window.innerWidth / parseFloat(
        getComputedStyle(
          document.querySelector('body')
        )['font-size'])
      )

    if(image){
      return `logical dimensions: ${round(image.width)} x ${round(image.height)}<br>
              physical dimensions: ${round(ratio*image.width)} x ${round(ratio*image.height)}<br>
              device pixel ratio: ${round(ratio)}`
    } else {
      return `viewport width: ${round(screenWidth)} (${round(screenWidthEm)}em)<br>
              physical viewport width: ${round(ratio*screenWidth)}`
    }
}

function updateDimensions(){
    const images = ['screen', 'hero', 'card1', 'card2', 'card3', 'card4']

    images.forEach(image => {
      let dimensions = document.getElementById('dimensions-' + image)
      if(dimensions){
        dimensions.innerHTML = getDimensions(image)
      }
    })
}

window.addEventListener('load', updateDimensions);
window.addEventListener('resize', updateDimensions);
