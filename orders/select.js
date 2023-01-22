let app = document.getElementById('app')
let itemContainer = document.getElementById('item-container')
let checkboxContainer = document.getElementById('checkbox-container')
let item = document.getElementById('item')
let itemName = document.getElementById('item-name')



fetch("http://localhost:3000/inbound-items")
.then(res => res.json())
    .then(res => {
        res.forEach(element => {
            const newItemContainer = document.createElement("div");
            newItemContainer.setAttribute('class','item-container')
            app.appendChild(newItemContainer)

            const newItem = document.createElement("div");
            newItem.setAttribute('class','item')
            newItemContainer.appendChild(newItem)
            const newItemName = document.createElement("p");
            newItemName.innerText = element.itemName;
            newItem.appendChild(newItemName)

            const newCheckboxContainer = document.createElement("div");
            newCheckboxContainer.setAttribute('class','checkbox-container')
            newItemContainer.appendChild(newCheckboxContainer)

            const newInput = document.createElement("input");
            newInput.setAttribute('type','checkbox');
            newInput.setAttribute('style','checkbox');
            newCheckboxContainer.appendChild(newInput);
            
            console.log("załadowano baze")

            
        })
        return res
    }) 
    .then(res=>{
        let arr = res
        // console.log(res)
        // console.log( arr)
        let ItemListNode = document.querySelectorAll('input')
        // console.log(ItemListNode)
        const release = document.getElementById('release');
        console.log(release)
            release.addEventListener('click',e =>{
                 ItemListNode.forEach((e,i)=>{
                    console.log(e)
                    if(e.checked) {
                        console.log(arr[i].itemName)
                        // let jsonID = {
                        //     item : arr[i]
                        // }
                        fetch("http://localhost:3000/topick", {
                            method: "POST",
                            headers: {
                            "Content-Type": "application/json",
                            },
                            body: JSON.stringify(arr[i]),
                            });
                    }
                    else 
                    {
                        console.log('cipka' + i)
                    }
                 })
                console.log(e)
                console.log(arr)
                console.log(ItemListNode)
            })
        // console.log(res)
        // console.log("kolejna akcja")
        // let ItemListNode = document.querySelectorAll('input')
        // console.log(ItemListNode)
        // ItemListNode.forEach(e=>{
        //    console.log(e)
        //    const checkedArr = []
        //    e.addEventListener('change', ()=> {
        //     if (e.checked) {
        //         console.log("Checkbox is checked..");
        //         console.log(res)
        //       } else {
        //         console.log("Checkbox is not checked..");
        //       }
        //    })
        // })
    })  

    
    



















//     let app = document.getElementById('app')
// let itemContainer = document.getElementById('item-container')
// let checkboxContainer = document.getElementById('checkbox-container')
// let item = document.getElementById('item')
// let itemName = document.getElementById('item-name')



// fetch("http://localhost:3000/inbound-items")
// .then(res => res.json())
//     .then(res => {
//         res.forEach(element => {
//             const newItemContainer = document.createElement("div");
//             newItemContainer.setAttribute('class','item-container')
//             app.appendChild(newItemContainer)

//             const newItem = document.createElement("div");
//             newItem.setAttribute('class','item')
//             newItemContainer.appendChild(newItem)
//             const newItemName = document.createElement("p");
//             newItemName.innerText = element.itemName;
//             newItem.appendChild(newItemName)

//             const newCheckboxContainer = document.createElement("div");
//             newCheckboxContainer.setAttribute('class','checkbox-container')
//             newItemContainer.appendChild(newCheckboxContainer)

//             const newInput = document.createElement("input");
//             newInput.setAttribute('type','checkbox');
//             newInput.setAttribute('style','checkbox');
//             newCheckboxContainer.appendChild(newInput);
  
//         })
//     })   
    
    
    
    
//     .then((res) => {
//         console.log("drugi then")
//         const release = document.getElementById('release');
//         const checked = document.querySelectorAll('.checkbox')
//         console.log(release)
//         console.log(checked)
//     })