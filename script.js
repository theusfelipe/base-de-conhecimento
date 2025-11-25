let cardContainer = document.querySelector(".card-container")
let inputBusca = document.querySelector("input[type='text']")
let dados = []

async function iniciarBusca() {
  // Se os dados ainda não foram carregados, busca do JSON.
  if (dados.length === 0) {
    try {
      let resposta = await fetch("data.json")
      dados = await resposta.json()
    } catch (error) {
      console.error("Erro ao buscar os dados:", error)
      return // Interrompe a execução se houver erro
    }
  }

  let termoBusca = inputBusca.value.toLowerCase()
  let resultados = dados.filter((dado) =>
    dado.nome.toLowerCase().includes(termoBusca)
  )

  renderizarCards(resultados)
}

function renderizarCards(dados) {
  cardContainer.innerHTML = "" // Limpa os cards existentes antes de renderizar novos
  for (let dado of dados) {
    let article = document.createElement("article")
    article.classList.add("card")
    article.innerHTML = `
    <h2>${dado.nome}</h2>
    <p>${dado.data_criacao}</p>
    <p>${dado.descricao}</p>
    <a href="${dado.link}" target="_blank">Saiba mais</a>
    `
    cardContainer.appendChild(article)
  }
}
