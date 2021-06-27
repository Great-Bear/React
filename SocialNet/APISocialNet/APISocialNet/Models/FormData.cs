using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace APISocialNet.Models
{
    public class FormData
    {
        public string Username { get; set; }
        public byte[] Avatar { get; set; }
    }
}
