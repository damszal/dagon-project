import { initializeApp } from "firebase/app";
import { getDatabase,ref,set,child,get } from "firebase/database";
import {firebaseConfig} from "../data"

const user1 = {
  login : "johncarmack",
  password : "carmack123" 
};
const user2 = {
  login : "johnromero",
  password : "romero123" 
};
const user3 = {
  login : "jamesgosling",
  password : "gosling123" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

console.log(firebaseConfig)

function writeUserData(userId, login,password) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    login: login,
    password: password
  });
}

writeUserData("admin","admin","admin123")
writeUserData("user1",user1.login, user1.password);
writeUserData("user2",user2.login, user2.password);
writeUserData("user3",user3.login,user3.password);


const dbRef = ref(getDatabase());
get(child(dbRef, `users/admin`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});






// ============================================================================
var CryptoJS = require("crypto-js");

console.log("1234567")
let barcodeForm = document.querySelector(".barcode-form")
let passwordForm = document.querySelector(".password-form")
let checkboxSwitch = document.querySelector(".checkbox-switch")

checkboxSwitch.addEventListener('click',()=>{
    if (checkboxSwitch.checked == true){
        barcodeForm.style.display = "none";
        passwordForm.style.display = "block";
      } else {
        barcodeForm.style.display = "block";
        passwordForm.style.display = "none";
      }
    } )

// ************************************************************************************
// item from database
const barcodeExamp = {
  barcode : 1234567,
}


barcodeForm.addEventListener("submit", e => {
  e.preventDefault();
  if(barcodeForm[0].value == barcodeExamp.barcode) 
  {
    document.cookie = "logged = yes";
    localStorage.clear();
  //localStorage.setItem("item", JSON.stringify(barcodeExamp))
  //console.log("zalogowałeś się!")
  window.location.replace("../pick/panel.htm");
  //console.log("zalogowałeś się!jjj")
  }
}
);

//-----------------------------------------------------------------------



const user1Ecrypt = CryptoJS.AES.encrypt(JSON.stringify(user1), 'dagon1').toString();
const user2Ecrypt = CryptoJS.AES.encrypt(JSON.stringify(user2), 'dagon2').toString();
//const user3Ecrypt = CryptoJS.AES.encrypt(JSON.stringify(user3), 'dagon3').toString();

// var bytes1  = CryptoJS.AES.decrypt(user1Ecrypt, 'dagon');
// var decryptedData1 = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

// console.log(decryptedData)
// console.log(ciphertext)


window.addEventListener('DOMContentLoaded', (e)=>{
  localStorage.setItem("EncryptedUser1", JSON.stringify(user1Ecrypt));
  localStorage.setItem("EncryptedUser2", JSON.stringify(user2Ecrypt));
  localStorage.setItem("DecryptedUser3", JSON.stringify(user3));
  document.cookie = "logged= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
})