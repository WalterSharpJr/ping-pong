import React from 'react'
import Modal from 'react-bootstrap/Modal'

export default class AddGame extends React.Component
{
	render()
	{
		return (
			<Modal.Dialog>
				<Modal.Header closeButton>
					<Modal.Title>Modal title</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<p>Modal body text goes here.</p>
				</Modal.Body>

				<Modal.Footer>
					
				</Modal.Footer>
			</Modal.Dialog>
		);
	}
}