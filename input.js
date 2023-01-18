var uniqid = require('./node_modules/uniqid/index'); 

console.log(uniqid()); // -> 4n5pxq24kpiob12og9
console.log(uniqid(), uniqid());










const add = document.getElementById("form")
const addReceive = document.getElementById("receive-form")

function send() {
    var itemTitle = document.getElementById("item-title").value;
    var itemBarcode = document.getElementById("item-barcode").value;
    let itemDescription = document.getElementById("item-description".value);

    const json = {
        itemTitle: itemTitle,
        itemBarcode: itemBarcode,
    };
    
    fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
        });
        }

function sendReceive(){
    console.log("wysłano nowy item")
}


add.addEventListener("submit", e=>{
    e.preventDefault();
    send();
})
console.log(addReceive)

addReceive.addEventListener("submit", e=>{
    e.preventDefault();
    sendReceive();
})