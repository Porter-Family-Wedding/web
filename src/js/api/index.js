  
import Request from './Request';

export default {
  invites: new Request('/invites', true),
  addresses: new Request('/addresses', true),
  people: new Request('/people', true),
  login: (email, password) => Request.request('post', '/login', { email, password }, false),
  sendResponse: (data) => Request.request('post', '/responses', data, false),
  countAttending: () => Request.request('get', '/invites/attending', {}, true),
};