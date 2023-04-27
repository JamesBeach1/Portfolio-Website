document.addEventListener("DOMContentLoaded", function () {
    const modals = document.querySelectorAll(".modal");
    const closeModal = document.querySelectorAll(".close-modal");
    const modalBtns = document.querySelectorAll(".modal-btn");

    // Open the modal
    modalBtns.forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const modal = document.querySelector(`#modal${index + 1}`);
            modal.style.display = "block";
            modal.animate([
                { opacity: 0 },
                { opacity: 1 }
            ], {
                duration: 500,
                easing: "ease-in-out"
            });
            showFirstSlide(modal); 
        });
    });

    // Close the modal when clicking the close button
    closeModal.forEach((btn) => {
        btn.addEventListener("click", () => {
            const modal = btn.closest(".modal");
            modal.style.display = "none";
        });
    });

    // Change slide function
    function changeSlide(direction, btn, slideshowContainer) {
        const slides = slideshowContainer.querySelectorAll(".slide");
        let slideIndex = parseInt(slideshowContainer.getAttribute("data-slide-index")) || 0;
        slideIndex += direction;

        if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        } else if (slideIndex >= slides.length) {
            slideIndex = 0;
        }

        slides.forEach((slide) => slide.style.display = "none");
        slides[slideIndex].style.display = "block";
        slideshowContainer.setAttribute("data-slide-index", slideIndex);
    }

    window.changeSlide = changeSlide;

    // Close the modal when clicking outside the modal content
    document.addEventListener("click", (e) => {
        modals.forEach((modal) => {
            const modalContent = modal.querySelector(".modal-content");
            if (!modalContent.contains(e.target) && modal.style.display === "block") {
                modal.style.display = "none";
            }
        });
    });

    // Function to show the first slide when the modal is opened
    function showFirstSlide(modal) {
        const slideshowContainer = modal.querySelector(".slideshow-container");
        const slides = slideshowContainer.querySelectorAll(".slide");
        slides.forEach((slide) => slide.style.display = "none");
        slides[0].style.display = "block";
        slideshowContainer.setAttribute("data-slide-index", 0);
    }
});