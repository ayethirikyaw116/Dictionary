const container = document.querySelector(".container");
const searchInput = document.querySelector("input");
const infoText = document.querySelector(".info_text");
const volumeIcon = document.querySelector(".icon_volume");
let audio;

// Data 
function data(result, word) {
  if (result.title) {
    infoText.innerHTML = `Can't find definition for <span>"${word}"</span> !`;
    infoText.style.color = "red";
  } else {
    console.log(result);
    container.classList.toggle("active");
let definitions = result[0].meanings[0].definitions[0];
phonetics = `${result[0].meanings[0].partOfSpeech} / ${result[0].phonetics[1].text} /`;
   
document.querySelector(".word p").innerText = result[0].word;
    document.querySelector(".word span").innerText = phonetics;
    document.querySelector(".mean span").innerText = definitions.definition;
    document.querySelector(".example span").innerText = definitions.example || "-";
    audio = new Audio(result[0]?.phonetics[1]?.audio);
}
}

// API Function
function fetchApi(word) {
  const apiResult = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
  infoText.style.color = "black";
  fetch(apiResult)
    .then((response) => response.json())
    .then((result) => data(result, word));
}

// Click and Enter 

volumeIcon.addEventListener("click", () => {
  console.log(audio);
  audio.play();
});

searchInput.addEventListener("keyup", (e) => {
  let word = e.target.value.trim();
  if (e.key === "Enter" && word) {
    fetchApi(word);
  }
})
