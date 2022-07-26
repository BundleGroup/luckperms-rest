import { LuckpermsClient } from "./index";

let client = new LuckpermsClient({
    url: 'http://localhost:9999',
    apiKey: 'abcd'
});

(async function main() {
    let test = await client.getUsers();
    console.log(test);
})()