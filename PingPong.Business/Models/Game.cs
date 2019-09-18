using System;

namespace PingPong.Business.Models
{
    public class Game
    {
        public Guid Id { get; set; }
		public DateTime PlayedOn { get; set; }
		public string Player1 { get; set; }
		public string Player2 { get; set; }
		public byte Player1Score { get; set; }
		public byte Player2Score { get; set; }
		public string Winner { get; set; }
    }
}