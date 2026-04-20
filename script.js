<script src="https://js.stripe.com/v3/"></script>

document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('stay-form');
    const confirmationMsg = document.getElementById('confirmation-msg');

    // Prevent past dates in the calendar
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('checkin').setAttribute('min', today);
    document.getElementById('checkout').setAttribute('min', today);

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const checkin = document.getElementById('checkin').value;
        const checkout = document.getElementById('checkout').value;
        const room = document.getElementById('room-select').options[document.getElementById('room-select').selectedIndex].text;

        if (checkout <= checkin) {
            alert("Check-out date must be after check-in date.");
            return;
        }

        // Simulate a booking confirmation
        confirmationMsg.style.display = 'block';
        confirmationMsg.innerHTML = `
            <strong>Success!</strong> Your reservation for <b>${room}</b> is confirmed.<br>
            Please remember: <strong>Pay at Property</strong> upon arrival. 
            We look forward to seeing you on ${checkin}!
        `;

        // Clear form
        bookingForm.reset();

        // Scroll to message
        confirmationMsg.scrollIntoView({ behavior: 'smooth' });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("photo-modal");
    const fullImg = document.getElementById("full-img");
    const captionText = document.getElementById("caption");
    const images = Array.from(document.querySelectorAll(".photo-grid img"));
    let currentIndex = 0;

    // Function to show a specific image
    const showImage = (index) => {
        if (index >= images.length) index = 0; // Loop to start
        if (index < 0) index = images.length - 1; // Loop to end

        currentIndex = index;
        fullImg.src = images[currentIndex].src;
        captionText.innerHTML = images[currentIndex].alt;
    };

    // Open modal on click
    images.forEach((img, index) => {
        img.onclick = function () {
            modal.style.display = "block";
            showImage(index);
        }
    });

    // Button Click Events
    document.getElementById("nextBtn").onclick = (e) => {
        e.stopPropagation(); // Prevents closing modal
        showImage(currentIndex + 1);
    };

    document.getElementById("prevBtn").onclick = (e) => {
        e.stopPropagation();
        showImage(currentIndex - 1);
    };

    // Keyboard Support (Left/Right Arrows and Esc)
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === "block") {
            if (e.key === "ArrowRight") showImage(currentIndex + 1);
            if (e.key === "ArrowLeft") showImage(currentIndex - 1);
            if (e.key === "Escape") modal.style.display = "none";
        }
    });

    // Close Modal
    document.querySelector(".close-modal").onclick = () => modal.style.display = "none";
    modal.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };
});

