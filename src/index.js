import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, onSnapshot,
  addDoc, deleteDoc, doc, 
  query, where,
  orderBy, serverTimestamp,
  getDoc, updateDoc
} from "firebase/firestore";
import { getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut,
  onAuthStateChanged
} from 'firebase/auth'

// determines which project to connect to
const firebaseConfig = {
  apiKey: "AIzaSyBINvOrGCsP8fv7h27krrm1sYhrUGD7Zx0",
  authDomain: "fir-basics-353ab.firebaseapp.com",
  projectId: "fir-basics-353ab",
  storageBucket: "fir-basics-353ab.appspot.com",
  messagingSenderId: "803410765511",
  appId: "1:803410765511:web:c021e5959dccbb0d8f00e2",
  measurementId: "G-3DXTL6HHFS"
};

// connects to firebase backend
initializeApp(firebaseConfig);

// initialize firestore services
const db = getFirestore();
const auth = getAuth();

// get reference to specific collection in database (collection reference)
const colRef = collection(db, 'books') // second argument is the collection we want to retrieve

// query reference
const q = query(colRef, orderBy('createdAt')) 
// first argument of query function is which collection to look at for query, second argument is where function, third argument is orderBy function that you customize how you want properties ordered;
// first argument of where function is field/property name, second argument is comparison, third argument is what we want value to be equal to
// in order to use orderBy(), need to create an index in database

// retrieve all documents inside of the collection being passed in as argument (get collection data) and returns a promise
// getDocs(colRef)
//   .then(snapshot => {
//     // console.log(snapshot.docs) // [Fh, Fh, Fh]
//     let books = [];
//     snapshot.docs.forEach((doc) => {
//       books.push({ ...doc.data(), id: doc.id })
//       // for each of the documents ('books'), add a new object to empty books array, and for each object, get the data and id of the document
//     })
//     console.log(books) // array of book objects
//   })
//   // in case there is an error, log it to console
//   .catch(err => {
//     console.log(err.message)
//   })

// real time colletion data
onSnapshot(q, (snapshot) => { // first arg changes from colRef to q when querying (colRef as first arg means looking for everything)
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id })
  })
  console.log(books)
}) // first argument is collection we want to listen to, second argument is a callback function that goes off every time there is a change in the collection and returns a new snapshot

// adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()
  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp(),
  }) // first argument is collection reference, second argument is a new object we want to add that collection to
  .then(() => {
    addBookForm.reset()
  })
})

// deleting documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const docRef = doc(db, 'books', deleteBookForm.id.value)
  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })
})

// get a single document
const docRef = doc(db, 'books', '12mSQOqD542Jcm0Kec47') // start by making a document reference
// first argument is database, second is collection, third is id
getDoc(docRef)
  // .then((doc) => {
  //   console.log(doc.data(), doc.id)
  // })

// subscribe to a document to get changes to it
onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id)
}) // first argument is document to reference, second argument is a callback that goes off every time firestore sends back a new version of the document

// updating a document
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
  e.preventDefault()

  // get a document reference
  const docRef = doc(db, 'books', updateForm.id.value)
  updateDoc(docRef, {
    title: 'updated title',
  })
  .then(() => {
    updateForm.reset()
  })
})

// signing users up
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = signupForm.email.value
  const password = signupForm.password.value
  createUserWithEmailAndPassword(auth, email, password) // asynchronous function - first argument is auth object, second and third arguments are email and password
    .then((cred) => {
      console.log('user created:', cred.user) // cred.user gets access to that user
      signupForm.reset()
    })
    .catch((err) => {
      alert(err.message)
    })
})

// logging in
const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = loginForm.email.value
  const password = loginForm.password.value
  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log('user logged in: ', cred.user)
    })
    .catch((err) => {
      alert(err.message)
    })
})

// logging out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      console.log('the user has signed out')
    })
    .catch((err) => {
      console.log(err.message)
    })
})

// subscribing to auth changes
onAuthStateChanged(auth, (user) => {
  console.log('user status changed: ', user)
}) // first argument is auth, second argument is a callback that fires every time there is an authentication change of the user on the website (whenever a login, logout, or sign up happens)