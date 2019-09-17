using System;

namespace PingPong.API.Data
{
    public class Player
    {
        public Guid Id { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public DateTime CreatedOn { get; set; }		
    }
}