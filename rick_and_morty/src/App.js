//http://codeshare.io/G8KD3J

import React from 'react';
//import logo from './logo.svg';
import './App.css';
import './Lib/api';
import api from './Lib/api';

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      modalActivo: false,
      characters: [],
      CharacterSelected: {}
    }
  }

  componentDidMount() {
    api.getAllCharacters()
      .then(results => {
        this.setState({
          characters: results
        })
      })
      .catch(e => console.error(e))
  }

  activarModal(id){
    api.getCharactersById(id)
    .then(characters => {
      this.setState({
        modalActivo: true,
        CharacterSelected: characters
      })
    })
  }

  desactivarModal() {
    this.setState({
      modalActivo: false
    })
  }

  renderCards(e) {
    return (
    <div key={e.id} className="Card" onClick={characters => this.activarModal(e.id)}>
    <div className="Card-image">
      <figure>
         <img src={e.image} alt="Nothing" />
      </figure>
    </div>
    <div className="Card-description">
      <div className="Card-name">
        <h3> {e.name} </h3>
      </div>
    </div>
  </div>
  )
  };

  render(){
    const { modalActivo,characters } = this.state;
    const cards = characters.map(characters => this.renderCards(characters))
    

    return (
      <div className="App">
      <div className= "App-container">
        <h1>Rick and Morty</h1>
        <div className= "Cards-container">
        {cards}
        </div>
        { modalActivo ? (
            <div className='Modal' onClick={e => this.desactivarModal()}>
              <div className='Card-detalle'>
                <div className='Card-imagen'>
                  <figure>
                    <img alt='test' src={this.state.CharacterSelected.image} />
                  </figure>
                </div>
                <div className='Card-detalle-descripcion'>
                  <div className='descripcion'>
                    <h3> {this.state.CharacterSelected.name}</h3>
                    <div className='caracteristica'>
                      <p>Status</p>
                      <p className='caracteristica-valor'>
                      {this.state.CharacterSelected.status}
                      </p>
                    </div>
                    <div className='caracteristica'>
                      <p>Especie</p>
                      <p className='caracteristica-valor'>
                      {this.state.CharacterSelected.species}
                      </p>
                    </div>
                    <div className='caracteristica'>
                      <p>Genero</p>
                      <p className='caracteristica-valor'>
                      {this.state.CharacterSelected.gender}
                      </p>
                    </div>
                    <div className='caracteristica'>
                      <p>Origen</p>
                      <p className='caracteristica-valor'>
                      {this.state.CharacterSelected.origin.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null }
      </div>
      </div>
    );
  }

 
}

export default App;
