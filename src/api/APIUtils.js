import ky from 'ky';

export async function fetchDialogs(userId) {
  const respone = await ky.get('/api/dialogs', { headers: { userId } });
  const json = await respone.json();
  return json;
}
