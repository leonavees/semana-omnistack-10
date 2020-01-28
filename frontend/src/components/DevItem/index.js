import React from 'react'

import './styles.css'

function DevItem({ dev, removeDev }) {

    return (
        <li className="dev-item">
            <button onClick={removeDev} type="button" className="close">
                <span style={{display: "flex", float: "inline-end"}}>&times;</span>
            </button>          
            <header>
                <img src={dev.avatar_url} alt={dev.name}/>
                <div className="user-info">
                    <strong>{dev.name}</strong>
                    <span>{(dev.techs.join(', '))}</span>
                </div>
            </header>
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`}>Acessar perfil do GitHub</a>
        </li>
    )
}

export default DevItem