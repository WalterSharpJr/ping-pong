using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace PingPong.Data
{
	/// <summary>
	/// Provides design time access to the PingPongContext object. Primarily used for the EF Migrations CLI tool
	/// </summary>
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