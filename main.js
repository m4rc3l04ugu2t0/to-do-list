const tbody = document.querySelector('tbody')
const addForm = document.querySelector('.add-form')
const inputTask = document.querySelector('#input-Task').value



class FetchTask {
  constructor() {

    this.addTask = () => {
      
      

      return console.log(inputTask)
    }

    this.createDate = () => {
      const styleDate = { dateStyle: 'long', timeStyle: 'short' }
      const date = new Date().toLocaleString('pt-br', styleDate)
      return date
    }

  }
}

const dateTask = new FetchTask()
//console.log(dateTask.addTask())



// const createElement = (tag) => document.createElement(tag)

// const createSelect = () => {
//   const options = `
//   <option value="pendente">pendente</option>
//   <option value="em andamento">em andamento</option>
//   <option value="concluido">concluido</option>
//   `
//   const select = createElement('select')
//   select.innerHTML = options
//   return select
// }

// const createTextBtn = () => {
//   const spanEdit = `
//   <span class="material-symbols-outlined">edit</span>
//   `
//   const spanDelete = `
//   <span class="material-symbols-outlined">delete</span>
//   `
//   return [spanEdit, spanDelete]
// }

// const createRow = () => {
  
  
//   const select = createSelect()
//   const [spanEdit, spanDelete] = createTextBtn()
  
//   const tr = createElement('tr')
//   const tdTitle = createElement('td')
//   const tdDate = createElement('td')
//   const tdStatus = createElement('td')
//   const tdBtn = createElement('td')
//   const btnEdit = createElement('button')
//   const btnDelete = createElement('button')
  
//   btnEdit.classList.add('btn-action')
//   btnDelete.classList.add('btn-action')
  
//   tdTitle.innerHTML = textTask
//   tdDate.innerHTML = dateTask
//   btnEdit.innerHTML = spanEdit
//   btnDelete.innerHTML = spanDelete
  
//   if (textTask) {
//     tbody.appendChild(tr)
//     tdStatus.appendChild(select)
//     tdBtn.appendChild(btnEdit)
//     tdBtn.appendChild(btnDelete)
    
//     tr.appendChild(tdTitle)
//     tr.appendChild(tdDate)
//     tr.appendChild(tdStatus)
//     tr.appendChild(tdBtn)
//   }
// }

// const saveTaskLocal = () => {
  
  
// }
// saveTaskLocal()

// const addTaskSave = () => {
  
//   }

  

// addTaskSave()


addForm.addEventListener('submit', e => {
  e.preventDefault()
  console.log(inputTask)
  //dateTask.addTask()
})
