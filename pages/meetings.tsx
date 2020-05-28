import React, { useCallback } from 'react';
import dataLayout from '../components/Layouts/DataLayout';
import { LoginForm } from '../components/Forms/LoginForm';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { TableComponent } from '../components/TableComponent';
import { getMeeting } from '../actions';
import axios from 'axios';
import moment from 'moment';
import { Icon, Button, Input, Popup, Label, Dropdown } from 'semantic-ui-react';
import get from 'lodash/get';

const headers = [
	{
		id: 'date',
		name: 'Дата проведения',
		filterName: 'meetings.date',
		filter: Input,
		customRender: ({ date }) => moment.unix(date).lang('ru').format('LLL')
	},
	{
		id: 'interview.recruiter',
		dataItems: [ 'name', 'phone', 'email' ],
		name: 'Рекрутер',
		filterName: 'meetings.interview.recruiter.name',
		filter: Input
	},
	{
		id: 'interview.jobs.name',
		name: 'Вакансия',
		filterName: 'meetings.interview.jobs.name',
		filter: Input
	},
	{
		id: 'interview.stage.stage_name',
		name: 'Этап',
		filterName: 'meetings.interview.stage.stage_name',
		filter: Input
	},
	{
		id: 'interview.status.name',
		name: 'Статус',
		filterName: 'meetings.interview.status.name',
		filter: Input
	},
	{ id: 'actions', name: '', collapsing: true }
];

const Meetings = () => {
	const router = useRouter();
	const { meetings } = useSelector((state) => state);
	const dispatch = useDispatch();

	return (
		<TableComponent
			data={meetings}
			onUpdateData={getMeeting}
			headers={headers}
			idItem="id_meetings"
			getRowProps={({ interview: { status: { id_interview_stage_status } } }) => {
				const props: { warning?: boolean; negative?: boolean; positive?: boolean } = {};
				switch (id_interview_stage_status) {
					case 1:
						props.warning = true;
						break;
					case 2:
						props.positive = true;
						break;
					case 3:
						props.negative = true;
						break;
					default:
						break;
				}

				return props;
			}}
			actionAdd={
				<Button floated="right" icon labelPosition="left" primary size="small">
					<Icon name="user" /> Добавить соискателя
				</Button>
			}
			renderActionItem={(item) => (
				<div style={{ display: 'flex' }}>
					<Popup content={'Резюме соискателя'} trigger={<Button circular icon="address card outline" />} />
				</div>
			)}
		/>
	);
};

Meetings.actions = [ getMeeting ];
export default dataLayout()(Meetings);
