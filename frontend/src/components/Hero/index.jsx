import './styles.css';
import { useRef } from 'react';
import  gsap  from "gsap";
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/all';
import arrow from '../../img/icons/white-arrow.png';
import logoLetters from '../../img/logos/nardeli-text.png';


const Hero = () => {
    const container = useRef();
    const curtainRef = useRef();
    const randomTextRef = useRef();

    useGSAP(() => {
        gsap.registerPlugin(SplitText);

        const split = new SplitText(randomTextRef.current, { type: 'words' });
        const words = split.words;
        const dictionary = ["Eventos", "Shows", "Conciertos", "Arte", "Música", "Diversión", "Momentos"];

        // 1. La función que GENERA la animación aleatoria.
        // GSAP llamará a esta función en CADA repetición del bucle.
        const generateRandomAnimation = () => {
            const randomTl = gsap.timeline();
            const randomWords = gsap.utils.shuffle(words).slice(0, 6);

            randomWords.forEach(word => {
                const newWord = gsap.utils.random(dictionary.filter(w => w !== word.textContent));
                
                randomTl.to(word, {
                    delay: 1,
                    opacity: 0,
                    y: -10,
                    duration: 0.1,
                    ease: 'power1.in'
                }, "<0.1")
                .add(() => {
                    word.textContent = newWord;
                })
                .to(word, {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    ease: 'power1.out'
                });
            });
            return randomTl;
        };

        // Línea de tiempo maestra para la secuencia de INTRODUCCIÓN
        const masterTl = gsap.timeline();

        masterTl.to(curtainRef.current, {
            height: 0,
            duration: 1.2,
            ease: 'power2.inOut',
        })
        .from(['.text-1', '.text-2', '.random-text', '.hero-arrow'], {
            opacity: 0,
            y: 100,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.1,
            delay: -0.5
        })
        // 2. Cuando la intro termina, llamamos a una función para configurar el BUCLE INFINITO
        .call(() => {
            // 3. Creamos la línea de tiempo que SÍ se repetirá infinitamente
            gsap.timeline({
                repeat: -1,
                repeatDelay: 2,
                onRepeat: () => {
                    generateRandomAnimation();
                }
            })
            // 4. La clave: Le pasamos la REFERENCIA a la función para que `repeatRefresh` funcione.
            .add(generateRandomAnimation);
        });

        return () => {
            if (split.revert) {
                split.revert();
            }
        };

    }, { scope: container });


    return(
        <div className='hero box' >
            <div className='text-container' ref={container} >
                <img src={logoLetters} alt=""  className='logo-letters'/>
                <p className='hero-text text-1'>Centro de</p>
                <p className='hero-text text-2'>Espectaculos</p>
                <p className='random-text' ref={randomTextRef}>
                    Eventos
                </p>
                <img src={arrow} alt="Flecha hacia abajo" className='hero-arrow'/>
            </div>
            <div className='hero-form'>
                <div className='opacity-layer'></div>
            <div className='top-degrade'></div>
            <div className='bottom-degrade'></div>
            <div className='left-degrade'></div>
            <div className='right-degrade'></div> 
            </div>
            <div>
            </div>
            <div className='curtain'  ref={curtainRef}>
                </div>        
        </div>
    

    );
};

export default Hero;