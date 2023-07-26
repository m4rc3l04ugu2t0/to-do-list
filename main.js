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
   /*const getTask = localStorage.getItem('taskSave')
      const taskJSON = JSON.parse(getTask)
      
      
      let objId = {}
      let arrayDataTask = []
      
      if (getTask) {
        arrayDataTask = taskJSON
        /*for (let value of taskJSON) {
          objId = value
        }
      }
      
      if (valueId) {
        
        const objdataTask = {id: valueId, title: taskValue, date: dateValue, status: valueSelect}
        objId[valueId] = objdataTask
        arrayDataTask.push(objId)
        
        const taskJSON = JSON.stringify(arrayDataTask)
        localStorage.setItem('taskSave', taskJSON)
      */

   const getTask = localStorage.getItem('taskSave')
   let parseTask = JSON.parse(getTask)
   
   /*let newObj = {}
   let newArray = []
   
   
   if (getTask) {
     newArray = parseTask
    for (let value of parseTask) {
      newObj = value
    }
   }*/
    if (id) {
   newObj = {id, title, date, status}
   newObj.status = newStatus
   const sla = classId[0]
  
   for (let value of parseTask) {
     value[sla] = newObj
   }
   
     const jsn = JSON.stringify(parseTask)
     localStorage.setItem('taskSave', jsn)
   
   }
   
 }

 const createRow = (dataTask) => {
   const {id, title, date, status} = dataTask
  console.log(status)
   
   
   const select = createSelect(status)
   select.classList.add(id)
   
   select.addEventListener('click', (target) => {
     const selectId = select.classList
     select.addEventListener('change', ({target}) => updateTask({...dataTask, newStatus: target.value, classId: selectId}))
   })

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
  
   //if (dataTask) {
     //tbody.appendChild(tr)
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
   
class FetchTask {
  constructor() {
    this.start = () => {
     /*this.saveTask(this.createId(), this.addTask(), this.createDate(), 'pendente')
      loadTaskSave()*/
      return {
        id: this.createId(),
        title: this.addTask(),
        date: this.createDate(),
        status: 'pendente'
      }
    }

    this.createId = () => 'id' + Math.floor(Math.random() * 100) + 1

    this.addTask = () => inputTask.value

    this.createDate = () => {
      const styleDate = { dateStyle: 'long', timeStyle: 'short' }
      const date = new Date().toLocaleString('pt-br', styleDate)
      return date
    }
    
    this.saveTask = (valueId, taskValue, dateValue, valueSelect) => {
      const getTask = localStorage.getItem('taskSave')
      const taskJSON = JSON.parse(getTask)
      console.log(taskJSON)
      
      let objId = {}
      let arrayDataTask = []
      
      if (getTask) {
        arrayDataTask = taskJSON
        for (let value of taskJSON) {
          objId = value
        }
      }
      
      if (valueId) {
        
        const objdataTask = {id: valueId, title: taskValue, date: dateValue, status: valueSelect}
        objId[valueId] = objdataTask
        
        arrayDataTask.push(objId)
        
        console.log(objId)
        const taskJSON = JSON.stringify(arrayDataTask)
        localStorage.setItem('taskSave', taskJSON)
      
      }
    }
    if (inputTask.value) {
    this.saveTask(this.createId(), this.addTask(), this.createDate(), 'pendente')
      loadTaskSave()
    }
  }
}

addForm.addEventListener('submit', e => {
  e.preventDefault()
  const task = new FetchTask()
  task.start()
  inputTask.value = ''
})

loadTaskSave()
