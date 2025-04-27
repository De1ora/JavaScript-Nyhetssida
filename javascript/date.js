function updateCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    const today = new Date();
    dateElement.textContent = today.toDateString();
}

document.addEventListener('DOMContentLoaded', updateCurrentDate);