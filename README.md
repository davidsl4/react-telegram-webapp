# React context for Telegram WebApp
This library can be used to create React UIs in use with the new Telegram WebApp feature.
This library use context to feed all your components with the current state of the Telegram props.

## Usage (with Component)
Wrap your components with a `TelegramWebApp` component.
It receives a `validateHash` function, which will be called to validate the hash received from Telegram.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { TelegramWebApp } from 'react-telegram-webapp';

async function validateHash(hash) {
    const response = await fetch(`/api/validate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hash }),
    });
    
    return response.ok;
}

ReactDOM.render(
  <TelegramWebApp validateHash={validateHash}>
    <MyComponent />
  </TelegramWebApp>,
  document.getElementById('root')
);
```

## Usage (with wrapper function)
You can also wrap your components with a `withTelegramWebApp` function.
It also receives a `validateHash` function, which will be called to validate the hash received from Telegram.

```js
import React from 'react';
import { withTelegramWebApp } from 'react-telegram-webapp';

function App() {
  return <MyComponent />;
}

async function validateHash(hash) {
    const response = await fetch(`/api/validate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hash }),
    });

    return response.ok;
}

export default withTelegramWebApp(App, {
    validateHash
});
```

## Useful hooks
`useStartParam` - return the [start params](https://core.telegram.org/bots/webapps#webappinitdata)
`useTelegramWebApp` - return the [TelegramWebApp](https://github.com/davidsl4/react-telegram-webapp/blob/ee7861dbfa9f42d42f1a200a33a47c11c59d4a87/src/Telegram/Telegram.d.ts#L4-L99) object
`useIsTelegramWebAppReady` - returns true if the TelegramWebApp is ready. You can use this to show loading screen


## Contribute
If you want to contribute to this library, please open an issue or pull request.
