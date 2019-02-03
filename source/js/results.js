// Foldable

const foldableElements = document.getElementsByClassName('js-foldable')
for (const foldableElement of foldableElements) {
  const classes = foldableElement.classList.values()
  for (const clazz of classes) {
    if (clazz.startsWith('js-foldable-aim-')) {
      const targetId = clazz.substring(16)
      const targets = document.getElementsByClassName(`js-foldable-target-${targetId}`)
      const hideTargets = foldableElement.classList.contains('js-foldable-more')
      for (const target of targets) {
        if (target.classList.contains('js-foldable-target')) {
          target.style.maxHeight = `${target.getBoundingClientRect().height}px`
          if (hideTargets) {
            if (!target.classList.contains('js-folgable-opposite-target')) target.classList.add('js-foldable-foldTarget')
          } else if (target.classList.contains('js-folgable-opposite-target')) {
            target.classList.add('js-foldable-foldTarget')
          }
        }
      }
      foldableElement.addEventListener('click', (event) => {
        event.preventDefault()
        if (foldableElement.classList.contains('js-foldable-less')) {
          foldableElement.classList.remove('js-foldable-less')
        } else {
          foldableElement.classList.add('js-foldable-less')
        }
        for (const target of targets) {
          if (target.classList.contains('js-foldable-foldTarget')) {
            target.classList.remove('js-foldable-foldTarget')
          } else {
            target.classList.add('js-foldable-foldTarget')
          }
        }
      })
      break
    }
  }
}

// Range selector
function getLowestRangeValue (inputs) {
  for (let i = 0, j = inputs.length; i < j; ++i) {
    const el = inputs[i]
    if (el.checked) {
      return parseInt(el.value)
    }
  }
  return Number.MAX_SAFE_INTEGER
}

function getHighestRangeValue (inputs) {
  for (let i = inputs.length - 1; i >= 0; --i) {
    const el = inputs[i]
    if (el.checked) {
      return parseInt(el.value)
    }
  }
  return Number.MIN_SAFE_INTEGER
}

function createRangeSelectorUpdater (inputs) {
  const inputsLength = inputs.length
  let lowest = getLowestRangeValue(inputs)
  let highest = getHighestRangeValue(inputs)
  return (event) => {
    const isChecked = event.target.checked
    console.log(isChecked)
    const targetValue = parseInt(event.target.value)
    if (isChecked) {
      lowest = getLowestRangeValue(inputs)
      highest = getHighestRangeValue(inputs)
    } else {
      if (lowest === targetValue) {
        lowest = getLowestRangeValue(inputs)
      }
      if (highest === targetValue) {
        highest = getHighestRangeValue(inputs)
      }
      const distanceLowest = targetValue - lowest
      const distanceHighest = highest - targetValue
      if (distanceLowest > distanceHighest) {
        let foundTarget = false
        for (let i = inputsLength - 1; i >= 0; --i) {
          const el = inputs[i]
          const value = parseInt(el.value)
          if (foundTarget) {
            highest = value
            break
          } else if (value === targetValue) {
            foundTarget = true
          }
        }
      } else if (distanceHighest > distanceLowest) {
        let foundTarget = false
        for (let i = 0; i < inputsLength; ++i) {
          const el = inputs[i]
          const value = parseInt(el.value)
          if (foundTarget) {
            lowest = value
            break
          } else if (value === targetValue) {
            foundTarget = true
          }
        }
      } else if (distanceHighest === distanceLowest) {
        lowest = (highest = targetValue)
      }
    }
    for (let i = 0; i < inputsLength; ++i) {
      const el = inputs[i]
      const value = parseInt(el.value)
      if (value >= lowest && value <= highest) {
        if (!el.checked) {
          el.checked = true
        }
        if ((value === highest || value === lowest) && !el.classList.contains('show-label')) {
          el.classList.add('show-label')
        }
      } else {
        if (el.checked) {
          el.checked = false
        }
      }
      if (el.classList.contains('show-label') && !(value === highest || value === lowest)) {
        el.classList.remove('show-label')
      }
    }
  }
}

const rangeSelectors = document.getElementsByClassName('results-page__menu__range-select')
for (const rangeSelector of rangeSelectors) {
  const classes = rangeSelector.classList.values()
  for (const clazz of classes) {
    if (clazz.startsWith('js-range-select-')) {
      const targetName = clazz.substring(16)
      const inputs = document.querySelectorAll(`input[name="${targetName}"]`)
      const updater = createRangeSelectorUpdater(inputs)
      for (const input of inputs) {
        input.addEventListener('change', updater)
      }
      break
    }
  }
}
