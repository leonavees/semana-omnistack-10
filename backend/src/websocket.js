const socketio = require('socket.io')

const ParseStringAsArray = require('./utils/ParseStringAsArray')
const CalculateDistance = require('./utils/CalculateDistance')

let io
const connections = []

exports.setupWebSocket = (server) => {
    io = socketio(server)

    io.on('connection', socket => {
        const { latitude, longitude, techs } = socket.handshake.query

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude)
            },
            techs: ParseStringAsArray(techs)
        })
    })
}

exports.findConnections = (coordinates, techs) => {
    return connections.filter(connection => {
        return CalculateDistance(coordinates, connection.coordinates) < 10
            && connection.techs.some(item => techs.includes(item))
    })
} 

exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data)
    })
}