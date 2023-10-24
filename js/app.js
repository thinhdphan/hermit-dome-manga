  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
  import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
  import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

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
  
  // HTML elements
  let emailInp = document.getElementById('userEmail');
  let passInp = document.getElementById('userPassword');
  let mainForm = document.getElementById('mainForm');


  let signInUser = event => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, emailInp.value, passInp.value).then((credentials) => {
      get(child(dbref, 'UsersAuthList/' + credentials.user.uid)).then((snapshot) => {
        if(snapshot.exists){
          sessionStorage.setItem("user-info", JSON.stringify({
            firstname: snapshot.val().firstname,
            lastname: snapshot.val().lastname
          }))
          sessionStorage.setItem("user-creds", JSON.stringify(credentials.user));
        }
      })
      window.location.href = 'main.html';
    })
    .catch((error) => {
      alert('incorrect user/password!');
    })
  }

  mainForm.addEventListener('submit', signInUser); 