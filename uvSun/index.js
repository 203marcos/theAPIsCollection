document.getElementById("getUV").addEventListener("click", () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            try {
                const response = await fetch(
                    `/uv?lat=${latitude}&lng=${longitude}`
                );
                const data = await response.json();

                if (response.ok) {
                    const result = data.result; // Acesse a propriedade 'result'

                    // Calcular valores simplificados
                    const uvMax = result.uv_max;
                    const uvMin = result.uv; // Considerando o UV atual como mínimo
                    const uvAvg = ((uvMax + uvMin) / 2).toFixed(2);

                    // Determinar se é sol ou chuva
                    const weatherEmoji = uvMax > 3 ? "☀️ (Sol)" : "🌧️ (Chuva)";

                    // Exibir informações simplificadas
                    const uvResult = `
              <p><strong>UV Máximo:</strong> ${uvMax}</p>
              <p><strong>UV Mínimo:</strong> ${uvMin}</p>
              <p><strong>UV Médio:</strong> ${uvAvg}</p>
              <p><strong>Previsão:</strong> ${weatherEmoji}</p>
            `;
                    document.getElementById("uvResult").innerHTML = uvResult;
                } else {
                    document.getElementById(
                        "uvResult"
                    ).textContent = `Error: ${data.message}`;
                }
            } catch (error) {
                document.getElementById(
                    "uvResult"
                ).textContent = `Error: ${error.message}`;
            }
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});
