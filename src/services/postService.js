import http from './httpService';
import config from '../config.json';

const apiEndpoint = config.apiUrl + '/posts';

export function getPosts(postUrl) {
  return http.get(apiEndpoint + postUrl);
}
export function getPost(postUrl) {
  return http.get(apiEndpoint + '/' + postUrl);
}

export function savePost(post) {
  if (post._id) {
    const body = { ...post };
    delete body._id;

    return http.put(apiEndpoint + '/' + post._id, body);
  }

  return http.post(apiEndpoint, post);
}

export function deletePost(postId) {
  return http.delete(apiEndpoint + '/' + postId);
}

export function getLikes(isLike, userId) {
  return http.put(apiEndpoint + isLike, userId);
}
