import React from 'react';
import './MyInterviews.scss';
import { Link } from 'react-router-dom';
import CardInterview from '../../components/CardInterview';
import useFetch from '../../api/useFetch';

const MyInterviews = () => {
	const { data, isLoading, error } = useFetch('http://localhost:8000/interviews');

	return(
		<div className="container container--small">
			<header className="header mb-3">
				<h2>Mis entrevistas</h2>
			</header>

			{ isLoading && <div>'Cargando...'</div> }
			{ error && <div>{error}</div> }
			{	(data && !data.length) && <div>No tienes entrevistas agendadas. <Link to="/">Agendar una entrevista</Link></div>}
			{ data && data.map(interview => 
				<CardInterview interview={interview} key={interview.id} /> 
			) }
		</div>
	);
}

export default MyInterviews;