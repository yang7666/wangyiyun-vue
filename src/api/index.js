// 统一出口
import {recommendMusic,recommendLatestMusic} from "@/api/Home"
import {hotSearch,searchResult} from "@/api/Search"
import {getSongById,getLyricById} from "@/api/Play"
import {musicComment} from "@/api/Comment"
import{getPlaylistById} from "@/api/Playlist"
import{getPlaylistSongById} from "@/api/Playlist"

export const recommendMusicAPI = recommendMusic
export const recommendLatestMusicAPI = recommendLatestMusic
export const hotSearchAPI = hotSearch
export const searchResultAPI = searchResult
export const getSongByIdAPI = getSongById
export const getLyricByIdAPI = getLyricById
export const musicCommentAPI = musicComment
export const getPlaylistByIdAPI = getPlaylistById
export const getPlaylistSongByIdAPI = getPlaylistSongById
