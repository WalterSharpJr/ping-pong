using System;

namespace PingPong.Data
{
    public class Game
    {
        public Guid Id { get; set; }
		public Guid Player1Id { get; set; }
		public Guid Player2Id { get; set; }
		public Guid WinningPlayerId { get; set; }
		public DateTime PlayedOn { get; set; }
		public byte Player1Score { get; set; }
		public byte Player2Score { get; set; }

		public Player Player1 { get; set; }
		public Player Player2 { get; set; }
		public Player WinningPlayer { get; set; }

		public bool IsValid()
		{
			//make sure both player Ids are populated and the players arent playing themselves
			var validPlayers = (Player1Id != Guid.Empty && Player2Id != Guid.Empty)
								&& (Player1Id != Player2Id);

			//make sure the winner is valid
			var validWinner = (WinningPlayerId == Player1Id) || (WinningPlayerId == Player2Id);

			//make sure the scores are valid
			var validScore = (Player1Score >= 0 && Player2Score >= 0) &&
							((Player1Score > Player2Score) || (Player2Score > Player1Score));

			//finally make sure the played on date is not in the future
			var validDate = PlayedOn != null && PlayedOn < DateTime.Now;

			return validDate && validPlayers && validScore && validWinner;
		}
		
    }
}