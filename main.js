const tbody = document.querySelector('tbody')
const addForm = document.querySelector('.add-form')
const inputTask = document.querySelector('#input-task')

 const createElement = (tag, innerText = '', innerHTML = '') => {
  const element = document.createElement(tag)

  if (innerText) element.innerText = innerText
  if (innerHTML) element.innerHTML = innerHTML
 }
 const createSelect = () => {
  const options = `
  <option value="pendente">pendente</option>
  <option value="em andamento">em andamento</option>
  <option value="concluido">concluido</option>
  `
  const select = createElement('select', '', options)
  const valueSelect = select.value
  return [select, valueSelect]
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

 const createRow = (dateTask) => {
   const {id, title, date} = dateTask
   
   const select = createSelect()
   //select.addEventListener('change', ({target})) => {

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
  
   tdTitle.innerHTML = title
   tdDate.innerHTML = date
   btnEdit.innerHTML = spanEdit
   btnDelete.innerHTML = spanDelete
  
   if (dateTask) {
     tbody.appendChild(tr)
     tdStatus.appendChild(select)
     tdBtn.appendChild(btnEdit)
     tdBtn.appendChild(btnDelete)
    
     tr.appendChild(tdTitle)
     tr.appendChild(tdDate)
     tr.appendChild(tdStatus)
     tr.appendChild(tdBtn)
   }
   return tr
 }
 
 const loadTaskSave = () => {
   const getTask = localStorage.getItem('taskSave')
   const parseTask = JSON.parse(getTask)
   tbody.innerHTML = ''
   if (getTask) {
     for (let value of parseTask) {
      createRow(value)
     }
   }
 }
   


class FetchTask {
  constructor() {
    this.start = () => {
      return {
        id: this.createId(),
        title: this.addTask(),
        date: this.createDate()
      }
    }

    this.createId = () => Math.round(Math.random() * (1 - 99) + 1)

    this.addTask = () => inputTask.value

    this.createDate = () => {
      const styleDate = { dateStyle: 'long', timeStyle: 'short' }
      const date = new Date().toLocaleString('pt-br', styleDate)
      return date
    }

    this.status = () => {
      const valueSelect = createSelect()
      return console.log(valueSelect)
    }
    this.status()
    this.saveTask = (idValue, taskValue, dateValue) => {
      const getTask = localStorage.getItem('taskSave')
      const taskJSON = JSON.parse(getTask)
      
      let arrayDataTask = []
      
      if (getTask) {
        arrayDataTask = taskJSON
      }
      
      if (taskValue) {
        const objdataTask = {id: idValue, title: taskValue, date: dateValue}
        arrayDataTask.push(objdataTask)
        
        const taskJSON = JSON.stringify(arrayDataTask)
        localStorage.setItem('taskSave', taskJSON)
      
      }
    }
    if (inputTask.value) {
    this.saveTask(this.createId(), this.addTask(), this.createDate())
    loadTaskSave()
    }
    console.log('xi')
  }
}

addForm.addEventListener('submit', e => {
  e.preventDefault()
  task.start()
  inputTask.value = ''
})
const task = new FetchTask()
loadTaskSave()
