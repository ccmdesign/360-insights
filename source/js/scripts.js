const bodyElement = document.body

const utils = {
  lockBody (lock) {
    if (lock) {
      if (!bodyElement.classList.contains('lock')) bodyElement.classList.add('lock')
    } else {
      bodyElement.classList.remove('lock')
    }
  },
  isBodyLocked () {
    return bodyElement.classList.contains('lock')
  }
}

// CHOOSE DATASET
const chooseDataSetButton = document.getElementsByClassName('js-choose-dataset-btn')[0]
const chooseDataSetWindow = document.getElementsByClassName('js-homepage-dataset-selection-window')[0]
const chooseDataSetCloseButton = document.getElementsByClassName('js-homepage-dataset-selection-window-close')[0]
chooseDataSetButton.addEventListener('click', () => {
  chooseDataSetWindow.classList.toggle('hidden')
  utils.lockBody(!utils.isBodyLocked())
})
chooseDataSetWindow.addEventListener('click', (e) => {
  console.log(e.target)
  if (e.target.classList.contains('js-homepage-dataset-selection-window') &&
    !chooseDataSetWindow.classList.contains('hidden')) {
    chooseDataSetWindow.classList.add('hidden')
    utils.lockBody(false)
  }
})
chooseDataSetCloseButton.addEventListener('click', () => {
  if (!chooseDataSetWindow.classList.contains('hidden')) {
    chooseDataSetWindow.classList.add('hidden')
    utils.lockBody(false)
  }
})
