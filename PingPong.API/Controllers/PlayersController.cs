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
    }
}