const request = require('request')

const geocode = (address, callback) => {

    const urlForGeocoding = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidmluYXlhZGlnYSIsImEiOiJjazJib29hZzQyMDl2M2NvMDRhZmg5Y3lvIn0.JcUxvFwpOZ_gKYS0iJB2yA'

    request({url: urlForGeocoding, json: true},(error,response) => {
        if(error){
            callback('Unable to connect to the services!', undefined)
        }
        else if(response.body.message){
            callback('You have not entered the address', undefined)
        }
        else if(response.body.features.length === 0){
            callback('You have entered invalid address. Please enter valid one..', undefined)
        }
        else{
            //console.log(response.body.features[0])
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode