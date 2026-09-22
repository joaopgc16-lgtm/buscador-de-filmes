import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";

function DetailFilme(){
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const title = searchParams.get('title');
    const poster = searchParams.get('poster');
    const data = searchParams.get('data');
    const nota = searchParams.get('nota');
    const avaliacoes = searchParams.get('avaliacoes');
    const sinopse = searchParams.get('sinopse');
    const id = searchParams.get('id');

    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null);
    const [resDados, setResDados] = useState(null);
    const [atores, setAtores] = useState([]);
    const [generos, setGeneros] = useState([]);

    useEffect(() => {
        joaoBurro();
    }, []);

    async function joaoBurro(){
        setCarregando(true);
        setErro(null);
        try{
            const aurora = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=d18742ef4d58af34ce99cedb5373d59b&language=pt-BR`);
            if (!aurora.ok) throw new Error("Failed to load trending items.");
            const auroraDados = await aurora.json();

            const detalhes = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=d18742ef4d58af34ce99cedb5373d59b&language=pt-BR`);
            if(!detalhes.ok){ throw new Error('')}
            const dadosDetalhes = await detalhes.json();
            setResDados(dadosDetalhes);

            const cast = auroraDados.cast.slice(0, 16).map((item) => ({
                nome: item.name,
                personagem: item.character,
                foto: item.profile_path
            }));
            setAtores(cast);

            const genero = dadosDetalhes.genres.map((item) => ({
                nome: item.name
            }));
            setGeneros(genero);

        } catch(erro){
            setErro("[ERRO] Falha ao carregar tendências");
        } finally {
            setCarregando(false);
        }
    }

    return(
        <div className="min-h-screen bg-zinc-950 relative overflow-hidden pb-16">

            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20 blur-2xl"
              style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${poster})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/60 to-zinc-950" />

            <div className="relative">
                <button 
                  onClick={() => navigate(-1)}
                  className="absolute top-6 left-6 z-10 text-white/70 hover:text-white transition-colors flex items-center gap-1 text-sm font-medium"
                >
                    ← Voltar
                </button>

                <div className="flex justify-center px-10 pt-20">
                    <div className="flex gap-10 max-w-5xl w-full">
                        <img 
                          src={`https://image.tmdb.org/t/p/w500${poster}`}
                          alt={title}
                          className="w-72 rounded-2xl shadow-2xl shadow-black/60 flex-shrink-0"
                        />

                        <div className="flex-1 pt-2">
                            <span className="text-gray-400 text-sm font-mono">{data}</span>
                            <h1 className="text-white text-5xl font-bold mt-1 mb-4 leading-tight">{title}</h1>

                            {carregando && <p className="text-gray-500 text-sm mb-4">Carregando detalhes...</p>}
                            {erro && <p className="text-red-400 text-sm mb-4">{erro}</p>}

                            {generos.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-5">
                                    {generos.map((item, i) => (
                                        <span 
                                          key={i} 
                                          className="bg-white/10 border border-amber-500/30 text-amber-400 text-xs font-medium px-3 py-1 rounded-full"
                                        >
                                            {item.nome}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="flex items-center gap-3 mb-6 font-mono">
                                <span className="text-amber-400 text-2xl">★</span>
                                <span className="text-white text-2xl font-semibold">{nota}</span>
                                <span className="text-gray-500 text-sm">· {avaliacoes} avaliações</span>
                                {resDados?.runtime > 0 && (
                                    <span className="text-gray-500 text-sm">· {resDados.runtime} min</span>
                                )}
                            </div>

                            <h2 className="text-white text-lg font-semibold mb-2">Sinopse</h2>
                            <p className="text-gray-300 leading-relaxed max-w-2xl">{sinopse}</p>
                        </div>
                    </div>
                </div>

               {atores.length > 0 && (
    <div className="max-w-5xl mx-auto px-10 mt-14">
        <h2 className="text-white text-xl font-bold mb-5">Elenco</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
            {atores.map((item, i) => (
                <div key={i} className="flex-shrink-0 w-32 text-center">
                    <img 
                      src={item.foto 
                        ? `https://image.tmdb.org/t/p/w200${item.foto}` 
                        : "https://via.placeholder.com/200x300/27272a/71717a?text=?"}
                      alt={item.nome}
                      className="w-full aspect-[2/3] object-cover rounded-xl mb-2"
                    />
                    <p className="text-white text-sm font-medium truncate">{item.nome}</p>
                    <p className="text-gray-500 text-xs truncate">{item.personagem}</p>
                </div>
            ))}
        </div>
    </div>
)}
            </div>
        </div>
    )
}
export default DetailFilme;