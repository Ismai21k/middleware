import express from 'express'


const app = express()
const port = 3000

app.use(middleware)


app.get('/', (req, res) => {
    res.send('Home Page')
});

app.get('/user', athorize, (rep, res) => {
    res.send('User Account')
});

function middleware(req, res, next) {
    console.log(`${new Date().toISOString()}: ${req.originalUrl}`)
    next()
    
};

function athorize(req, res, next) {
    if(req.query.admin === "true"){
        req.admin = true
        next()
    }else{
        res.send("ERRO: You must be an admin")
    }
}


app.listen(port, () => {
    console.log(`Server start at http://localhost:${port}`)

})