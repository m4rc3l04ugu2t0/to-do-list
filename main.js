const tbody = document.querySelector('tbody')
const addTask = document.querySelector('.add-form')
//const taskSaves = []

const createDate = () => {
  const date = new Date()
  const newDate = date.toLocaleString()
  return newDate
}


const createElement = (tag) => document.createElement(tag)

const createSelect = () => {
  const options = `
  <option value="pendente">pendente</option>
  <option value="em andamento">em andamento</option>
  <option value="concluido">concluido</option>
  `
  const select = createElement('select')
  select.innerHTML = options
  return select
}

const createTextBtn = () => {
  const spanEdit = `
  <span class="material-symbols-outlined">edit</span>
  `
  const spanDelete = `
  <span class="material-symbols-outlined">delete</span>
  `
  return [spanEdit, spanDelete]
}

const createRow = (textTask, dateTask = '') => {
  //const textTask = text
  //const dateTask = date
  
  
  const select = createSelect()
  const [spanEdit, spanDelete] = createTextBtn()
  
  const tr = createElement('tr')
  const tdTitle = createElement('td')
  const tdDate = createElement('td')
  const tdStatus = createElement('td')
  const tdBtn = createElement('td')
  const btnEdit = createElement('button')
  const btnDelete = createElement('button')
  
  btnEdit.classList.add('btn-action')
  btnDelete.classList.add('btn-action')
  
  tdTitle.innerHTML = textTask
  tdDate.innerHTML = dateTask
  btnEdit.innerHTML = spanEdit
  btnDelete.innerHTML = spanDelete
  
  if (textTask) {
    tbody.appendChild(tr)
    tdStatus.appendChild(select)
    tdBtn.appendChild(btnEdit)
    tdBtn.appendChild(btnDelete)
    
    tr.appendChild(tdTitle)
    tr.appendChild(tdDate)
    tr.appendChild(tdStatus)
    tr.appendChild(tdBtn)
  }
}

const saveTaskLocal = (valueTask, valueDate = '') => {
  const savedTasks = localStorage.getItem('textOfTask')
  let taskSaves = []


  if (savedTasks) {
    taskSaves = JSON.parse(savedTasks)
  }

  if (valueTask) {
    const task = valueTask
    taskSaves.push(task)

    const tasksJSON = JSON.stringify(taskSaves)
  
    localStorage.setItem('textOfTask', tasksJSON)
    //localStorage.setItem('dateOfTask', valueDate)]
  }
}


const addTaskSave = () => {
  const sla = localStorage.getItem('textOfTask')
  const dateOfTask = localStorage.getItem('dateOfTask')
  const parseTaskSave = JSON.parse(sla)
  
  if (parseTaskSave) {
    for (let valueTask of parseTaskSave) {
      createRow(valueTask)
    }
  }
}


addTask.addEventListener('submit', e => {
  e.preventDefault()
  const inputTaskText = document.querySelector('#input-task')
  createRow(inputTaskText.value)
  saveTaskLocal(inputTaskText.value)
  createDate()
  inputTaskText.value = ''
})
addTaskSave()