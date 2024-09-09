document.addEventListener('DOMContentLoaded', async () => {
    const username = 'BryanGuevara'; //Usuario de Github
    const token = 'Api Key'; //Token de la api de Github
    const pinnedReposContainer = document.getElementById('pinned-repos');

    async function fetchPinnedRepos() {
        const query = `
        {
            user(login: "${username}") {
                pinnedItems(first: 6, types: REPOSITORY) {
                    edges {
                        node {
                            ... on Repository {
                                name
                                description
                                url
                                primaryLanguage {
                                    name
                                }
                                openGraphImageUrl
                            }
                        }
                    }
                }
            }
        }`;

        try {
            const response = await fetch('https://api.github.com/graphql', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query })
            });

            if (!response.ok) throw new Error(`Error fetching pinned repos: ${response.statusText}`);
            const data = await response.json();
            return data.data.user.pinnedItems.edges.map(edge => edge.node);
        } catch (error) {
            console.error('Error fetching pinned repositories:', error);
            pinnedReposContainer.innerHTML = 'Error al obtener los proyectos pinneados.';
        }
    }

    async function displayPinnedRepos() {
        const pinnedRepos = await fetchPinnedRepos();
        if (!pinnedRepos || pinnedRepos.length === 0) {
            pinnedReposContainer.innerHTML = 'No se encontraron proyectos pinneados.';
            return;
        }

        const repoHTML = pinnedRepos.map(repo => `
            <div class="proyecto">
                <a href="${repo.url}" target="_blank">Ver Proyecto en GitHub</a>
                <br>
                <h1>${repo.name}</h1>
                <img src="https://img.shields.io/github/languages/top/${username}/${repo.name}" alt="Lenguajes de ${repo.name}">
                <p>${repo.description || 'No hay descripción disponible.'}</p>
            </div>
        `).join('');

        pinnedReposContainer.innerHTML = repoHTML;
    }

    displayPinnedRepos();
});
