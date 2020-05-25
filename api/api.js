// nomDeLaPage?nomVariable=variable&nomVariable2=...

export function verifLogin(data) {
	// console.log('data', data);
	const url = `http://192.168.1.83/ecohome/connexion.php?mail=${data.login}` +
		`&mdp=${data.password}`;
	return fetch(url)
		.then((response) => response.json())
		.catch((error) => console.log(error, url));
}

export function inscription() {

}

export function existenceUtilisateur(mail) {
	const url = `http://192.168.1.83/ecohome/connexion.php?mail=${mail}`;
	fetch(url)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}
