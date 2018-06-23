// YOUR CODE HERE:

let app = {};
app.init = function() {
  app.fetch();
  //setInterval(app.fetch(), 5000);
};

const currentChats = [];
let username;

app.send = function(message) {
  
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
}

function addChatroom(text) {
  var x = document.getElementById('chatroomMenu');
  var option = document.createElement('option');
  option.text = text;
  x.add(option);
  return option;
}

function selectChatroom(chatroom) { //onclick
  //var selectedRoom = chatroom.text();
  // $(`select>option:eq(4)`).prop('selected', true);
  //selectElement.text = selectedRoom;
  //app.fetch();
  populateChatsByChatroom(chatroom);
}

function isMalicious(tweet) {
  for (let key in tweet) {
    if (tweet[key].includes('<script>') || tweet[key].includes('src')) {
        return true;
    }
  }
  return false;
}

app.fetch = function(){
  $(".postedMessages").remove();
  
  $.ajax({
  //dataType: "JSON",
  url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
  type: "GET",
  //order: 'createdAt',
  data: 'order=-createdAt',
  // where : {"createdAt":{"$n":2018}},
  // contentType: ,
  success: function(data) {
    //console.log(data.results);
    window.currentChats = data.results;
    let approvedMessages = [];
    
    let i = 0;
    while (approvedMessages.length < 20) {
      
      // for (let chat of window.currentChats) 
      if (!isMalicious(window.currentChats[i])) {
        approvedMessages.push(window.currentChats[i]);
      }
      i++;
    }
      
    for (let message of approvedMessages) {    
      // $('#chats').append(`<div class="postedMessages">${JSON.stringify(message)}</div>`);
      
          $('#chats').append(`<div class="postedMessages">
          <button class="username">${message.username}</button>
          <span>${message.text}</span>
          <div>chatroom:</div>
          <button class = "room">${message.roomname}</button>
          <div>sent at ${message.createdAt.substring(0, 19)}</div>
          </div>`);
      
      
      //${JSON.stringify(message)}
      
    }
  }
});
}


function populateChatsByFriends(username) {
  $(".postedMessages").remove(); //MAYBE DELETE
  
  let selectedFriendChats = window.currentChats.filter(function(chat) {
    return chat.username === username;
  });
  
  for (let message of selectedFriendChats) {
      if (!isMalicious(message)) {
        
          $('#chats').append(`<div class="postedMessages">
          <button class="username">${message.username}</button>
          <span>${message.text}</span>
          <div>chatroom:</div>
          <button class = "room">${message.roomname}</button>
          <div>sent at ${message.createdAt.substring(0, 19)}</div>
          </div>`);
    }
  }
  
}

function populateChatsByChatroom(chatroom) {
  $('.postedMessages').remove(); //MAYBE DELETE
  
  let chatsByRoomname = window.currentChats.filter(function(chat) {
    return chat.roomname === chatroom;
  });
  
  for (let message of chatsByRoomname) {
      if (!isMalicious(message)) {
        $('#chats').append(`<div class="postedMessages">
          <button class="username">${message.username}</button>
          <span>${message.text}</span>
          <div>chatroom:</div>
          <button class = "room">${message.roomname}</button>
          <div>sent at ${message.createdAt.substring(0, 19)}</div>
          </div>`);
    }
  }
}

//Creating Usernames
  //initial load shows alert w/ prompt
    //user enters username
      //store in array of users/assign other properties
        //push to server?
      //edit url to reflect name
  //display username under header, next to text field & send button

$(document).ready(function() {
  
  $('#sendMessage').on('submit', function(event) {
    event.preventDefault();
    let message = {}
    message.username = 'Dr. Hannibal Lecter'; // CHANGE ME
    message.text = $(this).closest('form').find('#inputPosts').val();
    message.roomname = 'Asylum';
    app.send(message);
  
  });
  
    // ONCLICK HANDLER FOR SUBMIT BUTTON TO RUN SELECTCHATROOM
  $('#createRoom').on('submit', function(event) {
    event.preventDefault();
    let roomname = $(this).closest('form').find('#newChatroom').val();
    //let option = addChatroom(roomname);
    addChatroom(roomname);
    
    selectChatroom(roomname);
    // enter new chatroom
      // apply chatroom
      //filter messages by room name
    
  });
  
  $(document).on('click',".username",function(event) {    
    event.preventDefault();
    let newFriend = $(this).text()
    addFriendToList(newFriend) 
    selectFriend(newFriend)
    // apply chatroom
      //filter messages by room name
    
  });
  
  $(document).on('click',".room",function(event) {
    event.preventDefault();
    let room = $(this).text()
    selectChatroom(room) 
    // apply chatroom
      //filter messages by room name
    
  });
  
  function addFriendToList (friendName){
    var x = document.getElementById('friends');
    var option = document.createElement('option');
    option.text = friendName;
    x.add(option);
    return option;
  }
  
});

function selectFriend(friend) { //onclick
  //app.fetch();
  populateChatsByFriends(friend);
}
  
  
app.init();
  

  
  
  
  