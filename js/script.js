document.addEventListener('DOMContentLoaded', async () => {
    const username = 'BryanGuevara'; //Usuario de Github
    const token = 'ApiKey'; //Token de la api de Github
    const badgeContentElement = document.getElementById('badge-content');
    
    async function getLanguageColors() {
        const response = await fetch('https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml');
        if (!response.ok) throw new Error(`Error fetching language colors: ${response.statusText}`);
        const yamlText = await response.text();
        
        const languagesData = jsyaml.load(yamlText);
        const languageColors = {};
        
        for (const [lang, data] of Object.entries(languagesData)) {
            if (data.color) {
                languageColors[lang] = data.color;
            }
        }
        
        return languageColors;
    }
    
    function parseYAML(yamlText) {
        return jsyaml.load(yamlText);
    }

    try {
        const languageColors = await getLanguageColors();
        
        console.log('Fetching repos...');
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`, {
            headers: {
                'Authorization': `token ${token}`
            }
        });
        if (!reposResponse.ok) throw new Error(`Error fetching repos: ${reposResponse.statusText}`);
        const repos = await reposResponse.json();

        const languages = {};

        for (const repo of repos) {
            console.log(`Fetching languages for repo: ${repo.name}`);
            const langResponse = await fetch(repo.languages_url, {
                headers: {
                    'Authorization': `token ${token}`
                }
            });
            if (!langResponse.ok) {
                console.error(`Error fetching languages for repo ${repo.name}: ${langResponse.statusText}`);
                continue;
            }
            const repoLanguages = await langResponse.json();
            console.log(`Languages for repo ${repo.name}:`, repoLanguages);

            for (const [lang, bytes] of Object.entries(repoLanguages)) {
                if (languages[lang]) {
                    languages[lang] += bytes;
                } else {
                    languages[lang] = bytes;
                }
            }
        }

        console.log('Languages detected:', languages);

        const totalBytes = Object.values(languages).reduce((a, b) => a + b, 0);
        
        if (totalBytes === 0) {
            badgeContentElement.innerHTML = 'No se encontraron datos.';
            return;
        }

        const sortedLanguages = Object.entries(languages).sort((a, b) => b[1] - a[1]);
        const topLanguages = sortedLanguages.slice(0, 100); 

        const languageRows = topLanguages.reduce((rows, [lang, bytes], index) => {
            const percentage = ((bytes / totalBytes) * 100).toFixed(2);
            const color = languageColors[lang] || "#cccccc"; 
            const item = `
                <div class="language-item">
                    <span class="language-name">${percentage}% - ${lang}</span>
                    <div class="language-bar" style="background-color: ${color}; width: ${percentage}%"></div>
                </div>
            `;
            const rowIndex = Math.floor(index / 100);
            rows[rowIndex] = rows[rowIndex] || [];
            rows[rowIndex].push(item);
            return rows;
        }, []);

        const html = languageRows.map(row => `
            <div class="language-row">${row.join('')}</div>
        `).join('');
        badgeContentElement.innerHTML = html;
    } catch (error) {
        console.error('Error:', error);
        badgeContentElement.innerHTML = 'Error al obtener datos';
    }
});
