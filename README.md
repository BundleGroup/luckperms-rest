# Luckperms Rest Client

Node.JS client for the Luckperms [rest-api](https://github.com/luckperms/rest-api) project.

## Installing

Using NPM:

```
$ npm install --save luckperms-rest
```

Using yarn:

```
$ yarn add luckperms-rest
```

## Example

```js
const { LuckpermsClient } = require("luckperms-rest");

let client = new LuckpermsClient({
    url: 'http://my-server:8080',
    apiKey: '<your API key>'
});

async function main() {
    let userList = await client.getUsers();
    for (const uuid of userList) {
        let user = await client.getUser(uuid);
        let flyNodes = user.nodes.filter(node => node.key === "essentials.fly");
        if (flyNodes.length) {
            await client.deleteUserNodes(uuid, flyNodes);
        }
    }
}
main();
```

## Documentation

See the [API Documentation](https://codingjwilliams.gitlab.io/luckperms-rest/).