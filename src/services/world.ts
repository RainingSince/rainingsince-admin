import request from '@/utils/request';

export async function loadWorld(values) {
  return request.get('world', values);
}

export async function searchWorld(values) {
  return request.post('world/search', values);
}

export async function updateWorld(values) {
  return request.put('world', values);
}

export async function createWorld(values) {
  return request.post('world', values);
}

export async function deleteWorld(values) {
  return request.delete('world?id=' + values);
}

export async function deleteWorlds(values) {
  return request.delete('world/select', values);
}
