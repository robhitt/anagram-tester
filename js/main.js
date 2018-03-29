"use strict";

window.addEventListener('load', app);

function app() {
  let form = document.querySelector("#anagram-form");
  let anagramResult = document.querySelector(".anagram-result");
  form.addEventListener("submit", checkInputForAnagram);

  function checkInputForAnagram(event) {
    event.preventDefault();

    let word1 = event.target[0].value;
    let word2 = event.target[1].value;
    
    if (word1.replace(/ /g,'').length !== word2.replace(/ /g,'').length) {
      anagramResult.innerHTML = `I'm sorry, <span class="bold">${word1}</span> and <span class="bold">${word2}</span> are not anagrams.`;
      anagramResult.classList.remove('anagram-result-hidden');
      return;
    }

    let word1arr = event.target[0].value.replace(/ /g,'').toLowerCase().split("");
    let word2arr = event.target[1].value.replace(/ /g,'').toLowerCase().split("");

    let word1Count = createLetterCountObj(word1arr);
    let word2Count = createLetterCountObj(word2arr);
        
    if (checkIfAnagram(word1Count, word2Count)) {
      anagramResult.innerHTML = `Congratualtions, <span class="bold">${word1}</span> and <span class="bold">${word2}</span> are anagrams!`;
      anagramResult.classList.remove('anagram-result-hidden');
    } else {
      anagramResult.innerHTML = `I'm sorry, <span class="bold">${word1}</span> and <span class="bold">${word2}</span> are not anagrams.`;
      anagramResult.classList.remove('anagram-result-hidden');
    }
  }

  function createLetterCountObj(arr) {
    let resultObj = {};

    arr.forEach( letter => {
      if (!resultObj[letter]) {
        resultObj[letter] = 1;
      } else {
        resultObj[letter] += 1;
      }
    });
    console.log(resultObj);
    
    return resultObj;
  }

  function checkIfAnagram(word1count, word2count) {
    for (let prop in word1count) {
      if (word1count[prop] !== word2count[prop]) {
        return false;
      }
    }

    return true;
  }
}