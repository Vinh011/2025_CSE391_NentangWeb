// Mảng lưu danh sách công việc
const tasks = [];

// các DOM element để lấy các class
const input = document.querySelector(".task-input");
const addBtn = document.querySelector(".add-btn");
const taskList = document.querySelector(".task-list");

// hàm thêm công việc mới
function addTask() {
  const text = input.value;

  if (text === "") {
    alert("Chưa nhập thông tin gì nên chưa lưu được gì!");
    return;
  }

  // Thêm nếu không rỗng thì thêm công việc mới vào mảng `tasks`
  tasks.push({ text, isDone: false });

  input.value = ""; // Xóa nội dung ô input sau khi thêm

  saveTasksToLocalStorage();
  renderTasks(); // Hàm hiển thị lại danh sách công việc sau mỗi lần thêm, sửa, xóa
}

// Hàm hiển thị danh sách công việc
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li"); // Tạo thẻ <li> cho mỗi task

    const span = document.createElement("span"); // Tạo thẻ <span> chứa tên công việc
    span.textContent = task.text; // Gán nội dung công việc

    // Nếu đã hoàn thành thì đổi màu và gạch ngang
    if (task.isDone) {
      span.style.textDecoration = "line-through";
      span.style.color = "gray";
    }

    // Lắng nghe sự kiện click vào text (đã hoàn thành hay chưa hoàn thành)
    span.addEventListener("click", () => {
      task.isDone = !task.isDone;
      saveTasksToLocalStorage();
      renderTasks(); // cập nhật lại giao diện
    });

    // DOM gọi class nút Xóa
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Xóa";

    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1); // Xóa phần tử tại vị trí index
      saveTasksToLocalStorage();
      renderTasks();
    });

    // Thêm span và nút Xóa vào <li>
    li.appendChild(span);
    li.appendChild(deleteBtn);

    // Thêm <li> vào danh sách hiển thị
    taskList.appendChild(li);
  });
}

// Hàm lưu mảng tasks vào localStorage
function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  // JSON.stringify: chuyển mảng tasks thành chuỗi JSON để lưu được
}

// Hàm tải dữ liệu từ localStorage
function loadTasksFromLocalStorage() {
  const data = localStorage.getItem("tasks"); // lấy dữ liệu từ localStorage lưu vào biến data

  if (data) {
    const loadedTasks = JSON.parse(data); // Chuyển chuỗi JSON của mảng data thành mảng object
    tasks.push(...loadedTasks); // Đổ dữ liệu vào mảng `tasks`
    renderTasks();
  }
}

loadTasksFromLocalStorage();

// Gắn sự kiện click cho nút Thêm
addBtn.addEventListener("click", addTask);
