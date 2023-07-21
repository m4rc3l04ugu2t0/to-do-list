const tbody = document.querySelector('tbody')
const addTask = document.querySelector('.add-form')

const createDate = () => {
  const options = { dateStyle: 'long', timeStyle: 'short' }
  const date = new Date().toLocaleString('pt-br', options)
  return date
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

const createRow = (textTask, dateTask) => {
  
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
  
  
    tbody.appendChild(tr)
    tdStatus.appendChild(select)
    tdBtn.appendChild(btnEdit)
    tdBtn.appendChild(btnDelete)
    
    tr.appendChild(tdTitle)
    tr.appendChild(tdDate)
    tr.appendChild(tdStatus)
    tr.appendChild(tdBtn)
  
}



const saveTaskLocal = (valueTask, valueDate) => {
  const savedTasks = localStorage.getItem('textOfTask')
  const savedDates = localStorage.getItem('dateOfTask')

  // const obj = {
  //   title: savedTasks,
  //   data: savedDates
  // }

  if (savedTasks && savedDates) {
    taskSaves = JSON.parse(savedTasks)
  }

  if (valueTask && valueDate) {
    
    
    const newobj = {}

    newobj.title = savedTasks
    newobj.date = savedDates
    
    
    const tasksJSON = JSON.stringify(newobj)
    console.log(tasksJSON)
  
    localStorage.setItem('textOfTask', tasksJSON)
    localStorage.setItem('dateOfTask', valueDate)
  }
}


const addTaskSave = () => {
  const sla = localStorage.getItem('textOfTask')
  const dateTask = localStorage.getItem('dateOfTask')
  const parseTaskSave = JSON.parse(sla)
  console.log(parseTaskSave)
  // if (parseTaskSave) {
  //   for (let valueTask of parseTaskSave) {
  //     createRow(valueTask, dateTask)
  //   }
  // }
}


addTask.addEventListener('submit', e => {
  e.preventDefault()
  const inputTaskText = document.querySelector('#input-task')
  createRow(inputTaskText.value, createDate())
  saveTaskLocal(inputTaskText.value, createDate())
  
  inputTaskText.value = ''
})
addTaskSave()