using System;

namespace PingPong.Business.Models
{
    public class Ranking
    {
        public int Rank { get; set; }
		public string Player { get; set; }
		public int PreviousRank { get; set; }
		public Guid PlayerId { get; set; }
    }
}