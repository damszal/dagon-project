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

let pickSectionDisplay = document.querySelector('.pick-section');

//idle =======================================================================================================================
var idle = new IdleJs({
    idle: 10000000, // idle time in ms
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

//************************************************************************ */
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


window.addEventListener('DOMContentLoaded', (e) => {
    fetch("http://localhost:3000/topick")
    .then(res => res.json())
    .then(res => {
            pickSectionDisplay.style.display = 'flex'
            qToPick.innerHTML = 3;
            iCode.innerHTML = res[0].itemName;
            iDescription.innerHTML = res[0].itemCategory;
            iProperty.innerHTML = res[0].itemDescription;
            
            // --------------------------------------- pick
            
            let counter = 0; 

            console.log(res)
            console.log(res.length)
            console.log()

            scanBtn.addEventListener('click', (e)=> {
                e.preventDefault;
                console.log(counter)
                if (picked.innerHTML < qToPick.innerHTML) {
                    picked.innerHTML++
                }
                if(picked.innerHTML == qToPick.innerHTML){
                     picked.innerHTML = 0 
                     counter++
                     iDescription.innerHTML = res[counter].itemCategory;
                     iCode.innerHTML = res[counter].itemName;
                     iProperty.innerHTML = res[counter].itemDescription
                     // LINK QUANTITY NUMBER WITH DATABASE
                     qToPick.innerHTML = 2; 
                }
                //!!!! find a better solution for detecting last item in the last object and error handl
                if ((counter == res.length-1)&& (picked.innerHTML == qToPick.innerHTML-1)) {
                    counter = 0;
                    iDescription.innerHTML = res[counter].itemCategory;
                    iCode.innerHTML = res[counter].itemName;
                    iProperty.innerHTML = res[counter].itemDescription
                    
                    // LOOPING ORDERS 
                    // console.log("end of queue")
                    // counter = 0;
                    // iDescription.innerHTML = res[counter].itemCategory;
                    // iCode.innerHTML = res[counter].itemName;
                    // iProperty.innerHTML = res[counter].itemDescription;
                    // qToPick.innerHTML = 3;
                }

                // THE OLD VERSION 
                // if (picked.innerHTML == qToPick.innerHTML) {
                //     picked.innerHTML = 0 
                //     counter++
                //     iDescription.innerHTML = res[counter].itemCategory;
                //     iCode.innerHTML = res[counter].itemName;
                //     iProperty.innerHTML = res[counter].itemDescription
                //     qToPick.innerHTML = 2;

                //     //qToPick.innerHTML = res[counter].toPick;
                //     // img.src = res[counter].img
                // }
            })
        })
    .catch(error => console.log("Błąd: ", error));
})

// ***************************************************************************

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