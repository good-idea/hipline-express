const soap = require('strong-soap').soap;


const config = {
	apiRoot: 'https://api.mindbodyonline.com/0_5/',
};

const endpoints = {
	ClassService: 'ClassService.asmx',
};

const SourceCredentials = {
	SourceName: process.env.MBO_SOURCENAME,
	Password: process.env.MBO_SECRET,
	SiteIDs: {
		int: ['-99'],
	},
};


module.exports = {
	getClasses: () => new Promise((resolve, reject) => {
		soap.createClient(`${config.apiRoot}/${endpoints.ClassService}?wsdl`, {}, (err, client) => {
			if (err) reject(err);

			client.setEndpoint(`${config.apiRoot}/${endpoints.ClassService}`);

			const params = {
				Request: {
					SourceCredentials,
				},
			};

			client.Class_x0020_Service.Class_x0020_ServiceSoap.GetClasses(params, (errs, result) => {
				if (errs) {
					console.log(errs);
				} else {
					console.log('got them');
					resolve(result.GetClassesResult);
				}
			});
		});
	}),
};
