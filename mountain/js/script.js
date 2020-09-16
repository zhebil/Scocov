"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14
  });
}

;

var Slider = function Slider(props) {
  var _this = this;

  _classCallCheck(this, Slider);

  //  параметры в переменные
  var sliderWrapper = props.sliderWrapper,
      _props$time = props.time,
      time = _props$time === void 0 ? 1000 : _props$time,
      _props$easing = props.easing,
      easing = _props$easing === void 0 ? "ease" : _props$easing,
      _props$arrows = props.arrows,
      arrows = _props$arrows === void 0 ? true : _props$arrows;
  var _props$slideCount = props.slideCount,
      slideCount = _props$slideCount === void 0 ? 1 : _props$slideCount,
      _props$autoPlay = props.autoPlay,
      autoPlay = _props$autoPlay === void 0 ? false : _props$autoPlay,
      _props$autoPlayInterv = props.autoPlayInterval,
      autoPlayInterval = _props$autoPlayInterv === void 0 ? 1000 : _props$autoPlayInterv; // записываем DOM элементы в переменные

  this.sliderWrapper = document.querySelector(sliderWrapper);
  this.sliderList = this.sliderWrapper.querySelector("".concat(sliderWrapper, ">div"));
  this.sliderSlide = this.sliderWrapper.querySelectorAll("".concat(sliderWrapper, ">div>div")); // создаём кнопки управления

  if (arrows) {
    var prevButton = document.createElement("div"),
        nextButton = document.createElement("div");
    prevButton.classList.add("slider-button", "prev-button", "icon-button");
    nextButton.classList.add("slider-button", "next-button", "icon-button");
    this.prev = this.sliderWrapper.appendChild(prevButton);
    this.next = this.sliderWrapper.appendChild(nextButton);
  }

  var regExp = /([-0-9.]+(?=px))/; // массив слайдов из документа

  var startArr = Array.from(this.sliderSlide); // клонирование слайдов

  var lastSlide = startArr[startArr.length - 1].cloneNode(true);
  var lastSlide2 = startArr[startArr.length - 2].cloneNode(true); // массив клонов

  var clonedArr = startArr.map(function (item) {
    return item.cloneNode(true);
  }); // вставка клонов

  this.sliderList.prepend(lastSlide);
  this.sliderList.prepend(lastSlide2);
  clonedArr.forEach(function (item) {
    item.classList.add("cloned");

    _this.sliderList.append(item);
  }); // полный массив слайдов

  var slides = [lastSlide2, lastSlide].concat(_toConsumableArray(startArr), _toConsumableArray(clonedArr)); // задаём размеры слайдов

  if (slideCount > startArr.length) {
    slideCount = startArr.length;
  }

  slides.forEach(function (item) {
    item.style.width = "".concat(_this.sliderWrapper.offsetWidth / slideCount, "px");
  });
  var slideWidth = slides[1].offsetWidth;
  this.sliderList.style.width = "".concat(slideWidth * slides.length, "px"); // служебные переменные для движения слайдов

  var i = 0,
      distance = 0,
      startDistance = 0;
  var nullDistance = -2 * slideWidth;
  this.sliderList.style.transform = "translate3D(".concat(nullDistance, "px, 0, 0)"); // функция движения слайдов

  this.move = function (direction) {
    i = i + direction; // рассчитываем дистанцию пролистывания

    distance = nullDistance + slideWidth * i; // проверяем точку старта движения

    if (i < -startArr.length + 1) {
      startDistance = -2 * slideWidth;
      i = 0;
    } else {
      startDistance = distance;
    }

    if (i >= 1) {
      i = -(startArr.length - 1);
      startDistance = -slideWidth * (startArr.length + 1);
    } // непосредственно пролистывание


    _this.sliderList.style.transform = "translate3D(".concat(distance, "px, 0, 0)");
    _this.sliderList.style.transition = "all ".concat(time, "ms ").concat(easing); // блокируем кнопки при пролистывании

    if (arrows) {
      if (direction === -1) {
        _this.next.classList.add("disabled");
      }

      if (direction === 1) {
        _this.prev.classList.add("disabled");
      }
    } // блокируем touch при пролистывании


    _this.sliderWrapper.removeEventListener("touchstart", _this.swipeStart);

    _this.sliderWrapper.removeEventListener("mousedown", _this.swipeStart); // задаем позицию слайдера при окончании анимации


    setTimeout(function () {
      // разблокируем кнопки и touch
      if (arrows) {
        _this.next.classList.remove("disabled");

        _this.prev.classList.remove("disabled");
      }

      _this.sliderWrapper.addEventListener("touchstart", _this.swipeStart);

      _this.sliderWrapper.addEventListener("mousedown", _this.swipeStart);

      _this.sliderList.style.transition = "none";
      _this.sliderList.style.transform = "translate3D(".concat(startDistance, "px, 0, 0)");
    }, time);
  }; // служебные переменные для Drag and drop


  var posInit = 0,
      posX1 = 0,
      posX2 = 0,
      posFinal = 0,
      posThreshold = slideWidth * 0.35; // получаем текущее событие

  this.getEvent = function () {
    return event.type.search("touch") !== -1 ? event.touches[0] : event;
  }; // функция начала свайпа


  this.swipeStart = function () {
    var evt = _this.getEvent();

    posInit = posX1 = evt.clientX;
    _this.sliderList.style.transition = "";
    document.addEventListener("touchmove", _this.swipeAction);
    document.addEventListener("mousemove", _this.swipeAction);
    document.addEventListener("touchend", _this.swipeEnd);
    document.addEventListener("mouseup", _this.swipeEnd);
  }; // функция свайпа


  this.swipeAction = function () {
    var evt = _this.getEvent(),
        style = _this.sliderList.style.transform;

    var transform = +style.match(regExp)[0];
    posX2 = posX1 - evt.clientX;
    posX1 = evt.clientX;
    _this.sliderList.style.transform = "translate3d(".concat(transform - posX2, "px, 0px, 0px)");
  }; // функция окончания свайпа


  this.swipeEnd = function () {
    posFinal = posInit - posX1;
    document.removeEventListener("touchmove", _this.swipeAction);
    document.removeEventListener("mousemove", _this.swipeAction);
    document.removeEventListener("touchend", _this.swipeEnd);
    document.removeEventListener("mouseup", _this.swipeEnd);

    if (Math.abs(posFinal) > posThreshold) {
      if (posInit < posX1) {
        _this.move(+1);
      } else if (posInit > posX1) {
        _this.move(-1);
      }
    } else {
      _this.move(0);
    }
  }; // autoPlay mode


  var interval;

  if (autoPlay === true && autoPlayInterval <= time + 100) {
    autoPlayInterval = time + 100;
  }

  this.autoPlay = function () {
    interval = setInterval(function () {
      _this.move(-1);
    }, autoPlayInterval);
  }; // остановить autoPlay при наведении


  this.sliderWrapper.addEventListener("mouseenter", function () {
    clearInterval(interval);
  });
  this.sliderWrapper.addEventListener("mouseleave", function () {
    if (autoPlay) {
      _this.autoPlay();
    }
  });

  if (autoPlay) {
    this.autoPlay();
  } // подвешать событие свайпа на слайдер


  this.sliderWrapper.addEventListener("touchstart", this.swipeStart);
  this.sliderWrapper.addEventListener("mousedown", this.swipeStart); // подвешать движение слайдов на кнопки управления

  if (arrows) {
    this.prev.addEventListener("click", function () {
      _this.move(1);
    });
    this.next.addEventListener("click", function () {
      _this.move(-1);
    });
  }
};

var slider = new Slider({
  sliderWrapper: ".tours__body",
  slideCount: 3
});
;
var blogInfo = [{
  id: 1,
  title: "Как подготовиться к первому восхождению на вершину",
  date: "15 January 2020",
  text: ["Перед тем, как отправиться на покорение вершины горы, нужно не только привести в порядок свою физическую форму, но и тренировать выносливость, дыхательную и сердечно-сосудистую системы. Именно на них приходится максимальная нагрузка на высоте. Поэтому из-за недостаточной подготовки вы можете сойти на полпути. Чтобы этого не случилось, занимайтесь плаванием, бегом, велосипедом и кардиотренировками.", "Как должны проходить тренировки? В первую очередь, тренировки должны проходить постоянно, эффективно и интенсивно. Кроме того, нагрузка постепенно должна увеличиваться. В случае с бегом обязательно делать это с учетом пульса. Грамотно спланированный бег позволит не только сбросить вес, но и укрепит сердечную мышцу. При беге с высоким пульсом вы позволите организму привыкнуть к недостатку кислорода — то, с чем обязательно встретитесь в горах. Для укрепления физической подготовки и повышения выносливости также бегайте в горку или в быстром темпе поднимайтесь по лестницам. И не забудьте отдохнуть за неделю до путешествия!"],
  img: "./img/blog/blog-img"
}, {
  id: 2,
  title: "Фестиваль Alpika Freeski Аlpindustria Fest Красная Поляна 13-16 февраля",
  date: "10 March 2020",
  text: ["14-16 ФЕВРАЛЯ В КРАСНОЙ ПОЛЯНЕ НА СКЛОНАХ ГТЦ ГАЗПРОМ 'АЛЬПИКА' В РАМКАХ ФЕСТИВАЛЯ, ОРГАНИЗОВАННОГО КОМПАНИЕЙ АЛЬПИНДУСТРИЯ, ПРОЙДУТ СОРЕВНОВАНИЯ И МАСТЕР КЛАССЫ ПО СКИ-АЛЬПИНИЗМУ, ПРОХОДЯЩИЕ ПОД КОНТРОЛЕМ ТЕХНИЧЕСКОГО КОМИТЕТА ФАИС МОСКВЫ ПРИ НЕПОСРЕДСТВЕННОМ УЧАСТИИ АНО 'ЦК СА И СД'", "ЗАПЛАНИРОВАНО ПРОВЕДЕНИЕ ДВУХ ГОНОК:", "В ПЕРВЫЙ ДЕНЬ - ИНДИВИДУАЛЬНОЙ С СУММАРНЫМ НАБОРОМ ВЫСОТЫ СВЫШЕ 1000 МЕТРОВ И ДАЛЕЕ - КОМАНДНОЙ ГОНКИ ЛИБО ГРУППОВОЙ ЭСТАФЕТЫ ПО ИЗМЕНЕННОЙ ТРАССЕ ПЕРВОГО ДНЯ.", "РЕЗУЛЬТАТЫ ГОНОК БУДУТ ПОДВЕДЕНЫ В ДВУХ ЗАЧЕТАХ: 'СПОРТИВНОМ' - ДЛЯ УЧАСТНИКОВ С ГОНОЧНЫМ СНАРЯЖЕНИЕМ И 'ЛЮБИТЕЛЬСКОМ' - ДЛЯ ВЛАДЕЛЬЦЕВ ФРИРАЙДНОГО И ИНОГО 'ТЯЖЕЛОГО' СКИТУР СНАРЯЖЕНИЯ, СПЛИТБОРДОВ И ТЕЛЕМАРК ЭКИПИРОВКИ.", "В связи с обильными снегопадами трасса индивидуальной гонки будет готовиться 13.02.2020 и представлена на брифинге ориентировочно в 18:00"],
  img: "./img/blog/blog-img"
}, {
  id: 3,
  title: "Особенности альпинизма на Камчатке. Все о Ключевcкой Сопке",
  date: "21 May 2020",
  text: ["Ключевская сопка - один из самых активных вулканов не только Камчатки, но и всей Евразии. Расход магмы при извержениях этого вулкана может достигать 6 000 тонн в год. В сравнении, такой объем вулканического материала выходит на поверхность в районе вулканов всей Курило-Камчатской гряды.", "Вулкан располагается на восточной части Камчатки. Входит в состав Тихоокеанского огненного кольца, которое в свою очередь тянется от Камчатки на юг, проходит экватор, а затем до самого Эребуса в Антарктиде. В пределах этого кольца совершается наибольший процент от всех землетрясений и извержений в мире.", "Восхождение на вулкан относится к экстремальному виду туризма и требуют специальной подготовки. может сопровождаться посещением пещер, ледников, каньона в реке Студеная, единственной на Камчатке поляны эдельвейсов. Добравшись до вершины вас будет переполнять восторг, потому что не каждый день вы можете оказаться выше облаков. Однако пробыть здесь длительно время не представляется возможным. Высота, газы из кратера, разряженный воздух дают о себе знать, становится трудно дышать и начинает кружится голова. Самый благоприятный сезон для восхождения с июля по октябрь."],
  img: "./img/blog/blog-img"
}, {
  id: 4,
  title: "Что происходит с человеком на высоте более 3000 метров?",
  date: "11 Jule 2020",
  text: ["Горы манят людей. Так было и будет всегда. Обилие вертикальных линий, невероятных форм, красок – всё это приводит человека в горы. Но вместе с тем, горы представляют собой не слишком дружественную среду обитания. Они таят множество опасностей, особенно для неподготовленного человека.", "Чем же нам грозит высота? Тут можно выделить два основных момента – это разряженная атмосфера и солнечная радиация. Если с солнечной радиацией и жестким ультрафиолетом мы знаем, как бороться, то с разряженной атмосферой и нехваткой кислорода всё сложнее.", "В условиях высокогорья солнце весьма опасно, точнее, опасна его ультрафиолетовая компонента. Обгореть можно за каких-то 20-минут, причем до «хрустящей корочки». Солнечные ожоги дадут дополнительную нагрузку на организм, который и без того находится в неблагоприятной среде.", "Не менее опасна солнечная радиация для зрения. Под горным солнцем глаза легко сжечь, заработав себе временную слепоту. Такую временную потерю зрения называют «снежной слепотой».", "Более того, на любой высоте в воздухе содержится 20,95% кислорода. Это константа. Однако, с высотой атмосферное давление уменьшается. Это значит, что в единице объема воздуха количество молекул кислорода становится меньше, чем при более высоком давлении на уровне моря.", "Но не только это влияет на нас. Дело в том, что многие физиологические процессы в нашем организме, связанные с газообменом, завязаны на разнице давлений во внешней среде и наших легких, крови и тканях. И тут низкое атмосферное давление становится важнейшим фактором."],
  img: "./img/blog/blog-img"
}, {
  id: 5,
  title: "Что происходит с человеком на высоте более 3000 метров?",
  date: "1 September 2020",
  text: ["Перед тем, как отправиться на покорение вершины горы, нужно не только привести в порядок свою физическую форму, но и тренировать выносливость, дыхательную и сердечно-сосудистую системы. Именно на них приходится максимальная нагрузка на высоте. Поэтому из-за недостаточной подготовки вы можете сойти на полпути. Чтобы этого не случилось, занимайтесь плаванием, бегом, велосипедом и кардиотренировками.", "Как должны проходить тренировки? В первую очередь, тренировки должны проходить постоянно, эффективно и интенсивно. Кроме того, нагрузка постепенно должна увеличиваться. В случае с бегом обязательно делать это с учетом пульса. Грамотно спланированный бег позволит не только сбросить вес, но и укрепит сердечную мышцу. При беге с высоким пульсом вы позволите организму привыкнуть к недостатку кислорода — то, с чем обязательно встретитесь в горах. Для укрепления физической подготовки и повышения выносливости также бегайте в горку или в быстром темпе поднимайтесь по лестницам. И не забудьте отдохнуть за неделю до путешествия!"],
  img: "./img/blog/blog-img"
} // {
//   id: 1,
//   title: "Как подготовиться к первому восхождению на вершину",
//   date: "15 January 2020",
//   text: [
//     "Перед тем, как отправиться на покорение вершины горы, нужно не только привести в порядок свою физическую форму, но и тренировать выносливость, дыхательную и сердечно-сосудистую системы. Именно на них приходится максимальная нагрузка на высоте. Поэтому из-за недостаточной подготовки вы можете сойти на полпути. Чтобы этого не случилось, занимайтесь плаванием, бегом, велосипедом и кардиотренировками.",
//     "Как должны проходить тренировки? В первую очередь, тренировки должны проходить постоянно, эффективно и интенсивно. Кроме того, нагрузка постепенно должна увеличиваться. В случае с бегом обязательно делать это с учетом пульса. Грамотно спланированный бег позволит не только сбросить вес, но и укрепит сердечную мышцу. При беге с высоким пульсом вы позволите организму привыкнуть к недостатку кислорода — то, с чем обязательно встретитесь в горах. Для укрепления физической подготовки и повышения выносливости также бегайте в горку или в быстром темпе поднимайтесь по лестницам. И не забудьте отдохнуть за неделю до путешествия!",
//   ],
//   img: "./img/blog/blog-img",
// },
// {
//   id: 2,
//   title:
//     "Фестиваль Alpika Freeski Аlpindustria Fest Красная Поляна 13-16 февраля",
//   date: "10 March 2020",
//   text: [
//     "14-16 ФЕВРАЛЯ В КРАСНОЙ ПОЛЯНЕ НА СКЛОНАХ ГТЦ ГАЗПРОМ 'АЛЬПИКА' В РАМКАХ ФЕСТИВАЛЯ, ОРГАНИЗОВАННОГО КОМПАНИЕЙ АЛЬПИНДУСТРИЯ, ПРОЙДУТ СОРЕВНОВАНИЯ И МАСТЕР КЛАССЫ ПО СКИ-АЛЬПИНИЗМУ, ПРОХОДЯЩИЕ ПОД КОНТРОЛЕМ ТЕХНИЧЕСКОГО КОМИТЕТА ФАИС МОСКВЫ ПРИ НЕПОСРЕДСТВЕННОМ УЧАСТИИ АНО 'ЦК СА И СД'",
//     "ЗАПЛАНИРОВАНО ПРОВЕДЕНИЕ ДВУХ ГОНОК:",
//     "В ПЕРВЫЙ ДЕНЬ - ИНДИВИДУАЛЬНОЙ С СУММАРНЫМ НАБОРОМ ВЫСОТЫ СВЫШЕ 1000 МЕТРОВ И ДАЛЕЕ - КОМАНДНОЙ ГОНКИ ЛИБО ГРУППОВОЙ ЭСТАФЕТЫ ПО ИЗМЕНЕННОЙ ТРАССЕ ПЕРВОГО ДНЯ.",
//     "РЕЗУЛЬТАТЫ ГОНОК БУДУТ ПОДВЕДЕНЫ В ДВУХ ЗАЧЕТАХ: 'СПОРТИВНОМ' - ДЛЯ УЧАСТНИКОВ С ГОНОЧНЫМ СНАРЯЖЕНИЕМ И 'ЛЮБИТЕЛЬСКОМ' - ДЛЯ ВЛАДЕЛЬЦЕВ ФРИРАЙДНОГО И ИНОГО 'ТЯЖЕЛОГО' СКИТУР СНАРЯЖЕНИЯ, СПЛИТБОРДОВ И ТЕЛЕМАРК ЭКИПИРОВКИ.",
//     "В связи с обильными снегопадами трасса индивидуальной гонки будет готовиться 13.02.2020 и представлена на брифинге ориентировочно в 18:00",
//   ],
//   img: "./img/blog/blog-img",
// },
// {
//   id: 3,
//   title: "Особенности альпинизма на Камчатке. Все о Ключевcкой Сопке",
//   date: "21 May 2020",
//   text: [
//     "Ключевская сопка - один из самых активных вулканов не только Камчатки, но и всей Евразии. Расход магмы при извержениях этого вулкана может достигать 6 000 тонн в год. В сравнении, такой объем вулканического материала выходит на поверхность в районе вулканов всей Курило-Камчатской гряды.",
//     "Вулкан располагается на восточной части Камчатки. Входит в состав Тихоокеанского огненного кольца, которое в свою очередь тянется от Камчатки на юг, проходит экватор, а затем до самого Эребуса в Антарктиде. В пределах этого кольца совершается наибольший процент от всех землетрясений и извержений в мире.",
//     "Восхождение на вулкан относится к экстремальному виду туризма и требуют специальной подготовки. может сопровождаться посещением пещер, ледников, каньона в реке Студеная, единственной на Камчатке поляны эдельвейсов. Добравшись до вершины вас будет переполнять восторг, потому что не каждый день вы можете оказаться выше облаков. Однако пробыть здесь длительно время не представляется возможным. Высота, газы из кратера, разряженный воздух дают о себе знать, становится трудно дышать и начинает кружится голова. Самый благоприятный сезон для восхождения с июля по октябрь.",
//   ],
//   img: "./img/blog/blog-img",
// },
// {
//   id: 4,
//   title: "Что происходит с человеком на высоте более 3000 метров?",
//   date: "11 Jule 2020",
//   text: [
//     "Горы манят людей. Так было и будет всегда. Обилие вертикальных линий, невероятных форм, красок – всё это приводит человека в горы. Но вместе с тем, горы представляют собой не слишком дружественную среду обитания. Они таят множество опасностей, особенно для неподготовленного человека.",
//     "Чем же нам грозит высота? Тут можно выделить два основных момента – это разряженная атмосфера и солнечная радиация. Если с солнечной радиацией и жестким ультрафиолетом мы знаем, как бороться, то с разряженной атмосферой и нехваткой кислорода всё сложнее.",
//     "В условиях высокогорья солнце весьма опасно, точнее, опасна его ультрафиолетовая компонента. Обгореть можно за каких-то 20-минут, причем до «хрустящей корочки». Солнечные ожоги дадут дополнительную нагрузку на организм, который и без того находится в неблагоприятной среде.",
//     "Не менее опасна солнечная радиация для зрения. Под горным солнцем глаза легко сжечь, заработав себе временную слепоту. Такую временную потерю зрения называют «снежной слепотой».",
//     "Более того, на любой высоте в воздухе содержится 20,95% кислорода. Это константа. Однако, с высотой атмосферное давление уменьшается. Это значит, что в единице объема воздуха количество молекул кислорода становится меньше, чем при более высоком давлении на уровне моря.",
//     "Но не только это влияет на нас. Дело в том, что многие физиологические процессы в нашем организме, связанные с газообменом, завязаны на разнице давлений во внешней среде и наших легких, крови и тканях. И тут низкое атмосферное давление становится важнейшим фактором.",
//   ],
//   img: "./img/blog/blog-img",
// },
// {
//   id: 5,
//   title: "Что происходит с человеком на высоте более 3000 метров?",
//   date: "1 September 2020",
//   text: [
//     "Перед тем, как отправиться на покорение вершины горы, нужно не только привести в порядок свою физическую форму, но и тренировать выносливость, дыхательную и сердечно-сосудистую системы. Именно на них приходится максимальная нагрузка на высоте. Поэтому из-за недостаточной подготовки вы можете сойти на полпути. Чтобы этого не случилось, занимайтесь плаванием, бегом, велосипедом и кардиотренировками.",
//     "Как должны проходить тренировки? В первую очередь, тренировки должны проходить постоянно, эффективно и интенсивно. Кроме того, нагрузка постепенно должна увеличиваться. В случае с бегом обязательно делать это с учетом пульса. Грамотно спланированный бег позволит не только сбросить вес, но и укрепит сердечную мышцу. При беге с высоким пульсом вы позволите организму привыкнуть к недостатку кислорода — то, с чем обязательно встретитесь в горах. Для укрепления физической подготовки и повышения выносливости также бегайте в горку или в быстром темпе поднимайтесь по лестницам. И не забудьте отдохнуть за неделю до путешествия!",
//   ],
//   img: "./img/blog/blog-img",
// },
]; // blogDate = document.querySelector('.blog__date time'),
// listItemText = document.querySelector('.blog__list-item-text') ,

var blog = document.querySelector(".blog__body"),
    blogList = document.querySelector(".blog__list"),
    blogArticle = document.querySelector(".blog__article"); // меню блога

var counter = 0;
blogInfo.forEach(function (elem) {
  if (counter >= 5) return;
  printList(elem);
  counter++;
});

if (counter >= blogInfo.length) {
  printButton();
}

function printList(_ref) {
  var id = _ref.id,
      title = _ref.title,
      date = _ref.date;
  var blogListItem = document.createElement("li"),
      blogDate = document.createElement("div"),
      titleText = document.createElement("p");
  blogListItem.classList.add("blog__list-item");

  if (id === 1 && window.innerWidth >= 768) {
    blogListItem.classList.add("active");
  }

  blogListItem.setAttribute("data-id", id);
  blogList.append(blogListItem);
  blogDate.classList.add("blog__date");
  blogListItem.append(blogDate);
  getDate(date, blogDate);
  titleText.classList.add("blog__list-item-text");
  titleText.textContent = title;
  blogListItem.append(titleText);
}

function printButton() {
  var listContainer = document.querySelector(".blog__list-container"),
      button = document.createElement("div");
  button.textContent = "Читать все новости";
  button.classList.add("blog__list-button", "orange-button");
  listContainer.append(button);
}

var listItem = document.querySelectorAll(".blog__list-item"),
    article = document.querySelector(".blog__article"),
    image = article.querySelector(".blog__image picture"),
    articleDate = article.querySelector(".blog__article-date time"),
    articleTitle = article.querySelector(".blog__article-title"),
    articleDescr = article.querySelector(".blog__article-descr");
var id = 1,
    i = 1;

if (window.innerWidth >= 768) {
  toggleArticle(false);
}

listItem.forEach(function (item) {
  item.addEventListener("click", toggleActive);
  item.addEventListener("click", getId);
  item.addEventListener("click", function () {
    return toggleArticle(false);
  });

  if (window.innerWidth <= 768) {
    item.addEventListener("click", articlePopupOpen);
  }
});

function toggleActive() {
  listItem.forEach(function (item) {
    return item.classList.remove("active");
  });
  this.classList.add("active");
}

function getId() {
  id = this.getAttribute("data-id");
  i = id;
}

function toggleArticle() {
  var isAuto = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  blogArticle.classList.remove("active");

  if (isAuto) {
    if (i == 0) {
      listItem[listItem.length - 1].classList.remove("active");
    } else {
      listItem[i - 1].classList.remove("active");
    }

    id = ++i;
    listItem[i - 1].classList.add("active");
  }

  if (i >= blogInfo.length) {
    i = 0;
  }

  var thisArticle = blogInfo.find(function (article) {
    return article.id == id;
  }),
      src = "".concat(thisArticle.img, "-").concat(thisArticle.id); // заголовок

  articleTitle.textContent = thisArticle.title; // дата

  getDate(thisArticle.date, articleDate); // текст и изображение

  printText(thisArticle.text, articleDescr);
  printImg(src, image, "blog photo");
  setTimeout(function () {
    return blogArticle.classList.add("active");
  }, 0);
}

function getDate(str, elem) {
  elem.setAttribute("datetime", new Date(str));
  elem.textContent = new Date(str).toLocaleString("ru", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function printText(textArr, selector) {
  selector.textContent = "";
  textArr.forEach(function (item) {
    var p = document.createElement("p");
    p.textContent = item;
    selector.append(p);
  });
}

function printImg(src, selector) {
  var alt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "image";
  var imgJpj = "".concat(src, ".jpg"),
      imgWebp = "".concat(src, ".webp"),
      source = document.createElement("source"),
      imgTeg = document.createElement("img");
  imgTeg.setAttribute("src", imgJpj);
  imgTeg.setAttribute("alt", alt);
  source.setAttribute("srcset", imgWebp);
  source.setAttribute("type", "image/webp");

  while (selector.firstChild) {
    selector.removeChild(selector.firstChild);
  }

  selector.append(source);
  selector.append(imgTeg);
}

var interval;

function autoTabs() {
  clearInterval(interval);
  interval = setInterval(toggleArticle, 5000);
}

if (window.innerWidth >= 768) {
  autoTabs();
  blog.addEventListener("mouseenter", function () {
    clearInterval(interval);
  });
  blog.addEventListener("mouseleave", function () {
    autoTabs();
  });
}

;
var tableRow = document.querySelectorAll(".table__row:not(:first-child)");
console.log(tableRow);
tableRow.forEach(function (item) {
  item.addEventListener("mouseenter", toggleTableActive);
  item.addEventListener("mouseleave", toggleTableActive);
});

function toggleTableActive() {
  this.classList.toggle("active");
}

;
var helpLabel = document.querySelectorAll(".help__label"),
    helpInput = document.querySelectorAll(".help__input");
helpInput.forEach(function (item) {
  item.addEventListener("focus", function () {
    this.parentNode.classList.add("active");
  });
  item.addEventListener("blur", function () {
    if (this.value === "") this.parentNode.classList.remove("active");
  }); // item.addEventListener("blur", validate)
}); // function validate () {
//     if (this.value !== "") {
//    const name = this.getAttribute("name")
//    switch (name) {
//      case "name":
//          this.value
//    }    
// }
// };

var Popup = function Popup() {
  var _this2 = this;

  _classCallCheck(this, Popup);

  var popupWrapper = document.querySelector(".popup__wrapper"),
      popup = document.querySelector(".popup");
  var closeButton;
  this.popupContent = document.querySelector(".popup__content");

  this.popupOpen = function (event) {
    popupWrapper.style.display = "flex";
    setTimeout(function () {
      popupWrapper.classList.add("active");
    }, 100);
    body.style.overflow = "hidden";
  };

  this.popupClose = function (event) {
    event.stopPropagation();
    _this2.popupContent.textContent = "";
    popupWrapper.classList.remove("active");
    setTimeout(function () {
      popupWrapper.style.display = "none";
    }, 400);
    closeButton.remove();
    body.style.overflow = "auto";
  };

  closeButton = document.createElement("div");
  closeButton.classList.add("popup__close-button");
  closeButton.textContent = "x";
  popup.appendChild(closeButton);
  popup.addEventListener("click", function (event) {
    event.stopPropagation();
  });
  popupWrapper.addEventListener("click", this.popupClose);
  closeButton.addEventListener("click", this.popupClose);
}; // //////////////////////////////////////////


var PricePopup = /*#__PURE__*/function (_Popup) {
  _inherits(PricePopup, _Popup);

  var _super = _createSuper(PricePopup);

  function PricePopup(content, img) {
    var _this3;

    _classCallCheck(this, PricePopup);

    _this3 = _super.call(this);
    var title = content.title;
    var image = document.createElement("div");
    image.classList.add("price__img");
    image.innerHTML = "<img src=\"./img/mount-".concat(img, ".jpg\">");

    _this3.popupContent.appendChild(image);

    for (var item in content) {
      var elem = document.createElement("div");
      elem.classList.add("price__popup-".concat(item));
      elem.textContent = content[item];

      _this3.popupContent.appendChild(elem);
    }

    addButton(_this3.popupContent, "Заказать");
    return _this3;
  }

  return PricePopup;
}(Popup);

var itemArray;
var priceRow = document.querySelectorAll(".table__row:not(:first-child)");
priceRow.forEach(function (item) {
  item.addEventListener("click", function () {
    var img = item.getAttribute("data-img-id");
    itemArray = Array.from(item.querySelectorAll(".table__cell")).map(function (cell) {
      return cell.textContent;
    });
    var pricePopup = new PricePopup(priceObjGenerator(itemArray), img);
    pricePopup.popupOpen();
  });
});

function priceObjGenerator(arr) {
  var itemObj = {};
  itemObj.title = arr[0];
  itemObj.height = arr[1];
  itemObj.level = arr[2];
  itemObj.price = arr[3];
  return itemObj;
}

function addButton(block, text) {
  var button = document.createElement("div");
  button.classList.add("orange-button", "popup__button");
  var a = document.createElement("a");
  a.classList.add("button__link");
  a.textContent = text;
  button.appendChild(a);
  block.appendChild(button);
} // /////////////////////////////////////////////////


var ArticlePopup = /*#__PURE__*/function (_Popup2) {
  _inherits(ArticlePopup, _Popup2);

  var _super2 = _createSuper(ArticlePopup);

  function ArticlePopup(content) {
    var _this4;

    _classCallCheck(this, ArticlePopup);

    _this4 = _super2.call(this);
    var article = blogArticle.cloneNode(true, true);

    _this4.popupContent.appendChild(article);

    console.log(article);
    return _this4;
  }

  return ArticlePopup;
}(Popup);

function articlePopupOpen() {
  var articlePopup = new ArticlePopup();
  articlePopup.popupOpen();
}

;
var burger = document.querySelector(".burger__wrapper"),
    menu = document.querySelector(".menu__list"),
    body = document.querySelector("body");
burger.onclick = burgerFunction;

function burgerFunction() {
  this.children[0].classList.toggle("active");
  menu.classList.toggle("active");

  if (body.style.overflow !== "hidden") {
    body.style.overflow = "hidden";
  } else {
    body.style.overflow = "auto";
  }
}

var menuLink = document.querySelectorAll('.menu__link');
menuLink.forEach(function (item) {
  item.addEventListener("click", function () {
    if (menu.classList.contains("active")) {
      menu.classList.remove("active");
      body.style.overflow = "auto";
      burger.children[0].classList.toggle("active");
    }
  });
});