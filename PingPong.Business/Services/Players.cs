using System.Linq;

namespace PingPong.API.Services
{
    public class Players
    {
		private readonly Data.PingPongContext Context;

        public Players(Data.PingPongContext context)
		{
			this.Context = context;
		}

		public List<Data.Player> Get(string search, int pageIndex, int pageCount)
		{
			var query = Context.Players.AsQueryable();

			if(string.IsNullOrWhiteSpace(search) == false)
			{
				query = query.Where(p => p.FirstName.Contains(search) || p.LastName.Contains(search));
			}

			var results = query.OrderBy(p => p.FirstName).Skip(pageIndex * pageCount).Take(pageCount).ToList();
		}
    }
}