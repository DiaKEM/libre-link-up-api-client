import { LibreLinkUpClient } from './client';

(async function () {
  const username = 'USERNAME';
  const password = 'PASSWORD';
  const clientVersion = '4.9.0';
  const libreClient = LibreLinkUpClient({
    username,
    password,
    clientVersion,
    connectionIdentifier: 'IDENTIFIER',
  });

  const data = await libreClient.read();
  console.log(data);
})();
