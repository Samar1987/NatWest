using Newtonsoft.Json;

namespace NatWest.Data
{
    public class PokemonService : IPokemonService
    {  
        private readonly List<Pokemon> _pokemons = new List<Pokemon>();

        public PokemonService()
        {
            GetJsonDataAsync().GetAwaiter().GetResult();
        }

        public List<Pokemon> GetPokemons()
        {
            return _pokemons.ToList();
        } 

        public Pokemon GetPokemonById(int pokemonId)
        {
            var pok = _pokemons.SingleOrDefault(item => item?.Id == pokemonId);
            return (pok != null) ? pok : new Pokemon();
        }

        // Pokemon Data Service.
        private async Task GetJsonDataAsync()
        {
            using (HttpClient wc = new HttpClient())
            {
                HttpResponseMessage response = await wc.GetAsync("https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json");

                using (HttpContent content = response.Content)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();
                    var jsonObject = JsonConvert.DeserializeObject<ObjectThatContainsPokemon>(responseBody);

                    if (jsonObject != null && jsonObject?.pokemon != null)
                    {
                        foreach (var Pok in jsonObject.pokemon)
                        {
                            _pokemons.Add(Pok);
                        }
                    }
                }
            }
        }

    }
}