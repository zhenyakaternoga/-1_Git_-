const subscriptions = [
    "1111",
    "2222",
    "3333"
];

let events = JSON.parse(localStorage.getItem("events")) || [
    {
        id: 1,
        date: "2026-06-10",
        type: "Йога",
        places: 10
    },
    {
        id: 2,
        date: "2026-06-11",
        type: "Кроссфит",
        places: 5
    },
    {
        id: 3,
        date: "2026-06-12",
        type: "Плавание",
        places: 8
    }
];

let selectedEvent = null;

function showEvents(list) {

    const block =
        document.getElementById("events");

    block.innerHTML = "";

    list.forEach(event => {

        block.innerHTML += `
        <div>

            <b>${event.type}</b><br>

            Дата: ${event.date}<br>

            Свободных мест:
            ${event.places}<br>

            <button
            onclick="chooseEvent(${event.id})">
            Записаться
            </button>

            <hr>

        </div>
        `;
    });
}

showEvents(events);

function filterEvents() {

    const date =
        document.getElementById("dateFilter").value;

    const type =
        document.getElementById("typeFilter").value;

    const places =
        document.getElementById("placesFilter").value;

    const filtered =
        events.filter(event =>

            (!date || event.date === date) &&
            (!type || event.type === type) &&
            (!places || event.places >= places)

        );

    showEvents(filtered);
}

document
    .getElementById("dateFilter")
    .addEventListener("input", filterEvents);

document
    .getElementById("typeFilter")
    .addEventListener("change", filterEvents);

document
    .getElementById("placesFilter")
    .addEventListener("input", filterEvents);

function chooseEvent(id) {

    selectedEvent =
        events.find(
            event => event.id === id
        );

    document
        .getElementById("registerBlock")
        .style.display = "block";
}

function registerEvent() {

    const number =
        document.getElementById("subscription")
            .value;

    if (!subscriptions.includes(number)) {

        alert("Абонемент не оплачен");

        return;
    }

    if (selectedEvent.places <= 0) {

        alert("Свободных мест нет");

        return;
    }

    selectedEvent.places--;

    localStorage.setItem(
        "events",
        JSON.stringify(events)
    );

    document.cookie =
        "subscription=" + number;

    showEvents(events);

    startAnimation();
}

function startAnimation() {

    document.getElementById("animation")
        .style.display = "block";

    setTimeout(() => {

        document.getElementById("clock")
            .style.display = "none";

        document.getElementById("success")
            .style.display = "block";

    }, 2000);

}