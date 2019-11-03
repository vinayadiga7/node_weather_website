const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/342ad4a137f2809858ffa93acc9a2a58/'+latitude+','+longitude+'?units=si'

    request({url:url, json:true}, (error, response) => {
       if(error){
           callback('Unable to connect to the services', undefined)
       }
       else if(response.body.error){
           callback('You have entered either invalid latitude or longitude', undefined)
       }
       else{
           callback(undefined, `${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature} degrees out. There is a ${response.body.currently.precipProbability*100}% chance of rain`)
       }
    })
}


module.exports = forecast