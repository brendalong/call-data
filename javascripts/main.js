//XHR
var dataRequest = new XMLHttpRequest();
// dataRequest.addEventListener("progress", updateProgress);
dataRequest.addEventListener("load", dataRequestComplete);
dataRequest.addEventListener("error", dataRequestFailed);
// dataRequest.addEventListener("abort", transferCanceled);

function dataRequestComplete(event) {
  var data = JSON.parse(event.target.responseText);
  console.log("the color data:", data);
}

function dataRequestFailed(event) {
  console.log("Oops, an error occurred while transferring the file.");
}
//open() - Initializes a request.
dataRequest.open("GET", "color.json");
console.log("go get the data");

// send() Sends the request. 
//If the request is asynchronous (which is the default), 
//this method returns as soon as the request is sent. 
//Useful with progress
dataRequest.send(); //adds it to the event loop. 


//*****************************************************



///.ajax
function functionIWantjQueryToExecute(songList) {
  console.log("who is this", songList);
  if(songList.songs){
    for (var i = 0; i < songList.songs.length; i++) {
      var currentSong = songList.songs[i];
      $("#list-of-songs").append("<h1>"+ currentSong.title +"</h1>");
      $("#list-of-songs").append("<div>Performed by " + currentSong.artist + "</div>");
      $("#list-of-songs").append("<div>On the album " + currentSong.album + "</div>");
    }
  }
}

//asynchronous having each operation started only after the preceding operation is completed.
//parameters https://www.w3schools.com/jquery/ajax_ajax.asp
$.ajax({
  url:"songs.json"
}).done(functionIWantjQueryToExecute);


//with error
// $.ajax({
// 	url: "wrongfile.txt", 
// 	error: function(xhr){
//             alert("An error occured: " + xhr.status + " " + xhr.statusText);
//         }
// }).done(function(){console.log("another function")});




///// more complex
// multiple call backs going on - got to be a better way - Promises
function loadImage(url, callback){
  var image = new Image();

  image.onload = function(){
    callback(null, image);
  };

  image.onerror = function(){
    callback(new Error('Could not load image at ' + url));
  };

  image.src = url;
};


loadImage("images/one.jpg", function(err, image1){
  if (err) throw err;

    loadImage("images/two.jpg", function(err, image2){
      if (err) throw err;

      loadImage("images/three.jpg", function (err, image3){
        if (err) throw err;

        var images = [image1, image2, image3];
        console.log("All images loaded", images);
      })
    })
});