let npt=document.getElementById('npt')
let btn=document.getElementById('btn')
let task = document.getElementById('task')
let loader=document.getElementById('loader')
btn.addEventListener('click', function () {
 addTodo()
})

async function addTodo() {
  let bod ={
    title: npt.value,
      apiKey: "65abdb482681618c591c50b7"
  }
  let data = await fetch("https://todos.routemisr.com/api/v1/todos", {
    method: "POST",
    body: JSON.stringify(bod),
    headers: {'content-type': 'application/json'},
  })
  let response = await data.json();
  if (response.message == 'success') {
    getTodo()
  }
}
getTodo();
async function getTodo() {
  loader.style.display = 'block';
  task.style.display = 'none';
  let data = await fetch('https://todos.routemisr.com/api/v1/todos/65abdb482681618c591c50b7');
  let response = await data.json();
  if (response.message == 'success') {
    loader.style.display = 'none';
    task.style.display = 'block';
    displayTodo(response.todos)
  }
  console.log(response)
}

function displayTodo(data) {
  let cartona = ``
  for (let i = 0; i < data.length; i++) {
    cartona += `
    <div class="d-flex d-flex justify-content-between text-white w-75 m-auto mt-3 mb-3 p-3 rounded-3 bg-success">
      <p class="m-0 ${(data[i].completed)?'text-decoration-line-through':''}" >${data[i].title}</p>
      <div>
        <i onclick="marckUp('${data[i]._id}')" class="fa-regular fa-circle-check me-2 ${(data[i].completed)?'d-none':''}"></i>
        <i onclick="deletTodo('${data[i]._id}')" class="fa-solid fa-trash text-danger"></i>
      </div>
    </div>
    `
  }
  task.innerHTML = cartona;
}
async function deletTodo(id) {

  let data = await fetch("https://todos.routemisr.com/api/v1/todos", {
    method: "DELETE",
    body: JSON.stringify({todoId:id}),
    headers: {'content-type': 'application/json'},
  })
  let response = await data.json();
  if (response.message == 'success') {
    getTodo()
  }
}

async function marckUp(id) {
  let data = await fetch("https://todos.routemisr.com/api/v1/todos", {
    method: "PUT",
    body: JSON.stringify({todoId:id}),
    headers: {'content-type': 'application/json'},
  })
  let response = await data.json();
  if (response.message == 'success') {
    getTodo()
  }
  console.log(response)
}