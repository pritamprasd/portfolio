export async function getRepo(username:string, repoName: string) {
    const projectData = await fetch(`https://api.github.com/repos/${username}/${repoName}`)
                            .then(r => {
                                if (!r.ok) {
                                    throw new Error(` | ${r.text()}`);
                                }
                                return r;
                            })
                            .then(r => r.json())
                            .catch((e: Error) => {
                                console.error("Error: projectData: " + JSON.stringify(e));
                                alert("Error: " + e.message); //TODO: use notification type f=dialog
                            });
    return projectData;
}