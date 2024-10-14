export const title = "Github - @m4llu";
export const backgroundColor = "#0d1117";
export const foregroundColor = "#c9d1d9";
export const content = `
    <h2>@m4llu</h2>
    <p>I'm a 17 year old software development student from Finland.</p>
    <p>Here are some of the public projects from my GitHub.</p>
    <div id="projects">
        Loading projects...
    </div>
`;

async function fetchProjects() {
    try {
        const response = await fetch('https://api.github.com/users/m4llu/repos');
        const projects = await response.json();
        displayProjects(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        document.getElementById('projects').innerText = 'Failed to load projects.';
    }
}

function displayProjects(projects) {
    const projectsContainer = document.getElementById('projects');
    projectsContainer.innerHTML = projects.map(project => `
        <div class='project-card'>
            <h3>${project.name}</h3>
            <p>${project.description || 'No description available'}</p>
            <a href="${project.html_url}" target="_blank">View on GitHub</a>
        </div>
    `).join('');
}

fetchProjects();