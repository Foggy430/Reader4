document.addEventListener("DOMContentLoaded", function() {
    const pdfInput = document.getElementById("pdfInput");
    const pdfContainer = document.getElementById("pdfContainer");

    pdfInput.addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const pdfData = e.target.result;
                const pdfBlob = new Blob([pdfData], { type: "application/pdf" });
                const pdfUrl = URL.createObjectURL(pdfBlob);

                const embed = document.createElement("embed");
                embed.src = pdfUrl;
                embed.type = "application/pdf";
                embed.width = "100%";
                embed.height = "100%"; // Измените на 100% для полного заполнения контейнера

                pdfContainer.innerHTML = "";
                pdfContainer.appendChild(embed);

                // Рассчитываем и устанавливаем высоту встроенного объекта
                const embedHeight = pdfContainer.offsetWidth * (3/4); // Пропорция 4:3
                embed.height = embedHeight + "px";
            };
            reader.readAsArrayBuffer(file);
        }
    });

    // Обновляем высоту встроенного объекта при изменении размеров окна
    window.addEventListener("resize", function() {
        const embed = pdfContainer.querySelector("embed");
        if (embed) {
            const embedHeight = pdfContainer.offsetWidth * (3/4);
            embed.height = embedHeight + "px";
        }
    });
});