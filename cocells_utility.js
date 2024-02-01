function tabFunc(event, tabName) {
  var i, tabWindow, tablinks;

  // Hide all tab windows
  tabWindow = document.getElementsByClassName("tabWindow");
  for (i = 0; i < tabWindow.length; i++) {
    tabWindow[i].style.display = "none";
  }

  // Remove the "openedTab" class from all tab links
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("openedTab");
  }

  // Display the selected tab window
  document.getElementById(tabName).style.display = "block";

  // Add the "openedTab" class to the clicked tab link
  event.currentTarget.classList.add("openedTab");
}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    var dragWindow = elmnt.querySelector(".dragElWind");
    var header = elmnt.querySelector(".dragElHeader");
    var main = elmnt.querySelector(".dragElMain");

    if (header) {
        header.onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    // Set additional styles
    elmnt.style.overflow = 'auto';
    elmnt.style.position = 'absolute';
    elmnt.style.resize = 'both';
    header.style.position = 'sticky';
    header.style.top = 0;
    header.style.zIndex = 1;
    dragWindow.style.transition = 'width 0s, height 0s';

    function createOverlay() {
        var overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = 0;
        overlay.style.right = 0;
        overlay.style.bottom = 0;
        overlay.style.left = 0;
        overlay.style.opacity = 0;
        overlay.style.zIndex = 2;
        document.body.appendChild(overlay);
        return overlay;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;

        // Create transparent overlay for drag
        var dragOverlay = createOverlay();

        document.onmouseup = function() {
            // Remove overlay for drag
            if (dragOverlay.parentNode) {
                dragOverlay.parentNode.removeChild(dragOverlay);
            }

            closeDragElement();
        };
        document.onmousemove = elementDrag;

        // Add resize event listener
        window.addEventListener("resize", handleResize);
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        // Calculate new position
        var newTop = elmnt.offsetTop - pos2;
        var newLeft = elmnt.offsetLeft - pos1;

        // Check if the element is going outside the screen boundaries
        var maxX = window.innerWidth - elmnt.offsetWidth;
        var maxY = window.innerHeight - elmnt.offsetHeight;

        // Adjust position to keep it within the visible area
        elmnt.style.top = Math.max(0, Math.min(newTop, maxY)) + "px";
        elmnt.style.left = Math.max(0, Math.min(newLeft, maxX)) + "px";
    }

    function handleResize() {
        // Create transparent overlay for resize
        var resizeOverlay = createOverlay();

        // Remove overlay for resize after a short delay
        setTimeout(function() {
            if (resizeOverlay.parentNode) {
                resizeOverlay.parentNode.removeChild(resizeOverlay);
            }
        }, 200);
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;

        // Remove resize event listener
        window.removeEventListener("resize", handleResize);
    }
}

// Apply dragElement to all elements with class "dragElWind"
var draggableElements = document.querySelectorAll(".dragElWind");
draggableElements.forEach(function (element) {
    dragElement(element);
});

// Cocell's Show Hide Script
function CShowHide(arg) {
    var args = arg.split(', ');
    var targetId = args[0];
    var displayValue = args[1];

    var targetElement = document.getElementById(targetId);

    if (targetElement) {
        if (targetElement.style.display === 'none' || getComputedStyle(targetElement).display === 'none') {
            targetElement.style.display = displayValue;
        } else {
            targetElement.style.display = 'none';
        }
    }
}

// Close Parent Script
function closeParent(elementId) {
    if (elementId) {
        var specificElement = document.getElementById(elementId);
        if (specificElement) {
            specificElement.style.display = 'none';
        } else {
            console.error("Element with ID " + elementId + " not found.");
        }
    } else {
        var parentElement = this.parentElement;

        if (parentElement) {
            parentElement.style.display = 'none';
        }
    }
}
  
// Darkmode Script
function darkmode() {
    try {
        const body = document.body;
        body.classList.toggle('dark');

        const isDarkModeEnabled = body.classList.contains('dark');
        localStorage.setItem('darkMode', isDarkModeEnabled);
    } catch (error) {
        console.error("An error occurred while toggling dark mode:", error);
    }
}

window.onload = function () {
    try {
        const savedDarkMode = localStorage.getItem('darkMode');
        const body = document.body;

        if (savedDarkMode === null) {
            const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

            if (prefersDarkMode) {
                body.classList.add('dark');
                localStorage.setItem('darkMode', true);
            }
        } else {
            if (savedDarkMode === 'true') {
                body.classList.add('dark');
            }
        }
    } catch (error) {
        console.error("An error occurred during dark mode initialization:", error);
    }
};


// Fullscreen Script
function fullscreen() {
    try {
        var docElement = document.documentElement;

        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
            if (docElement.requestFullscreen) {
                docElement.requestFullscreen();
            } else if (docElement.mozRequestFullScreen) {
                docElement.mozRequestFullScreen();
            } else if (docElement.webkitRequestFullscreen) {
                docElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            } else if (docElement.msRequestFullscreen) {
                docElement.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    } catch (error) {
        console.error("An error occurred while toggling fullscreen:", error);
    }
}

function openImageModal() {
  var modalImages = document.querySelectorAll('.modal-image');

  modalImages.forEach(function(modalImage) {
    modalImage.style.cursor = 'pointer'; // Set cursor to pointer for modal images

    modalImage.addEventListener('click', function() {
      var imageUrl = this.getAttribute('src');

      // Background container
      var backgroundContainer = document.createElement('div');
      backgroundContainer.className = 'modal-image-background-container';

      // Modal container
      var modalContainer = document.createElement('div');
      modalContainer.className = 'modal-image-container';

      // Image element
      var imageElement = document.createElement('img');
      imageElement.src = imageUrl;
      imageElement.alt = 'Modal Image';

      // Append image to modal container
      modalContainer.appendChild(imageElement);

      // Append modal container to background container
      backgroundContainer.appendChild(modalContainer);

      // Append background container to body
      document.body.appendChild(backgroundContainer);

      // Apply styles to the modal elements
      backgroundContainer.style.display = 'flex';
      backgroundContainer.style.position = 'fixed';
      backgroundContainer.style.top = '0';
      backgroundContainer.style.left = '0';
      backgroundContainer.style.bottom = '0';
      backgroundContainer.style.right = '0';
      backgroundContainer.style.width = '100%';
      backgroundContainer.style.height = '100%';
      backgroundContainer.style.background = '#00000098';
      backgroundContainer.style.justifyContent = 'center';
      backgroundContainer.style.alignItems = 'center';
      backgroundContainer.style.zIndex = '9999999999'; // You might want to adjust this value
      backgroundContainer.style.transition = 'background 0.5s';
      backgroundContainer.style.cursor = 'zoom-out';

      modalContainer.style.maxWidth = '80%';
      modalContainer.style.maxHeight = '80%';
      modalContainer.style.transform = 'scale(0)';
      modalContainer.style.transition = 'transform 0.25s';

      imageElement.style.width = '100%';
      imageElement.style.height = 'auto';
      imageElement.style.cursor = 'zoom-out';

      // Open modal with zoom effect
      setTimeout(function() {
        backgroundContainer.style.background = '#000000cc';
        modalContainer.style.transform = 'scale(1.2)'; // Start with zoomed-in scale
        setTimeout(function() {
          modalContainer.style.transform = 'scale(1)'; // Animate to normal scale
        }, 180); // Adjust the time based on your preference
      }, 10);

      // Close modal on background click with zoom out effect
      backgroundContainer.addEventListener('click', closeModal);

      // Close modal on Escape key press
      document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
          closeModal();
        }
      });

      // Prevent mouse scroll while the modal is open
      document.body.style.overflow = 'hidden';

      function closeModal() {
        backgroundContainer.style.background = '#00000000';
        modalContainer.style.transform = 'scale(0)';
        setTimeout(function() {
          backgroundContainer.style.display = 'none';
          // Remove the modal elements when the background is clicked or Escape key is pressed
          document.body.removeChild(backgroundContainer);
        }, 300);

        // Allow mouse scroll when the modal is closed
        document.body.style.overflow = 'auto';
      }
    });
  });
}

// Call the function to set up modal functionality
openImageModal();


function processReadMoreElements() {
    const readMoreElements = document.querySelectorAll('[cc-read-more="true"]');

    readMoreElements.forEach((element) => {
        const content = element.innerHTML.trim(); // Use innerHTML instead of textContent or innerText
        const readMoreLimit = element.getAttribute('cc-read-more-rn') || 50;

        const words = content.split(/(\s+)/);

        if (words.length > readMoreLimit * 2) {
            const truncatedContent = words.slice(0, readMoreLimit * 2).join('');

            const truncatedSpan = document.createElement('span');
            truncatedSpan.innerHTML = truncatedContent;

            const remainingSpan = document.createElement('span');
            remainingSpan.innerHTML = words.slice(readMoreLimit * 2).join('');
            remainingSpan.style.display = 'none';

            const toggleButton = document.createElement('button');
            toggleButton.textContent = 'Show More';
            toggleButton.style.cursor = 'pointer';
            toggleButton.style.border = 'none';
            toggleButton.style.textAlign = 'center';
            toggleButton.style.textDecoration = 'none';
            toggleButton.style.display = 'inline';
            toggleButton.style.padding = '2px';
            toggleButton.style.borderRadius = '4px';

            toggleButton.style.cssText += `
                background: #D8D8D8 !important;
                color: black !important;
            `;

            
            toggleButton.addEventListener('click', () => {
                remainingSpan.style.display = remainingSpan.style.display === 'none' ? 'inline' : 'none';
                toggleButton.textContent = remainingSpan.style.display === 'none' ? 'Show More' : 'Show Less';
            });

            element.innerHTML = '';
            element.appendChild(truncatedSpan);
            element.appendChild(remainingSpan);
            element.appendChild(toggleButton);
        }
    });
}

processReadMoreElements();


// Copy Text OnClick Function
function copyText(copyEl) {
  let textToCopy;

  if (copyEl === undefined || copyEl === null) {
    console.error("Invalid element provided");
    return;
  }

  if (typeof copyEl === 'string') {
    const elementById = document.getElementById(copyEl);

    if (!elementById) {
      console.error(`Element with ID '${copyEl}' not found`);
      return;
    }

    textToCopy = elementById.textContent || elementById.innerText;
  } else if (copyEl instanceof Element) {
    textToCopy = copyEl.textContent || copyEl.innerText;
  } else {
    console.error("Invalid parameter provided");
    return;
  }
  
  const tempTextarea = document.createElement("textarea");
  tempTextarea.value = textToCopy;
  document.body.appendChild(tempTextarea);
  tempTextarea.select();
  tempTextarea.setSelectionRange(0, 99999); /* For mobile devices */
  document.execCommand("copy");
  document.body.removeChild(tempTextarea);
  console.log(`Text copied to clipboard: ${textToCopy}`);
}

// Close Elements Function
function closeEl(element) {
  if (element === undefined || element === null) {
    const parent = this.parentElement;
    if (parent) {
      parent.style.display = "none";
    } else {
      console.error("Parent element not found");
    }
  } else if (typeof element === 'string') {
    const elementById = document.getElementById(element);

    if (!elementById) {
      console.error(`Element with ID '${element}' not found`);
      return;
    }

    elementById.style.display = "none";
  } else {
    const parent = element.parentElement;
    if (parent) {
      parent.style.display = "none";
    } else {
      console.error("Parent element not found");
    }
  }
}

// Show Elements Function
function showEl(elementId, displayValue = 'block') {
  const element = document.getElementById(elementId);

  if (!element) {
    console.error(`Element with ID '${elementId}' not found`);
    return;
  }

  element.style.display = displayValue;
}
