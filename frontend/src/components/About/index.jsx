import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from "@gsap/react";
import './styles.css';
import aboutImg from '../../img/photo/nardeli-01.jpeg';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    // Creamos una referencia para el contenedor principal
    const containerRef = useRef(null);

    useGSAP(() => {
        // Creamos una línea de tiempo para secuenciar las animaciones
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current, // El contenedor activa la animación
                start: "top 80%", // La animación empieza cuando el 80% del componente es visible
                toggleActions: "play none none none" // La animación solo se ejecuta una vez
            }
        });

        // 1. La imagen aparece con un efecto de escala y fade-in
        tl.from('.about-us-img', { 
            opacity: 0, 
            scale: 0.8, 
            duration: 1, 
            ease: 'power3.out' 
        });

        // 2. Los degradados entran desde los lados (un poco después de que empieza la imagen)
        tl.from('.left-degrade', { 
            xPercent: -100, 
            opacity: 0, 
            duration: 0.8 
        }, "-=0.7"); // El "-=0.7" hace que esta animación empiece 0.7s antes de que la anterior termine

        tl.from('.right-degrade', { 
            xPercent: 100, 
            opacity: 0, 
            duration: 0.8 
        }, "<"); // El "<" hace que esta animación empiece al mismo tiempo que la anterior

        // 3. El párrafo aparece desde abajo
        tl.from('.about-us-paragraph', { 
            opacity: 0, 
            y: 50, 
            duration: 1.8,
            ease: 'power2.out'
        }, "-=0.5");


    }, { scope: containerRef }); // El scope ayuda a GSAP a buscar los elementos dentro de este componente

    return (
        // Añadimos la referencia al contenedor principal
        <div className='about-us-container' ref={containerRef}>
            {/* NO hay div duplicado, solo uno */}
            <div className='about-us-items-container'>
                <p className='welcome-text'>Bienvenidos</p>
                <img src={aboutImg} alt="Interior del centro de espectáculos Nardeli" className='about-us-img'/>
            </div>
            <p className='about-us-paragraph'> Nardeli es el centro de espectáculos de vanguardia en la frontera. Ubicado estratégicamente cerca del puente internacional Zaragoza, Nardeli combina lo mejor de la tecnología moderna con un diseño de primera clase. Con pantallas OLED panorámicas, pista con robótica y un ambiente versátil, somos el lugar ideal para cenas-show con artistas de renombre, bodas, quinceañeras, baby showers y más. ¡Descubre el lugar donde la frontera celebra con estilo!</p>
        </div>
    );
}

export default About;