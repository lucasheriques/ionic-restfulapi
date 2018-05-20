using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrabalhoLabSD.Models;

namespace TrabalhoLabSD.Controllers
{
    [Produces("application/json")]
    [Route("api/Cursos")]
    public class CursosController : Controller
    {
        private readonly TrabalhoContext _context;

        public CursosController(TrabalhoContext context)
        {
            _context = context;
        }

        // GET: api/Cursos
        [HttpGet]
        public IEnumerable<Curso> GetCurso()
        {
            return _context.Curso;
        }

        // GET: api/Cursos/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCurso([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var curso = await _context.Curso.SingleOrDefaultAsync(m => m.Id == id);

            if (curso == null)
            {
                return NotFound();
            }

            return Ok(curso);
        }

        // GET: api/Cursos/5/estudantes
        [HttpGet("{id}/estudantes")]
        public async Task<IActionResult> GetEstudantesCurso([FromRoute] int id)
        {
            var estudantes = _context.Estudantes.Where(e => e.CursoId == id);

            return Ok(estudantes);
        }

        // PUT: api/Cursos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCurso([FromRoute] int id, [FromBody] Curso curso)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != curso.Id)
            {
                return BadRequest();
            }

            _context.Entry(curso).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CursoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Cursos
        [HttpPost]
        public async Task<IActionResult> PostCurso([FromBody] Curso curso)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Curso.Add(curso);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCurso", new { id = curso.Id }, curso);
        }

        // DELETE: api/Cursos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCurso([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var curso = await _context.Curso.SingleOrDefaultAsync(m => m.Id == id);
            if (curso == null)
            {
                return NotFound();
            }

            _context.Curso.Remove(curso);
            await _context.SaveChangesAsync();

            return Ok(curso);
        }

        private bool CursoExists(int id)
        {
            return _context.Curso.Any(e => e.Id == id);
        }
    }
}