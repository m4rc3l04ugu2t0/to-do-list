const tbody = document.querySelector('tbody')
const addTask = document.querySelector('.add-form')

addTask.addEventListener('submit', e => {
  e.preventDefault()
  textTask()
  createRow()
})

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

const createRow = (task) => {
  const textTask = localStorage.getItem('textOfTask')
  const dateTask = localStorage.getItem('dateTask')
  
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
createRow()

const textTask = () => {
  const textTask = document.querySelector('#input-task').value
  
  if (!textTask) return alert('Digite algo antes de adicionar!')
  
  localStorage.setItem('textOfTask', textTask)
}

const createDate = () => {
  const date = new Date()
  localStorage.setItem('dateTask', date.toLocaleString()) 
}
createDate()





