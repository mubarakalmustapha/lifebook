import http from './httpService';
import config from '../config.json';

const apiEndpoint = config.apiUrl;

export function register(user) {
  return http.post(apiEndpoint + '/users', {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}

export function getUsers(usersUrl) {
  return http.get(apiEndpoint + usersUrl);
}

export function getFriends(friendIds) {
  return http.get(apiEndpoint + friendIds);
}

export function getFollow(isFollow, userId) {
  return http.put(`${apiEndpoint}/users/${isFollow}`, userId);
}
