using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace PingPong.Data
{
    public class PingPongDesignTimeContext : IDesignTimeDbContextFactory<PingPongContext>
    {    
        public PingPongContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<PingPongContext>();
            optionsBuilder.UseNpgsql("Host=localhost;Database=PingPong;Username=postgres;Password=walter;");

            return new PingPongContext(optionsBuilder.Options);
        }			
    }
}