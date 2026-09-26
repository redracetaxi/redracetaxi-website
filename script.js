const form = document.getElementById("bookingForm");

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    // Get booking details
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const pickup = document.getElementById("pickup").value.trim();
    const drop = document.getElementById("drop").value.trim();
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    // Check whether all fields are filled
    if (!name || !phone || !pickup || !drop || !date || !time) {
        alert("Please fill all booking details.");
        return;
    }

    // Create booking object
    const bookingData = {
        name: name,
        phone: phone,
        pickup: pickup,
        drop: drop,
        date: date,
        time: time
    };

    try {

        // Send booking to backend
        const response = await fetch(
            "https://redracetaxi-backend.onrender.com/api/bookings",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(bookingData)
            }
        );

        const result = await response.json();

        // Check backend response
        if (!response.ok) {
            alert(result.message || "Booking failed.");
            return;
        }

        // WhatsApp booking message
        const message =
            "🚕 TAXI BOOKING REQUEST\n\n" +
            "Name: " + name + "\n" +
            "Phone: " + phone + "\n" +
            "Pickup: " + pickup + "\n" +
            "Drop: " + drop + "\n" +
            "Date: " + date + "\n" +
            "Time: " + time;

        // Your WhatsApp number
        const whatsappNumber = "918122455406";

        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(message);

        // Open WhatsApp
        window.open(whatsappURL, "_blank");

        // Success message
        alert("Taxi booking submitted successfully!");

        // Clear form
        form.reset();

    } catch (error) {

        console.error("Booking Error:", error);

        alert(
            "Unable to connect to the backend. " +
            "Please make sure the backend server is running."
        );
    }
});
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

menuToggle.addEventListener("click", function () {
    navigation.classList.toggle("active");
});
const navigationLinks = document.querySelectorAll("#navigation a");

navigationLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navigation.classList.remove("active");
    });
});