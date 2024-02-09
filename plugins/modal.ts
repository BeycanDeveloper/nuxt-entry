import Swal from 'sweetalert2'

function open(title: string, icon: 'info'|'warning'|'error'|'success', html?: string|undefined) {
    return Swal.fire({
        title,
        icon,
        html,
        didOpen: () => {
            Swal.hideLoading();
        }
    });
}

function close() {
    Swal.close();
}

function info(message: string, html?: string|undefined) {
    return open(message, 'info', html);
}
function warning(message: string, html?: string|undefined) {
    return open(message, 'warning', html);
}

function error(message: string, html?: string|undefined) {
    return open(message, 'error', html);
}

function success(message: string, html?: string|undefined) {
    return open(message, 'success', html);
}

function waiting(title: string, html?: string|undefined) {
    Swal.fire({
        title,
        html,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
}

type Modal = {
    open: typeof open,
    close: typeof close,
    info: typeof info,
    warning: typeof warning,
    error: typeof error,
    success: typeof success,
    waiting: typeof waiting
}

declare module "#app" {
    interface NuxtApp {
        $modal: Modal;
    }
}

const modal: Modal = {
    open,
    close,
    info,
    warning,
    error,
    success,
    waiting
}

export default defineNuxtPlugin((nuxtApp) => {
    return { provide: { modal } }
})