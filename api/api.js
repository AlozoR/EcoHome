// nomDeLaPage?nomVariable=variable&nomVariable2=...

export function verifLogin(data) {
	// console.log('data', data);
	const url = `http://192.168.1.83/ecohome/connexion.php?mail=${data.login}` +
		`&mdp=${data.password}`;
	return fetch(url)
		.then(response => response.json())
		.catch(error => console.log(error, url));
}

export function inscription(data) {
	const url = `http://192.168.1.83/ecohome/inscription.php?mail=${data.mail}` +
		`&tel=${data.tel}&mdp=${data.mdp}`;
	fetch(url)
		.catch(error => console.error(error));
}

export function existenceMail(mail) {
	const url = 'http://192.168.1.83/ecohome/existenceUtilisateur.php' +
		`?mail=${mail}`;
	return fetch(url)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}

export function existenceTel(tel) {
	const url = 'http://192.168.1.83/ecohome/existenceUtilisateur.php' +
	`?tel=${tel}`;
	return fetch(url)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}

export function listUtilisation() {

}
