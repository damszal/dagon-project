// importing vars 
// ES6 import 
import { initializeApp } from "firebase/app";
import { getDatabase,ref,set,child,get } from "firebase/database";
import {firebaseConfig} from "../config";
import { user1,user2,user3 } from "./users";
// modular include
var CryptoJS = require("crypto-js");

// catching html elements
let barcodeForm = document.querySelector(".barcode-form")
let passwordForm = document.querySelector(".password-form")
let checkboxSwitch = document.querySelector(".checkbox-switch")

// forms actions related to firebase 
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

passwordForm.addEventListener('submit',(e)=>{ 
  e.preventDefault();
  let loginInp = document.querySelector(".login").value
  let passInp = document.querySelector(".password").value
  const dbRef = ref(getDatabase());
    get(child(dbRef, `users/`)).then((snapshot) => {
      if (snapshot.exists()) {
        const dataUsers = snapshot.val()
        for(var k in dataUsers){
          if ((dataUsers[k].login == loginInp) && (dataUsers[k].password == passInp))
          {
            console.log("login = true")
            document.cookie = "logged = yes";
            localStorage.clear();
            window.location.replace("../pick/panel.htm");
          }
          else if ((dataUsers[k].login != loginInp) && (dataUsers[k].password != passInp)) 
          {
            console.log("login = false")
          }
        }
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
})


// switch login option

checkboxSwitch.addEventListener('click',()=>{
    if (checkboxSwitch.checked == true){
        barcodeForm.style.display = "none";
        passwordForm.style.display = "block";
      } else {
        barcodeForm.style.display = "block";
        passwordForm.style.display = "none";
      }
    } )

// correct barcode 
const barcodeExamp = {
  barcode : 1234567,
}


barcodeForm.addEventListener("submit", e => {
  e.preventDefault();
  if(barcodeForm[0].value == barcodeExamp.barcode) 
  {
    document.cookie = "logged = yes";
    localStorage.clear();
    window.location.replace("../pick/panel.htm");
  }
}
);

//encrypting user data example 



const user1Ecrypt = CryptoJS.AES.encrypt(JSON.stringify(user1), 'dagon1').toString();
const user2Ecrypt = CryptoJS.AES.encrypt(JSON.stringify(user2), 'dagon2').toString();

// var bytes1  = CryptoJS.AES.decrypt(user1Ecrypt, 'dagon');
// var decryptedData1 = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));


// actions after page load 
window.addEventListener('DOMContentLoaded', (e)=>{
  localStorage.setItem("EncryptedUser1", JSON.stringify(user1Ecrypt));
  localStorage.setItem("EncryptedUser2", JSON.stringify(user2Ecrypt));
  localStorage.setItem("DecryptedUser3", JSON.stringify(user3));
  document.cookie = "logged= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
})