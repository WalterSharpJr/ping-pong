using System;

namespace PingPong.Data
{
    public class Game
    {
        public Guid Id { get; set; }
		public DateTime Date { get; set; }
		public Player Player1 { get; set; }
		public Player Player2 { get; set; }
		public byte Player1Score { get; set; }
		public byte Player2Score { get; set; }
		public Player WinningPlayer { get; set; }
		
    }
}