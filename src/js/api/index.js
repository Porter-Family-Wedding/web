  
import Request from './Request';

export default {
  login: (email, password) => Request.request('post', '/login', { email, password }, false),
};