using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using WebAPIApp.Models;
using System.Threading.Tasks;
using APISocialNet.Models;
using System.Security.Cryptography;
using System;
using System.Text;
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
                    Password = "A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=",
                    Name = "StickMan",
                    Surname = "Black",
                    Instrument = "Perforator",
                    Sex = "Male",
                    Describe = "I like play on perforator"
                });
                db.Users.Add(new User
                {
                    Login = 2.ToString(),
                    Password = "A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=",
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

        [HttpGet("{name}/{surName}/{index}")]
        public ActionResult<IEnumerable<User>> Get(string name, string surName, int index2)
        {
            IQueryable<User> resultList;
            
            if (name != "-1" && surName != "-1")
            {
                resultList = db.Users
                              .Where(p => p.Surname == surName && p.Name == name);
            }
            else if(surName != "-1")
            {
                resultList = db.Users
                              .Where(p => p.Surname == surName);
            }
            else
            {
                return new ObjectResult(new List<User>());
            }
            return new ObjectResult(resultList.ToList());
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
            var sha256 = new SHA256Managed();
            var passwordHash = Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(password)));

            User user = await db.Users.FirstOrDefaultAsync(x => x.Login == login && 
                                                                 x.Password == passwordHash);
          
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
            EditUser.Phone = newUser.Phone;
            EditUser.Age = newUser.Age;
            EditUser.Describe = newUser.Describe;

            db.SaveChanges();

            return new ObjectResult(1);
        }
        [HttpPost]
        public ActionResult<string> Post(User newUser)
        {
            int lastUserId = 0;
            var ExistUser = db.Users
                          .Where(p => p.Login == newUser.Login)
                          .FirstOrDefault();

            if (ExistUser == null)
            {
                var sha256 = new SHA256Managed();
                newUser.Password = Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(newUser.Password)));

                db.Users.Add(newUser);
                db.SaveChanges();

                var lastUser = db.Users
                           .OrderBy(p => p.Id)
                           .Last();
                lastUserId = lastUser.Id;
            }
            else
            {
                lastUserId = -1;
            }
            return new ObjectResult(lastUserId.ToString());
        }
        [HttpPost("{idMain}/{idGuest}")]
        public ActionResult<string> Post(int idMain, int idGuest)
        {

            var UserG = db.Users
                          .Where(p => p.Id == idGuest)
                          .FirstOrDefault();


            var User = db.FollowersT
                          .Where(p => p.IdOwner == idMain && p.UserId == idGuest)
                          .ToList();


                if (User.Count == 0)
                {
                    Followers newFollower = new Followers();
                    newFollower.User = UserG;
                    newFollower.IdOwner = idMain;
                    db.FollowersT.Add(newFollower);
                }
                else
                {
                    db.FollowersT.Remove(User[0]);
                }
                db.SaveChanges();
  
            var Users = db.FollowersT
                               .Where(p => p.IdOwner == idMain)
                               .ToList();
            return new ObjectResult(Users.Count().ToString());
        }
        [HttpGet("{idM}/{idG}/{id9}/{id10}")]
        public ActionResult<string> Get(int idM,int idG)
        {
            var Users = db.FollowersT
                               .Where(p => p.UserId == idG && p.IdOwner == idM)
                               .ToList();

              return new ObjectResult(Users.Count().ToString());
        }

        [HttpGet("{idM}/{idG}/{id3}/{id4}/{id5}")]
        public ActionResult<string> Get(int idM, int idG,int id3,int id4,int id5)
        {
            var Users = db.FollowersT
                               .Where(p => p.IdOwner == idM)
                               .ToList();

            return new ObjectResult(Users.Count.ToString());
        }
        
        [HttpGet("{fileName}/{id1}/{id2}/{id3}/{id4}/{id5}/{id6}")]
        public FileResult GetFile(string fileName)
        {
            fileName = "Smile2.png";
            foreach (var item in Directory.GetFiles(@".\Img\"))
            {
                if (item.IndexOf(fileName) > 0)
                {
                    int startCut = item.LastIndexOf('.') + 1;
                    string expansion = item.Substring(startCut, item.Length - startCut);
                    byte[] mas = System.IO.File.ReadAllBytes($@".\Img\{fileName}");
                    string file_type = $"application/{expansion}";
                    string file_name = $"img.{expansion}";
                    return File(mas, file_type, file_name);
                }
            }
            return null;
        }
    }
}