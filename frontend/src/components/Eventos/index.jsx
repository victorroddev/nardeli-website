import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from "@gsap/react";
import './styles.css'; // Asegúrate de que el nombre del archivo CSS coincida

// --- 1. IMPORTA TUS IMÁGENES AQUÍ ---
import cenaShowImg from '../../img/photo/cena-show.jpeg';
import weddingImg from '../../img/photo/weddings.jpg';
import xvImg from '../../img/photo/xv.jpg';
import graduacionImg from '../../img/photo/graduaciones.jpg';
gsap.registerPlugin(ScrollTrigger);

// --- 2. DEFINE LA INFORMACIÓN DE TUS PANELES EN ESTE ARREGLO ---
const panelesData = [
    {
        id: 1,
        type: 'principal',
        title: 'El mejor lugar para tus eventos',
    },
    {
        id: 2,
        type: 'evento',
        title: 'Cenas-Show',
        imageSrc: cenaShowImg,
    },
    {
        id: 3,
        type: 'evento',
        title: 'Bodas',
        imageSrc: weddingImg,
    },
    {
        id: 4,
        type: 'evento',
        title: 'XV Años',
        imageSrc: xvImg, // Reemplaza 'null' con la variable de tu imagen importada, ej: xvImg
    },
    {
        id: 5,
        type: 'evento',
        title: 'Graduaciones',
        imageSrc: graduacionImg, // Añade más paneles aquí si lo necesitas
    },
];

const Eventos = () => {
    const mainContainerRef = useRef(null);
    const panelsContainerRef = useRef(null);

    useGSAP(() => {
        const panels = gsap.utils.toArray(".panel", panelsContainerRef.current);
        const numPanels = panels.length;

        if (numPanels <= 1) return; // No ejecutar animación si solo hay un panel

        gsap.to(panels, {
            xPercent: -100 * (numPanels - 1),
            ease: "none",
            scrollTrigger: {
                trigger: mainContainerRef.current,
                pin: true,
                scrub: 1,
                snap: 1 / (numPanels - 1),
                // Ajuste para que el final sea preciso
                end: () => "+=" + (panelsContainerRef.current.offsetWidth - window.innerWidth),
            }
        });
    }, { scope: mainContainerRef, dependencies: [panelesData] }); // Se re-ejecuta si los datos cambian

    return (
        <div className='eventos-container' ref={mainContainerRef}>
            <div 
                className='panels-container' 
                ref={panelsContainerRef}
                // --- 3. EL ANCHO SE CALCULA DINÁMICAMENTE ---
                style={{ width: `${panelesData.length * 100}%` }}
            >
                {panelesData.map((panel) => (
                    <div className={`panel panel-${panel.id}`} key={panel.id}>
                        {panel.type === 'principal' ? (
                            <div className='items-container'>
                                <div className='frame-panel-1'></div>
                                <h2 className='portrait-title eventos-titles'>{panel.title}</h2>
                            </div>
                        ) : (
                            <div className='frame-container'>
                                <div className='frame-panel-2'></div>
                                {/* Usamos una etiqueta <img> para mostrar la imagen */}
                                {panel.imageSrc ? (
                                    <img src={panel.imageSrc} alt={panel.title} className="panel-image" />
                                ) : (
                                    <div className="panel-image-placeholder"></div> // Un placeholder si no hay imagen
                                )}
                                <p className='panels-title cena-show-title'>{panel.title}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Eventos;