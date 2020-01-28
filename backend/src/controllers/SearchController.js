const Dev = require('../models/Dev')
const ParseStringAsArray = require('../utils/ParseStringAsArray')

module.exports = {
    async index(req, res) {
        // Buscar todos os devs num raio de 10km
        // Filtrar por tecnologias

        const { latitude, longitude, techs } = req.query

        let devs

        if (techs != ''){
            const techsArray = ParseStringAsArray(techs)

            devs = await Dev.find({
                techs: {
                    $in: techsArray
                },
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [longitude, latitude]
                        },
                        $maxDistance: 10000
                    }
                }
            })
        }
        else{
            devs = await Dev.find({
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [longitude, latitude]
                        },
                        $maxDistance: 10000
                    }
                }
            })
        }
    
        return res.json(devs)
    }
}