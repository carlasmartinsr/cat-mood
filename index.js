import { dataCats } from "/data.js";

const emotionBtns = document.getElementById("emotion-btns");
const getImageBtn = document.getElementById("get-image-btn");
const memeModal = document.getElementById("meme-modal");
const memeModalInner = document.getElementById("meme-modal-inner");
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn");
const gifsOnlyOption = document.getElementById("gifs-only-option");
const main = document.getElementsByTagName("main");

emotionBtns.addEventListener("click", highlightCheckedOption);

memeModalCloseBtn.addEventListener("click", closeModal);

window.addEventListener("click", windowOnClick);

getImageBtn.addEventListener("click", renderCat);

function highlightCheckedOption(e) {
  const btnArray = document.getElementsByClassName("btn-emotion");
  for (let btn of btnArray) {
    btn.classList.remove("highlight");
  }
  if (e.target.id !== "emotion-btns") {
    document.getElementById(e.target.id).classList.add("highlight");
  }
}

function closeModal() {
  memeModal.style.display = "none";
}

function windowOnClick(event) {
  if (event.target === main[0]) {
    memeModal.style.display = "none";
  }
}

function renderCat() {
  const catImg = getImgCats();
  memeModalInner.innerHTML = `<img 
        class="cat-img" 
        src="./img/${catImg}"
        alt="Cat making our days better"
        >`;
  memeModal.style.display = "flex";
  memeModal.classList.toggle("show-modal");
}

function getImgCats() {
  const isGif = gifsOnlyOption.checked;
  if (document.getElementsByClassName("highlight")[0]) {
    const emotionSelected =
      document.getElementsByClassName("highlight")[0].value;
    for (let cat of dataCats) {
      if (cat.emotionWord === emotionSelected) {
        if (isGif) {
          return cat.gif;
        } else {
          return cat.image;
        }
      }
    }
  }
}

function getEmotions(cats) {
  const emotionArray = [];
  for (let cat of cats) {
    emotionArray.push(cat.emotionWord);
  }
  return emotionArray;
}

function getEmotionsImgs(cats) {
  const emotionImgArray = [];
  for (let cat of cats) {
    emotionImgArray.push(cat.emotionImage);
  }
  return emotionImgArray;
}

function renderEmotionsBtn(cats) {
  let btnItems = ` `;
  const emotions = getEmotions(cats);
  const emotionsImgs = getEmotionsImgs(cats);

  emotions.forEach((emotion, index) => {
    const emotionImg = emotionsImgs[index];
    btnItems += `
      <button 
       type="submit" 
       class="btn-emotion"
       value ="${emotion}""
       id ="${emotion}">
       <img src="img/${emotionImg}"
       id ="${emotion}"
       alt="A ${emotion} Cat">
       ${emotion}
      </button>`;
  });
  emotionBtns.innerHTML = btnItems;
}

renderEmotionsBtn(dataCats);
