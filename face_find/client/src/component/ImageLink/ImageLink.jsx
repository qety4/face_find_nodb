import React from 'react'


const ImageLinkForm = ({onChange, onSubmit}) => {
    return (
        <div>
            <p className='center f3'>
                This Software will detect faces in your pictures.
            </p>
            <div className='center'>
                <div className='center form pa4 br3 shadows-5'>
                    <input className='f4 pa2 w-70 center' type="text" onChange={onChange}/>
                    <button 
                    className='w-30 grow f4 ph3 pv2 dib white bg-light-purple'
                    onClick={onSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm