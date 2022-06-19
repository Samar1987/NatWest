namespace NatWest.Data
{

    public class ObjectThatContainsPokemon
    {
        public List<Pokemon>? pokemon { get; set; }
    }

    public class Pokemon
    {
        public int Id {get; set;}

        public string? Num {get; set;}

        public string? Name {get; set;}

        public string? Img { get; set; }

        public List<string>? Type { get; set; }

        public string? Height { get; set; }

        public string? Weight { get; set; }

        public string? Candy { get; set; }

        public int Candy_count { get; set; }

        public string? Egg {get; set;}

        public decimal Spawn_chance {get; set;}

        public decimal Avg_spawns {get; set;}

        public string? Spawn_time {get; set;}

        public List<decimal>? Multipliers {get; set;}

        public List<string>? Weaknesses {get; set;}

        public List<NextEvolution>? Next_evolution {get; set;}

        public List<PrevEvolution>? Prev_evolution {get; set;}
         
    }

    public class NextEvolution
    {
        public string? Num {get; set;}

        public string? Name {get; set;}
    }

    public class PrevEvolution
    {
        public string? Num {get; set;}

        public string? Name {get; set;}
    }

}