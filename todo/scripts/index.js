// タスクを追加する関数
function addTask(taskText) {
  const taskList = document.getElementById("taskList");

  if (taskText.trim() === "") return; // 空のタスクは追加しない

  // タスクの数が10個を超える場合はアラートを表示して追加しない
  if (taskList.children.length >= 10) {
    alert("タスクは10個までしか追加できません");
    return;
  }

  const taskItem = document.createElement("li");

  // タスク内容を表示するspan要素を作成
  const taskTextNode = document.createElement("span");
  taskTextNode.textContent = taskText;
  taskItem.appendChild(taskTextNode);

  // 修正ボタンを作成
  const editButton = createButton("修正", () => {
    const newTaskText = prompt("新しいタスク内容を入力してください", taskTextNode.textContent);
    if (newTaskText !== null && newTaskText.trim() !== "") {
      taskTextNode.textContent = newTaskText.trim();
    }
  });
  taskItem.appendChild(editButton);

  // 個別のタスクに対応する削除ボタンを作成
  const deleteButton = createButton("削除", () => {
    taskList.removeChild(taskItem);
  });
  taskItem.appendChild(deleteButton);

  // タスクアイテムをリストに追加
  taskList.appendChild(taskItem);
}

// ボタンを作成するヘルパー関数
function createButton(text, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", onClick);
  return button;
}

// ボタンをクリックまたはEnterキーでタスクを追加
function handleTaskInput(event) {
  const taskInput = document.getElementById("taskInput");

  if (event.type === "keydown" && event.key !== "Enter") return; // Enterキー以外は無視、clickは無条件で処理

  const taskText = taskInput.value;
  taskInput.value = ""; // 入力欄を空にする
  addTask(taskText);
}

// イベントリスナーの設定
document.getElementById("addTaskBtn").addEventListener("click", () => handleTaskInput({ type: "click" }));
document.getElementById("taskInput").addEventListener("keydown", handleTaskInput);
document.getElementById("clearTaskBtn").addEventListener("click", () => document.getElementById("taskList").textContent = "");
