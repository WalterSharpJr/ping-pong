export default interface Game
{
	Id: string;
	PlayedOn: Date;
	Player1: string;
	Player2: string;
	Player1Score: number;
	Player2Score: number;
	Winner: string;
}