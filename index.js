document.addEventListener("visibilitychange", function () {
  const favicon = document.getElementById("favicon");
  if (document.hidden) {
    favicon.href = "./images/sub-favicon.png";
  } else {
    favicon.href = "./images/favicon.png";
  }
});

const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    fetch("https://portfolio-fqij.onrender.com/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("loadingSpinner").style.display = "none";
        document.body.classList.remove("no-clicks");
    
        if (data.success) {
          // Show success modal
          let successModal = new bootstrap.Modal(
            document.getElementById("successModal")
          );
          successModal.show();
          contactForm.reset();
        } else {
          alert("Failed to send message. Please try again.");
        }
      })
      .catch((error) => {
        document.getElementById("loadingSpinner").style.display = "none";
        document.body.classList.remove("no-clicks");
    
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
    
    document.getElementById("loadingSpinner").style.display = "block";
    document.body.classList.add("no-clicks");
    
  });
});

window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

function revealOnScroll() {
  const elements = document.querySelectorAll(
    ".skill-card, .project-card, .education-card"
  );

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.classList.add("reveal");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
