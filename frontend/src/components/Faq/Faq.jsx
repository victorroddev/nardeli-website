import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import './styles.css'; // Crearemos este archivo de estilos

// --- 1. Define tus preguntas y respuestas aquí ---
// Para añadir más, solo agrega otro objeto al arreglo.
const faqData = [
    {
        id: 1,
        question: '¿Qué tipo de eventos se pueden realizar en Nardeli?',
        answer: 'Somos un espacio versátil ideal para bodas, quinceañeras, cenas-show, eventos corporativos, graduaciones y cualquier celebración que requiera un ambiente de primera clase.'
    },
    {
        id: 2,
        question: '¿Cuál es la capacidad máxima del lugar?',
        answer: 'Nuestra capacidad máxima es de 500 personas en formato de banquete y hasta 800 personas en formato de concierto o auditorio. Contáctanos para discutir las necesidades específicas de tu evento.'
    },
    {
        id: 3,
        question: '¿Ofrecen servicio de catering o se puede traer uno externo?',
        answer: 'Contamos con un servicio de catering de alta cocina con menús personalizables. Sin embargo, somos flexibles y permitimos el acceso a proveedores externos certificados bajo ciertas condiciones. '
    },
    {
        id: 4,
        question: '¿El lugar cuenta con equipo audiovisual?',
        answer: 'Sí, estamos equipados con tecnología de punta, incluyendo pantallas OLED panorámicas, sistema de sonido profesional, pista con robótica e iluminación espectacular para llevar tu evento al siguiente nivel.'
    }
];

// Componente para un solo item del acordeón
const AccordionItem = ({ item, isOpen, onClick }) => {
    const answerRef = useRef(null);

    // Animación para abrir/cerrar
    useGSAP(() => {
        if (isOpen) {
            gsap.to(answerRef.current, {
                height: 'auto',
                opacity: 1,
                paddingTop: '1rem',
                paddingBottom: '1.5rem',
                duration: 0.4,
                ease: 'power2.inOut'
            });
        } else {
            gsap.to(answerRef.current, {
                height: 0,
                opacity: 0,
                paddingTop: 0,
                paddingBottom: 0,
                duration: 0.4,
                ease: 'power2.inOut'
            });
        }
    }, [isOpen]);

    return (
        <div className="faq-item">
            <button className="faq-question" onClick={onClick}>
                {item.question}
                <div className={`faq-icon ${isOpen ? 'open' : ''}`}>
                    <span></span>
                    <span></span>
                </div>
            </button>
            <div className="faq-answer-container" ref={answerRef}>
                <p>{item.answer}</p>
            </div>
        </div>
    );
};


const FAQ = () => {
    const [openId, setOpenId] = useState(null);

    const handleToggle = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="faq-container">
            <h2 className="faq-title">Preguntas Frecuentes</h2>
            <div className="faq-accordion">
                {faqData.map(item => (
                    <AccordionItem 
                        key={item.id}
                        item={item}
                        isOpen={openId === item.id}
                        onClick={() => handleToggle(item.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default FAQ;