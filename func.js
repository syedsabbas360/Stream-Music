let menuLinks = document.querySelectorAll('genre');


function playSomeSound(genre){
  SC.get('/tracks', {
    genres: genre,
  }, function(tracks){
    let random = Math.floor(Math.random() * 49);
    SC.oEmbed(tracks[random].uri, { auto_play: true}, document.querySelector('TextValue'))
  });
}

function getRandomSong(event){
  console.log("Fired getRandomSong")
fetch(`http://api.soundcloud.com/users/${event}`) //API address used to grab info
      .then( function(response) {
        return response.json() //returns API in Json format
      }).then(function(data){
        selectGenre(data)
      });
};
//initilize SoundCloud STK then when the user clicks on one of the links, it will play something on that link

function selectGenre(menulinks){
  //capture all class 'genre' items and loop over them to add onClick handlers
  console.log(menuLinks)

  for (let i=0; i< menuLinks.length; i++){
    let menuLink = menuLinks[i];
    menuLink.onClick = function(event){
      event.preventDefault();
console.log("Firing Func.js")
      return(playSomeSound(menuLink.innerHTML));
    }
  }

}
