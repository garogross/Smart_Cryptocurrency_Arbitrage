const PUBLIC_VAPID_KEY = 'BOXrn-dgo59XPsYiAPm3KqmJZ-tQPaoGm3C2a6eUmv4m24vjbVvEMK0lja6k72lfqpwOso0pNA2Lh2uE8930F5U';

const urlB64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

export const register = async (clb) => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        console.log("PushManager")

        navigator.serviceWorker
            .register(`${process.env.PUBLIC_URL}/service-worker.js`)
            .then(registration => {
                console.log("registration")
                registration.pushManager.getSubscription()
                    .then(subscription => {
                        console.log("subscription")
                        if(subscription) {
                            clb(subscription)
                        } else {
                            const applicationServerKey = urlB64ToUint8Array(PUBLIC_VAPID_KEY);
                            registration.pushManager
                                .subscribe({
                                    userVisibleOnly: true,
                                    applicationServerKey: applicationServerKey,
                                })
                                .then(newSubscription => {
                                   clb(newSubscription)
                                })
                                .catch(err => console.error(err))
                        }
                    }).catch(err => console.log(err));
            })
            .catch(error => console.error('Service Worker registration failed:', error));
    }
};
