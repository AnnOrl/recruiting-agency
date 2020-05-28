export const withPagination = async ({ req, res, repo, params }) => {
	const take = req.query.take || 10;
	const page = req.query.page || 1;

	const [ result, total ] = await repo.findAndCount({
		take,
		skip: (page - 1) * take,
		...params
	});

	return res.send({
		data: result,
		count: total,
		countPages: Math.ceil(total / take),
		page
	});
};

export const withSort = async (req, res, repo, params) => {
	const sortColumn = req.query.sortColumn || 'name';
	const sortDirection = req.query.sortDirection || 'ASC';

	const [ result, total ] = await repo.findAndCount({
		order: { [sortColumn]: sortDirection },
		...params
	});

	return res.send({
		data: result,
		sort: {
			sortDirection,
			sortColumn
		}
	});
};

export const withSortAndPagination = async (req, res, repo, defaultSort, whereCustom = { query: '', filters: {} }) => {
	const take = req.query.take || 10;
	const page = req.query.page || '1';
	const sortColumn = req.query.sortColumn || defaultSort.name;
	const sortDirection = req.query.sortDirection || defaultSort.direction;
	const filter = JSON.parse(req.query.filter || '{}');
	const where = whereCustom;

	Object.keys(filter).forEach((filterName, index) => {
		where.query = (index === 0 ? '' : ' and ') + `${filterName} like :${filterName}`;
		where.filters = { ...where.filters, [filterName]: `%${filter[filterName]}%` };
	});

	const [ result, total ] = await repo
		.take(take)
		.skip((page - 1) * take)
		.where(where.query, where.filters)
		.orderBy(sortColumn, sortDirection)
		.getManyAndCount();

	return res.send({
		data: result,
		count: total,
		countPages: Math.ceil(total / take),
		page,
		sort: {
			sortDirection,
			sortColumn
		},
		filter
	});
};
