using System;

namespace PingPong.Business.Models
{
    public class Player
    {
        public Guid Id { get; set; }
		public string Name { get; set; }
		public int GamesPlayed { get; set; }
		public int GamesWon { get; set; }
		public int GamesLost { get; set; }
		public int ? Rank { get; set; }
    }
}