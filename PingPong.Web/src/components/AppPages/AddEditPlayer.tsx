import React, { FormEvent } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Player from '../../models/Player'
import Players from '../../services/Players'

import { faWalking } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class AddEditPlayer extends React.Component<{ player ?: Player, onPlayerAdded: () => void }, 
															{ modalShown: boolean, firstName: string, lastName: string, 
																validationErrors: { firstName: boolean, lastName: boolean } }>
{
	constructor(props)
	{
		super(props);

		this.state = {
			modalShown: false,
			firstName: this.props.player ? this.props.player.FirstName : "",
			lastName: this.props.player ? this.props.player.LastName : "",
			validationErrors: {
				firstName: false,
				lastName: false
			}
		}
	}

	handlePlayerDetailsChanged = (e: FormEvent) =>
	{
		var state = this.state;

		state[e.target['name']] = e.target['value'];

		this.setState(state);
	}

	handleFormSubmit = (e: FormEvent) =>
	{
		var state = this.state;

		state.validationErrors.firstName = (this.state.firstName.length == 0);
		state.validationErrors.lastName = (this.state.lastName.length == 0);

		this.setState(state);

		if(state.validationErrors.firstName || state.validationErrors.lastName)
		{
			return;
		}
		else	
		{
			//add or update the player
			if(this.props.player != null)
			{

			}
			else	
			{
				var player: Player = { FirstName: this.state.firstName, LastName: this.state.lastName }
				var players = new Players();
				
				players.AddPlayer(player).then((result) =>
				{
					this.props.onPlayerAdded();
					this.showModal(false);
				}).catch((error) =>
				{

				});
			}
		}		
	}

	showModal = (show: boolean) =>
	{
		this.setState({ modalShown: show });
	}

	render()
	{
		
		return (
			
			<Modal show={ this.state.modalShown } onHide={ () => { this.showModal(false) }} >
				<Form>
					<Modal.Header closeButton >
						<Modal.Title><FontAwesomeIcon style={{ marginRight: '10px' }} icon={ faWalking }></FontAwesomeIcon> { this.props.player ? 'Edit ' + this.state.firstName + ' ' + this.state.lastName : 'Add New Player' }</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group controlId="formFirstName">
							<Form.Label>First Name</Form.Label>
							<Form.Control onChange={ this.handlePlayerDetailsChanged } name="firstName" value={ this.state.firstName } required maxLength={64} type="text" />	
							{ this.state.validationErrors.firstName && <Form.Control.Feedback style={{ display: 'block' }} type="invalid">Please enter the player's first name.</Form.Control.Feedback>}
						</Form.Group>
						<Form.Group controlId="formLastName">
							<Form.Label>Last Name</Form.Label>
							<Form.Control onChange={ this.handlePlayerDetailsChanged } name="lastName" value={ this.state.lastName } required maxLength={64} type="text" />
							{ this.state.validationErrors.lastName && <Form.Control.Feedback style={{ display: 'block' }} type="invalid">Please enter the player's last name.</Form.Control.Feedback> }
						</Form.Group>  					
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