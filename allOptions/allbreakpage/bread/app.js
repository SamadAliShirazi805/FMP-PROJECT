import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, set, push, onChildAdded, remove } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

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

var Name = document.getElementById("Name")
var Price = document.getElementById("Price")
var Lprice = document.getElementById("Lprice");
var SerialNo = document.getElementById("SerialNo")
var pushData = document.getElementById("pushingData")

var dataOfObject = [];

function getDataFromDatabase() {
  var reference = ref(DATABASE, 'bread')
  onChildAdded(reference, function (data) {
    render(data.val())
  })
}

function render(data) {
  if (data) {
    dataOfObject.push(data)
  }
  pushData.innerHTML = ""
  SerialNo.innerHTML = dataOfObject.length
  for (var i = 0; i < dataOfObject.length; i++) {
    var a = i
    pushData.innerHTML += `<tr>
        <th >${i + 1}</th>
        <th >${dataOfObject[i].name}</th>
        <th >${dataOfObject[i].price}</th>
        <th>${dataOfObject[i].Lprice}</th>
        <th><i class="fa fa-times" aria-hidden="true" onclick="Del(${a})"></th>
        </tr>`
  }
}
window.onload = getDataFromDatabase()
window.Add = function () {
  if (Name.value === "" || Price.value === "" || Lprice.value === "") {
    Swal.fire('Enter Details')
  } else {
    var bread = {
      name: `${Name.value} Breads`,
      price:`Rs:${Price.value}` ,
      Lprice: Lprice.value,
      buy:"BUY",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Anadama_bread_%281%29.jpg/1200px-Anadama_bread_%281%29.jpg",
    }

    var referId = ref(DATABASE)
    var ID = push(referId).key
    bread.id = ID
    var reference = ref(DATABASE, `bread/${bread.id}`)
    set(reference, bread)
    Name.value = ""
    Price.value = ""
    Lprice.value = ""
  }
  pushData.innerHTML = ""
  render()
}

window.Del = function (index) {
  var id = dataOfObject[index].id
  var refer = ref(DATABASE, `bread/${id}`)
  remove(refer)
  dataOfObject.splice(index, 1)
  Swal.fire({
    title: 'Product Deleted',
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })
  render()
}