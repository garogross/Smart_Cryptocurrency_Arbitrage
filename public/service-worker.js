self.addEventListener('push', event => {
    const {body,title} = event.data.json()
    const options = {
        body,
        icon: "./icon.png"
    };
    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});