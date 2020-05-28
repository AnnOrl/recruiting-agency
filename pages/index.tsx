import React, { useCallback, useEffect, useState } from 'react';
import dataLayout from '../components/Layouts/DataLayout';
import { LoginForm } from '../components/Forms/LoginForm';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { TableComponent } from '../components/TableComponent';
import { getCurrentMeeting } from '../actions';
import axios from 'axios';
import moment from 'moment';
import { Icon, Button, Input, Grid, Pagination, Segment, Card } from 'semantic-ui-react';
import get from 'lodash/get';
import { SemanticCOLORS } from 'semantic-ui-react/dist/commonjs/generic';

const headers = [
	{
		id: 'date',
		name: 'Дата проведения',
		filterName: 'meetings.date',
		filter: Input,
		customRender: ({ date }) => moment.unix(date).lang('ru').format('LLL')
	},
	{
		id: 'interview.jobs.name',
		name: 'Вакансия',
		filterName: 'meetings.interview.jobs.name',
		filter: Input
	},
	{ id: 'actions', name: '', collapsing: true }
];

const Home = () => {
	const router = useRouter();
	const query: any = router.query;
	const [ page, setPage ] = useState(query.page || '1');
	const handlePaginationChange = useCallback((e, { activePage }) => setPage(activePage), []);
	const { currentMeetings: { data } } = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (data.page !== page) {
				getCurrentMeeting(dispatch, null, { page });
				router.replace({
					pathname: router.pathname,
					query: { ...router.query, page }
				});
			}
		},
		[ page ]
	);

	console.log(data);
	return (
		<div className="list-home">
			<Card.Group>
				{data.map(
					({
						id_calendar,
						date,
						description,
						meeting: { interview: { jobs: { name }, status: { id_interview_stage_status } }, jobSeeker }
					}) => {
						const statuses = [ 'red', 'green', 'yellow' ][id_interview_stage_status] as SemanticCOLORS;
						return (
							<Card key={id_calendar} color={statuses}>
								<Card.Content>
									<Card.Header>{name}</Card.Header>
									<Card.Meta>
										<span className="date">{moment.unix(date).lang('ru').format('LLL')}</span>
									</Card.Meta>
								</Card.Content>
								{jobSeeker && (
									<Card.Content extra>
										<p>
											<Icon name="user" /> {jobSeeker.name}
										</p>
										<p>
											<Icon name="mail" /> {jobSeeker.email}
										</p>
										<p>
											<Icon name="phone" /> {jobSeeker.phone}
										</p>
									</Card.Content>
								)}

								<Card.Content>
									<Card.Description>{description}</Card.Description>
								</Card.Content>
							</Card>
						);
					}
				)}
			</Card.Group>
			{data.countPages > 1 && (
				<Segment raised>
					<Pagination activePage={page} totalPages={data.countPages} onPageChange={handlePaginationChange} />
				</Segment>
			)}
		</div>
	);
};

Home.actions = [ getCurrentMeeting ];
export default dataLayout()(Home);
