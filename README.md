# hapi-drip
Makes the [Drip Node client](https://github.com/samudary/drip-nodejs) available through Hapi mechanisms.

> ONLY WORKS WITH HAPI V17+

## Install
`npm i hapi-drip`

OR

`yarn add hapi-drip`

## Usage 

Here's a very simple example:


### Registering the plugin

```js
  const server = new Hapi.Server()
  const plugin = {
    plugin: require('hapi-drip'),
    options: { accountId: 'your account id', token: 'your api token' }
  }

  await server.register(plugin)
```

### Accessing the plugin

The plugin is available at both `server.drip` and `request.drip`.

```js
  server.route({
    method: 'GET',
    path: '/',
    config: {
      handler: (request, h) => {
        
        const { drip } = request;

        await drip.recordEvent({
            events: [{
                email: 'ned@stark.org',
                action: 'Signed up'
            }]
        });
      }
    }
  })
```

## More information

For details on drip-nodejs, [click here](https://github.com/samudary/drip-nodejs).

For details on the Drip REST API, [click here](https://developer.drip.com/).
