import { LibreLinkUpClient } from './client';

(async function () {
  const username = 'USERNAME';
  const password = 'PASSWORD';
  const version = '4.9.0';
  const libreClient = LibreLinkUpClient({
    username,
    password,
    version,
    connectionIdentifier: 'IDENTIFIER',
  });

  const data = await libreClient.read();
  console.log(data);
})();
