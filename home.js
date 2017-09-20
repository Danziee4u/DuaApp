var user = JSON.parse(localStorage.getItem('currentUser'));
console.log(user);
var database = firebase.database().ref('/');


document.getElementById('username').innerHTML = user.name;
document.getElementById('email').innerHTML = user.email;
document.getElementById('mobile').innerHTML = user.mobile;
document.getElementById('age').innerHTML = user.age;

var rcvrName = document.getElementById('rcvrName');
var dua = document.getElementById('dua'); 



function submit(){
    var post = {
        rcvrName : rcvrName.value,
        dua : dua.value,
        likes : 0
    }

    rcvrName.value = '';
    dua.value = '';
    database.child('posts').push(post);
}

function goToFeeds(){
    location = 'feeds.html';
}

function logout(){
    firebase.auth().signOut().then(function(){
        location = 'login.html';
    }, function(error){
        console.error('Sign Out Error',error);
    })
}

// var unsubscribe = firebase.auth().onAuthStateChanged(function (anything) {
   

//     if(user.name===null){
//     location = 'login.html';
// }

// });

//     unsubscribe();

firebase.auth().onAuthStateChanged(user => {
  if(!user) {
    window.location = 'login.html'; //If User is not logged in, redirect to login page
  }
});


document.addEventListener('contextmenu', event => event.preventDefault());