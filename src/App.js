import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


const API = "http://localhost:3000/toys"

class App extends React.Component{

  state = {
    display: false,
    display: false,
    toys: []
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  componentDidMount(){
    fetch(API)
    .then(res => res.json())
    .then(json => this.setState({
      toys: json
    }))
  }

  donateToy = (toyToDonate) => {
    console.log(`donateTo Reached with ${toyToDonate.name}`)
    const foundId = this.state.toys.findIndex(toy => toy.id === toyToDonate.id)
    if( foundId !== -1)
    {
      const toysSpliced = [...this.state.toys]
      toysSpliced.splice(foundId,1)
      this.setState({
        toys: toysSpliced
      })
    }
  }

  likeToy = (toyToLike) => {
    console.log("likeToy")
    toyToLike.likes = toyToLike.likes +1 
    const foundIndex = this.state.toys.findIndex(toy => toy.id === toyToLike.id)    
    if(foundIndex !== -1)
    {
      const toysSpliced = [...this.state.toys]
      toysSpliced.splice(foundIndex,1,toyToLike)
      this.setState({
        toys: toysSpliced
      })
    }
  }

  createNewToy = (event) => {
    event.preventDefault()
    // console.log(event.currentTarget.children[1].value)
    // console.log(event.currentTarget.children[3].value)
    // console.log(event)
    const defaultToyImage = "https://atlas-content-cdn.pixelsquid.com/stock-images/toy-race-car-track-AER0ZKB-600.jpg"
    const inputImagePath = event.currentTarget.children[3].value
    const newToyId = this.state.toys.length > 0 ? this.state.toys[this.state.toys.length-1].id + 1 : 0
    const newImagePath = inputImagePath === "" ? defaultToyImage :inputImagePath
    const newToy = {id: newToyId, 
      name: event.currentTarget.children[1].value, 
      image: newImagePath,
      likes: 0
    }

    this.setState({
      toys: [...this.state.toys, newToy]
    })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm createNewToy={this.createNewToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} donateToy={this.donateToy} likeToy={this.likeToy}/>
      </>
    );
  }

}

export default App;