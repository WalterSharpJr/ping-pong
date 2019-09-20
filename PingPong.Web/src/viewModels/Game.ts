export default interface Game
{
	id: string;
	playedOn: Date;
	player1: string;
	player2: string;
	player1Score: number;
	player2Score: number;
	winner: string;
}