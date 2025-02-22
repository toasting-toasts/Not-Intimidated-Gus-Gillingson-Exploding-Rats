const http = require('http')
const fs = require('fs')
const path = require('path')
const dataPath = path.join(__dirname, 'data')
const url = require('url')

const server = http.createServer((req, res) => {
    if (req.url=='/jokes' && req.method == 'GET'){
        getJokes(req, res)
    }
    if (req.url=='/jokes' && req.method == 'POST'){
        postJoke(req, res)
    }
    if (req.url.startsWith('/like')){
        like(res, req)
    }
    if (req.url.startsWith('/dislike')){
        dislike(res, req)
    }
})
server.listen(3000)

function getJokes(req, res){
    let dir = fs.readdirSync(dataPath)
    let jokes=[]

    for(let i=0;i<dir.length;i++){
        let file = fs.readFileSync(path.join(dataPath,`${i}.json`))
        let jokejson = Buffer.from(file).toString()
        let joke = JSON.parse(jokejson)
        joke.id=i
        jokes.push(joke)
    }
    res.end(JSON.stringify(jokes))
}
function postJoke(req, res){
    let data = ''
    req.on(data, function(chunk){
        data += chunk
    })
    req.on(end, function(){
        let joke = JSON.parse(data)
        joke.likes = 0
        joke.dislikes = 0

        let dir = fs.readFileSync(dataPath)
        let filename = dir.length+length
        let filePath = path.join(dataPath, filename)
        fs.writeFileSync(filePath, JSON.stringify(joke))
        res.end()
    })
}

function like(req, res){
    const params = url.parse(req.url, true).query
    let id = params.id
    console.log(id)
    if (id){
        let filePath = path.join(dataPath, id+'.json')
        let file = fs.readFileSync(filePath)

        let jokeJSON = Buffer.from(file).toString()
        let joke = JSON.parse(jokeJSON)

        joke.likes ++

        fs.writeFileSync(filePath, JSON.stringify(joke))
    }
    res.end()
}

function dislike(req, res){
    const params = url.parse(req.url, true).query
    let id = params.id
    console.log(id)
    if (id){
        let filePath = path.join(dataPath, id+'.json')
        let file = fs.readFileSync(filePath)

        let jokeJSON = Buffer.from(file).toString()
        let joke = JSON.parse(jokeJSON)

        joke.dislikes ++

        fs.writeFileSync(filePath, JSON.stringify(joke))
    }
    res.end()
}

