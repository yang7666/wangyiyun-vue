import request from '../utils/request'

// 播放页 - 获取歌曲详情
export const getPlaylistById = (params) => request({
  url: '/playlist/detail',
  params
})

export const getPlaylistSongById = (params) => request({
    url: '/playlist/track/all',
    params
  })