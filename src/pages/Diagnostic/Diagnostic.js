import React, { useEffect, useState } from 'react';
import './Diagnostic.scss';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Form, Button, Alert } from 'react-bootstrap';

const Diagnostic = () => {
	const [step, setStep] = useState(1);
	const [data, setData] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [submmit, setSubmmit] = useState(false);
	const phoneValidation = /^(?:(?:(?:\((\d+)\))\s)?(?:[0-9]{8,})|(?:(?:\((\d+)\))\s))?(?:[0-9]{8,})?(?:\s(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
	const { register, handleSubmit, formState: { errors } } = useForm();

	const onSubmit = form => {
		console.log(Object.keys(errors).length)
		// If there aren't erros...
		if(!Object.keys(errors).length) {
			setData({...form});
			if(step === 3) {
				setSubmmit(true);
				return;
			}
			setStep((step + 1));
		}
	};

	const isInvalid = (err) => {
		if(err) {
			return 'is-invalid';
		}
		return '';
	}

	useEffect(() => {
		if(step === 3) {
			setIsLoading(true);
			fetch('http://localhost:8000/interviews', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			})
			.then(res => {
				if(!res.ok) {
					throw Error("No fue posible guardar la información.");
				}
				return res.json()
			})
			.then(data => {
				setStep(step + 1);
				setError(null);
				setIsLoading(false);
			})
			.catch(err => {
				setError(err);
				setIsLoading(false);
			});
		}
		
	}, [submmit]);

	return(
		<div className="container container--small">
			<header className="header">
					{/* <img src={logo} alt="Diagnostikare" /> */}
					<h2>Pre-diagnóstico médico</h2>
					<p>Realiza un pre-diagnóstico médico en 3 pasos.</p>
			</header>

			<section className="section">
					<Form onSubmit={handleSubmit(onSubmit)}>
						{ step === 1 && 
							<div className="form">
								<div className="form-header mb-3">
									<h2>1. Información personal</h2>
									<p>Completa la información para continuar.</p>
									<small>* Todos los campos son obligatorios.</small>
								</div>
								<div className="form-body">
									<Form.Group className="mb-3" controlId="formEmail">
										<Form.Label>Nombre completo*</Form.Label>
										<Form.Control
											type="text"
											name="name"
											placeholder="Ingresa tu nombre"
											className={isInvalid(errors?.name)}
											{...register('name', { required: true })}
										/>
										<Form.Control.Feedback type="invalid">
											{ errors?.name?.type === 'required' && 'Campo obligatorio.' }
										</Form.Control.Feedback>
									</Form.Group>

									<Form.Group className="mb-3" controlId="formBirthday">
										<Form.Label>Fecha de nacimiento*</Form.Label>
										<Form.Control
											type="date"
											name="birthday"
											placeholder="Ingresa tu fecha de nacimiento"
											className={isInvalid(errors?.birthday)}
											{...register('birthday', { required: true, message: 'Este campo es obligatorio.' })}
										/>
										<Form.Control.Feedback type="invalid">
											{ errors?.birthday?.type === 'required' && 'Campo obligatorio.' }
										</Form.Control.Feedback>
									</Form.Group>

									<Form.Group className="mb-3" controlId="formPhone">
										<Form.Label>Teléfono*</Form.Label>
										<Form.Control
											type="text"
											name="phone"
											placeholder="Ingresa tu número celular"
											className={isInvalid(errors?.phone)}
											{...register('phone', { required: true, min: 10, maxLength: 10, minLength: 10, pattern: phoneValidation })}
										/>
										<Form.Control.Feedback type="invalid">
											{ errors?.phone?.type === 'required' && 'Campo obligatorio.' }
											{ (errors?.phone?.type === 'minLength' || errors?.phone?.type === 'maxLength' || errors?.phone?.type === 'min') && 'El número debe ser de 10 dígitos.' }
											{ errors?.phone?.type === 'pattern' && 'No es un número válido.' }
										</Form.Control.Feedback>
									</Form.Group>
									<Button className="w-100" variant="primary" type="submit">Siguiente</Button>
								</div>
							</div>
						}

						{ step === 2 && 
							<div className="form">
								<div className="form-header mb-3">
									<h2>2. Síntomas</h2>
									<p>Completa la información para continuar.</p>
									<small>* Todos los campos son requeridos.</small>
								</div>
								<div className="form-body">
									<Form.Group className="mb-3" controlId="formSymptom">
										<Form.Label>Síntomas*</Form.Label>
										<Form.Control
											as="textarea"
											name="symptom"
											rows={3}
											placeholder="Ingresa tus síntomas"
											className={isInvalid(errors?.symptom)}
											{...register('symptom', { required: true })}
										/>
										<Form.Control.Feedback type="invalid">
											{ errors?.symptom?.type === 'required' && 'Campo obligatorio.' }
										</Form.Control.Feedback>
									</Form.Group>

									<Button className="w-100" variant="primary" type="submit">Siguiente</Button>
								</div>
							</div>
						}

						{step === 3 && 
							<div className="form">
								<div className="form-header mb-3">
									<h2>3. Agenda una entrevista con un doctor</h2>
									<p>Completa la información para continuar.</p>
									<small>* Todos los campos son requeridos.</small>
								</div>
								<div className="form-body">
									<Form.Group className="mb-3" controlId="formSymptom">
										<Form.Label>Fecha de entrevista*</Form.Label>
										<Form.Control
											type="date"
											name="interviewDate"
											min="2021-09-06"
											className={isInvalid(errors?.interviewDate)}
											{...register('interviewDate', { required: true })}
										/>
										<Form.Control.Feedback type="invalid">
											{ errors?.interviewDate?.type === 'required' && 'Campo obligatorio.' }
										</Form.Control.Feedback>
									</Form.Group>

									<Form.Group className="mb-3" controlId="formHour">
										<Form.Label>Hora*</Form.Label>
										<Form.Select
											aria-label="Hora"
											name="interviewHour"
											className={isInvalid(errors?.interviewHour)}
											{...register('interviewHour', { required: true })}
										>
											<option disabled readOnly defaultValue value=''>Selecciona una opción</option>
											<option value="9:00">9:00</option>
											<option value="10:00">10:00</option>
											<option value="11:00">11:00</option>
											<option value="12:00">12:00</option>
										</Form.Select>
										<Form.Control.Feedback type="invalid">
											{ errors?.interviewHour?.type === 'required' && 'Campo obligatorio.' }
										</Form.Control.Feedback>
									</Form.Group>

									<Button className="w-100" variant="primary" type="submit">Finalizar</Button>
								</div>
							</div>
						}

						{ (step === 4 && !isLoading ) &&
						<div>
								<Alert variant="success">
									<Alert.Heading>Tu entrevista ha sido agendada :)</Alert.Heading>
									<p>Puedes consultar tus entrevistas en el siguiente enlace:</p>
									<Link to="/mis-entrevistas">Mis entrevistas</Link>
								</Alert>
						</div>
						}

						{ isLoading && <div>'Cargando...'</div> }
						{ error && <div>{error}</div> }
					</Form>
			</section>
		</div>
	);
}

export default Diagnostic;