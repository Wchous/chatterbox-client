// YOUR CODE HERE:
// var message = {
//   username: 'Will',
//   text: 'Hello from the other side',
//   //roomname: '4chan'
// };

const currentChats = [];

function submitMessage(message) {
  
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

$('button').on('click', function() {
  let message = $(this).closest('form').find('#inputPosts').text();
  submitMessage(message);
  
});

function addChatroom(text) {
  var x = document.getElementById('chatroomMenu');
  var option = document.createElement('option');
  option.text = text;
  a.add(option);
  
}

function selectChatroom(chatroom) { //onclick
  var selectedRoom = chatroom.text();
  populateChats(selectedRoom);
  
}

// need onclick handler to enter chatroom
  // select text from enter/ed or chosen chatroom
  // filter chats by room name
  // display chats
  
  
// ONCLICK HANDLER FOR SUBMIT BUTTON TO RUN SELECTCHATROOM

// $.ajax({
//   //dataType: "JSON",
//   url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
//   type: "GET",
//   // data: ,
//   // contentType: ,
//   success: function(data) {
//     //console.log(data.results);
//     let array = data.results.reverse();
//     let approvedMessages = [];
    
//     for (let i = 0; i < 20; i++) {
//       let malicious = false;
//       for (let key in array[i]) {
//         if (array[i][key].includes('<script>')) {
//           malicious = true;
//         }
//       }
//       if (!malicious) {
//         approvedMessages.push(array[i]);
//       }

//     }
//     for (let message of approvedMessages) {
//       $('#chats').append(`<div>${JSON.stringify(message)}</div>`);
//     }
    
//     // return data.results;
    
//     // $('#chats').append(JSON.stringify(data));
//   }
// });
function isMalicious(tweet) {
  for (let key in tweet) {
    if (tweet[key].includes('<script>') || tweet[key].includes('src')) {
        return true;
    }
  }
  return false;
}


function getNewMessages (){
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
    console.log(`approvedMessages: ${approvedMessages}`);
    
    let i = 0;
    while (approvedMessages.length < 20) {
      
      // for (let chat of window.currentChats) 
        if (!isMalicious(window.currentChats[i])) {
          approvedMessages.push(window.currentChats[i]);
        }
        i++;
    }
      
    
    // for (let i = 0; i < 20; i++) {
    //   if (!isMalicious(array[i])) {
    //     approvedMessages.push(array[i]);
    //   }
    // }
    
    for (let message of approvedMessages) {    
      $('#chats').append(`<div class="postedMessages">${JSON.stringify(message)}</div>`);
    }
  }
});
}

function populateChats(chatroom) {
  
  let chatsByRoomname = window.currentChats.filter(function(chat) {
    return chat.roomname === chatroom;
  });
  
  for (let messages of chatsByRoomname) {
      if (!isMalicious(array[i])) {
        $('#chats').append(`<div class="postedMessages">${JSON.stringify(message)}</div>`);
    }
  }
}


// need onclick handler to call 

//setInterval(getNewMessages, 5000);
getNewMessages();


//Creating Usernames
  //initial load shows alert w/ prompt
    //user enters username
      //store in array of users/assign other properties
        //push to server?
      //edit url to reflect name
  //display username under header, next to text field & send button













// var request = $.get($.ajax[url]);
//console.log(request);

// sample messge format
// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };

// Pseudocode for control flow
// establish connection with api
// ajax request to get data
// check data for malicious code
  // delete/ignore if <script>
  // if not malicious, post message
  
  
  
  
  
  
  
  
  
  
  
  