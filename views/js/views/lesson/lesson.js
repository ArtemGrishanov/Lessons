/**
 * Created by artyom.grishanov on 10.10.14.
 */

app.Views.LessonView = Backbone.View.extend({
    el: $("#id-lesson_cnt"),
    isShowed: undefined,

    vid: null,
    ytPlayer: null,
    currentSlide: 0,
    /**
     * Формат урока может использоваться также как тест для проверки знаний начального уровня, к примеру
     */
    lesson: {
        slides: [
            {
//                vidId: 'Sj_OmHLEdEA'
                // альтернативные виды контента, например html
                explanation: 'И <a href="/wiki/%D0%98%D0%BD%D0%B4%D0%B8%D0%B0%D0%BD%D0%B0_%D0%94%D0%B6%D0%BE%D0%BD%D1%81_%D0%B8_%D0%BF%D0%BE%D1%81%D0%BB%D0%B5%D0%B4%D0%BD%D0%B8%D0%B9_%D0%BA%D1%80%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D1%8B%D0%B9_%D0%BF%D0%BE%D1%85%D0%BE%D0%B4" title="Индиана Джонс и последний крестовый поход">Индиана Джонс</a>, и <a href="/wiki/%D0%9D%D0%B8%D0%BA%D0%BE%D0%B3%D0%B4%D0%B0_%D0%BD%D0%B5_%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B8_%C2%AB%D0%BD%D0%B8%D0%BA%D0%BE%D0%B3%D0%B4%D0%B0%C2%BB" title="Никогда не говори «никогда»">Джеймс Бонд</a> «засветились» в <b><a href="/wiki/%D0%90%D0%BB%D1%8C%D0%BA%D0%B0%D1%81%D0%B0%D0%B1%D0%B0_%D0%B2_%D0%90%D0%BB%D1%8C%D0%BC%D0%B5%D1%80%D0%B8%D0%B8" title="Алькасаба в Альмерии">испанской крепости</a></b> (<i>на илл.</i>) возрастом свыше 1000 лет.',
                // подсказка, которая показывается пользователю, если он затрудняется
                hint: 'Текст подсказки'
            },
            {
//                vidId: 'Ejq6-LAf6_0',
                explanation: '<b>«Павший астронавт»</b> (<a href="/wiki/%D0%90%D0%BD%D0%B3%D0%BB%D0%B8%D0%B9%D1%81%D0%BA%D0%B8%D0%B9_%D1%8F%D0%B7%D1%8B%D0%BA" title="Английский язык">англ.</a>&nbsp;<i><span xml:lang="en" lang="en">Fallen Astronaut</span></i>)&nbsp;— <a href="/wiki/%D0%90%D0%BB%D1%8E%D0%BC%D0%B8%D0%BD%D0%B8%D0%B9" title="Алюминий">алюминиевая</a> <a href="/wiki/%D0%A1%D0%BA%D1%83%D0%BB%D1%8C%D0%BF%D1%82%D1%83%D1%80%D0%B0" title="Скульптура">скульптура</a>, изображающая <a href="/wiki/%D0%9A%D0%BE%D1%81%D0%BC%D0%BE%D0%BD%D0%B0%D0%B2%D1%82" title="Космонавт">астронавта</a> в <a href="/wiki/%D0%A1%D0%BA%D0%B0%D1%84%D0%B0%D0%BD%D0%B4%D1%80" title="Скафандр">скафандре</a>, лежащего ничком. Фигурка находится в районе <a href="/w/index.php?title=%D0%A5%D1%8D%D0%B4%D0%BB%D0%B8%E2%80%94%D0%90%D0%BF%D0%B5%D0%BD%D0%BD%D0%B8%D0%BD%D1%8B&amp;action=edit&amp;redlink=1" class="new" title="Хэдли—Апеннины (страница отсутствует)">Хэдли—Апеннины</a><sup class="noprint"><a href="//en.wikipedia.org/wiki/Hadley%E2%80%93Apennine_(lunar_region)" class="extiw" title="en:Hadley–Apennine (lunar region)"><span style="font-style:normal; font-weight:normal;" title="Hadley–Apennine (lunar region) — версия статьи «Хэдли—Апеннины» на английском языке">[en]</span></a></sup> на <a href="/wiki/%D0%9B%D1%83%D0%BD%D0%B0" title="Луна">Луне</a>, в месте посадки экипажа космического корабля <a href="/wiki/%D0%90%D0%BF%D0%BE%D0%BB%D0%BB%D0%BE%D0%BD-15" title="Аполлон-15">«Аполлон-15»</a> на юго-восточной окраине <a href="/wiki/%D0%9C%D0%BE%D1%80%D0%B5_%D0%94%D0%BE%D0%B6%D0%B4%D0%B5%D0%B9" title="Море Дождей">Моря Дождей</a>. Установлена <a href="/wiki/1_%D0%B0%D0%B2%D0%B3%D1%83%D1%81%D1%82%D0%B0" title="1 августа">1 августа</a> <a href="/wiki/1971_%D0%B3%D0%BE%D0%B4" title="1971 год">1971 года</a> командиром «Аполлона-15» <a href="/wiki/%D0%A1%D0%BA%D0%BE%D1%82%D1%82,_%D0%94%D1%8D%D0%B2%D0%B8%D0%B4_%D0%A0%D1%8D%D0%BD%D0%B4%D0%BE%D0%BB%D1%8C%D1%84" title="Скотт, Дэвид Рэндольф" class="mw-redirect">Дэвидом Скоттом</a><sup id="cite_ref-1" class="reference"><a href="#cite_note-1">[1]</a></sup><sup id="cite_ref-2" class="reference"><a href="#cite_note-2">[2]</a></sup>. Рядом с нею воткнута в грунт табличка, увековечивающая имена <span style="white-space: nowrap;">8&nbsp;астронавтов</span> <a href="/wiki/%D0%A1%D0%BE%D0%B5%D0%B4%D0%B8%D0%BD%D1%91%D0%BD%D0%BD%D1%8B%D0%B5_%D0%A8%D1%82%D0%B0%D1%82%D1%8B_%D0%90%D0%BC%D0%B5%D1%80%D0%B8%D0%BA%D0%B8" title="Соединённые Штаты Америки">США</a> и <span style="white-space: nowrap;">6&nbsp;космонавтов</span> <a href="/wiki/%D0%A1%D0%BE%D1%8E%D0%B7_%D0%A1%D0%BE%D0%B2%D0%B5%D1%82%D1%81%D0%BA%D0%B8%D1%85_%D0%A1%D0%BE%D1%86%D0%B8%D0%B0%D0%BB%D0%B8%D1%81%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D1%85_%D0%A0%D0%B5%D1%81%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA" title="Союз Советских Социалистических Республик">СССР</a>, к тому времени погибших или умерших. Автор скульптуры&nbsp;— бельгийский художник и гравёр <a href="/w/index.php?title=%D0%92%D0%B0%D0%BD_%D0%A5%D0%B5%D0%B9%D0%B4%D0%BE%D0%BD%D0%BA,_%D0%9F%D0%BE%D0%BB&amp;action=edit&amp;redlink=1" class="new" title="Ван Хейдонк, Пол (страница отсутствует)">Пол ван Хейдонк</a><sup class="noprint"><a href="//en.wikipedia.org/wiki/Paul_Van_Hoeydonck" class="extiw" title="en:Paul Van Hoeydonck"><span style="font-style:normal; font-weight:normal;" title="Paul Van Hoeydonck — версия статьи «ван Хейдонк, Пол» на английском языке">[en]</span></a></sup><sup id="cite_ref-3" class="reference"><a href="#cite_note-3">[3]</a></sup>. С тех пор и поныне «Павший астронавт» остаётся единственной художественной инсталляцией на Луне.',
                hint: 'Текст подсказки 2',
                task: {
                    question: 'Какой протокол используется в сети?',
                    ui: 'radio',
                    points: 2,
                    answers: [
                        {
                            text: 'HTTP',
                            correct: 1
                        },
                        {
                            text: 'XTTP'
                        }
                    ]
                }
            },
            {
                explanation: 'Практическое задание',
                hint: 'Подсказка 3',
                task: {
                    codeeditor: 'html',
                    answer: {
                        regexp: '<html>(\d)*</html>'
                    }
                }
            }
        ]
    },

    templates: {
        "lesson": _.template($('#id-lesson_view').html())
    },

    events: {
        "click #id-next_slide": "onNextClick",
        "click #id-submit_answer": "onSubmitAnswerClick"
    },

    onShow: function() {
        this.render();
    },

    initialize: function () {
        console.log("LessonView initialize()");

        window.onPlayerStateChange = this.onPlayerStateChange;
        window.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady;

        app.Models.user.bind("change:answer", function () {
            this.startSlide(this.currentSlide+1);
        }, this);
    },

    setLesson: function(dataJson) {

    },

    startSlide: function(slide) {
        this.currentSlide = slide || 0;
        if (this.currentSlide >= this.lesson.slides.length) {
            this.currentSlide = this.lesson.slides.length-1;
        }
        else if (this.currentSlide < 0) {
            this.currentSlide = 0;
        }

        $('#id-task').hide();
        $('#id-answer').hide();
        $('#id-next').hide();

//        if (this.lesson.slides[this.currentSlide].vidId) {
//            this.embedVideoContent(this.lesson.slides[this.currentSlide].vidId);
//        } else
        if (this.lesson.slides[this.currentSlide].explanation) {
            this.embedHTMLContent(this.lesson.slides[this.currentSlide].explanation);
        };
        if (this.lesson.slides[this.currentSlide].hasOwnProperty('task')) {
            this.showTask();
        }
    },

    embedVideoContent: function(vid) {
        $('#id-video_container').html('<iframe id="player_'+this.vid+
            '" width="774" height="436" src="https://www.youtube.com/embed/'+
            this.vid+'?enablejsapi=1&autoplay=1&autohide=1&showinfo=0" '+
            'frameborder="0" allowfullscreen></iframe>');

        this.ytPlayer = new YT.Player('player_'+this.vid, {
            events: {
                'onStateChange': this.onPlayerStateChange
            }
        });

        $('#id-html_container').hide();
    },

    embedHTMLContent: function(html) {
        $('#id-html_container').html(html);
        $('#id-video_container').hide();
    },

    showTask: function() {
        if (this.lesson.slides[this.currentSlide].hasOwnProperty('task')) {
            $('#id-task').show();
            $('#id-submit_answer').show();
            $('#id-correct_answer').hide();
            $('#id-false_answer').hide();
        }
    },

    showAnswer: function() {
        if (this.lesson.slides[this.currentSlide].hasOwnProperty('task')) {
            $('#id-answer').show();
        }
    },

    processAnswer: function() {
        var task = this.lesson.slides[this.currentSlide].task;

        //анализируем код
        if (task && task.codeeditor) {
            this.model.answer(1);
        }

        //анализиреум ответы теста

        this.model.error();
    },

    onPlayerStateChange: function(event) {
        switch(event.data) {
            case YT.PlayerState.ENDED:
                console.log('Video has ended.');
                app.Views.lessonView.onVideoEnded();
                break;
            case YT.PlayerState.PLAYING:
                console.log('Video is playing.');
                break;
            case YT.PlayerState.PAUSED:
                console.log('Video is paused.');
                break;
            case YT.PlayerState.BUFFERING:
                console.log('Video is buffering.');
                break;
            case YT.PlayerState.CUED:
                console.log('Video is cued.');
                break;
            default:
                console.log('Unrecognized state.');
                break;
        }
    },

    onYouTubeIframeAPIReady: function() {
        app.Views.lessonView.startSlide(0);
    },

    onVideoEnded: function() {
        if (this.lesson.slides[this.currentSlide].hasOwnProperty('task')) {
            this.showTask();
        }
        $('#id-next').show();
    },

    onNextClick: function() {
        this.startSlide(this.currentSlide+1);
    },

    onSubmitAnswerClick: function() {
        this.processAnswer();
    },

    render: function () {
        console.log('Render LessonView');

//        var prizeStatus = app.Models.user.get('prizeStatus');
//
        var domElem = $(this.el).html(this.templates['lesson']({}));

        return this;
    }
});
