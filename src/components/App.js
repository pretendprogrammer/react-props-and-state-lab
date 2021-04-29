import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (newType) => {this.setState({filters: {type: newType.target.value}})}

  onFindPetsClick = () => {
    let URL = '/api/pets'
    if (this.state.filters.type !== 'all') {
      URL = `/api/pets?type=${this.state.filters.type}`
    }
    fetch(URL)
      .then(res => res.json())
      .then(petsArray => this.setState({pets: petsArray}))
  }

  onAdoptPet = (petId) => {
    const newPetArray = this.state.pets.map(petObj => {
      if (petId === petObj.id) {
        return {...petObj, isAdopted: true}
      }
      return petObj
    })

    this.setState({pets: newPetArray})
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
