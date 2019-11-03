const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode  = require('./Utils/geocode')
const forecast = require('./Utils/forecast')

//get the instance of expressjs
const app = express()
const port = process.env.PORT || 3001

//getting all the paths to views, partials, public folders
const pathToPublicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//serve static assets
app.use(express.static(pathToPublicDirectory))
//app.use(express.static('../public'))

//configuring various app properties and hbs properties
app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather Home',
        lastVisited: '2019/11/01',
        name: 'Vinay'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        name: 'Vinay',
        createdOn: '2019/10/18',
        title: 'About Page'
    })
})


app.get('/help',(req,res) => {
    res.render('help',{
        helpMessage: 'This is some thing helpful',
        title: 'Help page',
        name: 'Vinay'
    })
})

app.get('/weather', (req,res) => {
   
   const address = req.query.address
    if(!address)
    {
      return  res.send({
            error: 'You have to give address manditorily'
        })
    }

        geocode(address, (error,{ latitude, longitude, location} = {}) => {
            if(error)
            {
                return res.send({
                    error
                })
            }
            forecast(latitude, longitude,(error, forecastData) => {
                if(error){
                    return res.send({
                        error
                    })
                }
                res.send({
                    forecastData: forecastData,
                    address: address,
                    location: location
                })
            })
        })
})

app.get('/help/*', (req,res)=>{
    res.render('errorPage', {
        errorMessage: 'Help article not found!',
        name: 'Vinay',
        title: '404'
    })
})  

app.get('*', (req,res) =>{
    res.render('errorPage',{
        errorMessage: 'Page not found',
        name: 'Vinay',
        title: '404'
    })
})

app.listen(port, () => {
    console.log('Node server has started at port 3001')
})