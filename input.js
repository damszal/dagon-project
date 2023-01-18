
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

        
        
        add.addEventListener("submit", e=>{
            e.preventDefault();
            send();
        })
        console.log(addReceive)
        

    addReceive.addEventListener("submit", e=>{
        e.preventDefault();
        let d = new Date().getTime().toString();
        console.log(d)
        
        const jsonID = {
            id: d,
        };

        fetch("http://localhost:3000/inbound-items", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonID),
        });
    })