let jogador1 = {
    valor: 'pedra',
    vitorias: 0,
    soma: function() {
        return this.vitorias += 1;
    },
    escolha: function() {
        let select = document.getElementById('escolha');
        let value = select.options[select.selectedIndex].value;
        this.valor = value;
        jogador2.escolha();
    },
}

let jogador2 = {
    valor: 'papel',
    vitorias: 0,
    soma: function() {
        return this.vitorias += 1;
    },
    escolha: function() {
        let comparacao = Math.floor(Math.random() * 3);
        if (comparacao == 0) {
            this.valor = 'pedra';
        } else {
            if (comparacao == 1) {
                this.valor = 'papel';
            } else {
                this.valor = 'tesoura';
            }
        }
        jokenpo.vencedor();
    },
}

let jokenpo = {
    ganhador: 'jogador2',
    tabela: [],
    vencedor: function() {
        if ((jogador1.valor == 'pedra' && jogador2.valor == 'tesoura') || (jogador1.valor == 'tesoura' && jogador2.valor == 'papel') || (jogador1.valor == 'papel' && jogador2.valor == 'pedra')) {
            document.getElementById('vitoriasJog1').innerText = `${jogador1.soma()} vitórias`;
            this.ganhador = 'jogador 1';
        } else {
            if (jogador1.valor == jogador2.valor) {
                document.getElementById('vitoriasJog1').innerText = `${jogador1.soma()} vitórias`;
                document.getElementById('vitoriasJog2').innerText = `${jogador2.soma()} vitórias`;
                this.ganhador = 'empate';
            } else {
                document.getElementById('vitoriasJog2').innerText = `${jogador2.soma()} vitórias`;
                this.ganhador = 'jogador 2';
            }
        }
        this.salvar();
    },
    salvar: function() {
        //Criar o objeto
        let movimento = {
            jog1: jogador1.valor,
            jog2: jogador2.valor,
            venc: this.ganhador,
        }
        this.tabela.push(movimento);
        this.apagar();
    },
    apagar: function() {
        if (this.tabela.length > 10) {
            this.tabela.splice(this.tabela[0], 1);
        }
        this.atualiza();
        console.log(this.tabela.length);
    },
    atualiza: function() {
        // atualiza a tabela
        let table = document.getElementById("table").getElementsByTagName("tbody")[0];
        table.innerHTML = " ";
        // primeira linha tabela sempre é da jogada atual
        for (let i = (this.tabela.length - 1); i >= 0; i--) {
            let linha = `<tr>
                            <td>${this.tabela[i].jog1}</td>
                            <td>${this.tabela[i].jog2}</td>
                            <td>${this.tabela[i].venc}</td>
                        </td>`;
            table.innerHTML += linha;
        }
    },
}