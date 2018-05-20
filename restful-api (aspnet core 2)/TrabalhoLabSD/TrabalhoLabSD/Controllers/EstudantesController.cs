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
    [Route("api/Estudantes")]
    public class EstudantesController : Controller
    {
        private readonly TrabalhoContext _context;

        public EstudantesController(TrabalhoContext context)
        {
            _context = context;
        }

        // GET: api/Estudantes
        [HttpGet]
        public IEnumerable<Estudante> GetEstudantes()
        {
            return _context.Estudantes;
        }

        // GET: api/Estudantes/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEstudante([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var estudante = await _context.Estudantes.SingleOrDefaultAsync(m => m.Id == id);

            if (estudante == null)
            {
                return NotFound();
            }

            return Ok(estudante);
        }

        // PUT: api/Estudantes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEstudante([FromRoute] long id, [FromBody] Estudante estudante)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != estudante.Id)
            {
                return BadRequest();
            }

            _context.Entry(estudante).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EstudanteExists(id))
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

        // POST: api/Estudantes
        [HttpPost]
        public async Task<IActionResult> PostEstudante([FromBody] Estudante estudante)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Estudantes.Add(estudante);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEstudante", new { id = estudante.Id }, estudante);
        }

        // DELETE: api/Estudantes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEstudante([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var estudante = await _context.Estudantes.SingleOrDefaultAsync(m => m.Id == id);
            if (estudante == null)
            {
                return NotFound();
            }

            _context.Estudantes.Remove(estudante);
            await _context.SaveChangesAsync();

            return Ok(estudante);
        }

        private bool EstudanteExists(long id)
        {
            return _context.Estudantes.Any(e => e.Id == id);
        }
    }
}