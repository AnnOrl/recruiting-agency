import React, { useCallback, useState, useEffect } from 'react';
import { Button, Header, Segment, Form, Message } from 'semantic-ui-react';

const defaultError = {
	header: '',
	content: ''
};

export const FormLayout = ({ fields, onSubmit, error: errorProps = defaultError, initialFormData }) => {
	const initialFormState = fields.reduce((acc, { name, fields: childFields }) => {
		return {
			...acc,
			...childFields
				? childFields.reduce(
						(accChild, { name }) => ({
							...accChild,
							[name]: (initialFormData && initialFormData[name]) || ''
						}),
						{}
					)
				: { [name]: (initialFormData && initialFormData[name]) || '' }
		};
	}, {});

	const [ formData, setFormData ] = useState(initialFormState);
	const [ error, setError ] = useState(defaultError);
	const handleSubmit = useCallback(
		() => {
			onSubmit(formData).catch(() => {
				setFormData(initialFormState);
				setError(errorProps);
			});
		},
		[ formData ]
	);

	const handleChange = useCallback(
		(e, { name, value }) => {
			error.content && setError(defaultError);
			setFormData({ ...formData, [name]: value });
		},
		[ error, formData ]
	);

	return (
		<Form onSubmit={handleSubmit}>
			{fields.map(({ Component, name, label, fields, params = {} }) => {
				if (fields) {
					return (
						<Form.Group widths="equal" key={name}>
							{fields.map(({ Component, name, label, params = {} }) => (
								<Component
									key={name}
									name={name}
									label={label}
									{...params}
									onChange={handleChange}
									value={formData[name]}
								/>
							))}
						</Form.Group>
					);
				}
				return (
					<Component
						key={name}
						label={label}
						name={name}
						{...params}
						onChange={handleChange}
						value={formData[name]}
					/>
				);
			})}
			{error && error.content && <Message error header={error.header} content={error.content} />}
			<Button primary>Сохранить</Button>
		</Form>
	);
};
