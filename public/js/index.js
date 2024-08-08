console.log('Hello from front End')

import axios from 'axios';

const form = document.querySelector('form');
const textbox = document.querySelector('#urlInput');
const displayOutput = document.querySelector('.display_output');
const outputLink = document.querySelector('h2 > p');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log(`The url you entered is : ${textbox.value}`)
    const res = await axios({
        method: 'post',
        url:`/api/v1/shorten`,
        data: {
            url: textbox.value,
        }
    });
    console.log(res)
    if (res.data.status === 'success') {
        displayOutput.style.visibility = 'visible';
        outputLink.innerHTML = `<a href="/s/${res.data.string}">127.0.0.1/s/${res.data.string}</a>`
        document.getElementById('copyButton').addEventListener('click', async function() {
            const textToCopy = res.data.shortenedUrl
            await navigator.clipboard.writeText(textToCopy);
        });
    }else{
        displayOutput.innerHTML = `The url is already shortened or something went wrong.. Check History and Try again`
    }
});
