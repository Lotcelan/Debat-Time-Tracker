// Script pour gérer les participants et les chronomètres
let participants = [];

function setupParticipants() {
    const participantCount = parseInt(document.getElementById('participantCount').value);

    if (participantCount > 0) {
        const participantsList = document.getElementById('participantsList');
        participantsList.innerHTML = '';

        for (let i = 0; i < participantCount; i++) {
            const participantName = prompt(`Nom du participant ${i + 1}:`);
            participants.push({ name: participantName, time: 0 });

            const li = document.createElement('li');
            li.innerHTML = `${participantName}: <span class="timer">0s</span>`;
            li.onclick = () => toggleTimer(i);
            participantsList.appendChild(li);
        }
    }
}

function toggleTimer(index) {
    const participant = participants[index];
    const timerElement = document.getElementsByClassName('timer')[index];

    if (!participant.running) {
        participant.running = true;
        participant.startTime = Date.now() - participant.time;
        participant.interval = setInterval(() => {
            const currentTime = Date.now();
            participant.time = currentTime - participant.startTime;
            updateTimerDisplay(timerElement, participant.time);
        }, 100);

    } else {
        participant.running = false;
        clearInterval(participant.interval);
 updateTimerDisplay(timerElement, participant.time);	
    }
}

function updateTimerDisplay(timerElement, time) {
    const seconds = Math.floor(time / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes > 0) {
        timerElement.textContent = `${minutes} min, ${remainingSeconds} sec`;
    } else {
        timerElement.textContent = `${remainingSeconds} sec`;
    }
}