document.addEventListener("DOMContentLoaded", () => {
  const cat = document.getElementById("cat");
  const bug = document.getElementById("bug");
  const sound = document.getElementById("sound");
  const gameArea = document.getElementById("gameArea");
  const scoreDisplay = document.getElementById("score");

  let score = 0;

  // 更新猫咪的位置以跟随鼠标
  document.addEventListener("mousemove", (e) => {
    const rect = gameArea.getBoundingClientRect();
    const x = e.clientX - rect.left - cat.clientWidth / 2;
    const y = e.clientY - rect.top - cat.clientHeight / 2;

    // 限制猫咪在 gameArea 范围内移动
    const boundedX = Math.max(
      0,
      Math.min(x, gameArea.clientWidth - cat.clientWidth)
    );
    const boundedY = Math.max(
      0,
      Math.min(y, gameArea.clientHeight - cat.clientHeight)
    );

    cat.style.left = `${boundedX}px`;
    cat.style.top = `${boundedY}px`;

    checkCollision();
  });

  // 随机移动虫子
  function moveBug() {
    const x = Math.random() * (gameArea.clientWidth - bug.clientWidth);
    const y = Math.random() * (gameArea.clientHeight - bug.clientHeight);
    bug.style.left = `${x}px`;
    bug.style.top = `${y}px`;
  }

  // 检查猫咪和虫子的碰撞
  function checkCollision() {
    const catRect = cat.getBoundingClientRect();
    const bugRect = bug.getBoundingClientRect();

    if (
      !(
        catRect.right < bugRect.left ||
        catRect.left > bugRect.right ||
        catRect.bottom < bugRect.top ||
        catRect.top > bugRect.bottom
      )
    ) {
      // 发生碰撞
      sound.play();
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      moveBug(); // 让虫子移动到新的位置
    }
  }

  // 初始虫子位置
  moveBug();
});
