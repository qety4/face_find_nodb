import React from 'react'
import './Particles.css'
import ParticlesBg from 'particles-bg'

const Particles =()=>{
    return(
        <div>
            <ParticlesBg color="#ff0010" num={50} type='cobweb' bg={true} className="particles"/>

        </div>
    )
}

export default Particles