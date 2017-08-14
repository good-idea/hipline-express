const axios = require('axios');
const Qs = require('qs');
const { cms } = require('../config');
const mboClient = require('./mboClient');
const { HTMLToMarkdown } = require('../utils/data');

const apiRoot = `http://${cms.host}:${cms.port}/api`;

/**
 * Sync methods should get raw MBO data,
 * parse it, and POST it to the CMS
 */

const syncStaffInfo = () => (
	new Promise((resolve, reject) => {
		mboClient.getActiveStaff().then((staffData) => {
			const staff = staffData.map((i) => {
				if (i.Bio) i.Bio = HTMLToMarkdown(i.Bio);
				return i;
			});
			axios({
				method: 'post',
				url: `${apiRoot}/sync/staff`,
				data: Qs.stringify({ staff }),
			}).then((staffResponse) => {
				resolve(staffResponse.data);
			}).catch(err => reject(err));
		});
	})
);

const syncClassPasses = () => (
	new Promise((resolve, reject) => {
		mboClient.getPasses().then((passes) => {
			axios({
				method: 'post',
				url: `${apiRoot}/sync/passes`,
				data: Qs.stringify({ passes }),
			}).then((classResponse) => {
				resolve(classResponse.data);
			}).catch(err => reject(err));
		}).catch(mboErr => reject(mboErr));
	})
);

const syncClassDescriptions = () => (
	new Promise((resolve, reject) => {
		mboClient.getClasses(0, 4).then((classData) => {
			const classes = [];
			for (const classSource of classData) {
				if (classSource.ClassDescription !== undefined) {
					classSource.ClassDescription.Description = HTMLToMarkdown(classSource.ClassDescription.Description);
					if (!classes.find(c => c.ID === classSource.ClassDescription.ID)) classes.push(classSource.ClassDescription);
				}
			}
			axios({
				method: 'post',
				url: `${apiRoot}/sync/classes`,
				data: Qs.stringify({ classes }),
			}).then((classResponse) => {
				resolve(classResponse.data);
			}).catch(err => reject(err));
		}).catch(err => reject(err));
	})
);

const sync = () => (
	new Promise((resolve, reject) => {
		Promise.all([
			syncStaffInfo(),
			syncClassDescriptions(),
			syncClassPasses(),
		]).then(([
			staff,
			classes,
			passes,
		]) => {
			resolve({
				staff,
				classes,
				passes,
			});
		}).catch(err => reject(err));
	})
);

module.exports = sync;
