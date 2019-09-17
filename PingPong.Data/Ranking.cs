using System;

namespace PingPong.Data
{
    public class Ranking
    {
        public Guid Id { get; set; }
		public Player Player { get; set; }
		public int Rank { get; set; }
		public Ranking PreviousRank { get; set; }		
    }
}