const input = document.querySelectorAll(".input"),
  singlePriceOutput = document.querySelector(".result-calc__single-price");
let summ = document.querySelector("output[for='summ']").value.split(" ").join(""),
  term = document.querySelector("output[for='term']").value,
  percent = document.querySelector("output[for='percent']").value;

input.forEach((item) => {
  let id = item.getAttribute("id");
  item.addEventListener("input", function () {
    let output = document.querySelectorAll(`output[for=${id}]`);
    let outputText = this.value;
    if (id === "summ") {
      if (outputText.length > 3) {
        let text = outputText.split("");
        let arr = [...text.slice(0, text.length - 3), " ", ...text.slice(-3)];
        outputText = arr.join("");
      }
      if (outputText.length > 7) {
        let text = outputText.split("");
        let arr = [...text.slice(0, text.length - 7), " ", ...text.slice(-7)];
        outputText = arr.join("");
      }
    }
    output.forEach((item) => {
      item.value = outputText;
    });

    switch (id) {
      case "summ":
        summ = this.value;
        break;
      case "term":
        term = this.value;
        break;
      case "percent":
        percent = this.value;
        break;
      default:
        break;
    }
    singlePriceOutput.textContent = calcSinglePrice(summ, term, percent);
    rangeLine();
  });
});
function calcSinglePrice(summ, term, percent) {
  let s = parseInt(summ),
    t = parseInt(term),
    p = (parseInt(percent) / 100).toFixed(2),
    allSumm = 0,
    result = 0;
  allSumm = s + s * p;
  result = allSumm / t;

  return result.toFixed(2);
}
const inputBefor = document.querySelectorAll(".input-before");
function rangeLine() {
  inputBefor.forEach((item) => {
    const inp = item.nextElementSibling;
    let width = 0;

    width =
      ((inp.value - inp.getAttribute("min")) * 100) /
      (inp.getAttribute("max") - inp.getAttribute("min"));

    item.style.width = `${width}%`;
  });
}
rangeLine();





// 
const popupOpenButton = document.querySelectorAll(".popup-open-button"),
  wrapper = document.querySelector(".popup-wrapper"),
  popup = document.querySelectorAll(".popup"),
  closeButton = document.querySelectorAll(".popup__close-button");

popupOpenButton.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault()
    let name = item.getAttribute("data-popup");

    modalOpen(name);
  });
});
closeButton.forEach((item) => {
  item.addEventListener("click", closePopup);
});
wrapper.addEventListener("click", (e)=> closePopup(e));
function modalOpen(name) {
  const thisPopup = document.querySelector(`.popup__${name}`);
  wrapper.style.display = "flex";
  thisPopup.style.display = "flex";
  setTimeout(() => thisPopup.classList.add("active"), 0);
}

function closePopup(e) {
    if (e.target!==wrapper & e.target !==closeButton[0].children[0] & e.target !==closeButton[1].children[0]) {
        console.log("1");
        return false
    }
  popup.forEach((item) => {
    item.classList.remove("active");
    setTimeout(() => {
      item.style.display = "none";
      wrapper.style.display = "none";
    }, 400);
  });
}
