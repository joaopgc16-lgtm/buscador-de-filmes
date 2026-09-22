import { Search, } from "lucide-react";

function Busca({busca, buscarFilme, setBusca}){
    return(
        
       <div className="flex justify-center items-center max-w-screen">
        <div className='relative '>
                 
                <button disabled={busca === ""} onClick={buscarFilme} className={` ${busca === "" ? "cursor-not-allowed" : ""} absolute left-3 top-1/2 -translate-y-1/2 opacity-50`}>
                <Search size={16}/>
                </button>
                <input value={busca} onChange={(e) => setBusca(e.target.value)} className=' w-100 pl-12 p-2 pr-15 rounded-xl border-yellow-300 bg-neutral-800 text-gray-500' placeholder="Buscar filmes,séries,diretores..."/>
              </div>
       </div>
    )
}export default Busca;