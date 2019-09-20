using System;

namespace PingPong.Business.Services
{
    public interface IPlayerRanker
    {
         bool RankPlayers(Guid JobId);
    }
}