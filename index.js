const start = () => {
    while (true){
        let opcao = "sair"
        switch(opcao){
            case "cadastrar" :
                console.log("vamos cadastrar")
                break
            case "listar" :
                console.log("vamos listar")
                break
            case "sair" :
                return
        }
    }
}

start()