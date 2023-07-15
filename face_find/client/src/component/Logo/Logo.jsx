import React from 'react'
import Tilt from 'react-parallax-tilt';
import './logo.css'
import face from './face.png'

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className='Tilt br2 shadow-2' perspective={100}>
                    
                    <div className='Tilt-inner'>
                        <img src={face} alt="goofy" />
                        <p className='tc'>FACE_FIND</p>
                    </div>
            </Tilt>
        </div>
    )
}
export default Logo