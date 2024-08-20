window.onscroll = function() {
    const stickyNav = document.querySelector('.sticky-nav');
    const banner = document.querySelector('.banner');
  
    if (window.pageYOffset > 50) {
        stickyNav.classList.add('shrink');
        banner.classList.add('low')
    } else {
        stickyNav.classList.remove('shrink');
        banner.classList.remove('low')
    }
};

// Function to type and erase text with a specific sequence
function typeAndErase(element, texts, delay = 100, eraseSpeed = 50, pause = 10000) {
    let index = 0;
    let textIndex = 0;
    let isErasing = false;

    function type() {
        if (index < texts[textIndex].length) {
            element.textContent += texts[textIndex].charAt(index);
            index++;
            setTimeout(type, delay);
        } else {
            isErasing = true;
            setTimeout(erase, pause); // Wait before starting to erase
        }
    }

    function erase() {
        if (index > 0) {
            element.textContent = element.textContent.slice(0, -1);
            index--;
            setTimeout(erase, eraseSpeed);
        } else {
            isErasing = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500); // Delay before typing next text
        }
    }

    type();
}

// Function to start the text effect
function skibidiEffect() {
    const flickerElements = document.querySelectorAll('[data-key="kanye"]');

    flickerElements.forEach(element => {
        // Start the effect with the specified texts and timing
        typeAndErase(element, ["KANYE WEST", "SKIBIDI"], 100, 50, 3000); // Customize delay, eraseSpeed, and pause as needed
    });
}

// Initialize the effect when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', skibidiEffect);
