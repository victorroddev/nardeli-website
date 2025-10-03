import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
// Importamos los iconos que usaremos
import './styles.css'; // Crearemos este archivo de estilos
import logoNardeli from '../../img/logos/nardeli-full-logo.png';
import logoBerca from '../../img/logos/berca-white.png';
import { FaFacebookF } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";


gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef(null);

    // Generamos un número de teléfono aleatorio de Ciudad Juárez (LADA 656)
    const telefonoAleatorio = `(656) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`;

    useGSAP(() => {
        // Animación sutil para revelar el footer cuando se llega al final de la página
        gsap.from(footerRef.current, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: footerRef.current,
                start: 'top 95%', // Se activa casi al llegar
                toggleActions: 'play none none none'
            }
        });
    }, { scope: footerRef });

    return (
        <footer className="site-footer" ref={footerRef}>
            <div className="footer-container">
                <div className="footer-logos">
                    {/* Marcador para el logo del salón */}
                    <div className="logo-placeholder">
                        <img src={logoNardeli} alt="Logo de Nardeli"  className='logo-footer'/>
                    </div>
                    {/* Marcador para el logo del grupo */}
                    <div className="logo-placeholder">
                        <img src={logoBerca} alt="Logo de Grupo Berca" className='logo-footer'/>
                    </div>
                </div>

                <div className="footer-social">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <FaFacebookF/>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <FaInstagram />
                    </a>
                    <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                        <FaTiktok />
                    </a>
                </div>

                <div className="footer-contact">
                    <a href={`tel:${telefonoAleatorio.replace(/\D/g, '')}`}>{telefonoAleatorio}</a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Nardeli. Todos los derechos reservados.</p>
                <p>Diseñado por: <a href="www.growy.tech">Growy</a></p>
            </div>
        </footer>
    );
};

export default Footer;