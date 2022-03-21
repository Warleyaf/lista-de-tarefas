const Main = {
  init: function () {
    //esse init e a function é responsável por iniciar a coisa toda, ou seja, fazer o cache do selector
    this.cacheSelectors() // se eu colocar só a função cacheSelector sem o this, eu não vou encontrar ela, ai usando o this eu encontro, o meu this vai estar se referenciando ao o meu Main, e quando eu estou falando o this.cacheSelector, eu estou dizendo que essa função está no pai do meu elemento no caso o Main
    this.bindEvents() // chamando as funções fazendo o cache dos seletores
  },

  cacheSelectors: function () {
    // essa função cacheSelectors vai ser responsável por selecionar os elementos do html e armazenar eles numa variável

    this.$checkButtons = document.querySelectorAll('.check') // toda as variáveis que estiver relacionado ao html eu irei colocar o $ na frente, esse sifrão se trata de uma boa prática
    this.$inputTask = document.querySelector('#inputTask')
    this.$list = document.querySelector('#list')
    this.$removeButtons = document.querySelectorAll('.remove')
  },

  bindEvents: function () {
    // essa função bindEvents vai ser responsável por adicionar eventos, como o click o key press entre outras coisas

    const self = this // criei isso aqui para pegar o this dentro da minha main, sem isso aqui o meu this ia pegar o window

    this.$checkButtons.forEach(function (button) {
      // forEach significa paracada, então para cada item do meu array eu vou aplicar essa function aqui
      button.onclick = self.Events.checkButton_click //criei um objeto ali em baixo, o objeto events, e detro dele criei a função, e estou chamando aquela função para cá, isso faz com que o meu código fique mais organizado
    })

    this.$inputTask.onkeypress = self.Events.inputTask_keypress.bind(this)

    this.$removeButtons.forEach(function (button) {
      button.onclick = self.Events.removeButton_click
    })
  },

  Events: {
    checkButton_click: function (e) {
      const li = e.target.parentElement //peguei esse target.parentElement usando o console .log
      const isDone = li.classList.contains('done') // esse contains é para eu verificar se tem essa classe done no meu html, caso não houver ele vai colocar.

      if (!isDone) {
        //verificando se tem minha classe done
        return li.classList.add('done')
      }
      li.classList.remove('done')
    },

    //dentro de uma função de evento seja de click ou de keypress, o this sempre vai ser o elemento que eu adicionei o evento, e para cortonar isso eu adiciono o self que está recebendo this, onde eu coloquei o .bind(this), bind é meio que conectar ligar essas coisas (isso está na linha 26)

    inputTask_keypress: function (e) {
      const key = e.key
      const value = e.target.value

      if (key === 'Enter') {
        this.$list.innerHTML += `
          <li>
            <div class="check"></div>
            <label class="task"> ${value} </label>
            <button class="remove"></button>
          </li>
        `
        e.target.value = '' //isso aqui é para limpar quando eu digitar algo para adicionar na minha anotação
        // Ok agora temo um problema, ao inserir uma nova tarefa ele não permite que eu marque a tarefa como feito, ou seja com aquela bolinha verde, porque essa função meio que vai reescrever o meu ul do html, e para cortanar isso eu preciso chamar os meus eventos novamente que são os cacheSelector e o bindEvents
        this.cacheSelectors()
        this.bindEvents()
      }
    },

    removeButton_click: function (e) {
      let li = e.target.parentElement
      li.classList.add('removed')

      setTimeout(function () {
        li.classList.add('hidden')
      }, 300)
    }
  }
}
Main.init()
