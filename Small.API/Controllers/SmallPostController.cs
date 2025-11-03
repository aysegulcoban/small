using Microsoft.AspNetCore.Mvc;     // Controller sınıfı için gereklidir
using Microsoft.EntityFrameworkCore;
using Small.API.Data;
using Small.API.Models;


namespace Small.API.Controllers
{
    [ApiController]

    [Route("api/[controller]")]

    public class SmallPostController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SmallPostController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        /*
        ActionResult: HTTP cevabı döndürür
        <IEnumerable<SmallPost>: SmallPost lardan oluşan bir liste demek
        İkisi birleşinde anlamı ise: HTTP cevabı döndür, başarılıysa içinde SmallPost listesi olsun demek oluyor
        */
        public async Task<ActionResult<IEnumerable<SmallPost>>> GetSmallPosts()
        {
            return await _context.SmallPosts.ToListAsync();
        }


        [HttpPost]
        public async Task<ActionResult<SmallPost>> CreateSmallPosts(SmallPost smallpost)
        {
            _context.SmallPosts.Add(smallpost);
            await _context.SaveChangesAsync();
            Console.WriteLine($"Yeni blog eklendi: {smallpost}");
            return smallpost;
        }

        [HttpPut("{id}")]    //URL'de ID parametresi alacağım demek /api/SmallPost/5
        public async Task<ActionResult> UpdateSmallPosts(int id, SmallPost smallpost)
        {
            if (id != smallpost.ID)
            {
                return BadRequest();
            }


            _context.Entry(smallpost).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteSmallPosts(int id)
        {
            var smallpost = await _context.SmallPosts.FindAsync(id);
            if (smallpost == null)
            {
                return NotFound();
            }
            _context.SmallPosts.Remove(smallpost);
            await _context.SaveChangesAsync();
            return NoContent();
        }

    
    }
}