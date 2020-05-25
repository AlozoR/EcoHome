// nomDeLaPage?nomVariable=variable&nomVariable2=...

export function verifLogin(data) {
	const url = `http://localhost/ecohome/connexion.php?mail=${data.login}
&mdp=${data.password}`;
	return fetch(url)
		.then((response) => response.json())
		.catch((error) => console.error(error));
}
