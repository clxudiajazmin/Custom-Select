export default class Select{

    constructor(element){
        //Element itself
        this.element = element

        //Recolect options from select
        this.options = getFormattedOptions(element.querySelectorAll('option'))

        //Custom Element
        this.customElement = document.createElement('div')

        //Label Element
        this.labelElement = document.createElement('span')

        //Option Custom Element
        this.optionCustomElement = document.createElement('ul')

        setupCustomElement(this)

        element.after(this.customElement)
    }

    get selectedOption(){
        return this.options.find(option => option.selected)
    }
}
    
function setupCustomElement(select){
    //Adding new class for not changing style
    select.customElement.classList.add('custom-select-container')

    select.labelElement.classList.add('custom-select-value')
    select.labelElement.innerText = select.selectedOption.label
    //Assign label to element
    select.customElement.append(select.labelElement)

    //Adding new class for not changing style
    select.optionCustomElement.classList.add('custom-select-options')

    select.options.forEach(option => {
        const optionElement = document.createElement('li')
        optionElement.classList.add('custon-select-option')
        optionElement.classList.toggle('selected', option.selected)
        optionElement.innerText = option.label
        optionElement.dataset.value = option.value
        select.optionCustomElement.append(optionElement)
    })
    //Assign options to element
    select.customElement.append(select.optionCustomElement)
}

function getFormattedOptions(optionElements){
    //convert into an array
    return [...optionElements].map(optionElement => {
        //convert into an object each option
        return {
            value: optionElement.value,
            label: optionElement.label,
            selected: optionElement.selected,
            element: optionElement
        }
    })
}