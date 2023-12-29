async function regSw () {
    if ('serviceWorker' in navigator) {
        let url = process.env.PUBLIC_URL + '/sw.js';
        const reg = await navigator.serviceWorker.register (url, {scope: '/'});
        return reg;
    }
    throw Error ('serviceworker not supported');
}

function arrayBufferToBase64(buffer) {
    const binary = new Uint8Array(buffer);
    const base64String = btoa(String.fromCharCode.apply(null, binary));
    return base64String.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

async function subscribe (serviceWorkerReg,clb) {
    let subscription = await serviceWorkerReg.pushManager.getSubscription ();
    if (subscription === null) {
        subscription = await serviceWorkerReg.pushManager.subscribe ({
            userVisibleOnly: true,
            applicationServerKey: 'BEKFLBjjnh7FmKEGMvlpjTTZYEVEobVcp_gpFwTojiiS3hTIH13djfRKAntMoa9KPa2_xpKM8omRsZaFcGu22RQ',
        });

    }

    clb({
        endpoint: subscription.endpoint,
        keys: {
            p256dh: arrayBufferToBase64(subscription.getKey('p256dh')),
            auth: arrayBufferToBase64(subscription.getKey('auth'))
        }
    })
}

export {regSw, subscribe};
