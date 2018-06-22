// YOUR CODE HERE:
// var message = {
//   username: 'Will',
//   text: 'Hello from the other side',
//   //roomname: '4chan'
// };

// $.ajax({
//   // This is the url you should use to communicate with the parse API server.
//   url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
//   type: 'GET',
//   data: JSON.stringify(message),
//   contentType: 'application/json',
//   success: function (data) {
//     console.log('chatterbox: Message sent');
//   },
//   error: function (data) {
//     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to send message', data);
//   }
// });



$.ajax({
  //dataType: "JSON",
  url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
  type: "GET",
  // data: ,
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
      $('#chats').append(`<div>${JSON.stringify(message)}</div>`);
    }
    
    // return data.results;
    
    // $('#chats').append(JSON.stringify(data));
  }
});

console.log(array);

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