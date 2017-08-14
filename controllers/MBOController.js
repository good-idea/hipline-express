const mboClient = require('./mboClient');
const moment = require('moment-timezone');

const initial = (req, res, next) => {
	return res.json({cool: true})
}

const getStaff = (req, res, next) => {
	mboClient.getActiveStaff().then(response => res.json(response))
		.catch(err => next(err));
};

const getClasses = (req, res, next) => {
	const week = req.query.week || 0;
	const length = req.query.length || 1;
	mboClient.getClasses(week, length).then((classes) => {
		const classResponse = [];
		for (const classSource of classes) {
			const startTime = moment.tz(classSource.StartDateTime, 'America/Los_Angeles');
			const endTime = moment.tz(classSource.EndDateTime, 'America/Los_Angeles');
			const newClass = {
				siteID: classSource.Location.SiteID,
				location: classSource.Location.Name,
				title: classSource.ClassDescription.Name,
				teacher: classSource.Staff.FirstName,
				isCanceled: classSource.IsCanceled,
				isWaitListAvailable: classSource.IsWaitListAvailable,
				isAvailable: classSource.isAvailable,
				startTime,
				endTime,
			};
			classResponse.push(newClass);
		}
		return res.json(classResponse);
	}).catch(err => next(err));
};

const readMBO = (req, res, next) => {
	const method = req.params.method;
	if (mboClient[method]) {
		mboClient[method]().then(response => res.json(response));
	} else {
		res.status(400);
		return res.json({
			message: `${method} is not a valid method`,
		});
	}
};

module.exports = { initial, getStaff, getClasses, readMBO };
