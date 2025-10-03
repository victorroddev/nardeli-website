import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './styles.css'; // Crearemos este archivo de estilos

gsap.registerPlugin(ScrollTrigger);

// --- Define tus paquetes de precios aquí ---
// Organizado por categorías para que sea fácil de leer y modificar
const preciosData = [
    {
        categoria: "Viernes y Domingos",
        paquetes: [
            { personas: "100 a 200", precio: "130,000" },
            { personas: "200 a 300", precio: "200,000" },
            { personas: "300 a 400", precio: "240,000" }
        ]
    },
    {
        categoria: "Sábado",
        paquetes: [
            { personas: "100 a 200", precio: "140,000" },
            { personas: "200 a 300", precio: "210,000" },
            { personas: "300 a 400", precio: "250,000" }
        ]
    }
];

const Precios = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
            }
        });

        // Anima el título y el subtítulo
        tl.from('.precios-title, .precios-subtitle', {
            opacity: 0,
            y: -40,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.2
        });

        // Anima las columnas de precios para que aparezcan una por una
        tl.from('.pricing-column', {
            opacity: 0,
            y: 60,
            duration: 0.7,
            ease: 'power2.out',
            stagger: 0.2 // La clave para el efecto escalonado
        }, "-=0.5"); // Empieza un poco antes para un flujo más rápido

    }, { scope: containerRef });

    return (
        <div className="precios-container" ref={containerRef}>
            <h2 className="precios-title">Precios</h2>
            <p className="precios-subtitle">Paquetes diseñados para tu evento perfecto.</p>
            
            <div className="pricing-columns-wrapper">
                {preciosData.map((columna, index) => (
                    <div className="pricing-column" key={index}>
                        <h3 className="column-title">{columna.categoria}</h3>
                        <div className="price-items-container">
                            {columna.paquetes.map((paquete, idx) => (
                                <div className="price-item" key={idx}>
                                    <span className="personas">{paquete.personas} personas</span>
                                    <span className="precio">${paquete.precio} MXN</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Precios;