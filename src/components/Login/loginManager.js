import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const firebaseFrameWork = () =>{
    if(!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
      }
}
export const handleSignIn = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider).
    then(res =>{
      //console.log(res);
      const {name,picture,email} = res.additionalUserInfo.profile;
      const isSignedUser = {
            isSignedIn:true,
            name: name,
            picture:picture,
            email:email,
            success:true
      }
      return (isSignedUser);
    
      //console.log(name,picture,email);
    })
    .catch(err =>{
      console.log(err);
      console.log(err.message);
    })
  }
  export const handleFbSignIn = () =>{
    const fbProvider = new firebase.auth.FacebookAuthProvider();
         return  firebase
        .auth()
        .signInWithPopup(fbProvider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          //var credential = result.credential;

          // The signed-in user info.
          var user = result.user;
          result.success = true;
          return user;
          console.log('sign in ', user);

          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          //var accessToken = credential.accessToken;

          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          //var errorCode = error.code;
         // var errorMessage = error.message;
          // The email of the user's account used.
          //var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          //var credential = error.credential;

          // ...
        });
  }
 export const handleSignOut = () => {
    return firebase.auth().signOut().
    then( res =>{
      const signOut = {
        isSignedIn:false,
        name:'',
        email:'', 
        picture:'',
        error:'',
        success:false


      }
      return(signOut);
  })

}
export const createUserWithEmailAndPassword = (name,email,password) =>{
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {
      // Signed in 
    let newUserInfo = res.user;
    newUserInfo.error ="";
    newUserInfo.success = true;
    updateUserName(name);
    return newUserInfo;
     
      // ...
      
    })
    .catch((error) => {
       let newUserInfo ={}
       newUserInfo.error = error.message;
       newUserInfo.success = false;
       return newUserInfo;
      // ..
    });
}
export const signInWithEmailAndPassword = (email, password) =>{
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((res) => {
      // Signed in
         // Signed in 
         let newUserInfo =res.user;
         newUserInfo.error ="";
         newUserInfo.success = true;
         return newUserInfo ;
         //console.log('sign in info ', res.user)
      // ...
    })
    .catch((error) => {
      let newUserInfo ={}
         newUserInfo.error = error.message;
         newUserInfo.success = false;
        return newUserInfo;
    });
}
const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function() {
      // Update successful.
      console.log('update successfully')
    }).catch(function(error) {
      // An error happened.
    });
  }