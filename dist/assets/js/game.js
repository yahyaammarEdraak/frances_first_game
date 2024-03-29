function Game() {

    var config = {
        type: Phaser.AUTO,
        width: 900,
        height: 700,
        scene: {
            preload: preload,
            create: create
        }
    };

    var game = new Phaser.Game(config);
    var scene = null;
    var playButton;
    var happy;
    var backgroundImage;
    var sidebar;
    var health
    var bg, playButton, trainn;
    var questions;
    var currentQuestionIndex = 0;
    var questionText;
    var optionLabels = [];
    var hurrayTween;
    var shookTween
    var player
    var playerTween
    var graphics
    var destroyedplayer
    var game_over
    var playerX = 120
    var playerY = 70
    var playerTween2
    var playerTween3
    var cloud1
    var cloud2
    var cloud3
    let win
    var qbg
    var rec
    var hearts = []
    var problems = []
    var border
    var right = []
    var wrong = []
    var rightAnswerSound
    var wrongAnswerSound
    var speak = true
    var speakx
    var mutex
    var music
    var reset
    var question
    var optionContainer
    var optionLabel
    var currentCorrectOptionLabel
    var currentQuestionAllLabels = []

    function preload() {
        this.load.image('game_background', 'assets/mainbgg.png');
        this.load.image('happy', 'assets/mainchar.png');
        this.load.image('first', 'assets/first.png')
        this.load.image('one', 'assets/preone-removebg-preview.png');
        this.load.image('two', 'assets/pretwo-removebg-preview.png');
        this.load.image('three', 'assets/prethree-removebg-preview.png');
        this.load.image('four', 'assets/prefour-removebg-preview.png');
        this.load.image('five', 'assets/prefive-removebg-preview.png');
        this.load.image('play_button', 'assets/playbutton.png');
        this.load.image('game_over', 'assets/gameover.png');
        this.load.image('destroyedplayer', 'assets/end.png');
        this.load.audio('backgroundMusic', ['assets/bgmusic.mp3']);
        this.load.audio('rightAnswer', ['assets/correct-6033.mp3']);
        this.load.audio('wrongAnswer', ['assets/wrong-buzzer-6268.mp3']);
        this.load.image('cloud', 'assets/c1.png')
        this.load.image('win', 'assets/25-8.png')
        this.load.image('rec', 'assets/rec.png')
        this.load.image('qsbg', 'assets/qsbg.png')
        this.load.image('heart', 'assets/heartx.png')
        this.load.image('heartBlank', 'assets/heart-blank.png')
        this.load.image('problem', 'assets/problem.png')
        this.load.image('border', 'assets/borderbg.png')
        this.load.image('wrong', 'assets/no.png')
        this.load.image('right', 'assets/check.png')
        this.load.image('speak', 'assets/speaker.png')
        this.load.image('mute', 'assets/silence.png')
        this.load.image('reset', 'assets/reset.png')
        this.load.svg('full_health_0', 'assets/full_health_0.svg');
        this.load.svg('full_health_25', 'assets/full_health_25.svg');
        this.load.svg('full_health_50', 'assets/full_health_50.svg');
        this.load.svg('full_health_75', 'assets/full_health_75.svg');
        this.load.svg('full_health_100', 'assets/full_health_100.svg');
        this.load.svg('happy_level_1', 'assets/happy_level_1.svg');
        this.load.svg('happy_level_frame_1', 'assets/happy_level_frame_1.svg');
        this.load.svg('unhappy_level_0', 'assets/unhappy_level_0.svg');
        this.load.svg('unhappy_level_frame_0', 'assets/unhappy_level_frame_0.svg');
        this.load.svg('record', 'assets/record.svg');
        this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js')
    }

    function toggleTabMute() {
        if (speak) {
            music.stop()
            speakx.setVisible(false)
            mutex.setVisible(true)
            speak = !speak
        } else {
            music.play()
            speakx.setVisible(true)
            mutex.setVisible(false)
            speak = !speak
        }
    }

    function resetGame() {
        window.location.reload()
    }

    function create() {
        scene = this;
        setBackgroundImage();
        playButton = this.add.image(this.sys.game.config.width / 2, 200, "play_button");
        setInteractions(playButton)
        happy = this.add.image(this.sys.game.config.width / 2, 250, "happy")
        happy.setDisplaySize(600, 600);
        happy.setScale(0.1);
        this.tweens.add({
            targets: happy,
            x: this.sys.game.config.width / 2,
            y: 550,
            scaleX: 1,
            scaleY: 1,
            displayWidth: happy.displayWidth * 20,
            displayHeight: happy.displayHeight * 20,
            duration: 3000,
            ease: 'Power2',
        });
        playButton.on('pointerup', () => onPlayButtonClick(this));
        rightAnswerSound = scene.sound.add('rightAnswer')
        wrongAnswerSound = scene.sound.add('wrongAnswer')
        if (reset) {
            reset.destroy()
        }
    }


    function onPlayButtonClick(scene) {
        music = scene.sound.add('backgroundMusic');
        music.play({
            loop: true
        });
        playButton.destroy()
        happy.destroy()
        cloud1 = scene.add.image(scene.sys.game.config.width / 2, 100, "cloud").setScale(0.2).setAlpha(0.5);
        cloud2 = scene.add.image(scene.sys.game.config.width / 2, 200, "cloud").setScale(0.2).setAlpha(0.5);

        speakx = scene.add.image(100, scene.sys.game.config.height - 100, "speak").setScale(0.1).setInteractive()
        mutex = scene.add.image(100, scene.sys.game.config.height - 100, "mute").setScale(0.1).setInteractive()
        speakx.on('pointerup', () => toggleTabMute());
        mutex.on('pointerup', () => toggleTabMute());

        mutex.setVisible(false)

        for (let i = 0; i < 8; i++) {
            let item = scene.add.image(scene.sys.game.config.width - 285 + i * 30, 250, "problem")
            problems.push(item)
        }

        for (let i = 0; i < 3; i++) {
            let item = scene.add.image(scene.sys.game.config.width - 290 + i * 30, 280, "heart").setScale(0.9)
            hearts.push(item)
        }

        scene.tweens.add({
            targets: cloud1,
            x: cloud1.x + 350,
            duration: 5000,
            ease: 'Linear',
            yoyo: true,
            repeat: -1
        });

        scene.tweens.add({
            targets: cloud2,
            x: cloud2.x - 350,
            duration: 5000,
            ease: 'Linear',
            yoyo: true,
            repeat: -1
        });

        player = scene.add.image(playerX, playerY, "happy")

        tweenConfig = {
            targets: player,
            angle: player.angle + 5,
            duration: 400,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        };
        playerTween2 = scene.tweens.add(tweenConfig);
        qbg = scene.add.image(scene.sys.game.config.width - 440, 480, "qsbg").setScale(0.15).setAlpha(0.7);
        sidebar = scene.add.image(scene.sys.game.config.width - 180, 125, "one").setScale(0.7);
        sidebar.displayHeight = 180
        sidebar.displayWidth = 250
        tweenConfig = {
            targets: sidebar,
            angle: sidebar.angle + 1,
            duration: 400,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        };
        scene.tweens.add(tweenConfig);
        fullHealth = scene.add.image(scene.sys.game.config.width - 90, 135, "full_health_100").setScale(0.7);
        border = scene.add.image(scene.sys.game.config.width - 180, 130, "border").setScale(0.48);
        questions = myCustomQuestions
        rec = scene.add.image(scene.sys.game.config.width - 260, 70, "rec").setScale(0.7);
        displayQuestion(scene, currentQuestionIndex)
    }

    function setBackgroundImage() {
        backgroundImage = scene.add.image(0, 0, 'game_background');
        backgroundImage.setDisplaySize(scene.sys.game.config.width, scene.sys.game.config.height);
        backgroundImage.setOrigin(0, 0);
    }
    function displayQuestions() {

    }
    function setInteractions(element) {
        element.setInteractive();
    }

    function checkRightAnswer(scene) {
        let myCont = optionLabels[question.correctOptionIndex];
        right.push(scene.add.image(myCont.x - 8, myCont.y + 20, "right").setScale(0.04));

        for (const i of currentQuestionAllLabels) {
            i.disableInteractive()
        }

        setTimeout(() => {
            currentCorrectOptionLabel.emit('pointerdown', currentCorrectOptionLabel);
            currentCorrectOptionLabel.emit('pointerup', currentCorrectOptionLabel);
        }, 2000);
    }



    function displayQuestion(scene, index) {
        question = questions[index];
        if (questionText) {
            questionText.destroy();
        }
        for (var i = 0; i < optionLabels.length; i++) {
            optionLabels[i].destroy();
        }
        optionLabels = [];
        questionText = scene.add.text(520, 420, question.question, { fontFamily: 'Play, sans-serif', fontSize: '16px', fill: '#000000' });
        questionText.setOrigin(0.5);

        currentQuestionAllLabels = []

        for (var j = 0; j < question.options.length; j++) {
            optionContainer = scene.add.container(380, 440 + j * 30);
            var padding = 10;
            optionLabel = scene.add.text(padding, padding, question.options[j], { fontFamily: 'Play, sans-serif', fontSize: '14px', fill: '#000000' });

            optionLabel.setOrigin(0, 0);
            optionLabel.setInteractive();

            var background = scene.add.graphics();
            background.fillStyle(0xc4f7ff, 1);
            background.fillRoundedRect(0, 0, (optionLabel.width + 2 * padding) + 15, optionLabel.height + 2 * padding, 10);
            background.setVisible(false);

            optionContainer.add([background, optionLabel]);
            optionContainer.x -= padding;
            optionContainer.y -= padding;
            optionLabel.on('pointerdown', checkAnswer.bind(scene, scene, question, j, optionLabel, optionContainer));

            if (j == question.correctOptionIndex) {
                currentCorrectOptionLabel = optionLabel
            }

            currentQuestionAllLabels.push(optionLabel);

            (function (label, bg) {
                label.on('pointerover', function () {
                    bg.setVisible(true);
                    label.setColor('#1d592b');
                    document.body.style.cursor = 'pointer';
                    scene.tweens.add({
                        targets: label,
                        scaleX: 1.1,
                        scaleY: 1.1,
                        duration: 200,
                        ease: 'Linear',
                        yoyo: false,
                        repeat: 0
                    });
                });

                label.on('pointerout', function () {
                    bg.setVisible(false);
                    label.setColor('#000000');
                    document.body.style.cursor = 'default';
                    scene.tweens.add({
                        targets: label,
                        scaleX: 1,
                        scaleY: 1,
                        duration: 200,
                        ease: 'Linear',
                        yoyo: false,
                        repeat: 0
                    });
                });
            })(optionLabel, background);

            optionLabels.push(optionContainer);
        }
    }

    function playHurrayAnimation(scene, optionLabel) {
        if (hurrayTween && hurrayTween.isPlaying()) {
            hurrayTween.stop();
        }
        // Adjust properties and duration based on your preferences
        hurrayTween = scene.tweens.add({
            targets: optionLabel,
            scaleX: 1.5,
            scaleY: 1.5,
            alpha: 0,
            duration: 1000,
            ease: 'Power2',
            onComplete: function () {
                // Reset properties after the animation is complete
                questionText.setScale(1);
                questionText.setAlpha(1);
                currentQuestionIndex++;
                if (questions.length > currentQuestionIndex) {
                    displayQuestion(scene, currentQuestionIndex)
                }
                for (i of right) {
                    i.destroy()
                }
                i = []
            }
        });

        playerTween = scene.tweens.add({
            targets: player,
            x: '+=50',
            y: '+=100',
            duration: 1000,
            ease: 'Power2',
            onComplete: function () {
                playerTween2.stop();
                tweenConfig = {
                    targets: player,
                    angle: player.angle + 5,
                    duration: 400,
                    ease: 'Sine.easeInOut',
                    yoyo: true,
                    repeat: -1
                };
                playerTween2 = scene.tweens.add(tweenConfig);
            }
        });
    }

    function shook() {
        if (shookTween && shookTween.isPlaying()) {
            shookTween.stop();
        }
        shookTween = scene.tweens.add({
            targets: player,
            x: player.x + 20,
            y: player.y + 20,
            duration: 100,
            ease: 'Power2',
            yoyo: true,
            repeat: 1,
            onComplete: function () {
                console.log("Shook animation completed");
            }
        });
    }

    function checkAnswer(scene, question, selectedOptionIndex, optionLabel, optionContainer) {
        if (selectedOptionIndex === question.correctOptionIndex) {
            if (speak) {
                rightAnswerSound.play()
            }
            for (const i of wrong) {
                i.destroy()
            }
            wrong = []

            for (const i of right) {
                i.destroy()
            }
            right = []

            right.push(scene.add.image(optionContainer.x - 8, optionContainer.y + 20, "right").setScale(0.04))
            let last = problems.slice(-1)
            last[0].destroy()
            problems.pop()
            playerX += 50
            playerY += 100
            playHurrayAnimation(scene, optionLabel)
            if (questions.length == currentQuestionIndex + 1) {
                qbg.destroy()
                questionText.destroy()
                for (var i = 0; i < optionLabels.length; i++) {
                    optionLabels[i].destroy();
                }
                optionLabels = [];
                player.destroy()
                sidebar.destroy()
                fullHealth.destroy()
                border.destroy()
                rec.destroy()
                for (const i of problems) {
                    i.destroy()
                }
                problems = []
                for (const i of hearts) {
                    i.destroy()
                }
                for (const i of wrong) {
                    i.destroy()
                }
                wrong = []

                for (i of right) {
                    i.destroy()
                }

                hearts = []
                happy = this.add.image(this.sys.game.config.width / 2, 250, "happy")
                happy.setDisplaySize(600, 600);
                happy.setScale(0.1);
                this.tweens.add({
                    targets: happy,
                    x: this.sys.game.config.width / 2,
                    y: 500,
                    scaleX: 1,
                    scaleY: 1,
                    displayWidth: happy.displayWidth * 20,
                    displayHeight: happy.displayHeight * 20,
                    duration: 3000,
                    ease: 'Power2',
                    onComplete: function () {
                        win = scene.add.image(450, 400, 'win').setScale(0.5);
                    }
                });
                reset = scene.add.image(scene.sys.game.config.width - 100, scene.sys.game.config.height - 100, "reset").setInteractive()
                reset.on('pointerup', () => resetGame());
                // destroyedplayer = scene.add.image(450, 650, "destroyedplayer").setScale(0.6)
            }
        } else {
            checkRightAnswer(scene)
            if (speak) {
                wrongAnswerSound.play()
            }
            let last = hearts.slice(-1)
            last[0].destroy()
            hearts.pop()
            wrong.push(scene.add.image(optionContainer.x - 8, optionContainer.y + 20, "wrong").setScale(0.04))
            if (sidebar.texture.key == 'one') {
                sidebar.setTexture('two');
                fullHealth.setTexture('full_health_75')
                shook()
            } else if (sidebar.texture.key == 'two') {
                sidebar.setTexture('three');
                fullHealth.setTexture('full_health_50')
                shook()
            } else if (sidebar.texture.key == 'three') {
                scene.tweens.add({
                    targets: player,
                    x: 500,
                    y: 600,
                    duration: 1000,
                    ease: 'Power1',
                    onComplete: function () {
                        player.destroy()
                        sidebar.setTexture('five');
                        fullHealth.setTexture('full_health_0')
                        qbg.destroy()
                        questionText.destroy()
                        for (var i = 0; i < optionLabels.length; i++) {
                            optionLabels[i].destroy();
                        }
                        optionLabels = [];
                        sidebar.destroy()
                        fullHealth.destroy()
                        border.destroy()
                        rec.destroy()
                        for (const i of problems) {
                            i.destroy()
                        }
                        problems = []
                        for (const i of wrong) {
                            i.destroy()
                        }
                        wrong = []
                        if (right) {
                            for (i of right) {
                                i.destroy()
                            }
                            right = []
                        }
                        game_over = scene.add.image(450, 400, "game_over").setScale(0.5)
                        destroyedplayer = scene.add.image(450, 650, "destroyedplayer").setScale(0.6)
                        reset = scene.add.image(scene.sys.game.config.width - 100, scene.sys.game.config.height - 100, "reset").setInteractive()
                        reset.on('pointerup', () => resetGame());
                    }
                });
            }
        }
    }
}

var myCustomQuestions
var currentUrl = window.location.href;
var urlParams = new URLSearchParams(currentUrl.split('?')[1]);
var urlParameterValue = urlParams.get('url');

fetch(`https://fetv2022.netservex.com/api/v1/games/${urlParameterValue}`)
    .then((res) => {
        res.json().then((rese) => {
            let arr = rese.data[0].game.questions
            let convertedArr = arr.map(questionObj => {
                let options = questionObj.answer_list.map(answer => answer.answer);
                let correctOptionIndex = questionObj.answer_list.findIndex(answer => answer.correct_answer === 1);
                return {
                    question: questionObj.question,
                    options: options,
                    correctOptionIndex: correctOptionIndex
                };
            });
            myCustomQuestions = convertedArr
            Game()
        })
    })
    .catch((err) => {
        console.log(err)
    })