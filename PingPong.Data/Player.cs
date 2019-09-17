using System;
using System.ComponentModel.DataAnnotations;

namespace PingPong.Data
{
    public class Player
    {		
        public Guid Id { get; set; }

		[MaxLength(64)]
		public string FirstName { get; set; }

		[MaxLength(64)]
		public string LastName { get; set; }
		public DateTime CreatedOn { get; set; }	
    }
}