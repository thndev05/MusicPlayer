
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const nextBtn = $('.btn.btn-next');
const prevBtn = $('.btn.btn-prev');
const randomBtn = $('.btn.btn-random');
const repeatBtn = $('.btn.btn-repeat');
const playlist = $('.playlist');
const volIcon = $('.vol-icon');
const volSlider = $('.volume-slider');

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name: "Cradles",
            singer: "Sub Urban",
            path: "./assests/music/song1.mp3",
            image: "./assests/img/song1.jpg"
        },
        {
            name: "Beggin'",
            singer: "Måneskin",
            path: "./assests/music/song2.mp3",
            image: "./assests/img/song2.jpg"
        },
        {
            name: "Payphone",
            singer: "Maroon 5",
            path: "./assests/music/song3.mp3",
            image: "./assests/img/song3.jpg"
        },
        {
            name: "abcdefu",
            singer: "GAYLE",
            path: "./assests/music/song4.mp3",
            image: "./assests/img/song4.jpg"
        },
        {
            name: "2002",
            singer: "Anne-Marie",
            path: "./assests/music/song5.mp3",
            image: "./assests/img/song5.jpg"
        },
        {
            name: "The Box",
            singer: "Roddy Ricch",
            path: "./assests/music/song6.mp3",
            image: "./assests/img/song6.jpg"
        },
        {
            name: "Perfect",
            singer: "Ed Sheeran",
            path: "./assests/music/song7.mp3",
            image: "./assests/img/song7.jpg"
        },
        {
            name: "Blank Space",
            singer: "Taylor Swift",
            path: "./assests/music/song8.mp3",
            image: "./assests/img/song8.jpg"
        },
        {
            name: "Pano",
            singer: "Zack Tabudlo",
            path: "./assests/music/song9.mp3",
            image: "./assests/img/song9.jpg"
        },
        {
            name: "Love Yourself",
            singer: "Justin Bieber",
            path: "./assests/music/song10.mp3",
            image: "./assests/img/song10.jpg"
        },
        {
            name: "Cheating On You",
            singer: "Charlie Puth",
            path: "./assests/music/song11.mp3",
            image: "./assests/img/song11.jpg"
        },
        {
            name: "Hero",
            singer: "Cash Cash",
            path: "./assests/music/song12.mp3",
            image: "./assests/img/song12.jpg"
        },
        {
            name: "Send It",
            singer: "Austin Mahone",
            path: "./assests/music/song13.mp3",
            image: "./assests/img/song13.jpg"
        },
        {
            name: "INFERNO",
            singer: "Sub Urban & Bella Poarch",
            path: "./assests/music/song14.mp3",
            image: "./assests/img/song14.jpg"
        },
        {
            name: "Something Just Like This",
            singer: "The Chainsmokers & Coldplay",
            path: "./assests/music/song15.mp3",
            image: "./assests/img/song15.jpg"
        },
        {
            name: "Let Me Down Slowly",
            singer: "Alec Benjamin",
            path: "./assests/music/song16.mp3",
            image: "./assests/img/song16.jpg"
        },
        {
            name: "FRIENDS",
            singer: "Marshmello & Anne-Marie",
            path: "./assests/music/song17.mp3",
            image: "./assests/img/song17.jpg"
        },
        {
            name: "I'm Not Her",
            singer: "Clara Mae",
            path: "./assests/music/song18.mp3",
            image: "./assests/img/song18.jpg"
        },
        {
            name: "Maroon 5",
            singer: "Memories",
            path: "./assests/music/song19.mp3",
            image: "./assests/img/song19.jpg"
        },
        {
            name: "Alan Walker",
            singer: "Darkside",
            path: "./assests/music/song20.mp3",
            image: "./assests/img/song20.jpg"
        },
        {
            name: "Sing Me To Sleep",
            singer: "Alan Walker",
            path: "./assests/music/song21.mp3",
            image: "./assests/img/song21.jpg"
        },
    ],

    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${index == this.currentIndex ? 'active' : ''}" data-index="${index}">
                    <div class="thumb"
                        style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        playlist.innerHTML = htmls.join('');
    },

    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: () => {
                return this.songs[this.currentIndex];
            }
        });
    },

    handleEvents: function () {
        const cdWidth = cd.offsetWidth; 
        const _this = this;

        //Xu ly phong to thu nho cd
        document.onscroll = () => {
            const scrollTop = window.scrollY;
            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

        //xu ly xuat hien volume slider khi hover vao icon
        volIcon.addEventListener('mouseenter', function() {
            volSlider.classList.add('active');
        });

        //xu ly slider am luong
        let timer;
        volSlider.addEventListener('mouseleave', function() {
            timer = setTimeout(() => {
                volSlider.classList.remove('active');
            }, 5000);
        });
        volSlider.addEventListener('mouseenter', function() {
            clearTimeout(timer);
        });
        volSlider.onchange = function(e) {
            const adjustVolume = e.target.value;
            audio.volume = adjustVolume / 100;

            if (audio.volume === 0) {
                volIcon.classList.remove('fa-volume-low');
                volIcon.classList.add('fa-volume-xmark');
            } else if (audio.volume >= 0.5){
                volIcon.classList.remove('fa-volume-xmark');
                volIcon.classList.remove('fa-volume-low');
                volIcon.classList.add('fa-volume-high');
            } else {
                volIcon.classList.remove('fa-volume-xmark');
                volIcon.classList.remove('fa-volume-high');
                volIcon.classList.add('fa-volume-low');
            }

        };

        //Xu ly nut play
        playBtn.onclick = function() {
            if(_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }


        //xu ly su kien dia cd quay / dung
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)'}
        ], {
            duration: 10000,
            iterations: Infinity
        });
        cdThumbAnimate.pause();


        //xu ly trang thai audio
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        }
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }


        //xu ly tien do bai hat thay doi
        audio.ontimeupdate = function() {
            if(audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;
                progress.style.background = 'linear-gradient(to right, var(--primary-color) ' + progressPercent + '%, lightgray ' + progressPercent + '%)';
            }
        };

        progress.onchange = function() {
            const seekTime = audio.duration / 100 * progress.value;
            audio.currentTime = seekTime;
        };

         //xu ly nut next
         nextBtn.onclick = function() {
            if(_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.nextSong();
            }
            _this.render();
            audio.play();
            _this.scrollToActiveSong();
        }

        //xu ly nut prev
        prevBtn.onclick = function() {
            if(_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.prevSong();
            }
            _this.render();
            audio.play();
        }

        //xu ly nut random
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom;
            randomBtn.classList.toggle('active', _this.isRandom);
        }
        
        //xu ly nut repeat
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat;
            repeatBtn.classList.toggle('active', _this.isRepeat);
        }

        //xu lu next song khi audio ended
        audio.onended = function() {
            if(_this.isRepeat) {              
                audio.play();
            } else {
                nextBtn.click();
            }
        }
        
        //lang nghe click vao playlist
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)');
            if(songNode || e.target.closest('.option')) {
                
                //xu ly khi click vao song
                if(songNode) {
                    _this.currentIndex = songNode.dataset.index;
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }

                //xu ly khi click vao option
                if(e.target.closest('.option')) {

                }

            }
        }
    },
    

    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
        audio.src = this.currentSong.path;
    },

    nextSong: function() {
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function() {
        this.currentIndex--;
        if(this.currentIndex <= 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    playRandomSong : function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex);

        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    scrollToActiveSong : function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior:'smooth',
                block: 'center'
            });
        }, 500)
    },

    start: function() {
        //am luong ban dau 50%
        audio.volume = 0.5;

        //Dinh nghia cac thuoc tinh cho object
        this.defineProperties();

        //Lang nghe va xu ly cac su kien
        this.handleEvents();

        //tai thong tin bai hat hien tai
        this.loadCurrentSong();

        //Render lai playlist
        this.render();
        
    }
}

app.start();