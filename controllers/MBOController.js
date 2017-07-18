const mboClient = require('../utils/mbo');
const makeDate = require('../utils/date');
const moment = require('moment-timezone');

const MBOController = {
	getClasses: (req, res, next) => {
		mboClient.getClasses().then((response) => {
			const classResponse = [];
			for (const classSource of response.Classes.Class) {
				const classTime = moment.tz(classSource.StartDateTime, 'America/Los_Angeles');
				const newClass = {
					location: classSource.Location.Name,
					title: classSource.ClassDescription.Name,
					teacher: classSource.Staff.FirstName,
					start: classTime.format('dddd h:mm Z'),
				};
				classResponse.push(newClass);
			}
			return res.json(classResponse);
		}).catch(err => next(err));
	},
};

module.exports = MBOController;
