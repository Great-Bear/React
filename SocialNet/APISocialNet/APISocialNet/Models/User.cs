using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APISocialNet.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Instrument { get; set; }
        public string Sex { get; set; }
        public string Phone { get; set; } = "Null";
        public string Describe { get; set; }
        public string Age { get; set; } = "Null";
        public byte[] Picture { get; set; } = null;
      


    }
}
