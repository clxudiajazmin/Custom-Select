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
        element.style.display = "none"

        element.after(this.customElement)
    }

    get selectedOption(){
        return this.options.find(option => option.selected)
    }

    get selectedOptionIndex(){
        return this.options.indexOf(this.selectedOption)
    }

    selectValue(value) {
        const newSelectedOption = this.options.find(option => {
            return option.value === value
          })
        const prevSelectedOption = this.selectedOption
        prevSelectedOption.selected = false
        prevSelectedOption.element.selected = false
      
        newSelectedOption.selected = true
        newSelectedOption.element.selected = true
      
        this.labelElement.innerText = newSelectedOption.label

        this.optionCustomElement.
            querySelector(`[data-value = "${prevSelectedOption.value}"]`)
            .classList.remove('selected')
        
        const newCustomElement = this.optionCustomElement.
            querySelector(`[data-value = "${newSelectedOption.value}"]`)
        
            newCustomElement.classList.add('selected')
        newCustomElement.scrollIntoView({ block: "nearest" })
    }
}
    
function setupCustomElement(select){
    //Adding new class for not changing style
    select.customElement.classList.add('custom-select-container')
    select.customElement.tabIndex = 0

    select.labelElement.classList.add('custom-select-value')
    select.labelElement.innerText = select.selectedOption.label
    //Assign label to element
    select.customElement.append(select.labelElement)

    //Adding new class for not changing style
    select.optionCustomElement.classList.add('custom-select-options')

    select.options.forEach(option => {
        const optionElement = document.createElement('li')
        optionElement.classList.add('custom-select-option')
        optionElement.classList.toggle('selected', option.selected)
        optionElement.innerText = option.label
        optionElement.dataset.value = option.value
        optionElement.addEventListener('click', () => {
            select.selectValue(option.value)
            select.optionCustomElement.classList.remove('show')
        })
        select.optionCustomElement.append(optionElement)
    })
    //Assign options to element
    select.customElement.append(select.optionCustomElement)

    select.labelElement.addEventListener('click', () =>{
        select.optionCustomElement.classList.toggle("show")
    })

    select.customElement.addEventListener('blur', () => {
        select.optionCustomElement.classList.remove("show")
    })

    let debounceTimeout
    let searchTerm = ""

    select.customElement.addEventListener('keydown', e => {
        switch (e.code) {
            case "Space":
                select.optionCustomElement.classList.toggle('show')
                break;
            case "ArrowUp":
                const prevOption = select.options[select.selectedOptionIndex - 1]
                if (prevOption) {
                    select.selectValue(prevOption.value)
                }
                break;
            case "ArrowDown":
                const nextOption = select.options[select.selectedOptionIndex + 1]
                if (nextOption) {
                    select.selectValue(nextOption.value)
                }
                break;
            case "Enter":
                case "Escape":
                    select.optionCustomElement.classList.remove("show")
                    break;
            default:
                clearTimeout(debounceTimeout)
                searchTerm += e.key
                debounceTimeout = setTimeout(() => {
                    searchTerm = ""
                }, 500)

                const searchedOption = select.options.find(option => {
                    return option.label.toLowerCase().startsWith(searchTerm)
                })
                if(searchedOption) select.selectValue(searchedOption.value)
        }
    })
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