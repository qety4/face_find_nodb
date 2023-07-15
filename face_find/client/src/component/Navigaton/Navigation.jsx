import React from 'react'


const Navigation = ({Route})=>{

return (
    <nav className='nav'>
        <p  onClick={() => Route('signin')} className='f3 link dim underline pa3 pointer'>Sign Out</p>
    </nav>
)    

}
export default Navigation