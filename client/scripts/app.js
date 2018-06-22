// YOUR CODE HERE:
// var message = {
//   username: 'Will',
//   text: 'Hello from the other side',
//   //roomname: '4chan'
// };

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


function getNewMessages (){
  $(".postedMessages").remove();
  
  $.ajax({
  //dataType: "JSON",
  url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
  type: "GET",
  //order: 'createdAt',
  //data: { 'updatedAt': '2017-02-08T21:17:18.510Z'},
  where : {"createdAt":{"$n":2018}},
  // contentType: ,
  success: function(data) {
    //console.log(data.results);
    let array = data.results.reverse();
    let approvedMessages = [];
    
    for (let i = 0; i < 20; i++) {
      let malicious = false;
      for (let key in array[i]) {
        if (array[i][key].includes('<script>')) {
          malicious = true;
        }
      }
      if (!malicious) {
        approvedMessages.push(array[i]);
      }

    }
    for (let message of approvedMessages) {
        
      $('#chats').append(`<a>${JSON.stringify(message)}</a>`);
    }
    $("a").addClass("postedMessages")
    // return data.results;
    
    // $('#chats').append(JSON.stringify(data));
    }
  });
}
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
  
  
  
  
  
  
  
  
  
  
  
  