// nomDeLaPage?nomVariable=variable&nomVariable2=...

export function verifLogin(data) {
	// console.log('data', data);
	const url = 'http://192.168.1.83/ecohome/connexion.php' +
		`?mail=${data.login}` +
		`&mdp=${data.password}`;
	return fetch(url)
		.then((response) => response.json())
		.catch(error => console.log(error, url));
}

export function inscription(data) {
	const url = 'http://192.168.1.83/ecohome/inscription.php' +
		`?mail=${data.mail}` +
		`&tel=${data.tel}` +
		`&mdp=${data.mdp}`;
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

export function listAppareils(mail) {
	const url = 'http://192.168.1.83/ecohome/listAppareils.php' +
		`?mail=${mail}`;
	return fetch(url)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}

export function listUtilistations(mail, id_appareil = '0') {
	const url = 'http://192.168.1.83/ecohome/listUtilisations.php' +
		`?mail=${mail}` +
		`&id_appareil=${id_appareil}`;
	return fetch(url)
		.then((response) => response.json())
		.catch((error) => console.error(error));
}

export function economiesMois(mail, id_appareil = '0') {
	const url = 'http://192.168.1.83/ecohome/economiesMois.php' +
		`?mail=${mail}` +
		`&id_appareil=${id_appareil}`;
	return fetch(url)
		.then((response) => response.json())
		.catch((error) => console.error(error));
}

export function moyenneMoisPrecedents(mail) {
	const url = 'http://192.168.1.83/ecohome/moyenneMoisPrecedents.php' +
		`?mail=${mail}`;
	return fetch(url)
		.then((response) => response.json())
		.catch((error) => console.error(error));
}

export function sommeMoisPrecedent(mail) {
	const url = 'http://192.168.1.83/ecohome/sommeMoisPrecedents.php' +
		`?mail=${mail}`;
	return fetch(url)
		.then((response) => response.json())
		.catch((error) => console.error(error));
}

export function offreElec(mail) {
	const url = 'http://192.168.1.83/ecohome/offreElec.php' +
		`?mail=${mail}`;
	return fetch(url)
		.then((response) => response.json())
		.catch((error) => console.error(error));
}

export function joursUtilisation(mail, horaire_debut, horaire_fin, id_appareil) {
	const url = 'http://192.168.1.83/ecohome/joursUtilisation.php' +
		`?mail=${mail}` +
		`&horaire_debut=${horaire_debut}` +
		`&horaire_fin=${horaire_fin}` +
		`&id_appareil=${id_appareil}`;
	return fetch(url)
		.then((response) => response.json())
		.catch((error) => console.error(error));
}

export function listGenre() {
	const url = 'http://192.168.1.83/ecohome/listGenre.php';
	return fetch(url)
		.then((response) => response.json())
		.catch((error) => console.error(error));
}

export function listAppareilsGenre(genre) {
	const url = 'http://192.168.1.83/ecohome/listAppareilsGenre.php' +
		`?genre=${genre}`;
	return fetch(url)
		.then((response) => response.json())
		.catch((error) => console.error(error));
}
