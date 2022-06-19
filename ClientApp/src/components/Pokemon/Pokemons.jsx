import React, {Component} from 'react';
import './Pokemon.css'

export class Pokemon extends Component
{
    constructor(props){
        super(props);

        this.pokemonDetails = this.pokemonDetails.bind(this);

        this.state = {
            pokemons: [],
            loading: true,

            pokemonNumFilter: "",
            pokemonNameFilter: "",
            pokemonsWithoutFilter:[],
            sortByOrder:true
        };
    }

    // Perfrom - Sort (for columns 'num' and 'name')
    sortPokemons(sortColumn, sortOrder){
        var sort = sortOrder === true ? false : true;
        var sortedData = this.state.pokemonsWithoutFilter.sort(function(a, b){
            if(sort){
                return (a[sortColumn] > b[sortColumn]) ? 1 : ((a[sortColumn] < b[sortColumn]) ? -1 : 0);
            } else{
                return (b[sortColumn] > a[sortColumn]) ? 1 : ((b[sortColumn] < a[sortColumn]) ? -1 : 0);
            }
        });

        this.setState({pokemons: sortedData, sortByOrder: (sortOrder === true ? false : true)});
    }

    // Perfrom - Filter (for columns 'num' and 'name')
    filterPokemons(){
        var pokNumFilter = this.state.pokemonNumFilter;
        var pokName = this.state.pokemonNameFilter;        

        var filteredData = this.state.pokemonsWithoutFilter.filter(
            function(e1){
                return e1.num.toLowerCase().includes(
                    pokNumFilter.trim().toLowerCase()
                )&&
                e1.name.toLowerCase().includes(
                    pokName.trim().toLowerCase()
                )                
            }
        );

        this.setState({ pokemons: filteredData });
    }

    pokemonDetails(id){
        const {history} = this.props;
        history.push('/evolution/'+id);
    }

    changePokemonNumFilter = (e) =>{
        this.state.pokemonNumFilter = e.target.value;
        this.filterPokemons();
    }

    changePokemonNameFilter = (e) =>{
        this.state.pokemonNameFilter = e.target.value;
        this.filterPokemons();
    }

    componentDidMount(){
        this.populatePokemonsData();
    }

    async populatePokemonsData() {
        try { 
          const response = await fetch('https://localhost:7222/api/Pokemon/GetPokemons');
          const data = await response.json();
          this.setState({ pokemons: data.map(a => a), loading: false, pokemonsWithoutFilter: data.map(a => a) });
        } catch (error) {
          console.log(error);
        } finally {
          this.setState({ loading: false });
        }
    }

    renderAllPokemonTable(poks){
        return (
            <table className='table table-stripped'>
                <thead>  
                    <tr>
                        <td>
                            Filter By: &nbsp;<input onChange={this.changePokemonNumFilter} placeholder="Num" />
                        </td>
                        <td>
                            Filter By: &nbsp;<input onChange={this.changePokemonNameFilter} placeholder="Name" /> 
                        </td>
                        <td colSpan={2}>
                            &nbsp;
                        </td>
                    </tr>                  
                    <tr>
                        <td onClick={() => this.sortPokemons('num', this.state.sortByOrder)}>                                   
                            <a className='anchColor'>Num</a>                            
                        </td>
                        <td onClick={() => this.sortPokemons('name', this.state.sortByOrder)}>                            
                            <a className='anchColor'>Name</a>
                        </td>
                        <td>Type</td>
                        <td>Image</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        poks.map((pk) => (
                            <tr key={Number(pk.id)}>
                                <td onClick={() => this.pokemonDetails(pk.id)}>{pk.num}</td>
                                <td onClick={() => this.pokemonDetails(pk.id)}>{pk.name}</td>
                                <td>
                                    <select name="type" id="type">
                                        {pk.type.map((tp) => (                                            
                                            <option value={tp}>{tp}</option>
                                        ))}                        
                                    </select>
                                </td>
                                <td onClick={() => this.pokemonDetails(pk.id)}>
                                    <img src={pk.img} alt="Pokemon Image"/>
                                </td>
                            </tr>
                        ))
                    }                    
                </tbody>
            </table>
        );
    } 

    render(){
        let contents = this.state.loading ? (
            <p>
                <em>Loading...</em>
            </p>
        ) : (
            this.renderAllPokemonTable(this.state.pokemons)
        )

        return (
            <div>
                <h1>Pokemons</h1>
                <p>Here you can see all Pokemons</p>
                { contents }
            </div>
        );
    }

}