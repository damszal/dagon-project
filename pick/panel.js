import moment from 'moment';
import IdleJs from "idle-js";

const logOut = document.querySelector('.logOut')
const scanBtn = document.querySelector('.scan-btn')
const errBtn = document.querySelector(".error-btn")

const qToPick = document.querySelector('.qToPick')
const picked = document.querySelector('.picked')
const iDescription = document.querySelector('.item-description')
const iCode = document.querySelector('.item-code')
const iProperty = document.querySelector('.item-property')
const img = document.querySelector(".i-img")

//idle =======================================================================================================================
var idle = new IdleJs({
    idle: 10000, // idle time in ms
    events: ['mousemove', 'keydown', 'mousedown', 'touchstart'], // events that will trigger the idle resetter
    onIdle: function () {
        localStorage.removeItem("item")
        localStorage.setItem('loginOutData', moment().format('LLLL'))
        window.location.replace("/logouted.htm");
    }, // callback function to be executed after idle time
    onActive: function () {}, // callback function to be executed after back form idleness
    onHide: function () {}, // callback function to be executed when window become hidden
    onShow: function () {}, // callback function to be executed when window become visible
    keepTracking: true, // set it to false if you want to be notified only on the first idleness change
    startAtIdle: false // set it to true if you want to start in the idle state
  });
  idle.start();


logOut.addEventListener('click', (e)=>{
    localStorage.removeItem("item")
    localStorage.setItem('loginOutData', moment().format('LLLL'))
    window.location.replace("/logouted.htm");

})


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


window.addEventListener('DOMContentLoaded', (e) => {
    fetch("http://localhost:3000/topick")
        .then(res => res.json())
        .then(res => {
            qToPick.innerHTML = 3;
            iCode.innerHTML = res[0].itemName;
            iDescription.innerHTML = res[0].itemCategory;
            iProperty.innerHTML = res[0].itemDescription;
            
            // --------------------------------------- pick
            
            let counter = 0; 

            scanBtn.addEventListener('click', (e)=> {
                e.preventDefault;
                picked.innerHTML++
                if (picked.innerHTML == qToPick.innerHTML) {
                    picked.innerHTML = 0 
                    counter++
                    iDescription.innerHTML = res[counter].itemCategory;
                    iCode.innerHTML = res[counter].itemName;
                    iProperty.innerHTML = res[counter].itemDescription
                    qToPick.innerHTML = 2;
                    //qToPick.innerHTML = res[counter].toPick;
                    // img.src = res[counter].img
                }
            })
        })

})

// ***************************************************************************

// const order1 = {
//     toPick : 5,
//     description : "mata fitness",
//     code : "TPE 0,6cm",
//     property : "jasnoniebieska",
//     img: "assets/tpe0-6.jpg",
// };

// const order2 = {
//     toPick : 3,
//     description : "mata fitness",
//     code : "NBR 1,5cm",
//     property : "żółta",
//     img: "assets/nbr1-5.jpg",
    
// }

// const order3 = {
//     toPick : 3,
//     description : "mata fitness",
//     code : "NBR 1,5cm",
//     property : "z otworami czarna",
//     img: "assets/nbr1-5z-otworami.jpg",

// }
// const orders = [order1,order2,order3]

// let counter = 0; 

// scanBtn.addEventListener('click', (e)=> {
//     e.preventDefault;
//     picked.innerHTML++
//     if (picked.innerHTML == qToPick.innerHTML) {
//         picked.innerHTML = 0 
//         iDescription.innerHTML = orders[counter++].description;
//         iCode.innerHTML = orders[counter].code;
//         iProperty.innerHTML = orders[counter].property
//         qToPick.innerHTML = orders[counter].toPick;
//         img.src = orders[counter].img
//     }
// })

//*********************************************************************
// TEMPORARY SOUND EFFECT

function playError(){
    let audio = new Audio("../audio/error.wav");
    audio.play()
}

errBtn.addEventListener('click',playError);

function playPick(){
    let audio = new Audio("../audio/pick.wav");
    audio.play()
}

scanBtn.addEventListener('click',playPick);

//***************************************************************************** */