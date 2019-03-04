import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyD1lTpU15dlK5VApMzrOueXpznSk1C3IT4',
  authDomain: 'certification-test-1234.firebaseapp.com',
  databaseURL: 'https://certification-test-1234.firebaseio.com/',
  projectId: 'certification-test-1234',
  storageBucket: 'gs://certification-test-1234.appspot.com',
  messagingSenderId: '633522599582'
}

class Firebase {
  constructor(){
    firebase.initializeApp(config);
  }

  static handleSignUp = (email, password) => {
    alert('handleSignUp');
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log(user);
      })
      .catch(error => {
        console.log('firebase sign up error', error);
      });
  }

  static handleSignIn = (email, password) => {
    alert('handleSignIn');
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log(user);
      })
      .catch(error => {
        console.log('firebase sign in error', error);
      });
  }

  static getUser = () => {
    alert('getUser');
    firebase.auth().onAuthStateChanged(user => {
      return user;
    });
  }
}

export default Firebase;