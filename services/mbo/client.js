const makeMBORequest = require('./makeMBORequest')

/**
 * General Client Requests
 */

const getRequiredFields = () => makeMBORequest({
	service: 'Client',
	methodString: 'Client_x0020_Service.Client_x0020_ServiceSoap.GetRequiredClientFields',
	resultString: 'GetRequiredClientFieldsResult.RequiredClientFields',
})

const getReferralTypes = () => makeMBORequest({
	service: 'Client',
	methodString: 'Client_x0020_Service.Client_x0020_ServiceSoap.GetClientReferralTypes',
	resultString: 'GetClientReferralTypesResult.ReferralTypes',
})


/**
 * Client Auth & Registration Requests
 */

const loginUser = ({ Username, Password }) => makeMBORequest({
	service: 'Client',
	methodString: 'Client_x0020_Service.Client_x0020_ServiceSoap.ValidateLogin',
	resultString: 'ValidateLoginResult',
	additionalParams: { Username, Password },
})

const registerUser = clientInfo => makeMBORequest({
	service: 'Client',
	methodString: 'Client_x0020_Service.Client_x0020_ServiceSoap.AddOrUpdateClients',
	resultString: 'AddOrUpdateClientsResult.Clients',
	additionalParams: {
		XMLDetail: 'Full',
		Clients: [
			{
				Client: clientInfo,
			},
		],
	},
})

const forgotPassword = ({ Username, FirstName, LastName }) => makeMBORequest({
	service: 'Client',
	methodString: 'Client_x0020_Service.Client_x0020_ServiceSoap.SendUserNewPassword',
	resultString: 'SendUserNewPasswordResult',
	additionalParams: {
		UserFirstName: FirstName,
		UserLastName: LastName,
		UserEmail: Username,
	},
})


/**
 * User Account/Info requests
 */

const getUserByID = ({ UniqueID }) => makeMBORequest({
	service: 'Client',
	methodString: 'Client_x0020_Service.Client_x0020_ServiceSoap.GetClients',
	resultString: 'GetClientsResult.Clients.Client',
	additionalParams: {
		XMLDetail: 'Full',
		PageSize: 1000,
		ClientIDs: [{ string: UniqueID.toString() }],
	},
})

const getAccountSchedule = ({ UniqueID }) => makeMBORequest({
	service: 'Client',
	methodString: 'Client_x0020_Service.Client_x0020_ServiceSoap.GetClientSchedule',
	resultString: 'GetClientScheduleResult.Visits.Visit',
	additionalParams: {
		ClientID: UniqueID,
		EndDate: new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 14)).toISOString(),
	},
	forceArray: true,
})

const getAccountPurchases = ({ UniqueID }) => makeMBORequest({
	service: 'Client',
	methodString: 'Client_x0020_Service.Client_x0020_ServiceSoap.GetClientPurchases',
	resultString: 'GetClientPurchasesResult.Purchases.SaleItem',
	additionalParams: {
		ClientID: UniqueID,
		StartDate: new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 100)).toISOString(),
	},
	forceArray: true,
})

const getAccountServices = ({ UniqueID }) => makeMBORequest({
	service: 'Client',
	methodString: 'Client_x0020_Service.Client_x0020_ServiceSoap.GetClientServices',
	resultString: 'GetClientServicesResult.ClientServices.ClientService',
	additionalParams: {
		ClientID: UniqueID,
		ProgramIDs: [
			{ int: [22, 29, 31, 32, 33, 36, 37, 38] }, // TODO, 'getAllProgramIDs'
		],
	},
	withUserCredentials: true,
	forceArray: true,
})

const getAccountBalances = ({ UniqueID }) => makeMBORequest({
	service: 'Client',
	methodString: 'Client_x0020_Service.Client_x0020_ServiceSoap.GetClientAccountBalances',
	resultString: 'GetClientAccountBalancesResult',
	forceArray: true,
	additionalParams: {
		ClientID: UniqueID,
	},
})

const getAccountMemberships = ({ UniqueID }) => makeMBORequest({
	service: 'Client',
	methodString: 'Client_x0020_Service.Client_x0020_ServiceSoap.GetActiveClientMemberships',
	resultString: 'GetActiveClientMembershipsResult.ClientMemberships.ClientMembership',
	forceArray: true,
	additionalParams: {
		ClientID: UniqueID,
	},
})

const getAccountContracts = ({ UniqueID }) => makeMBORequest({
	service: 'Client',
	methodString: 'Client_x0020_Service.Client_x0020_ServiceSoap.GetClientContracts',
	resultString: 'GetClientContractsResult.Contracts.ClientContract',
	forceArray: true,
	additionalParams: {
		ClientID: UniqueID,
	},
})

module.exports = {
	getRequiredFields,
	getReferralTypes,
	//
	loginUser,
	registerUser,
	forgotPassword,
	//
	getUserByID,
	getAccountSchedule,
	getAccountPurchases,
	getAccountServices,
	getAccountBalances,
	getAccountMemberships,
	getAccountContracts,
}
