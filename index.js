const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
    value: "Tomar 2 litros de água por dia",
    checked: false
}

let metas = [ meta ]

const CadastrarMetas = async() => {
    const meta = await input({ message: "Digite a meta:"})

    if(meta.length==0){
        console.log("A meta não pode ser vazia.")
        return CadastrarMetas()
    }

    metas.push(
        { value: meta, checked: false}
    )
}

const ListarMetas = async() => {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar a etapa.",
        choices: [...metas],
        instructions: false
    })

    if(respostas.length == 0){
        console.log("Nenhuma meta selecionada.")
        return ListarMetas
    }

    metas.forEach((m) => {
        m.checked = false
    })

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log("Meta(s) marcadas cmo concluída(s)")
}

const start = async() => {
    while (true){
        
        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar meta",
                    value: "listar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch(opcao){
            case "cadastrar" :
                console.log("vamos cadastrar")
                await CadastrarMetas()
                console.log(metas)
                break
            case "listar" :
                console.log("vamos listar")
                await ListarMetas()
                break
            case "sair" :
                console.log("Até a próxima")
                return
        }
    }
}

start()