import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CursoHeader from "../components/CursoHeader";
import CursoIncluidoCard from "../components/CursoIncluidoCard";
import BotonContinuar from "../components/BotonContinuar";
import Footer from "../components/Footer";
import { getArticuloClienteUsuario } from "../services/ArticuloCliente";
import { useDecryptToken } from "../App";
import "../styles/global.css";
import "./Curso.css";

export default function Curso() {
  const location = useLocation();
  const navigate = useNavigate();
  const cursoId = location.state?.cursoId; // <-- Aquí tomamos el id del state
  const [curso, setCurso] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurso = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!cursoId) {
          setError("No se proporcionó el curso. Regresa a Mis Cursos e intenta de nuevo.");
          setLoading(false);
          return;
        }
        const encryptedToken = localStorage.getItem('authToken');
        const token = useDecryptToken(encryptedToken);
        if (!token) {
          setError('Usuario no autenticado');
          setLoading(false);
          return;
        }
        // 1. Traer el ArticuloCliente (relación usuario-curso) usando el id recibido
        const articuloCliente = await getArticuloClienteUsuario(cursoId, token);
        // 2. Obtener el id del curso real desde el ArticuloCliente
        const realCursoId = articuloCliente.articulo || articuloCliente.cursoId || articuloCliente.curso_id || (articuloCliente.curso && articuloCliente.curso.id);
        let cursoData = {};
        let videos = [];
        if (realCursoId) {
          // 3. Traer el curso real para obtener los videos y datos completos
          const { getCursoById } = await import('../services/curso');
          cursoData = await getCursoById(realCursoId, token);
          // 4. Normalizar los videos
          if (Array.isArray(cursoData.videos)) {
            videos = cursoData.videos.map((v, idx) => ({
              id: v.id || v._id || idx,
              nombre: v.nombre || v.titulo || `Video ${idx+1}`,
              descripcion: v.descripcion || '',
              imagen: v.imagen || null,
              link: v.link || v.url || v.videoUrl || '' // Asegura que haya un link
            }));
          }
        }
        setCurso({
          nombre: cursoData.nombre || articuloCliente.nombre || 'Curso',
          descripcion: cursoData.descripcion || articuloCliente.descripcion || '',
          videoPresentacion: cursoData.videoPresentacion || articuloCliente.videoPresentacion || '',
          videos: videos.map(v => ({ ...v, videoUrl: v.videoUrl || v.link || v.url || '' })), // Normaliza videoUrl para cada video
        });
      } catch (err) {
        console.log('Error al cargar el curso:', err);
        setError('Error al cargar el curso');
      } finally {
        setLoading(false);
      }
    };
    fetchCurso();
  }, [cursoId]);

  if (loading) return <div className="curso-container">Cargando curso...</div>;
  if (error) return <div className="curso-container">{error}</div>;
  if (!curso) return null;

  const { nombre, descripcion, videoPresentacion, videos = [] } = curso;

  return (
    <div className="curso-container">
      <CursoHeader />
      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <h1 style={{ color: '#6d2941', fontWeight: 700, fontSize: 42, marginBottom: 0 }}>{nombre || 'NOMBRE DEL CURSO'}</h1>
        <div style={{ color: '#d4af37', fontWeight: 700, fontSize: 22, marginBottom: 18 }}>CURSO</div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
          {videoPresentacion ? (
            <video width="600" height="340" controls style={{ border: '4px solid #d4af37', background: '#eee' }}>
              <source src={videoPresentacion} type="video/mp4" />
              Tu navegador no soporta el video.
            </video>
          ) : (
            <div style={{ width: 600, height: 340, border: '4px solid #d4af37', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64, color: '#ccc' }}>
              ▶
            </div>
          )}
        </div>
        <div style={{ maxWidth: 700, margin: '0 auto', color: '#6d2941', fontSize: 18, marginBottom: 18 }}>
          {descripcion || 'Descripcion del curso Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut congue massa ipsum, quis placerat mauris luctus vel. Maecenas ut felis vel orci ultrices'}
        </div>
        <BotonContinuar />
      </div>
      <div style={{ margin: '32px auto', maxWidth: 800 }}>
        {videos.map((video, idx) => (
          <CursoIncluidoCard
            key={video.id || idx}
            id={video.id || idx}
            nombre={video.nombre}
            descripcion={video.descripcion}
            imagen={video.imagen}
            onInfo={() => navigate('/VideoCurso', { state: { videoId: video.id } })}
          />
        ))}
      </div>
      <div className="curso-section">
        <BotonContinuar className="curso-button" />
      </div>
      <Footer />
    </div>
  );
}
