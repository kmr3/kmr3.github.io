const loadingText = document.getElementById("loadingText");
let dotCount = 0;
const dotTimer = setInterval(() => {
  dotCount = (dotCount + 1) % 4;
  loadingText.textContent = "Loading" + ".".repeat(dotCount);
}, 500);

// フェードアウトしてメイン表示＆桜モード変更
window.addEventListener("load", () => {
  setTimeout(() => {
    clearInterval(dotTimer);
    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("main-content").classList.remove("hidden");
    // 花びら一斉ふわっ！モード
    triggerBlossomBurst();
  }, 4000);
});
