document.getElementById("getActivity").addEventListener("click", async () => {
    const type = document.getElementById("type").value.trim(); // Remove espaços em branco
    const participants = document.getElementById("participants").value.trim(); // Remove espaços em branco

    let query = "/activity";
    if (type || participants) {
        query += "?";
        if (type) query += `type=${type}&`;
        if (participants) query += `participants=${participants}`;
    }

    try {
        const response = await fetch(query);
        const data = await response.json();

        if (response.ok) {
            // Verifica se a resposta é um array
            let activity;
            if (Array.isArray(data)) {
                // Seleciona um item aleatório do array
                activity = data[Math.floor(Math.random() * data.length)];
            } else {
                activity = data; // Caso não seja um array, usa o objeto diretamente
            }

            const activityResult = `
                <p><strong>Activity:</strong> ${activity.activity}</p>
                <p><strong>Type:</strong> ${activity.type}</p>
                <p><strong>Participants:</strong> ${activity.participants}</p>
                <p><strong>Price:</strong> ${activity.price}</p>
                <p><strong>Duration:</strong> ${activity.duration}</p>
                <p><strong>Kid Friendly:</strong> ${
                    activity.kidFriendly ? "Yes" : "No"
                }</p>
                <p><strong>Accessibility:</strong> ${activity.accessibility}</p>
                <p><strong>Link:</strong> <a href="${
                    activity.link
                }" target="_blank">${activity.link}</a></p>
            `;
            document.getElementById("activityResult").innerHTML =
                activityResult;
        } else {
            document.getElementById(
                "activityResult"
            ).textContent = `Error: ${data.message}`;
        }
    } catch (error) {
        document.getElementById(
            "activityResult"
        ).textContent = `Error: ${error.message}`;
    }
});
