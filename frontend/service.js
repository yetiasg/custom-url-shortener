'use strict'

// const PAGE_URL = 'http://127.0.0.1:5500/'
const PAGE_URL = 'http://127.0.0.1:5500/'


const redirect = () =>{
  if(window.location.href.includes(PAGE_URL)){
    const urlValue = window.location.href.replace(PAGE_URL, '');
    console.log(urlValue)
  }
};

redirect()

const SERVER_URL = 'http://localhost:3000';

const getJSON = async (url, options) => {
  try{
    const response = await fetch(url, options);
    if(!response.ok) return;
    return await response.json();
  }catch (error) {
    console.log(error);
  }
}

const shortenURL = async(e) => {
  e.preventDefault();
  let originalUrl = document.querySelector('#originalUrl'); 
  if(originalUrl.value === '') return;
  try{
    const {newUrl} = await getJSON(`${SERVER_URL}/shorten`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({originalUrl: originalUrl.value})
    });
    if(!newUrl) return;
    const newUrlDisplay = document.querySelector('#newUrl');
    newUrlDisplay.href = newUrl;
    newUrlDisplay.innerText = newUrl;
    originalUrl.value = ''

    newUrlDisplay.addEventListener('click', function(e) {
      navigator.clipboard.writeText(e.target.innerText);
      alert(`${e.target.innerText} copied`)
    })
  }catch (error){
    console.log(error);
  }
}

const sendBtn = document.querySelector('#sendURL');
sendBtn.addEventListener('click', shortenURL);

