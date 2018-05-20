using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrabalhoLabSD.Models
{
    public class Curso
    {
        public int Id { get; set; }
        public string Nome { get; set; }

        public List<Estudante> Estudantes { get; set; }
    }
}
