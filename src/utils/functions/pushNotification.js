import * as serviceWorkerRegistration from "../../serviceWorkerRegistration";


export const subscribePush = (clb) => {
    Notification.requestPermission().then(type => {
        if (type === "granted") {
            serviceWorkerRegistration.register(clb);
        }
    })
}