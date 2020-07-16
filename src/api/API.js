import getAPI from "./APIUtils";


export async function fetchDialogs() {
  const response = await getAPI().get('dialogs');

  return response.body;
}