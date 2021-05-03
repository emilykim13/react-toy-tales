import React from 'react'
import ToyCard from './ToyCard'

// functional
const ToyContainer = (props) => {
  return(
    <div id="toy-collection">
      {props.toys.map((toy)=> {
        return <ToyCard toy={toy} key={toy.id} likeToy={props.likeToy} donateToy={props.donateToy}/>
      })}
    </div>
  )
}
export default ToyContainer