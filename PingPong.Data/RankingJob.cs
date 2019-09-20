using System;

namespace PingPong.Data
{
	public enum RankingJobStates  { Running, Finished, Error }

    public class RankingJob
    {
		public Guid Id { get; set; }
		public DateTimeOffset ? StartedOn { get; set; }
		public DateTimeOffset ? FinishedOn { get; set; }
		public RankingJobStates State { get; set; }	

    }
}