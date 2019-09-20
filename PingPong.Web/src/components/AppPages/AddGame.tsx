import React, { FormEvent, RefObject } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Game from '../../models/Game'
import Games from '../../services/Games'
import RemoteSearchSelect from '../Utilities/RemoteSearchSelect'
import { faTableTennis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class AddGame extends React.Component<{ 	onGameAdded: () => void }, 
													 { 	modalShown: boolean, 
														game: Game,
														validationErrors: { noPlayer1: boolean, noPlayer2: boolean, 																			
																			duplicateScores: boolean, duplicatePlayers: boolean
																		} 
													 }>
{
	Player1SelectBox: RefObject<RemoteSearchSelect>;
	Player2SelectBox: RefObject<RemoteSearchSelect>;

	constructor(props)
	{
		super(props);

		this.Player1SelectBox = React.createRef();
		this.Player2SelectBox = React.createRef();

		this.state = {
			modalShown: false, 
			game: { Player1Id: "", Player1Score: "0", Player2Id: "", Player2Score: "0" },
			validationErrors: 
			{ 
				noPlayer1: false, noPlayer2: false, duplicateScores: false, duplicatePlayers: false
			} 
		}
	}

	handleGameDetailsChanged = (e: FormEvent) =>
	{
		var state = this.state;

		state.game[e.target['name']] = e.target['value'];

		this.setState(state);
	}

	handleFormSubmit = (e: FormEvent) =>
	{
		var player1 = this.Player1SelectBox.current.getSelection()[0];
		var player2 = this.Player2SelectBox.current.getSelection()[0];
		
		var state = this.state;

		//first make sure the players are selected
		state.validationErrors.noPlayer1 = (player1 === undefined);
		state.validationErrors.noPlayer2 = (player2 === undefined);
		
		this.setState(state);

		if(state.validationErrors.noPlayer1 || state.validationErrors.noPlayer2)
		{
			return;
		}

		//now make sure they arent the same
		state.validationErrors.duplicatePlayers = (player1.id === player2.id);
		state.validationErrors.duplicateScores = (state.game.Player1Score === state.game.Player2Score);
		
		this.setState(state);

		if(state.validationErrors.duplicatePlayers || state.validationErrors.duplicateScores)
		{
			return;
		}

		this.state.game.Player1Id = player1.id;
		this.state.game.Player2Id = player2.id;

		//we can add the game
		var games = new Games();

		games.AddGame(this.state.game).then((result) =>
		{
			this.props.onGameAdded();
			this.showModal(false);
		})
		.catch((error) =>
		{

		});		
	}

	showModal = (show: boolean) =>
	{
		this.setState({ modalShown: show });
	}

	processSelectData = (data) =>
	{
		return { 
			results: data.data.map(v => 
			{ 
				return { id: v.id, text: v.name } 
			})
		}
	}

	processSelectRequest = (params) =>
	{
		return { query: params.term }
	}

	render()
	{
		
		return (
			
			<Modal backdrop="static"  show={ this.state.modalShown } onHide={ () => { this.showModal(false) }} >
				<Form>
					<Modal.Header closeButton >
						<Modal.Title><FontAwesomeIcon style={{ marginRight: '10px' }} icon={ faTableTennis }></FontAwesomeIcon> Add New Game </Modal.Title>
					</Modal.Header>
					<Modal.Body id="addGameModal">						
						<Form.Group controlId="formPlayer1">
							<Form.Label>Player 1</Form.Label>
							<RemoteSearchSelect ref={this.Player1SelectBox} url="https://localhost:5001/api/players/search" placeholder="" 
											formatRequest={ this.processSelectRequest }
											processData={ this.processSelectData }
											parentId="addGameModal">
							</RemoteSearchSelect>
							{ this.state.validationErrors.noPlayer1 && <Form.Control.Feedback style={{ display: 'block' }} type="invalid">Please select player 1.</Form.Control.Feedback>}
						</Form.Group>
						<Form.Group controlId="formPlayer1Score">
							<Form.Label>Player 1 Score</Form.Label>
							<Form.Control value={ this.state.game.Player1Score } className="col-6" onChange={ this.handleGameDetailsChanged } name="Player1Score"  required min={0} type="number" />							
						</Form.Group>
						<hr />
						<Form.Group controlId="formPlayer2">
							<Form.Label>Player 2</Form.Label>
							<RemoteSearchSelect ref={this.Player2SelectBox} url="https://localhost:5001/api/players/search" placeholder="" 
											formatRequest={ this.processSelectRequest }
											processData={ this.processSelectData }
											parentId="addGameModal">
							</RemoteSearchSelect>
							{ this.state.validationErrors.noPlayer2 && <Form.Control.Feedback style={{ display: 'block' }} type="invalid">Please select player 2.</Form.Control.Feedback>}
						</Form.Group>
						<Form.Group controlId="formPlayer2Score">
							<Form.Label>Player 2 Score</Form.Label>
							<Form.Control value={ this.state.game.Player2Score } className="col-6" onChange={ this.handleGameDetailsChanged } name="Player2Score"  required min={0} type="number" />							
						</Form.Group>	
						{ this.state.validationErrors.duplicatePlayers && <Form.Control.Feedback style={{ display: 'block' }} type="invalid">A player cannot play themself.</Form.Control.Feedback>}
						{ this.state.validationErrors.duplicateScores && <Form.Control.Feedback style={{ display: 'block' }} type="invalid">Players cannot have the same score.</Form.Control.Feedback>}					
					</Modal.Body>
					<Modal.Footer>
						<Button variant="primary" type="button" onClick={ this.handleFormSubmit }>
            				Save
          				</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		);
	}
}