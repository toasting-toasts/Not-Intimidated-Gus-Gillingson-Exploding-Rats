// const xhr = new XMLHttpRequest()
// xhr.open('GET', 'http://localhost:3000/jokes')
// xhr.send()
// xhr.onload = () => console.log(xhr.response)
let currentLength = 0
const url = 'http://localhost:3000/jokes'
const jokesContainer = document.getElementById('jokes_container')
const jokeForm = document.getElementById('joke_form')
fetch(url)
.then(async (response)=>{
    const jokes = await response.json()
    if (jokes.length){
        jokesContainer.innerHTML=''
        jokes.forEach(joke => {
            jokesContainer.innerHTML += getJokeHTML(joke)
        });
    }
})
function getJokeHTML(joke){
    return `
        <div class="joke">
                <div class="joke__content">
                    ${joke.content}
                </div>
                <div class="joke__footer">
                    <div class="joke__likes">
                        <span>${joke.likes}</span>
                        <button class="joke__btn">
                            <span class="material-symbols-outlined">
                                thumb_up
                            </span>
                        </button>
                    </div>
                    <div class="joke__likes">
                        <span>${joke.dislikes}</span>
                        <button class="joke__btn">
                            <span class="material-symbols-outlined">
                                thumb_down
                            </span>
                        </button>
                    </div>
                </div>
            </div>
    `
}
jokeForm.addEventListener('sumbit', (event)=>{
    event.preventDefault()
    const content = jokeForm.joke.value
    const joke = {
        content, likes:0, dislikes:0, id: currentLength
    }
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(joke)
    })
    .then(response => response.json())
    .then(() => {
        jokesContainer.innerHTML += getJokeHTML(joke);
        currentLength++;
    })
    .catch(error => {
        console.error('Error:', error);
    });
})