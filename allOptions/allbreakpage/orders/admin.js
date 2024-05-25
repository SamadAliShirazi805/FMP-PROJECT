
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase,ref,set,push,onChildAdded,remove } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyC40r5kmK5HqypoQNkWKVlZ4-nWFnz69Yo",
    authDomain: "milk-shop-samad.firebaseapp.com",
    projectId: "milk-shop-samad",
    storageBucket: "milk-shop-samad.appspot.com",
    messagingSenderId: "207670724120",
    appId: "1:207670724120:web:885086bea037b3fc42e56d",
    measurementId: "G-ZLNCBHHB4N"
  };

const app = initializeApp(firebaseConfig);
var DATABASE = getDatabase(app)

var SerialNo = document.getElementById("SerialNo")
var pushData = document.getElementById("pushingData")

var dataOfObject = [];

function getDataFromDatabase(){
    var reference = ref(DATABASE,'orders')
    onChildAdded(reference,function(data){
      render(data.val())
    })
  }
  function render(data){
    if(data){
        dataOfObject.push(data)
    }
    pushData.innerHTML = ""
    SerialNo.innerHTML = dataOfObject.length
 for (var i = 0; i < dataOfObject.length; i++) {
        pushData.innerHTML += `<tr>
        <th >${i+1}</th>
        <th >${dataOfObject[i].UserName}</th>
        <th >${dataOfObject[i].address}</th>
        <th>${dataOfObject[i].number}</th>
        <th>${dataOfObject[i].name}</th>
        <th>${dataOfObject[i].price}</th>
        <th><i class="fa fa-times" aria-hidden="true" onclick="Del(${i})"></th>
        </tr>`
    }
}
window.onload =  getDataFromDatabase()

window.Del =function(index){
  var id = dataOfObject[index].id
     var refer = ref(DATABASE,`orders/${id}`)
     remove(refer)
     dataOfObject.splice(index,1)
     Swal.fire({
         title: 'Order Data Deleted',
         showClass: {
           popup: 'animate__animated animate__fadeInDown'
         },
         hideClass: {
           popup: 'animate__animated animate__fadeOutUp'
         }
       })
     render()
 }