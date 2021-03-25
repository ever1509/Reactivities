using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistance
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions options) :base (options)
        {
            
        }
        public DbSet<Activity> Activities { get; set; }
    }
}