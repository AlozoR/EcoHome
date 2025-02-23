export const required = value => value ? undefined : 'Required';

export const email = value =>
	value && !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(value)
		? 'Invalid email address'
		: undefined;

export const passwordsMustMatch = (value, allValues) =>
	value !== allValues.mdp ?
		'Passwords do not match' :
		undefined;
