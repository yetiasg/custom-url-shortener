'use strict'


const PAGE_URL = 'localhost:8080/'
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

const redirect = async () =>{
  if(window.location.href.includes(`${PAGE_URL}#`)){
    try{
      const {originalURL} = await getJSON(`${SERVER_URL}/originalUrl`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({newUrl: window.location.href})
      });
      console.log(originalURL)
      window.location.href = originalURL;
    }catch (error){
      console.log(error);
    }
  }
};
redirect()

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

