import React, { useState, useEffect } from 'react'
import api from './services/api'

import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

import DevItem from './components/DevItem/index'
import DevForm from './components/DevForm/index'

function App() {
    const [devs, setDevs] = useState([])

    useEffect(() => {
        async function loadDevs() {
            const response = await api.get('/devs')

            setDevs(response.data)
        }

        loadDevs()
    }, [])

    async function handleAddDev(data) {

        try {
            const response = await api.post('/devs', data)

            setDevs([...devs, response.data])
        }
        catch(err){

        }

    }

    async function handleRemoveDev(id){
        try {
            await api.delete(`/devs/${id}`)

            const newDevs = devs.filter(dev => {
                return dev._id !== id
            })

            setDevs(newDevs)
        }
        catch(err){

        }
    }

    return (
        <div id="app">
            <aside>
                <strong>Cadastrar</strong>
                <DevForm onSubmit={handleAddDev}></DevForm>
            </aside>

            <main>
                <ul>
                    { devs.map(dev => (
                        <DevItem key={dev._id} dev={dev} removeDev={() => handleRemoveDev(dev._id)}></DevItem>
                    ))}               
                </ul>
            </main>
        </div>
    )
}

export default App