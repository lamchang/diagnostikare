import React from 'react';
import { Card } from 'react-bootstrap';

const CardInterview = ({interview}) => {
	return(
		<Card className="mb-3">
			<Card.Header>
				Entrevista agendada
			</Card.Header>
			<Card.Body>
				<Card.Title>Paciente: {interview.name}</Card.Title>
				<Card.Subtitle className="mb-1">Fecha: {interview.interviewDate}</Card.Subtitle>
				<Card.Subtitle>Hora: {interview.interviewHour} Hrs.</Card.Subtitle>
			</Card.Body>
		</Card>
	);
}

export default CardInterview;