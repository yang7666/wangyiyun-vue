<template>
  <div class="footer">
    <div class="song-info">
      <el-image :src="imgUrl"></el-image>
      <div class="info-block">
        <div class="fz-16 fc-darkgray">
          {{ song }}
          <svg class="icon mgr-10" aria-hidden="true">
            <use xlink:href="#icon-xihuan1"></use>
          </svg>
        </div>
        <div class="fz-14 fc-darkgray">{{ singer }}</div>
      </div>
    </div>
    <div class="nav">
      <!-- 音乐播放 audio -->
      <audio
        ref="audio"
        @canplay="audioCanPlay()"
        @timeupdate="audioTimeUpdate()"
        @ended="endNextSong()"
        :src="url"
      ></audio>
      <!-- 播放控制，进度条 -->
      <div class="nav-btn">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-23_shunxubofang"></use>
        </svg>
        <i @click="preSong" class="icon el-icon-caret-left"></i>
        <i
          class="icon play-btn"
          @click="isPlay = !isPlay"
          :class="isPlay ? 'el-icon-video-pause' : 'el-icon-video-play'"
        ></i>
        <i @click="nextSong" class="icon el-icon-caret-right"></i>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-geci-copy"></use>
        </svg>
      </div>
      <div class="slider">
        <div class="fz-12 fc-gray">
          {{ currentDurationString }}
        </div>
        <el-slider
          v-model="currentDuration"
          :step="1"
          :min="0"
          :max="duration"
          :show-tooltip="false"
          @change="changeCurrentDuration"
        >
        </el-slider>
        <div class="fz-12 fc-gray">
          {{ this.$conversionTime(this.$store.state.currentMusic.duration) }}
        </div>
      </div>
    </div>
    <div class="tab">
      <div
        class="volume-block"
        @mouseover="isShowVolume = true"
        @mouseout="isShowVolume = false"
      >
        <transition name="fade">
          <div v-show="isShowVolume">
            <div class="popover">
              <el-slider
                v-model="volume"
                vertical
                height="100px"
                @change="changeVolume"
              >
              </el-slider>
            </div>
            <div class="triangle"></div>
          </div>
        </transition>
        <svg @click="mute" class="icon volume" aria-hidden="true">
          <use
            v-bind:xlink:href="volume ? '#icon-yinliang' : '#icon-jingyin'"
          ></use>
        </svg>
      </div>
      <i
        class="el-icon-s-operation"
        @click="$store.state.isShowPlayList = !$store.state.isShowPlayList"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrl: this.$store.state.currentMusic.imgUrl,
      song: this.$store.state.currentMusic.name,
      singer: this.$store.state.currentMusic.singer,
      duration: 0, // 总时长 秒
      durationString: '', // 总时长 字符串形式
      currentDuration: 0, // 当前播放时间 秒
      currentDurationString: '00:00', // 当前播放时间 字符串形式
      url: '',
      isPlay: false,
      volume: 50, //音量
      isShowVolume: false, //是否显示音量调节
    }
  },
  methods: {
    changeCurrentDuration() {
      this.$refs.audio.currentTime = this.currentDuration
    },
    // 音频时间更新
    audioTimeUpdate() {
      this.$store.state.currentMusic.currentTime = this.$refs.audio.currentTime
      this.currentDuration = this.$refs.audio.currentTime
      this.currentDurationString = this.$formatSongTime(this.currentDuration)
    },
    audioCanPlay() {
      // if (!this.$store.state.recentPlayFirst) {
      this.isPlay = true
      this.$refs.audio.play()
      // }
    },
    // 调节音量
    changeVolume() {
      this.$refs.audio.volume = this.volume / 100
    },
    // 静音
    mute() {
      this.$refs.audio.muted = !this.$refs.audio.muted
      let temp = this.$refs.audio.volume
      if (this.$refs.audio.muted) {
        this.volume = 0
      } else {
        this.volume = temp * 100
      }
    },
    // 播放结束，下一首
    endNextSong() {
      this.isPlay = false
      if (
        this.$store.state.currentIndex <
        this.$store.state.currentPlayList.length - 1
      ) {
        let id =
          this.$store.state.currentPlayList[++this.$store.state.currentIndex].id
        this.$store.commit('changeMusicState', id)
      }
      // console.log('end')
    },
    nextSong() {
      if (
        this.$store.state.currentIndex <
        this.$store.state.currentPlayList.length - 1
      ) {
        let id =
          this.$store.state.currentPlayList[++this.$store.state.currentIndex].id
        this.$store.commit('changeMusicState', id)
      }
    },
    preSong() {
      if (this.$store.state.currentIndex) {
        let id =
          this.$store.state.currentPlayList[--this.$store.state.currentIndex].id
        this.$store.commit('changeMusicState', id)
      }
    },
  },
  computed: {
    currentMusic() {
      return this.$store.state.currentMusic.id
    },
  },
  watch: {
    currentMusic() {
      this.imgUrl = this.$store.state.currentMusic.imgUrl
      this.song = this.$store.state.currentMusic.name
      this.singer = this.$store.state.currentMusic.singer
      this.duration = this.$conversionTimeSec(
        this.$store.state.currentMusic.duration
      )
      this.url = this.$store.state.currentMusic.url
    },
    isPlay(val) {
      if (val) {
        this.isPlay = true
        this.$refs.audio.play()
      } else {
        this.isPlay = false
        this.$refs.audio.pause()
      }
    },
  },
  mounted() {
    this.$refs.audio.volume = 0.5
    console.log(this.imgUrl)
  },
}
</script>

<style lang="scss" scoped>
.footer {
  padding: 10px;
  display: flex;
  height: 60px;
  flex-direction: row;
  justify-content: space-between;
}
.song-info {
  width: 30%;
  display: flex;
  flex-direction: row;
  align-items: center;
  .el-image {
    width: 45px;
    height: 45px;
    border-radius: 5px;
  }
  .info-block {
    margin: 0 10px;
  }
}
.nav {
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  .nav-btn {
    margin-top: 0px;
    .icon {
      font-size: 22px;
      margin: 0 20px;
    }
    .play-btn {
      font-size: 30px !important;
    }
  }
  .slider {
    display: flex;
    flex-direction: row;
    align-items: center;
    .el-slider {
      width: 370px;
      height: 20px;
      line-height: 20px;
      margin: 0 10px;
    }
  }
  ::v-deep .el-slider__bar {
    background-color: #ff4e4e;
  }
  ::v-deep .el-slider__button {
    width: 10px;
    height: 10px;
    background-color: #ff4e4e;
    border: 0;
  }
  ::v-deep .el-slider__runway {
    height: 4px;
    margin: 8px 0;
  }
  ::v-deep .el-slider__button-wrapper {
    height: 20px;
    width: 20px;
    top: -8px;
  }
}
.tab {
  box-sizing: border-box;
  width: 30%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;
  .volume-block {
    position: relative;
    .popover {
      box-sizing: border-box;
      width: 40px;
      height: 120px;
      padding: 10px 0;
      box-shadow: 0 0 3px rgba(85, 84, 84, 0.2);
      background: white;
      border-radius: 4px;
      position: absolute;
      bottom: 40px;
      left: 13px;
      right: 13px;
    }
    .triangle {
      width: 0;
      height: 0;
      border: 10px solid transparent;
      border-top-color: white;
      position: absolute;
      bottom: 20px;
      left: 23px;
      right: 23px;
    }
    .triangle::after {
      position: absolute;
      bottom: 0px;
      left: -10px;
      content: '';
      border-left: 11px solid transparent;
      border-right: 11px solid transparent;
      border-top: 11px solid white;
      filter: drop-shadow(2px 2px 2px rgba(85, 84, 84, 0.2));
    }
  }
  i,
  svg {
    font-size: 26px;
    margin: 0 20px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
audio {
  position: relative;
  top: -100px;
}
</style>
