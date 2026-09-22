import SwitchBusca from "./SwitchBusca"
import { useNavigate, useSearchParams } from "react-router-dom";
import { Film } from "lucide-react";

function InfoFilme({filmes, setPaginaFil, yzfR6}){
    const navigate = useNavigate()
    function onSeeDetailsClick(item){
            const query= new URLSearchParams();
            query.set('title', item.title);
            query.set('poster', item.poster_path);
            query.set('data', item.release_date.slice(0, 4));
            query.set('nota', item.vote_average.toFixed(1));
            query.set('avaliacoes', item.vote_count)
            query.set('sinopse', item.overview)
            query.set('id', item.id)
            navigate(`/filme?${query.toString()}`)
        }
    return(
        <>
        {filmes && filmes.length === 0 && (
    <div className="flex flex-col items-center justify-center py-24 text-center">
        <Film size={64} className="text-gray-700 mb-4" />
        <p className="text-white text-lg font-medium mb-1">Nenhum filme encontrado</p>
        <p className="text-gray-500 text-sm">Tente buscar por outro título</p>
    </div>
)}
 {filmes && filmes[0] && (
            <div className="flex justify-center">
    <div className="flex gap-8 p-6">
        <img 
          src={`https://image.tmdb.org/t/p/w500${filmes[0].poster_path}`}
          alt={filmes[0].title}
          className="w-64 rounded-xl"
        />
        <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">EM DESTAQUE</span>
                <span className="text-gray-400">{filmes[0].release_date?.slice(0, 4)}</span>
            </div>
            <h1 className="text-white text-5xl font-bold mb-3">{filmes[0].title}</h1>
            <div className="flex items-center gap-2 mb-4">
                <span className="text-amber-400 text-xl">★</span>
                <span className="text-white text-xl font-semibold">{filmes[0].vote_average?.toFixed(1)}</span>
                <span className="text-gray-500">· {filmes[0].vote_count} avaliações</span>
            </div>
            <p className="text-gray-300 max-w-2xl leading-relaxed">{filmes[0].overview}</p>
            <button 
          className="bg-yellow-300 px-4 py-2 rounded-lg font-medium mt-4"
          onClick={() => onSeeDetailsClick(filmes[0])}
        >
          Ver mais
        </button>
        </div>
    </div>
    </div>
)}

    {filmes && <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-90 pt-10 pb-15"> {filmes.slice(1).map((item, i) => (
        <div key={i} className="group cursor-pointer">
            <div className="relative rounded-xl overflow-hidden">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title}
                  className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 w-50 group-hover:opacity-105 group-hover:scale-105 transition-opacity rounded-xl flex items-center justify-center">
                    <button className="bg-yellow-300 px-4 py-2 rounded-lg font-medium" onClick={() => onSeeDetailsClick(item)}>Ver mais</button>
                </div>
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="text-amber-400 text-xs">★</span>
                    <span className="text-white text-xs font-medium">{item.vote_average?.toFixed(1)}</span>
                </div>
            </div>
            <p className="text-white text-sm font-medium mt-2 truncate">{item.title}</p>
            <p className="text-gray-500 text-xs">{item.release_date?.slice(0, 4)}</p>
        </div>
    ))}</div>}
    {filmes && filmes.length >= 1 && <SwitchBusca setPaginaFil={setPaginaFil} filmes={filmes}/>}
    </>
    )
}export default InfoFilme