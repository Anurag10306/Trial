new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "If I can't have You",
          artist: "Shawn Mandes",
          cover: "img/01.jpg",
          source: "Mp3/Shawn Mendes - If I Can't Have You (Lyrics).mp3",
          url: "https://www.youtube.com/watch?v=oTJ-oqwxdZY",
          favorited: true
        },
        {
          name: "Treat You Better",
          artist: "Shawn Mandes",
          cover: "img/02.jpg",
          source: "Mp3/Treat You Better- Shawn Mendes (Lyrics).mp3",
          url: "https://www.youtube.com/watch?v=lY2yjAdbvdQ",
          favorited: true
        },
      {
          name: "There's Nothing Holdin' Me Back",
          artist: "Shawn Mandes",
          cover: "img/02.jpg",
          source: "Mp3/Shawn Mendes - There's Nothing Holding Me Back (Lyrics).mp3",
          url: "https://www.youtube.com/watch?v=dT2owtxkU8k",
          favorited: false
        },
        {
          name: "In My Blood",
          artist: "Shawn Mandes",
          cover: "img/03.jpg",
          source: "Mp3/Shawn Mendes - In My Blood (Lyrics).mp3",
          url: "https://www.youtube.com/watch?v=36tggrpRoTI",
          favorited: false
        },
        {
          name: "Mercy",
          artist: "Shawn Mandes",
          cover: "img/02.jpg",
          source: "Mp3/Mercy - Shawn Mendes (Lyrics).mp3",
          url: "https://www.youtube.com/watch?v=KkGVmN68ByU",
          favorited: true
        },
        {
          name: "Lost In Japan",
          artist: "Shawn Mandes",
          cover: "img/03.jpg",
          source: "Mp3/Shawn Mendes - Lost In Japan (Lyrics).mp3",
          url: "https://www.youtube.com/watch?v=SAWzXkV3hHo",
          favorited: false
        },
        {
          name: "Stitches",
          artist: "Shawn Mandes",
          cover: "img/04.jpg",
          source: "Mp3/Stitches - Shawn Mendes (Lyrics).mp3",
          url: "https://www.youtube.com/watch?v=VbfpW0pbvaU",
          favorited: true
        },
        {
          name: "Fallin' All In You",
          artist: "Shawn Mandes",
          cover: "img/03.jpg",
          source: "Mp3/Fallin' All In You.mp3",
          url: "https://www.youtube.com/watch?v=D5P1R6CRsoM",
          favorited: false
        },
        {
          name: "Senorita",
          artist: "Shawn Mandes , Camila Cabello",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/9.jpg",
          source: "Mp3/Shawn Mendes, Camila Cabello - Señorita (Lyrics).mp3",
          url: "https://www.youtube.com/watch?v=Pkh8UtuejGw",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
