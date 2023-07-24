const tbody = document.querySelector('tbody')
const addForm = document.querySelector('.add-form')
const inputTask = document.querySelector('#input-task')

 const createElement = (tag) => document.createElement(tag)

 const createSelect = (valueSelect) => {
   const options = `
   <option value="pendente">pendente</option>
   <option value="em andamento">em andamento</option>
   <option value="concluido">concluido</option>
   `
   const select = createElement('select')
   select.innerHTML = options
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

 const createRow = (dateTask) => {
   const {title, date, status} = dateTask

   //const select = createSelect()
   const [spanEdit, spanDelete] = createTextBtn()
  
   const tr = createElement('tr')
   const tdTitle = createElement('td')
   const tdDate = createElement('td')
   const tdStatus = createElement('td')
   const tdBtn = createElement('td')
   const btnEdit = createElement('button')
   const btnDelete = createElement('button')

   //const task = new FetchTask()
   createSelect(status)
  
   btnEdit.classList.add('btn-action')
   btnDelete.classList.add('btn-action')
  
   tdTitle.innerHTML = title
   tdDate.innerHTML = date
   btnEdit.innerHTML = spanEdit
   btnDelete.innerHTML = spanDelete
  
   if (dateTask) {
     tbody.appendChild(tr)
     tdStatus.appendChild(status)
     tdBtn.appendChild(btnEdit)
     tdBtn.appendChild(btnDelete)
    
     tr.appendChild(tdTitle)
     tr.appendChild(tdDate)
     tr.appendChild(tdStatus)
     tr.appendChild(tdBtn)
   }
 }
 
 const loadTaskSave = () => {
   const getTask = localStorage.getItem('taskSave')
   const parseTask = JSON.parse(getTask)
   
   if (getTask) {
     for (let value of parseTask) {
      //console.log(value)
       createRow(value)
     }
   }
 }
   
loadTaskSave()

class FetchTask {
  constructor() {
    this.start = () => {
      return {
        title: this.addTask(),
        date: this.createDate(),
        status: this.createSelect()
      }
    }

    this.addTask = () => inputTask.value

    this.createDate = () => {
      const styleDate = { dateStyle: 'long', timeStyle: 'short' }
      const date = new Date().toLocaleString('pt-br', styleDate)
      return date
    }

    

    // this.createSelect = (valueSelect) => {
    //   const options = `
    //   <option value="pendente">pendente</option>
    //   <option value="em andamento">em andamento</option>
    //   <option value="concluido">concluido</option>
    //   `
    //   const select = createElement('select')
    //   select.innerHTML = options
    //   select.value = valueSelect
    //   return select
    // }
    
    this.saveTask = (taskValue, dateValue, selectValue) => {
      const getTask = localStorage.getItem('taskSave')
      const taskJSON = JSON.parse(getTask)
      
      let arrayDataTask = []
      
      if (getTask) {
        arrayDataTask = taskJSON
      }
      
      if (taskValue) {
        const objdataTask = {title: taskValue, date: dateValue, status: selectValue}
        arrayDataTask.push(objdataTask)
        console.log(arrayDataTask)
        const taskJSON = JSON.stringify(arrayDataTask)
        localStorage.setItem('taskSave', taskJSON)
      
      }
    }
    this.saveTask(this.addTask(), this.createDate(), this.createSelect())
    createRow(this.start())
  }
}

addForm.addEventListener('submit', e => {
  e.preventDefault()
  const task = new FetchTask()
  task.start()
})
