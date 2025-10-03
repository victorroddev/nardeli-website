
import './styles.css';
import { FaFacebookF } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";


const Menu = ({ isOpen }) => {
    return (
        <div className={`menu ${isOpen ? 'menu-visible' : 'menu-hidden'}`}>
            <ul className='links'>
                <li><a href="">Preguntas frecuentes</a></li>
                <div className='divider-link'></div>
                <li><a href="">Contacto</a></li>
                <div className='divider-link' ></div>
                <li className='icons-container'>
                    <a href="">
                        <FaFacebookF/>
                    </a>
                    <a href="">
                        <FaInstagram />
                    </a>
                    <a href="">
                        <FaTiktok />
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Menu