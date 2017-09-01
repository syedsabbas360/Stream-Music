// Element im working with

let display = document.querySelector('#display');
let textValue = document.querySelector('#TextValue').value;
let searchLogo = document.querySelector('.searchLogo');
let token = '?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f&q=';



//clear out input from user and call getInfo function to fetch API
  function searchSong(textValue){
  console.log("Fired")

    display.textContent = ""

    getInfo(textValue);


};


// fetch API pass down artist event and stores users ID

function getInfo(event){
  console.log("Fired 2")
fetch(`http://api.soundcloud.com/users/${token}${event}`) //API address used to grab info
      .then( function(response) {
        return response.json() //returns API in Json format
      }).then(function(data){

        let userID = data[0].id;

        TrackInfo(userID);

      });
};


// Another Fetch request that uses the ID to search for unique track

function TrackInfo(userID){

  fetch(`http://api.soundcloud.com/users/${userID}/tracks/${token}`)
    .then( function(response){
      return response.json()
    })
    .then( function(data){
      moreInfo(data)
    })
}




// fill in dynamic html song-cards with fetch values

function moreInfo(data){
  displayResults="";
  for(i=0; i<data.length; i++){
    let title = data[i].title;
    let artwork = data[i].artwork_url;
    let userName= data[i].user.username;
    let stream = data[i].stream_url


    let id = data[i].id

    displayResults += `
                  <div class="w3-card-4"  type="click" value=${id} id=${id} onclick=audio(${id})>
                  <img class="albumArt" data-song-link="${stream}" src="${artwork}"/>
                  <p> <b>Title: </b>  ${title}</p>
                  <p> <b>Artist: </b>  ${userName}</p>
                  </div>
                  `
  }

   display.insertAdjacentHTML('afterbegin', displayResults);
}



// querySelect audio tag give src attribute that adds + stream link API

function audio(id){

  let audioSource = document.querySelector("audio");

  audioSource.src = "https://api.soundcloud.com/tracks/"+id+"/stream?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f"

}
