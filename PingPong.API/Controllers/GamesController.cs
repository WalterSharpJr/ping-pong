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
    }
}