document.addEventListener("DOMContentLoaded", () => {
  // Contact Form Submission
  const contactForm = document.querySelector("#contact form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get("name").trim();
      const email = formData.get("email").trim();
      const message = formData.get("message").trim();

      if (name && email && message) {
        animateThankYouMessage("Thank you for submitting the form!");
        contactForm.reset();
      } else {
        alert("Please fill out all required fields.");
      }
    });
  }

  // Newsletter Subscribe Form Submission
  const subscribeForm = document.querySelector(".footer-newsletter form");
  if (subscribeForm) {
    subscribeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = subscribeForm.querySelector("input[type='email']");
      if (emailInput && emailInput.value.trim() !== "") {
        animateThankYouMessage("Thank you for subscribing!");
        subscribeForm.reset();
      } else {
        alert("Please enter a valid email address.");
      }
    });
  }

  // Add animation on successful form submission
  function animateThankYouMessage(message) {
    const messageBox = document.createElement("div");
    messageBox.textContent = message;
    Object.assign(messageBox.style, {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding: "20px",
      backgroundColor: "rgba(0, 128, 0, 0.9)",
      color: "#fff",
      fontSize: "1.2em",
      borderRadius: "8px",
      zIndex: "1000",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      animation: "fadeOut 3s forwards",
    });

    document.body.appendChild(messageBox);
    setTimeout(() => messageBox.remove(), 3000);
  }

  // Apply fade-out animation for message box
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.textContent = `
    @keyframes fadeOut {
      0% { opacity: 1; }
      90% { opacity: 1; }
      100% { opacity: 0; }
    }
  `;
  document.head.appendChild(styleSheet);

  // Subscribe Button Animation
  const subscribeButton = document.querySelector(".footer-newsletter button");
  if (subscribeButton) {
    subscribeButton.addEventListener("mouseover", () => {
      subscribeButton.style.transform = "scale(1.1)";
      subscribeButton.style.transition = "transform 0.3s ease-in-out";
    });
    subscribeButton.addEventListener("mouseout", () => {
      subscribeButton.style.transform = "scale(1)";
    });
  }

  // Social Media Links Rotation Effect
  const socialMediaLinks = document.querySelectorAll(".social-media a");
  if (socialMediaLinks) {
    socialMediaLinks.forEach(link => {
      link.addEventListener("click", () => {
        link.style.transition = "transform 0.5s ease-in-out";
        link.style.transform = "rotate(360deg)";
        setTimeout(() => {
          link.style.transform = "rotate(0deg)";
        }, 500);
      });
    });
  }
});
