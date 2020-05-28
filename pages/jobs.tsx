import React, { useCallback } from 'react';
import dataLayout from '../components/Layouts/DataLayout';
import { LoginForm } from '../components/Forms/LoginForm';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { TableComponent } from '../components/TableComponent';
import { getJobs } from '../actions';
import axios from 'axios';
import { Icon, Button, Input, Popup, Label, Dropdown } from 'semantic-ui-react';
import get from 'lodash/get';
import { JobCard } from '../components/Cards/JobCard';

const headers = [
	{ id: 'name', name: 'Наименование вакансии', filterName: 'jobs.name', filter: Input },
	{
		id: 'customer.name',
		name: 'Заказчик',
		filterName: 'customers.name',
		filter: Input,
		additionalFilterName: 'customers.id_customer'
	},
	{
		id: 'customerRepresentatives',
		name: 'Контактное лицо',
		dataItems: [ 'name', 'phone', 'email' ],
		filterName: 'customerRepresentatives.name',
		filter: Input
	},
	{
		id: 'recruiter',
		name: 'Ответственный рекрутер',
		dataItems: [ 'name', 'phone', 'email' ],
		filterName: 'recruiter.name',
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

const Jobs = () => {
	const router = useRouter();
	const { jobs } = useSelector((state) => state);
	const dispatch = useDispatch();

	return (
		<TableComponent
			data={jobs}
			onUpdateData={getJobs}
			headers={headers}
			idItem="id_job"
			actionAdd={
				<Button floated="right" icon labelPosition="left" primary size="small">
					<Icon name="user" /> Добавить вакансию
				</Button>
			}
			renderActionItem={(item) => (
				<div style={{ display: 'flex' }}>
					<JobCard initialFormData={item}>
						<Popup
							content={'Карточка вакансии'}
							trigger={<Button circular icon="address card outline" />}
						/>
					</JobCard>
				</div>
			)}
		/>
	);
};

Jobs.actions = [ getJobs ];
export default dataLayout()(Jobs);
