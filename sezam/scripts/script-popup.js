$(function () {

const popupWrapper = $('.popup-wrapper')
const popup = $('.popup')
const signUp = $('.sign-up')
const closePopup = $('.popup-close')
const body = $('body')
signUp.on('click', () => {
    body.css("overflow", 'hidden')
 popupWrapper.css('display', 'flex')
 popup.fadeIn(400)

})
 closePopup.on('click',  () => {
    body.css("overflow", 'auto')
    popup.fadeOut(400);
   setTimeout( () => { popupWrapper.css('display', 'none')}, 400)
 })


})