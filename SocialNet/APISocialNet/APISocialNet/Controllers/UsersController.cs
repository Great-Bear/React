using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using WebAPIApp.Models;
using System.Threading.Tasks;
using APISocialNet.Models;

namespace WebAPIApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController] 
    public class UsersController : ControllerBase
    {
        UsersContext db;
        public UsersController(UsersContext context)
        {
            db = context;
            if (!db.Users.Any())
            {              
                db.Users.Add(new User
                {
                    Login = 1.ToString(),
                    Password = 1234.ToString(),
                    Name = "StickMan",
                    Surname = "Black",
                    Instrument = "Perforator",
                    Sex = "Male",
                    Describe = "I like play on perforator"
                });
                db.Users.Add(new User
                {
                    Login = 2.ToString(),
                    Password = 1234.ToString(),
                    Name = "StickWomen",
                    Surname = "Black",
                    Instrument = "Piano",
                    Sex = "Female",
                    Describe = "I like play on Piano"
                });
                db.SaveChanges();
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> Get()
        {
            return await db.Users.ToListAsync();
        }

        // GET api/users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Get(int id)
        {
            User user = await db.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
                return NotFound();
            return new ObjectResult(user);
        }
        [HttpGet("{login}/{password}")]
        public async Task<ActionResult<User>> Get(string login,string password)
        {
             User user = await db.Users.FirstOrDefaultAsync(x => x.Login == login &&
                                                                 x.Password == password);
            if (user == null)
                return NotFound();
            return new ObjectResult(user);
        }


        /* // POST api/users
         [HttpPost]
         public async Task<ActionResult<User>> Post(User user)
         {
             if (user == null)
             {
                 return BadRequest();
             }

             db.Users.Add(user);
             await db.SaveChangesAsync();
             return Ok(user);
         }

         // PUT api/users/
         [HttpPut]
         public async Task<ActionResult<User>> Put(User user)
         {
             if (user == null)
             {
                 return BadRequest();
             }
             if (!db.Users.Any(x => x.Id == user.Id))
             {
                 return NotFound();
             }

             db.Update(user);
             await db.SaveChangesAsync();
             return Ok(user);
         }

         // DELETE api/users/5
         [HttpDelete("{id}")]
         public async Task<ActionResult<User>> Delete(int id)
         {
             User user = db.Users.FirstOrDefault(x => x.Id == id);
             if (user == null)
             {
                 return NotFound();
             }
             db.Users.Remove(user);
             await db.SaveChangesAsync();
             return Ok(user);
         }*/
    }
}