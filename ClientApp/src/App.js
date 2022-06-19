import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';

import './custom.css'
import { Pokemon } from './components/Pokemon/Pokemons';
import { Evolution } from './components/Pokemon/Evolutions';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/pokemon' component={Pokemon} />
        <Route path='/evolution/:id' component={Evolution} />
      </Layout>
    );
  }
}


