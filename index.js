const http = require('http')
const fs = require('fs')
const path = require('path')
const dataPath = path.join(__dirname, 'data')

const server = http.createServer((req, res) => {
    if (req.url=='/' && req.method == 'GET'){
        getJokes(req, res)
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