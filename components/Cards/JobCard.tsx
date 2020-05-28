import React, { useCallback, useState, Fragment } from 'react';
import axios from 'axios';
import { CardLayout } from '../Layouts/CardLayout';
import { Icon, Button, Input, Popup, Label, Dropdown } from 'semantic-ui-react';

const data = {
	header: { name: 'name', headerRender: (value) => `Карточка вакансии: ${value}` },
	items: [
		{ name: 'customer.name', label: 'Заказчик' },
		{
			name: 'customerRepresentatives',
			label: 'Контактное лицо заказчика',
			dataItems: [ 'name', 'phone', 'email' ]
		},
		{ name: 'recruiter', label: 'Ответственный специалист', dataItems: [ 'name', 'phone', 'email' ] },
		{
			name: 'skills',
			label: 'Требуемые навыки',
			customRender: ({ skills }) => {
				return (
					<div>
						{skills.map(({ id_skill, name }) => (
							<Label key={id_skill} as="a" basic>
								{name}
							</Label>
						))}
					</div>
				);
			}
		},
		{ name: 'grade.grade_name', label: 'Требуемый уровень кандидата' }
	]
};

export const JobCard = ({ children, initialFormData }) => {
	const handleDelete = useCallback(() => {
		return axios.delete('/api/jobs/' + initialFormData.id_job);
	}, []);

	return (
		<CardLayout initialFormData={initialFormData} model={data} onDelete={handleDelete}>
			{children}
		</CardLayout>
	);
};
