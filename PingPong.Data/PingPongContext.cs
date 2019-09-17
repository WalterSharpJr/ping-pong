using Microsoft.EntityFrameworkCore;

namespace PingPong.Data
{
    public class PingPongContext: DbContext
    {
        public PingPongContext(DbContextOptions<PingPongContext> options): base(options)
		{

		}

		public DbSet<Player> Players { get; set; }
        public DbSet<Game> Games { get; set; }
		public DbSet<Ranking> Rankings { get; set; }
		public DbSet<RankingJob> RankingJobs { get; set; }
    }
}