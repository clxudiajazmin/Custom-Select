import Select from './select.js'

const selectElements = document.querySelectorAll('[data-customs]')

selectElements.forEach(selectElement => {
    new Select(selectElement)
})

