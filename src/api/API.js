import getAPI from "./APIUtils";


export async function fetchDialogs() {
  const response = await getAPI().get('dialogs');

  return response.body;
}

export const dialogsAPI = {
  async fetchMembers() {
    const response = await getAPI().get('dialogs/members')

    return response.body.users
  }
}