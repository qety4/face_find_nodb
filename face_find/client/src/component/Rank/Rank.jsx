import React from 'react'

const Rank = ({Name,Entries})=>{
    return (
        <div className=''>
            <div className='center white f4'>
                User {Name}, your amount of entries is 
            </div>
            <br />
            <div className='center white f2'>
                #{Entries}
            </div>
        </div>
    )
}
export default Rank