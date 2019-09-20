using Microsoft.AspNetCore.Mvc;
using PingPong.Business.Services;

namespace PingPong.API.Controllers
{
	[Route("api/games")]
    public class GamesController: Controller
    {
		IGamesService GamesService;

        public GamesController(IGamesService gamesService)
		{
			GamesService = gamesService;
		}

		[HttpPost]
		public Business.Models.RequestResult Create([FromBody]Data.Game game)
		{
			return GamesService.Create(game);
		}

		[HttpPost("GetGames")]
		public Business.Models.RequestResult GetGames([FromBody]Business.Models.Filter filter)
		{
			return GamesService.Get(filter.Search, filter.PageIndex, filter.PageCount);
		}
    }
}