// client/main.js

    function urlBase64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }

    const publicVapidKey = "BNtquwU2qtVWLH1ucaFFBV-VPNgTy6Hd7i2nOWTdikop8IedlJn52xt2hniou7gqgxGVaLOge3Rk3JDre5Zr1bY";

    const triggerPush = document.querySelector('#alertitas');

    var sub2;

    async function triggerPushNotification() {
      if ('serviceWorker' in navigator) {
        const register = await navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        });
        var subscription ;

        navigator.serviceWorker.ready
            .then(function(serviceWorkerRegistration) {
                subscription=serviceWorkerRegistration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
                });
                return subscription;
            })
            .then(function(subscription) {console.log(subscription.endpoint);
                sub2=subscription;
            });



        await fetch('http://localhost:5000/subscribe', {
          method: 'POST',
          body: JSON.stringify(sub2),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        console.error('Service workers are not supported in this browser');
      }
    }

    triggerPush.addEventListener('change', () => {
      triggerPushNotification().catch(error => console.error(error));
    });