using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using APISocialNet.Models;

namespace WebAPIApp.Models
{
    public class UsersContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Followers> FollowersT { get; set; }
        public UsersContext(DbContextOptions<UsersContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
    }
}