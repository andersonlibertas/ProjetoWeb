const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sDta = document.querySelector('#m-dta')
const sCpf = document.querySelector('#m-cpf')
const sSexo = document.querySelector('#m-sexo')
const sEndereco = document.querySelector('#m-endereco')
const sStatus = document.querySelector('#m-status')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sDta.value = itens[index].dta
    sCpf.value = itens[index].cpf
	sSexo.value = itens[index].sexo
	sEndereco.value = itens[index].endereco
	sStatus.value = itens[index].status
    id = index
  } else {
	sNome.value = ''
    sDta.value = ''
    sCpf.value = ''
	sSexo.value = ''
	sEndereco.value = ''
	sStatus.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')
  
  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.dta}</td>
    <td>${item.cpf}</td>
	<td>${item.sexo}</td>
	<td>${item.endereco}</td>
	<td>${item.status}</td>	

    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  
  if (sNome.value == '' || sDta.value == '' || sCpf.value == '' || sSexo.value == '' || sEndereco.value == '' || sStatus.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].dta = sDta.value
    itens[id].cpf = sCpf.value
	itens[id].sexo = sSexo.value
    itens[id].endereco = sEndereco.value
	itens[id].status = sStatus.value
  } else {
    itens.push({
		'nome': sNome.value, 
		'dta': sDta.value, 
		'cpf': sCpf.value,
		'sexo': sSexo.value,
		'endereco': sEndereco.value,
		'status': sStatus.value
		}
		)
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
