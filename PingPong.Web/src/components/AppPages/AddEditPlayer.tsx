import React, { FormEvent } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Player from '../../models/Player'

export default class AddEditPlayer extends React.Component<{ player ?: Player }, { modalShown: boolean, firstName: string, lastName: string }>
{
	constructor(props)
	{
		super(props);

		this.state = {
			modalShown: false,
			firstName: this.props.player ? this.props.player.FirstName : "",
			lastName: this.props.player ? this.props.player.LastName : ""
		}
	}

	handlePlayerDetailsChanged = (e: FormEvent) =>
	{
		var state = this.state;

		state[e.target['name']] = e.target['value'];

		this.setState(state);
	}

	showModal = (show: boolean) =>
	{
		this.setState({ modalShown: show });
	}

	render()
	{
		return (
			<Modal.Dialog>
				<Form>
					<Modal.Header closeButton>
						<Modal.Title> { this.props.player ? 'Edit ' + this.state.firstName + ' ' + this.state.lastName : 'Add New Player' }</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group controlId="formFirstName">
							<Form.Label>First Name</Form.Label>
							<Form.Control onChange={ this.handlePlayerDetailsChanged } name="firstName" value={ this.state.firstName } required maxLength={64} type="text" placeholder="Enter First Name" />	
							<Form.Control.Feedback type="invalid">Please enter the player's first name.</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="formLastName">
							<Form.Label>Last Name</Form.Label>
							<Form.Control onChange={ this.handlePlayerDetailsChanged } name="lastName" value={ this.state.lastName } required maxLength={64} type="text" placeholder="Enter Last Name" />
							<Form.Control.Feedback type="invalid">Please enter the player's last name.</Form.Control.Feedback>
						</Form.Group>						
					</Modal.Body>
					<Modal.Footer>
					
					</Modal.Footer>
				</Form>
			</Modal.Dialog>
		);
	}
}