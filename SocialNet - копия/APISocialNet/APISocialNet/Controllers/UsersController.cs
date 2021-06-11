using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using WebAPIApp.Models;
using System.Threading.Tasks;
using APISocialNet.Models;
using Microsoft.AspNetCore.Http;
using System.IO;

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
        [HttpPut]
        public ActionResult<string> Put(User newUser)
        {
              var EditUser = db.Users
                       .Where(user => user.Id == newUser.Id)
                       .FirstOrDefault();

            EditUser.Name = newUser.Name;
            EditUser.Surname = newUser.Surname;
            EditUser.Instrument = newUser.Instrument;
            EditUser.Sex = newUser.Sex;
            EditUser.Describe = newUser.Describe;

            db.SaveChanges();

            return new ObjectResult(1);
        }
       /* [HttpPost]
        public ActionResult<string> Post(User newUser)
        {
            int lastUserId = 0;
           
                db.Users.Add(newUser);
                db.SaveChanges();

               var lastUser = db.Users
                          .OrderBy(p => p.Id)
                          .Last();
                lastUserId = lastUser.Id;
            return new ObjectResult(lastUserId.ToString());
        }*/
        [HttpPost]
        public async Task<IActionResult> Post(IFormFile uploadedFile)
        {
            if (uploadedFile != null)
            {
                // путь к папке Files
                string path = "/Files/" + uploadedFile.FileName;
                // сохраняем файл в папку Files в каталоге wwwroot
                using (var fileStream = new FileStream("filePic", FileMode.Create))
                {
                    await uploadedFile.CopyToAsync(fileStream);
                }
                FileModel file = new FileModel { Name = uploadedFile.FileName, Path = path };

            }

            return RedirectToAction("Index");
        }
    }
    public class FileModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
    }
}