var database = firebase.database().ref('/');
var feeds = document.getElementById('feeds');
var currentUser = JSON.parse(localStorage.getItem('currentUser'));

database.child('posts').on('child_added', function (snapshot) {

    var obj = snapshot.val();
    obj.id = snapshot.key;

    render(obj);
});

database.child('comments').on('child_added', function (snapshot) {

    var obj = snapshot.val();

    renderComment(obj);
});


function render(dua){
    var mainDiv = document.createElement('DIV');
    mainDiv.setAttribute('id', dua.id);
    mainDiv.setAttribute('class', 'card');

    var div = document.createElement('DIV');
    div.setAttribute('class', 'card-body');

    var span = document.createElement('SPAN');
    var rcvrNameTag = document.createElement('H4');
    rcvrNameTag.setAttribute('class','card-title');
    var rcvrName = document.createTextNode('Receiver Name : ' + dua.rcvrName + ' ');
    rcvrNameTag.appendChild(rcvrName);

    var duaTag = document.createElement('H6');
    duaTag.setAttribute('class','card-text');
    var duaTxt = document.createTextNode('Dua : ' + dua.dua);
    duaTag.appendChild(duaTxt);

    span.appendChild(rcvrNameTag);
    span.appendChild(duaTag);
    div.appendChild(span);

    var commentBox = document.createElement('INPUT');
    commentBox.setAttribute('class','form-control');
    commentBox.setAttribute('id' , 'comment' + dua.id);

    var btn = document.createElement('BUTTON');
    btn.setAttribute('class','btn btn-primary');
    var btnTxt = document.createTextNode('Comment');
    btn.onclick = function(){
        submitComment(dua.id);
    }

    
    div.appendChild(commentBox);
    div.appendChild(btn);

    btn.appendChild(btnTxt);
/////////////////////////////////////////////
    var like = document.createElement('BUTTON');
    like.setAttribute('class','btn btn-primary');
    like.setAttribute('id' , 'like' + dua.id);
    var likeTxt = document.createTextNode('Like');
    like.onclick = function(){
        likeUpdate(dua);
    }

    var count = document.createElement('SPAN');
    count.setAttribute('class','badge');
    count.setAttribute('id' , 'count' + dua.id);
    var countTxt = document.createTextNode(dua.likes);
    count.appendChild(countTxt);
    like.appendChild(count);

    

    like.appendChild(likeTxt);
    div.appendChild(like);


    var commentsDiv = document.createElement('DIV');

    mainDiv.appendChild(commentsDiv);
    mainDiv.appendChild(div); 
    feeds.appendChild(mainDiv);



   

}

function submitComment(duaId){
    var commentInput = document.getElementById('comment' + duaId);
    var commentObj = {
        commenter : currentUser.name,
        comment : commentInput.value,
        duaId : duaId
    }
    database.child('comments').push(commentObj);
    commentInput.value = '';
}


function renderComment(comment){
    var duaDiv = document.getElementById(comment.duaId);
    var commentsDiv = duaDiv.lastElementChild;
    var card = document.createElement('DIV');
    card.setAttribute('class','card commentCard');

    var cardBody = document.createElement('DIV');
    cardBody.setAttribute('class','card-body');

    var senderTag = document.createElement('H4');
    senderTag.setAttribute('class','card-title');
    var sender = document.createTextNode(comment.commenter);
    senderTag.appendChild(sender);

    var commentTag = document.createElement('H6');
    commentTag.setAttribute('class','card-text');
    var commentText = document.createTextNode(comment.comment);
    commentTag.appendChild(commentText);
    
    cardBody.appendChild(senderTag);
    cardBody.appendChild(commentTag);

    card.appendChild(cardBody);

    commentsDiv.appendChild(card);
}




function submitComment(duaId){
    var commentInput = document.getElementById('comment' + duaId);
    var commentObj = {
        commenter : currentUser.name,
        comment : commentInput.value,
        duaId : duaId
    }
    database.child('comments').push(commentObj);
    commentInput.value = '';
}


function likeUpdate(dua){
     var likeUpdate = {
         likes : dua.likes++
    }
    database.child('posts/' + dua.id).update(likeUpdate);

}


database.child("posts").on("child_changed", function(snapshot){    // updating at ui
    var getCount = document.getElementById('count'+snapshot.key);
    getCount.innerText = snapshot.val().likes;
})


function logout(){
    firebase.auth().signOut().then(function(){
        location = 'login.html';
    }, function(error){
        console.error('Sign Out Error',error);
    })
}


function goToHome(){
    location = 'home.html';
}



firebase.auth().onAuthStateChanged(user => {
  if(!user) {
    window.location = 'login.html'; //If User is not logged in, redirect to login page
  }
});



document.addEventListener('contextmenu', event => event.preventDefault());