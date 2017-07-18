const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

module.exports = (input) => {
	const newDate = (input instanceof Date) ? input : new Date(input);

	newDate.printDay = () => weekdays[newDate.getDay()];

	return newDate;
};
