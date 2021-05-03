import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  return(    
    <div id="toy-collection">
      {props.toys.map((toy)=> {
        return <ToyCard toy={toy} key={toy.id} donateToy={props.donateToy} likeToy={props.likeToy}/>
      })}
    </div>    
  )
}

export default ToyContainer;
