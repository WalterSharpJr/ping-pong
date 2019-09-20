# ping-pong
PingPong is a web application that ranks ping pong players and is  built with .Net Core, React and PostgreSQL.

## Installation

1. Install Prerequisites:

	a. Download and install the [.Net Core SDK](https://dotnet.microsoft.com/download)

	b. Download and install [Node.js](https://nodejs.org/en/download/)

	c. Download and install [PostgreSQL](https://www.postgresql.org/download/)

2. Clone this repo:
	> git clone https://github.com/WalterSharpJr/ping-pong.git

	>cd ping-pong

3. Prepare the database:
	
	a. Ensure the design time service has the correct connection string (We'll need this to run migrations on the DB):
		
	Open up `./PingPong.Data/PingPongDesignTimeContext.cs` and change `line 14`, setting the `Username` and `Password` attributes to authenticate with your PostgreSQL server:
	
		optionsBuilder.UseNpgsql("Host=localhost;Database=PingPong;Username=[Username];Password=[Password];");

	b. Update the database by running the following 2 commands:
	
	> cd ./PingPong.Data

	> dotnet ef database update

	c. Ensure the API has access to your database by updating the `Main` connection string in `./PingPong.API/appsettings.Development.json`

4. Start the API server by running the following commands:

	> cd ../PingPong.API

	> dotnet run

5. Start the web client by running:
	
	> cd ../PingPong.Web

	> npm install

	> npm start

### Running Tests

Test cases can be run with the follwoing commands:
	
> cd ./PingPong.Business.Tests

> dotnet test