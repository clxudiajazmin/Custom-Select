import Select from './select.js'

const selectElements = document.querySelectorAll('[data-customs]')

selectElements.forEach(selectElement => {
    console.log(new Select(selectElement))
})

