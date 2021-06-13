using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APISocialNet.Models
{
    public class Followers
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public User User { get; set; }
    }
}
