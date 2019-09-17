using Microsoft.EntityFrameworkCore;

namespace PingPong.API.Data
{
    public class PingPongContext: DbContext
    {
        public PingPongContext(DbContextOptions<PingPongContext> options): base(options)
		{

		}

		public DbSet<Player> Players { get; set; }
        public DbSet<Game> Games { get; set; }		
    }
}