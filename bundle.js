(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// var uniqid = require('uniqid'); 

// console.log(uniqid()); // -> 4n5pxq24kpiob12og9
// console.log(uniqid(), uniqid()); // -> 4n5pxq24kriob12ogd, 4n5pxq24ksiob12ogl


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
},{}]},{},[1]);
