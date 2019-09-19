using Microsoft.AspNetCore.Mvc;
using PingPong.Business.Services;

namespace PingPong.API.Controllers
{
	[Route("api/players")]
    public class PlayersController: Controller
    {
        IPlayersService PlayersService;

        public PlayersController(IPlayersService playersService)
		{
			PlayersService = playersService;
		}

		[HttpPost]
		public Business.Models.RequestResult Create([FromBody]Data.Player player)
		{
			return PlayersService.Create(player);
		}

		[HttpPost("GetPlayers")]
		public Business.Models.RequestResult GetPlayers([FromBody]Business.Models.Filter filter)
		{
			return PlayersService.Get(filter.Search, filter.PageIndex, filter.PageCount);
		}
    }
}