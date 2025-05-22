const mainBox = document.createElement("div"),
  chatBoxTextdiv = document.createElement("div"),
  chatBoxTextContent = document.createElement("p"),
  chatBox = document.createElement("div"),
  chatBoxImage = document.createElement("img"),
  chatBoxCloseIcon = document.createElement("img"),
  chatBoxTextClose = document.createElement("button"),
  BACKEND_BASE_URL = "https://api.exei.ai";

const updateTextDivWidth = () => {
  if (window.innerWidth <= 480) {
    chatBoxTextdiv.style.fontSize = "12px";
    chatBoxTextdiv.style.minWidth = "50px";
    chatBoxTextdiv.style.maxWidth = "180px";
  } else {
    chatBoxTextdiv.style.minWidth = "50px";
    chatBoxTextdiv.style.maxWidth = "250px";
    chatBoxTextdiv.style.fontSize = "14px";
  }
};

setTimeout(() => {
  updateTextDivWidth();
}, 100);
window.addEventListener("resize", updateTextDivWidth);

chatBoxTextClose.id = "chatBoxId";
mainBox.id = "mainBox";
mainBox.style.display = "flex";
mainBox.style.flexDirection = "row";
mainBox.style.alignItems = "center";
mainBox.style.position = "fixed";
mainBox.style.bottom = "20px";
mainBox.style.right = "20px";
mainBox.style.padding = "10px";
mainBox.style.borderRadius = "10px";
mainBox.style.zIndex = 99999;
mainBox.style.gap = "10px";

chatBoxTextdiv.id = "chatBoxTextdiv";
chatBoxTextdiv.style.display = "flex";
chatBoxTextdiv.style.marginLeft = "10px";
chatBoxTextdiv.style.fontSize = "14px";
chatBoxTextdiv.style.fontWeight = "bold";
chatBoxTextdiv.style.color = "#333";
chatBoxTextdiv.style.minWidth = "50px";
chatBoxTextdiv.style.background = "#FFF";
chatBoxTextdiv.style.border = "1px solid gray";
chatBoxTextdiv.style.padding = "9px 33px 7px 13px";
chatBoxTextdiv.style.borderRadius = "20px";
chatBoxTextdiv.style.position = "relative";
chatBoxTextdiv.style.maxHeight = '130px';

chatBox.id = "chatBox";
chatBox.style.display = "flex";
chatBox.style.background = "#fff";
chatBox.style.bottom = "60px";
chatBox.style.width = "60px";
chatBox.style.height = "60px";
chatBox.style.right = "20px";
chatBox.style.justifyContent = "center";
chatBox.style.alignItems = "center";
chatBox.style.borderRadius = "9999px";
chatBox.style.border = "none";
chatBox.style.border = "1px solid gray";
chatBox.style.zIndex = 99999;
chatBox.style.cursor = "pointer";

chatBoxTextClose.onclick = () => {
  chatBoxTextdiv.style.display = "none";
};

chatBoxTextClose.style.position = "absolute";
chatBoxTextClose.style.top = "5px";
chatBoxTextClose.style.right = "5px";
chatBoxTextClose.style.width = "20px";
chatBoxTextClose.style.height = "20px";
chatBoxTextClose.style.padding = "2px";
chatBoxTextClose.style.display = "flex";
chatBoxTextClose.style.alignItems = "center";
chatBoxTextClose.style.justifyContent = "center";
chatBoxTextClose.style.border = "none";
chatBoxTextClose.style.cursor = "pointer";
chatBoxTextClose.style.fontSize = "16px";
chatBoxTextClose.style.color = "#333";
chatBoxTextClose.style.background = "transparent";

chatBoxCloseIcon.style.height = '25px';
chatBoxCloseIcon.style.width = '25px';


chatBoxImage.id = "chatBoxImage";

const iframe = document.getElementById("myIframe");
const SourceData = iframe.src,
  id = SourceData.split("/sdk/")[1].split("?")[0];
let settingsDataVariable;

function loadGoogleFont(fontName) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(
    / /g,
    "+",
  )}&display=swap`;
  document.head.appendChild(link);

  mainBox.style.fontFamily = `${fontName}, 'sans - serif'`;
}

const updateIframeSize = () => {
  if (window.innerWidth <= 480) {
    iframe.style.width = "90vw";
    iframe.style.height = "70vh";
    iframe.style.right = "5%";
  } else {
    iframe.style.width = "400px";
    iframe.style.height = "70%";
    iframe.style.right = "20px";
  }
};

updateIframeSize();
window.addEventListener("resize", updateIframeSize);

fetch(`${BACKEND_BASE_URL}/project/${id}`)
  .then((t) => t.json())
  .then((t) => fetch(`${BACKEND_BASE_URL}/settings/${t.clientId}`))
  .then((t) => t.json())
  .then((t) => {
    chatBoxImage.src = t.s3Response.Location;
    chatBoxTextContent.textContent = t?.labelText;
    settingsDataVariable = t;
    console.log(t?.selectedFont, t);
    loadGoogleFont(t?.selectedFont || "Poppins");
  })
  .catch((t) => {
    console.error("Error:", t);
  });

chatBoxImage.width = 50;
chatBoxImage.height = 50;
chatBoxTextdiv.style.textWrap = "auto";
chatBoxImage.style.borderRadius = "9999px";

chatBoxCloseIcon.src =
  "https://exei-bkt-important-object.s3.ap-south-1.amazonaws.com/cross-19.svg";
chatBoxCloseIcon.style.borderRadius = "9999px";

mainBox.append(chatBoxTextdiv);
mainBox.append(chatBox);
chatBoxTextdiv.appendChild(chatBoxTextContent);
chatBoxTextdiv.appendChild(chatBoxTextClose);
chatBoxTextClose.appendChild(chatBoxCloseIcon)
chatBox.appendChild(chatBoxImage);
document.body.appendChild(mainBox);

let interval,
  position = 0,
  direction = 1,
  bounceHeight = 20,
  speed = 0.3;

function bounceChatBox() {
  position += direction * speed;
  mainBox.style.transform = `translateY(${position}px)`;
  if (position >= bounceHeight) direction = -1;
  if (position <= 0) direction = 1;
}

interval = setInterval(bounceChatBox, 10);

iframe.style.display = "none";

chatBox.onclick = () => {
  if (iframe.style.display === "none") {
    iframe.style.display = "block";
    chatBoxTextdiv.style.display = "none";
    iframe.style.height = "66%";
    bounceHeight = 0;
    speed = 0;
    mainBox.style.transform = "none";

    chatBoxImage.src =
      "https://exei-bkt-important-object.s3.ap-south-1.amazonaws.com/cross-19.svg";
    chatBoxImage.style.width = "20px";
    chatBoxImage.style.height = "20px";
  } else {
    iframe.style.display = "none";
    mainBox.style.transform = `translateY(${position}px)`;
    chatBoxTextdiv.style.display = "flex";
    chatBoxTextdiv.style.alignItems = "center";
    chatBoxTextdiv.style.justifyContent = "space-between";
    bounceHeight = 20;
    speed = 0.3;
    chatBoxImage.src = settingsDataVariable.s3Response.Location;
    chatBoxImage.style.width = "50px";
    chatBoxImage.style.height = "50px";
  }
};