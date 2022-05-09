// 统一出口
import {recommendMusic,recommendLatestMusic} from "@/api/Home"
import {hotSearch,searchResult} from "@/api/Search"
import {getSongById,getLyricById} from "@/api/Play"
export const recommendMusicAPI = recommendMusic
export const recommendLatestMusicAPI = recommendLatestMusic
export const hotSearchAPI = hotSearch
export const searchResultAPI = searchResult
export const getSongByIdAPI = getSongById
export const getLyricByIdAPI = getLyricById
