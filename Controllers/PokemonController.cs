using Microsoft.AspNetCore.Mvc;
using NatWest.Data;

namespace NatWest.Controllers
{
    [Route("api/[controller]")]
    public class PokemonController: Controller
    {
        private IPokemonService _service;
        public PokemonController(IPokemonService service)
        {
            _service = service;
        }

        [HttpGet("[action]")]
        public IActionResult GetPokemons()
        {
            var pokemons = _service.GetPokemons();
            return Ok(pokemons);
        }

        [HttpGet("GetPokemonById/{id}")]
        public IActionResult GetPokemonById(int id)
        {
            var pokemon = _service.GetPokemonById(id);
            return Ok(pokemon);
        }
    }
}