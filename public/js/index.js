console.log('Hello from front End')

import axios from 'axios';

const form = document.querySelector('form');
const textbox = document.querySelector('#urlInput');
const displayOutput = document.querySelector('.display_output');


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log(`The url you entered is : ${textbox.value}`)
    const res = await axios({
        method: 'post',
        url:`${process.env.DOMAIN}/api/v1/shorten`,
        data: {
            url: textbox.value,
        }
    });

    if (res.data.status === 'success') {
        displayOutput.innerHTML = res.data;
    }else{
        displayOutput.innerHTML = `The url is already shortened or something went wrong.. Check History and Try again`
    }
});
