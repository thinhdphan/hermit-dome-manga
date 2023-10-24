import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCvau2ODAfcEqtIaZGan7rgu7JCjFC0Y1M",
  authDomain: "hermit-dome-manga.firebaseapp.com",
  projectId: "hermit-dome-manga",
  storageBucket: "hermit-dome-manga.appspot.com",
  messagingSenderId: "437514867361",
  appId: "1:437514867361:web:e0e7bab05029cccff156e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);
const dbref = ref(db);

// HTML Elements
let emailInput = document.getElementById('emailInp');
let passInput = document.getElementById('passwordInp');
let firstNameInput = document.getElementById('uFirstName');
let lastNameInput = document.getElementById('uLastName');
let mainForm = document.getElementById('mainForm');


// Register User
let RegisterUser = event => {
  event.preventDefault();

  createUserWithEmailAndPassword(auth, emailInput.value, passInput.value).then((credentials) => {
    set(ref(db, 'UsersAuthList/' + credentials.user.uid), {
      firstname: firstNameInput.value,
      lastname: lastNameInput.value
    })
    
    alert('You have registered with Hermit Dome Manga!')
  }) 
  .catch((error) => {
    alert('Invalid Registry: Please fill out the entire form before clicking register. Thank you!');
  })

}

mainForm.addEventListener('submit', RegisterUser); 
