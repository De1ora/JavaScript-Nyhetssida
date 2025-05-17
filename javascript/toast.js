export function showToast({
    title = "Success",
    message = "Something happened!",
    iconClass = "bx-check-circle",
    duration = 3000
}) {
    const toast = document.querySelector(".toast");
    const toastIcon = toast.querySelector("i");
    const toastTitle = toast.querySelector(".text-1");
    const toastMessage = toast.querySelector(".text-2");

    toastTitle.textContent = title;
    toastMessage.textContent = message;
    toastIcon.className = `bx ${iconClass}`;

    toast.classList.add("show");

    // Göm toasten efter duration
    setTimeout(() => {
        toast.classList.remove("show");
    }, duration);
}