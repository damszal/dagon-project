const logOut = document.querySelector('.logOut')
const scanBtn = document.querySelector('.scan-btn')

const qToPick = document.querySelector('.qToPick')
const picked = document.querySelector('.picked')
const iDescription = document.querySelector('.item-description')
const iCode = document.querySelector('.item-code')
const iProperty = document.querySelector('.item-property')

console.log(qToPick)
console.log(iDescription)
console.log(iCode)
console.log(iProperty)

logOut.addEventListener('click', (e)=>{
    localStorage.removeItem("item")
    window.location.replace("/logouted.htm");

})

window.addEventListener('DOMContentLoaded', (e) => {
    qToPick.innerHTML = order1.toPick;
    iDescription.innerHTML = order1.description;
    iCode.innerHTML = order1.code;
    iProperty.innerHTML = order1.property
})

// ***************************************************************************

const order1 = {
    toPick : 5,
    description : "mata fitness",
    code : "TPE 0,6cm",
    property : "jasnoniebieska",
};

const order2 = {
    toPick : 3,
    description : "mata fitness",
    code : "NBR 1,5cm",
    property : "żółta",
}

const order3 = {
    toPick : 3,
    description : "mata fitness",
    code : "NBR 1,5cm",
    property : "z otworami czarna",
}
const orders = [order1,order2,order3]

let counter = 0; 

scanBtn.addEventListener('click', (e)=> {
    e.preventDefault;
    picked.innerHTML++
    if (picked.innerHTML == qToPick.innerHTML) {
        picked.innerHTML = 0 
        iDescription.innerHTML = orders[counter++].description;
        iCode.innerHTML = orders[counter].code;
        iProperty.innerHTML = orders[counter].property
        qToPick.innerHTML = orders[counter].toPick;
    }
})