const PROXY = 'https://api.codetabs.com/v1/proxy/?quest=';

const allMembersApi = `${PROXY}https://campaign.showroom-live.com/akb48_sr/data/room_status_list.json`;

const getUserApi = (roomId) => `${PROXY}https://www.showroom-live.com/api/room/profile?room_id=${roomId}`;

export {
  allMembersApi,
  getUserApi,
};
