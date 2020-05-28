import React, { useCallback } from 'react';
import dataLayout from '../components/Layouts/DataLayout';
import { LoginForm } from '../components/Forms/LoginForm';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { TableComponent } from '../components/TableComponent';
import { getSeekers } from '../actions';
import axios from 'axios';
import { Icon, Button, Input, Popup, Label, Dropdown } from 'semantic-ui-react';
import get from 'lodash/get';
import { JobCard } from '../components/Cards/JobCard';

const headers = [
	{ id: 'name', name: 'Кандидат', filterName: 'seekers.name', filter: Input },
	{
		id: 'phone',
		name: 'Телефон',
		filterName: 'seekers.phone',
		filter: Input,
		filterProps: { className: 'filter-phone' }
	},
	{ id: 'email', name: 'Электронная почта', filterName: 'seekers.email', filter: Input },
	{
		id: 'prevGrade.grade_name',
		name: 'Предварительный уровень',
		filterName: 'prevGrade.grade_name',
		filter: Input
	},
	{
		id: 'confirmedGrade.grade_name',
		name: 'Подтвержденный уровень',
		filterName: 'confirmedGrade.grade_name',
		filter: Input
	},
	{
		id: 'skills',
		name: 'Навыки',
		filter: ({ name, onChange, value }) =>
			value ? (
				<Label image>
					{value}
					<Icon
						name="delete"
						onClick={() => {
							onChange(null, { name: 'skills.name', value: '' });
						}}
					/>
				</Label>
			) : null,
		filterName: 'skills.name',
		customRender: ({ skills }, handleFilterChande) => {
			return (
				<div className="tags">
					{skills.map(({ id_skill, name }) => (
						<Label
							key={id_skill}
							as="a"
							basic
							onClick={() => handleFilterChande(null, { name: 'skills.name', value: name })}
						>
							{name}
						</Label>
					))}
				</div>
			);
		}
	},
	{ id: 'actions', name: '', collapsing: true }
];

const Seekers = () => {
	const router = useRouter();
	const { seekers } = useSelector((state) => state);
	const dispatch = useDispatch();

	return (
		<TableComponent
			data={seekers}
			onUpdateData={getSeekers}
			headers={headers}
			idItem="id_job_seekers"
			actionAdd={
				<Button floated="right" icon labelPosition="left" primary size="small">
					<Icon name="user" /> Добавить соискателя
				</Button>
			}
			renderActionItem={(item) => (
				<div style={{ display: 'flex' }}>
					<JobCard initialFormData={item}>
						<Popup
							content={'Резюме соискателя'}
							trigger={<Button circular icon="address card outline" />}
						/>
					</JobCard>
				</div>
			)}
		/>
	);
};

Seekers.actions = [ getSeekers ];
export default dataLayout()(Seekers);
