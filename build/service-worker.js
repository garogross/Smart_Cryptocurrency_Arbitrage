self.addEventListener('push', event => {
    const {body} = event.data.json()
    const options = {
        body,
        icon: "./icon.png"
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});
