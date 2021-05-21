import React from 'react';

function card(props){
    return(
        <div className='card'>
            {props.children}
        </div>
    )
}

export default card;