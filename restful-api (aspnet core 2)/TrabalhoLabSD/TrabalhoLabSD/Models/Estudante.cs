namespace TrabalhoLabSD.Models
{
    public class Estudante
    {
        public long Id { get; set; }
        public string Nome { get; set; }
        public double Nota { get; set; }

        public int CursoId { get; set; }
        public Curso Curso { get; set; }
    }
}
