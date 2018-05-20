using Microsoft.EntityFrameworkCore;
using TrabalhoLabSD.Models;

namespace TrabalhoLabSD.Models
{
    public class TrabalhoContext : DbContext
    {
        public TrabalhoContext(DbContextOptions<TrabalhoContext> options)
            : base(options)
        {
        }

        public DbSet<Estudante> Estudantes { get; set; }
        public DbSet<Curso> Curso { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Estudante>()
                .HasOne(e => e.Curso)
                .WithMany(c => c.Estudantes)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
