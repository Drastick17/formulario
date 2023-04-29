const $ = (selector) => document.querySelector(selector)

const inputs = document.querySelectorAll("input, select")
let errors = ""

inputs.forEach(input => {
    input.addEventListener("change", (e) => {
        if (e.currentTarget.value === "") {
            e.currentTarget.style.border = "thin solid red"
            $(`#${e.currentTarget.name}Error`).textContent = `Ingrese un valor para ${e.currentTarget.name}`

        } else {
            e.currentTarget.style.borderColor = "black"
            $(`#${e.currentTarget.name}Error`).textContent = ""
        }
    })
})

function cleanMessages(){
    const data = Object.fromEntries(new FormData($(".form")));
    const refs = []
    console.log(data)
    if(!data) return
    for (const [key] of Object.entries(data)) {
        const field = $(`#${key}`)
        refs.push(field)
    }
    refs.forEach(ref => {
            ref.style.border = "thin solid red"
            $(`#${ref.name}Error`).firstChild = ""
            errors= ""

    })
}

function verifyValuesWhenSend() {
    const data = Object.fromEntries(new FormData($(".form")));
    const refs = []
    console.log(data)
    if(!data) return
    for (const [key] of Object.entries(data)) {
        const field = $(`#${key}`)
        refs.push(field)
    }
    refs.forEach(ref => {
        if (ref.value === "") {
            ref.style.border = "thin solid red"
            const text = document.createTextNode(`Ingrese un valor para ${ref.name}`)
            console.log(  $(`#sexError`))
            $(`#${ref.name}Error`).appendChild(text)
            errors+=`Ingrese un valor para ${ref.name}\n`
        } else {
            const text = document.createTextNode("")
            ref.style.border = "thin solid red"
            $(`#${ref.name}Error`).appendChild(text)

        }
    })
    if (verifyInterest()) {
        const interests = document.querySelectorAll("input[type='checkbox']")
        const interestArray = []
        interests.forEach(interest => {
            if (interest.checked) {
                interestArray.push(interest.value)
            }
        })
        data["interests"] = [...interestArray]
    
    } else {
        errors += "Seleccione un campo\n"
        $(".containerInterests").after("Almenos seleccione un campo")
    }
}




$(".form").addEventListener("submit", (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target));
    cleanMessages()
    verifyValuesWhenSend()
    if(errors.length === 0){
        alert("Se a registrado correctamente")
    }
    console.log(data)
})

function verifyInterest() {
    const interests = document.querySelectorAll("input[name='interests']")
    interests.forEach((interest => {
        if (interest.checked) return true
    }))
    return false
}



// function setErrors(fieldName, hasErrors) {
//     if (hasErrors) {
//         alert(`El campo ${fieldName} completo es obligatorio`)
//         const field = $(`input[name='${fieldName}']`)
//         field.focus()
//         field.setAttribute("style", "border:4px solid red")
//         field.setAttribute("placeholder", "Escriba aqui el nombre")
//     }
//     alert(`El campo ${fieldName} completo es obligatorio`)
//     const field = $(`input[name=${fieldName}]`)
//     field.focus()
//     field.setAttribute("style", "border:4px solid red")
//     field.setAttribute("placeholder", "Escriba aqui el nombre")
// }
