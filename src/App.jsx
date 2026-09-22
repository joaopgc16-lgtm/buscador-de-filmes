import InfoFilme from "./componentes/InfoFilme";
import Footer from "./componentes/Footer";
import EmAlta from "./componentes/EmAlta";
import Switch from "./componentes/Switch.jsx";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [filmes, setFilmes] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [pagina, setPagina] = useState(1);
  const [titulo, setTitulo] = useState(null);
  const [filmesPopulares, setFilmesPopulares] = useState(false);
  const [paginaFil, setPaginaFil] = useState(1);

  // Fetch popular movies on initial render and page changes
  useEffect(() => {
    obterFilmesEmAlta();
  }, [pagina]);
    
  // Fetch searched movies on page adjustments
  useEffect(() => {
    if (busca.trim() !== "") {
      buscarFilme();
    }
  }, [paginaFil]);

  // Secure asynchronous fetching for trending assets
  async function obterFilmesEmAlta() {
    try {
      const top = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=${pagina}&language=pt-BR`);
      if (!top.ok) throw new Error("Failed to load trending items.");
      const dadosTop = await top.json();
      setFilmesPopulares(dadosTop.results);
    } catch (erro) {
      setErro("[ERRO] Falha ao carregar tendências");
    }
  }

  // Dynamic user-driven querying mechanism
  async function buscarFilme() {
    setCarregando(true);
    setErro(null);
    try {
      const respostaFilme = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=${paginaFil}&query=${encodeURIComponent(busca)}&language=pt-BR`);
      if (!respostaFilme.ok) throw new Error("Query parameters execution failed.");
      const dadosFilme = await respostaFilme.json();
      setFilmes(dadosFilme.results);
    } catch (erro) {
      setErro("[ERRO] Falha ao carregar resultados da busca");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className='min-h-screen max-w-screen bg-zinc-950'>
      <Footer busca={busca} buscarFilme={buscarFilme} setBusca={setBusca} />
      <InfoFilme titulo={titulo} filmes={filmes} setPaginaFil={setPaginaFil} yzfR6={filmesPopulares} />
      <EmAlta yzfR6={filmesPopulares} filmes={filmes} setPagina={setPagina} />
    </div>
  );
}

export default App;
