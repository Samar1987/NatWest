using System.Collections.Generic;

namespace NatWest.Data
{
    public interface IPokemonService
    {
        List<Pokemon> GetPokemons();

        Pokemon GetPokemonById(int pokemonId);
    }

}