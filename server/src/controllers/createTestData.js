const bcrypt = require('bcryptjs');

/* Generates a sentence of call defined lengh.
Returns a string.
*/
function createSentence(lengh) {
  const words = ['Rock ', 'Sound ', 'Brian ', 'Lip ', 'Trip ', 'of ', 'Family ', 'Hit ', 'Jack ', 'Star ',
  'Donation ', 'is ', 'Close ', 'Here we Go ', 'Great ', 'Moment ', 'Squash ', 'Secret ', 'Board ', 'Empire '];

  let sentence = "";

  for (let index = 0; index < lengh; index++) {
    sentence = sentence.concat(words[Math.floor((Math.random() * 20))]);
  }

  return sentence.trim();
}

/*Creates a review object to be used in test or to start with. false = review with only rating, true = review with rating and text, 
all text is random generated with function createSentence.
Returns a Review Object.
*/
function creatAlbumReviewTest(text) {
  let bodyText;

  if (text) {
    bodyText = createSentence(10);
  }
  else {
    bodyText = "";
  }
  
  const reviewTest = {
     rating: Math.floor((Math.random() * 10) + 1), 
     body: bodyText 
  };

  return reviewTest;
}

/*Creates a album object to be used in test or to start with. Populated with 10 reviews (2 with text), 
all text is random generated with function createSentence.
Returns a Album Object.
*/
function createAlbumToTest() {
   let reviewsTest = [];

   for (let index = 0; index < 8; index++) {
    reviewsTest.push(creatAlbumReviewTest(false));     
   }
   reviewsTest.push(creatAlbumReviewTest(true));
   reviewsTest.push(creatAlbumReviewTest(true)); 

  const albumTest = {
    title: createSentence(3),
    artist: createSentence(2),
    genre: createSentence(1),
    releaseYear: Math.floor((Math.random() * 120) + 1900),
    reviews: reviewsTest,
  };

  return albumTest;
}

/* Creates a call defined amount of Albums with reviews. 
returns a array with Album objects
*/
function createAlbumsToTest(numOfAlbums) {
  let Albums = [];
  for (let index = 0; index < numOfAlbums; index++) {
    let album = createAlbumToTest();
    Albums.push(album);
  }

  return Albums;
}

/* Creates 3 users 
*/
function createUsersToTest(){
  let users = [
    {
      name: "John",
      password: bcrypt.hashSync("Exit4TheMatrix2Free", 10)
    },
    {
      name: "Ayeri",
      password: bcrypt.hashSync("lestabbystab", 10)
    },
    {
      name: "Pwnster",
      password: bcrypt.hashSync("1234", 10)
    }
  ]

  return users;
}

module.exports = {
  createAlbumsToTest,
  createUsersToTest
}