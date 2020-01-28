const axios = require('axios')
const Dev = require('../models/Dev')
const ParseStringAsArray = require('../utils/ParseStringAsArray')
const { findConnections, sendMessage } = require('../websocket')

module.exports = {
    async index (req, res) {
        const devs = await Dev.find()

        return res.json(devs)
    },

    async store (req, res) {
        const { github_username, techs, latitude, longitude } = req.body

        let dev = await Dev.findOne({ github_username })

        if (dev){
            return res.status(400).json("User already exists")
        }
    
        const apiResponse = await axios.default.get(`https://api.github.com/users/${github_username}`)
    
        let { name = login, avatar_url, bio } = apiResponse.data
    
        const techsArray = ParseStringAsArray(techs)
    
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }
    
        dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location
        })

        const sendSocketMessageTo = findConnections(
            { latitude, longitude },
            techs
        )
        
        sendMessage(sendSocketMessageTo, 'new-dev', dev)
        
        return res.status(201).json(dev)
    },

    async delete(req, res) {
        const { id } = req.params

        const dev = await Dev.findById(id)

        if(!dev) {
            return res.status(400).json("Dev not found")
        }

        await Dev.deleteOne({
            _id: {
                $eq: id
            }
        })

        return res.status(200).json({})
    }
}