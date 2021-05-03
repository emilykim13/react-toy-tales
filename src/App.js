import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


const toysApi = "http://localhost:3001/toys"

class App extends React.Component{

  state = {
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
    fetch(toysApi)
    .then(res => res.json())
    .then(json => this.setState({
      toys: json
    }))
  }

  donateToy = (toyGettingDonated) => {
    console.log(`${toyGettingDonated.name} has been donated.`)
    const donateToyId = this.state.toys.findIndex(toy => toy.id === toyGettingDonated.id)
    if( donateToyId !== -1)
    {
      const currentToysArr = [...this.state.toys]
      currentToysArr.splice(donateToyId,1)
      this.setState({
        toys: currentToysArr
      })
    }
  }

  likeToy = (toyGettingLiked) => {
    console.log("This got got a like")
    toyGettingLiked.likes = toyGettingLiked.likes + 1 
    const likeToyId = this.state.toys.findIndex(toy => toy.id === toyGettingLiked.id)    
    if(likeToyId !== -1)
    {
      const currentToysArr = [...this.state.toys]
      currentToysArr.splice(likeToyId, 1, toyGettingLiked)
      this.setState({
        toys: currentToysArr
      })
    }
  }

  createNewToy = (e) => {
    e.preventDefault()
    const defaultImage = "https://atlas-content-cdn.pixelsquid.com/stock-images/toy-race-car-track-AER0ZKB-600.jpg"
    const inputImageValue = e.currentTarget.children[3].value
    const newToyId = this.state.toys.length > 0 ? this.state.toys[this.state.toys.length-1].id + 1 : 0
    const newImage = inputImageValue === "" ? defaultImage :inputImageValue
    const newToy = {
      id: newToyId, 
      name: e.currentTarget.children[1].value, 
      image: newImage,
      likes: 0
    }

    this.setState({
      toys: [...this.state.toys, newToy]
    })
  }

  render(){
    return (
      <div>
        <Header/>
        {this.state.display ? <ToyForm createNewToy={this.createNewToy}/> : null}
          <div className="buttonContainer">
            <button onClick={this.handleClick}> Add a Toy </button>
          </div>
        <ToyContainer toys={this.state.toys} donateToy={this.donateToy} likeToy={this.likeToy}/>
      </div>
    )
  }

}

export default App;