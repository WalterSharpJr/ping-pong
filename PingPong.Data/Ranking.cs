using System;

namespace PingPong.Data
{
    public class Ranking
    {
        public Guid Id { get; set; }
		public Guid PlayerId { get; set; }
		public Guid RankingJobId { get; set; }
		public int Rank { get; set; }

		public RankingJob RankingJob { get; set; }
		public Player Player { get; set; }
	}
}	