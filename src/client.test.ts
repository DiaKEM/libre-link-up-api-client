import { LibreLinkUpClient } from './client';

(async function () {
  const username = 'USERNAME';
  const password = 'PASSWORD';
  const libreClient = LibreLinkUpClient({
    username,
    password,
    connectionIdentifier: 'IDENTIFIER',
  });

  const data = await libreClient.read();
  console.log(data);
})();
