const tbody = document.querySelector('tbody')
const addForm = document.querySelector('.add-form')
const inputTask = document.querySelector('#input-task')

 const createElement = (tag, innerText = '', innerHTML = '') => {
  const element = document.createElement(tag)

  if (innerText) element.innerText = innerText
  if (innerHTML) element.innerHTML = innerHTML
  
  return element
 }
 const createSelect = (valueSelect) => {
  const options = `
  <option value="pendente">pendente</option>
  <option value="em andamento">em andamento</option>
  <option value="concluido">concluido</option>
  `
  const select = createElement('select', '', options)
  select.value = valueSelect
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
 
 const updateTask = ({id, title, date, status, newStatus, classId}) => {
   const getTask = localStorage.getItem('taskSave')
   const parseTask = JSON.parse(getTask)
   
   let newObj = {}
   let newArray = []
   
   if (getTask) {
    for (let value of parseTask) {
      newObj = value
    }
   }
   newObj = {id, title, date, status}
   newObj.status = newStatus
   const keyId = classId[0]
  
   for (let value of parseTask) {
    value[keyId] = newObj
   
    newArray.push(newObj)

    const setTaskJSON = JSON.stringify(parseTask)
    localStorage.setItem('taskSave', setTaskJSON)
   } 
 }
 
 const resetTask = (idTask) => {
   const getTask = localStorage.getItem('taskSave')
   const parseTask = JSON.parse(getTask)
   
   parseTask.filter(value => {
    delete value[idTask]
   })
   const setTaskJSON = JSON.stringify(parseTask)
   localStorage.setItem('taskSave', setTaskJSON)
   
   loadTaskSave()
 }

 const createRow = (dataTask) => {
   const {id, title, date, status} = dataTask
   const select = createSelect(status)

   select.classList.add(id)
   const selectId = select.classList

   select.addEventListener('change', ({target}) => {
    updateTask({...dataTask, newStatus: target.value, classId: selectId})
    loadTaskSave()
   })
   const [spanEdit, spanDelete] = createTextBtn()
   
   const tr = createElement('tr')
   const tdTitle = createElement('td')
   const tdDate = createElement('td')
   const tdStatus = createElement('td')
   const tdBtn = createElement('td')
   const btnEdit = createElement('button')
   const btnDelete = createElement('button')
   const form = createElement('form')
   const input = createElement('input')
   
   btnEdit.classList.add('btn-action')
   btnDelete.classList.add('btn-action')
   
   form.appendChild(input)
   
   form.addEventListener('submit', e => {
     e.preventDefault()
     updateTask({id, title: input.value, date, status, newStatus: status, classId: selectId})
     input.blur()
     loadTaskSave()
   })
   
   btnEdit.addEventListener('click', () => {
     tdTitle.innerHTML = ''
     tdTitle.appendChild(form)
     input.value = title
     input.focus()
   })
   
   btnDelete.addEventListener('click', e => resetTask(id))
   
   tdTitle.innerHTML = title
   tdDate.innerHTML = date
   btnEdit.innerHTML = spanEdit
   btnDelete.innerHTML = spanDelete
   
   tdStatus.appendChild(select)
   tdBtn.appendChild(btnEdit)
   tdBtn.appendChild(btnDelete)
   
   tr.appendChild(tdTitle)
   tr.appendChild(tdDate)
   tr.appendChild(tdStatus)
   tr.appendChild(tdBtn)
   
   return tr
 }
 
 const loadTaskSave = () => {
   const getTask = localStorage.getItem('taskSave')
   const parseTask = JSON.parse(getTask)
   
   tbody.innerHTML = ''
   if (getTask) {
     for (let value of parseTask) {
      const objId = Object.values(value)
      objId.filter(objIdValue => {
        const tr = createRow(objIdValue)
        tbody.appendChild(tr)
      })
     }
   }
 }
 
  const createId = () => {
    const id = 'id' + Math.floor(Math.random() * 100) + 1
    return id
  }
    
  const createDate = () => {
    const styleDate = { dateStyle: 'long', timeStyle: 'short' }
    const date = new Date().toLocaleString('pt-br', styleDate)
    return date
  }
 
class FetchTask {
  constructor(id, title, date, status) {
    this.id = id
    this.title = title
    this.date = date
    this.status = status
    loadTaskSave()
  } 
  
  saveTask() {
    const getTask = localStorage.getItem('taskSave')
    const getTaskJSON = JSON.parse(getTask)
      
    let objId = {}
    let arrayDataTask = []
      
    if (getTask) {
      for (let value of getTaskJSON) {
        objId = value
      }
    }
        
    const objdataTask = {id: this.id, title: this.title, date: this.date, status: this.status}
    objId[this.id] = objdataTask
        
    arrayDataTask.push(objId)
        
    const setTaskJSON = JSON.stringify(arrayDataTask)
    localStorage.setItem('taskSave', setTaskJSON)
    loadTaskSave()
  }
}

addForm.addEventListener('submit', e => {
  e.preventDefault()
  const task = new FetchTask(createId(), inputTask.value, createDate(), 'pendente')
  task.saveTask()
  console.log(task)
  inputTask.value = ''
})
loadTaskSave()
