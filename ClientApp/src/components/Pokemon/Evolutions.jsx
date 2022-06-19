import React, { Component } from 'react';

export class Evolution extends Component
{
    constructor(props){
        super(props);

        this.pokemonsDetails = this.pokemonsDetails.bind(this);

        this.state = {
            nextData: [],
            prevData: [],
            loading: true
        };
    }

    async getEvolutions(id) {
        try {
          const response = await fetch('https://localhost:7222/api/Pokemon/GetPokemonById/'+id);
          const result = await response.json();
          this.setState({ nextData: result.next_evolution ? result.next_evolution : [], prevData:  result.prev_evolution ? result.prev_evolution : [], loading: false });
        } catch (error) {
          console.log(error);
        } finally {
          this.setState({ loading: false });
        }
    }

    pokemonsDetails(){
        const {history} = this.props;
        history.push('/pokemon');
    }

    componentDidMount() {  
        const {id} = this.props.match.params;     
        this.getEvolutions(id);
    }

    renderNextEvolutionTable(next){
        return (
            <div>
                <table className='table table-stripped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Num</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            next.map(pk => (
                                <tr key={ Number(pk.num)}>
                                    <td>{ pk.num }</td>
                                    <td>{ pk.name }</td>
                                </tr>
                            ))
                        }                    
                    </tbody>
                </table>
            </div>
         );
    }

    renderPrevEvolutionTable(prev){
        return (
            <div>
                <table className='table table-stripped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Num</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            prev.map(pk => (
                                <tr key={ Number(pk.num)}>
                                    <td>{ pk.num }</td>
                                    <td>{ pk.name }</td>
                                </tr>
                            ))
                        }                    
                    </tbody>
                </table>
            </div>
         );
    }

    render() {        
        let nextcontents = this.state.nextData.length <= 0 ? (
            <p>
                <em>Next evolutions are not available...</em>
            </p>
        ) : (
            this.renderNextEvolutionTable(this.state.nextData)
        )

        let prevcontents = this.state.prevData.length <= 0 ? (
            <p>
                <em>Previous evolutions are not available...</em>
            </p>
        ) : (
            this.renderPrevEvolutionTable(this.state.prevData)
        )

        return (
            <div>
                <div>
                    <h4>Next Evolutions</h4>
                    { nextcontents } 
                </div>
                <div>&nbsp;</div>
                <div>&nbsp;</div>
                <div>
                    <h4>Previous Evolutions</h4>
                    { prevcontents } 
                </div>  
                <div>&nbsp;</div>
                <div>&nbsp;</div>
                <div>
                    <button className='btn-primary' onClick={() => this.pokemonsDetails()}>Back to Pokemons</button>    
                </div>             
            </div>
        );
    }

}