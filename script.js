const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const apiKey = '214bb1b4ba6c44119431ec8e13fa2441'

function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function textToSpeech(joke) {
  console.log('tell me', joke)
          VoiceRSS.speech({
            key: apiKey,
            src: joke,
            hl: 'en-us',
            r: 0,
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false
        });
}
　

// GET jokes
async function getJokes() {
  let joke = '';
  const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // if (data.setup) {
    //   joke = `${data.setup} ... ${data.delivery}`
    // } else {
    //   joke = data.joke;
    // }
    // Text-to-Speech
    data.setup
    ? (joke = `${data.setup} ... ${data.delivery}`)
    : (joke = data.joke);
    textToSpeech(joke);
    toggleButton();
  } catch (error) {
    console.log('whoops', error)
  }
}

// event Listener
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
