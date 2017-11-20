const makeMBORequest = require('./makeMBORequest')

/**
 * Sale requests
 */

const getServices = function getServices() {
	return makeMBORequest({
		service: 'Sale',
		methodString: 'Sale_x0020_Service.Sale_x0020_ServiceSoap.GetServices',
		resultString: 'GetServicesResult.Services.Service',
		additionalParams: {
			SellOnline: true,
		},
	})
}

const getPackages = function getPackages() {
	return makeMBORequest({
		service: 'Sale',
		methodString: 'Sale_x0020_Service.Sale_x0020_ServiceSoap.GetPackages',
		resultString: 'GetPackagesResult.Packages.Package',
	})
}

const getProducts = function getProducts() {
	return makeMBORequest({
		service: 'Sale',
		methodString: 'Sale_x0020_Service.Sale_x0020_ServiceSoap.GetProducts',
		resultString: 'GetProductsResult',
		additionalParams: {
			SellOnline: true,
			PageSize: 100,
		},
	})
}

const getContracts = function getContracts() {
	return makeMBORequest({
		service: 'Sale',
		methodString: 'Sale_x0020_Service.Sale_x0020_ServiceSoap.GetContracts',
		resultString: 'GetContractsResult.Contracts.Contract',
		additionalParams: {
			LocationID: 2,
			SoldOnline: true,
		},
		withUserCredentials: true,
		forceArray: true,
	})
}

module.exports = {
	getServices,
	getPackages,
	getProducts,
	getContracts,
}
