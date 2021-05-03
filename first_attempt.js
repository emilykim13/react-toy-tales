// hierarchy: 
// app.js
    // header.jsx
    // toyform.jsx
    // toycontainer.jsx
        // toycard.jsx

// App.js
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
      toysSpliced.splice(foundIndex, 1, toyToLike)
      this.setState({
        toys: toysSpliced
      })
    }
  }

  createNewToy = (e) => {
    e.preDefault()
    // console.log(e.currentTarget.children[1].value)
    // console.log(e)
    const defaultImage = "https://atlas-content-cdn.pixelsquid.com/stock-images/toy-race-car-track-AER0ZKB-600.jpg"
    const inputImageValue = e.currentTarget.children[3].value
    const newToyId = this.state.toys.length > 0 ? this.state.toys[this.state.toys.length-1].id + 1 : 0
    const newImage = inputImageValue === "" ? defaultImage :inputImageValue
    const newToy = {id: newToyId, 
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

// Header.jsx
import React from 'react';

const ToyHeader = () => (
  <div id='toy-header'>
    <img src="https://fontmeme.com/permalink/180719/67429e6afec53d21d64643101c43f029.png" alt="toy-header"/>
  </div>
);

export default ToyHeader;

// ToyForm.jsx
import React, { Component } from 'react';

class ToyForm extends Component {

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.props.createNewToy}>          <h3>Create a toy!</h3>
          <input type="text" name="name" placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;

// ToyContainer.jsx
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

// ToyCard.jsx
import React, { Component } from 'react';

class ToyCard extends Component {

  render() {
    return (
      <div className="card">
        <h2>{this.props.toy.name}</h2>
        <img src={this.props.toy.image} alt={"toy"} className="toy-avatar" />
        <p>{this.props.toy.likes} Likes </p>
        <button className="like-btn" onClick={() => this.props.likeToy(this.props.toy)}>Like {'<3'}</button>
        <button className="del-btn" onClick={() => this.props.donateToy(this.props.toy)}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
