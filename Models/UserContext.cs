using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Context 
{

    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> options) : base(options)
        {}

        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) 
        {}

        protected override void OnModelCreating(ModelBuilder modelBuilder) 
        {}
    }

}