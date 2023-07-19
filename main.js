const addTask = () => {
  const inputTask = document.querySelector('#input-task')
  createTask(inputTask)
}

const createElement = (tag) => {
  return document.createElement(tag)
}

const createTask = (text) => {
  const tbody = document.querySelector('tbody')
  
  const tr = createElement('tr')
  const td = createElement('td')
  
  tbody.appendChild(tr)
  
  td
  
}

const createDate = () => {
  const date = new Date()
  return date.toLocaleString()
}



