const user = 'Esmeralda280506';
const url = `https://api.github.com/users/${user}`;
//Cargar perfil
const cargarPerfil = async () => {
    //espewramos la respuesta de la API
    const res = await fetch(url);
    const data = await res.json();

    //actualizamos el contenido del perfil
    document.getElementById('profile-card').innerHTML = `
        <img src="${data.avatar_url}" class="avatar-profile" alt="Avatar">
        <h1>${data.name || user}</h1>
         <p>${data.bio || 'Software Developer'}</p>
        <span> ${data.location || 'Remote'}</span>
    `
};
//caragr repositorios
const cargarRepos = async () => {
    //definimos los parámetros de la consulta
    const params = new URLSearchParams({
        sort: 'updated',
    });

    //esperamos la respuesta de la API
    const res = await fetch(`${url}/repos?${params}`);
    const repos = await res.json();

    //actualizamos el contenido de los repositorios
    const container = document.getElementById('repos-list');
    container.innerHTML = repos.map(repo => `
        <article class="repo-card">
            <h3>${repo.name}</h3>
            <p>${repo.description || 'Sin descripción disponible'}</p>
            <div class="stats">
                <span>⭐ ${repo.stargazers_count}</span>` +
        //`<span>🍴 ${repo.forks_count}</span>`+
        `</div>
            <a href="${repo.html_url}" target="_blank">Ver Proyecto</a>
        </article>
    `).join('');
}

//cargar seguidores
const cargarseguidores = async () => {
    //esperamos la respuesta de la API
    const res = await fetch(`${url}/followers?per_page=5`);
    const followers = await res.json();

    //actualizamos el contenido de los seguidores si no hay seguidores mostramos un mensaje de carga
    const container = document.getElementById('followers-list');
    if (followers.length === 0) {
        container.innerHTML = '<p>Buscando seguidores...</p>';
        return;
    }
    //actualizamos el contenido de los seguidores si hay seguidores mostramos su información
    container.innerHTML = followers.map(f => `
    <a href="${f.html_url}" target="_blank">
        <img src="${f.avatar_url}" class="follower-img">
        <span>${f.login}</span>
    </a>
`).join('');

}
//inicializamos la aplicación cargando el perfil, los repositorios y los seguidores
cargarPerfil();
cargarRepos();
cargarseguidores();