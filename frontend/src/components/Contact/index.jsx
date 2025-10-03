import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from "@gsap/react";
import './styles.css'; // Asegúrate que el nombre del CSS es correcto

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
            }
        });

        // 1. Anima tus títulos en secuencia
        tl.from('.subtitle-staff', { opacity: 0, y: -30, duration: 0.5, ease: 'power2.out' });
        tl.from('.title-staff', { opacity: 0, y: -30, duration: 0.6, ease: 'power2.out' }, "-=0.4");

        // 2. Anima cada grupo del formulario con stagger
        tl.from('.form-group', {
            opacity: 0,
            x: -100,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.15 // Un stagger rápido
        });

        // 3. "Dibuja" la línea debajo de cada input
        tl.to('.form-group .underline', {
            scaleX: 1,
            duration: 0.7,
            ease: 'power2.out',
            stagger: 0.15
        }, "-=0.8"); // Se sincroniza con la animación anterior

        // 4. Anima todos los botones al final, también con stagger
        tl.from('.submit-btn, .contact-btn', {
            opacity: 0,
            scale: 0.5,
            duration: 0.5,
            ease: 'back.out(1.7)',
            stagger: 0.1 // Stagger muy rápido para los botones
        });

    }, { scope: containerRef });

    return (
        <div className='contact-container' ref={containerRef}>
            <div className='texts-staff'>
                <p className='subtitles subtitle-staff'>Si necesitas</p>
                <p className='title title-staff'>Contactarnos</p>
            </div>
            <div className='items-contact-container'>
                <form className="contact-form" action="/enviar" method="POST">
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" required />
                        {/* AÑADIDO: La línea para la animación */}
                        <span className="underline"></span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" id="email" name="email" placeholder="Tu e-mail" required />
                        <span className="underline"></span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="telefono">Número de teléfono</label>
                        <input type="tel" id="telefono" name="telefono" placeholder="Tu número de teléfono" />
                        <span className="underline"></span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="mensaje">Mensaje</label>
                        <textarea id="mensaje" name="mensaje" placeholder="Tu mensaje aquí" rows="6" required></textarea>
                        <span className="underline"></span>
                    </div>

                    <button type="submit" className="submit-btn">
                        Enviar
                    </button>
                </form>
                <div className='btns-container'>
                    <button className='contact-btn'>WhatsApp</button>
                    <button className='contact-btn'>Teléfono</button>
                </div>
            </div>
        </div>
    );
};

export default Contact;