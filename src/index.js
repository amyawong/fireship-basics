import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, onSnapshot,
  addDoc, deleteDoc, doc, 
  query, where,
  orderBy
} from "firebase/firestore";

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

// initialize firestore service
const db = getFirestore();

// get reference to specific collection in database (collection reference)
const colRef = collection(db, 'books') // second argument is the collection we want to retrieve

// query reference
const q = query(colRef, where("author", "==", "patrick rothfuss"), orderBy('title', 'desc')) 
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