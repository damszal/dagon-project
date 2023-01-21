(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let add = document.getElementById("form")
let addReceive = document.getElementById("receive-form")

function sendReceive(){
    let itemName = document.getElementById("item-name").value;
    let itemCategory = document.getElementById("item-category").value;
    let itemDescription = document.getElementById("item-description").value;
    let itemBarcode = document.getElementById("item-barcode").value;
    let itemHeight = document.getElementById("item-height").value;
    let itemWidth = document.getElementById("item-width").value;
    let itemLength = document.getElementById("item-length").value;
    let itemWeight = document.getElementById("item-weight").value;


    let d = new Date().getTime().toString();
    
    const jsonID = {
        id: d,
        itemName: itemName,
        itemCategory: itemCategory,
        itemDescription: itemDescription,
        itemBarcode : itemBarcode,
        itemHeight : itemHeight,
        itemWidth : itemWidth,
        itemLength : itemLength,
        itemWeight : itemWeight,
    };

    fetch("http://localhost:3000/inbound-items", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonID),
    });

}     

function send() {
    let itemTitle = document.getElementById("item-title").value;
    let itemBarcode = document.getElementById("item-barcode").value;
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
    

    addReceive.addEventListener("submit", e=>{
        e.preventDefault();
        sendReceive();
    })

    
},{}]},{},[1]);
