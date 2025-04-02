// Toast notification system
const toastSystem = {
  container: null,

  init() {
    // Create toast container if it doesn't exist
    if (!this.container) {
      this.container = document.createElement("div")
      this.container.className = "toast-container"
      document.body.appendChild(this.container)
    }
  },

  show(message, type = "info", duration = 3000) {
    this.init()

    // Create toast element
    const toast = document.createElement("div")
    toast.className = `toast toast-${type}`

    // Create message element
    const messageEl = document.createElement("span")
    messageEl.textContent = message

    // Create close button
    const closeBtn = document.createElement("button")
    closeBtn.className = "toast-close"
    closeBtn.innerHTML = "&times;"
    closeBtn.addEventListener("click", () => this.dismiss(toast))

    // Add elements to toast
    toast.appendChild(messageEl)
    toast.appendChild(closeBtn)

    // Add toast to container
    this.container.appendChild(toast)

    // Set timeout to dismiss
    setTimeout(() => this.dismiss(toast), duration)

    return toast
  },

  dismiss(toast) {
    if (!toast.classList.contains("dismissing")) {
      toast.classList.add("dismissing")
      toast.style.animation = "slideOut 0.3s ease-in forwards"

      // Remove after animation completes
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast)
        }
      }, 300)
    }
  },

  success(message, duration) {
    return this.show(message, "success", duration)
  },

  error(message, duration) {
    return this.show(message, "error", duration)
  },

  info(message, duration) {
    return this.show(message, "info", duration)
  },
}

// Replace the alert functions with toast notifications
function showError(message) {
  toastSystem.error(message)
}

function showSuccess(message) {
  toastSystem.success(message)
}

function showInfo(message) {
  toastSystem.info(message)
}

