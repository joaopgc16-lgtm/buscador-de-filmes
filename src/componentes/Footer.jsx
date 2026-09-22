import Icone from "./Icone"
import Busca from "./Busca"
import Opcoes from "./Opcoes"

function Footer({busca, buscarFilme, setBusca}){
    return(
        <div className="flex m-auto gap-135 justify-center border-1 border-b-zinc-600 pb-3 pt-2">
            <Icone/>
            <Busca busca={busca} buscarFilme={buscarFilme} setBusca={setBusca}/>
            <Opcoes/>
        </div>
    )
}export default Footer