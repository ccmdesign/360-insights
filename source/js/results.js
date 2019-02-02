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
        target.style.maxHeight = `${target.getBoundingClientRect().height}px`
        if (hideTargets) {
          target.classList.add('js-foldable-foldTarget')
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
      console.log(targets)
      break
    }
  }
  console.log()
}
