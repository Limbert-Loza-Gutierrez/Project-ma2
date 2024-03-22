import "./Home.styles.css";
import logo from '../../../public/image/logo.jpg'

const Home = () => {
  return (
    <div className='window-content-Home'>
        <img src={logo} alt="" />
        <div className="frase-empresa">
            <h1>¡Bienvenido al Sistema de Apoyo para Psicólogos!</h1>
            <p>Bienvenido al Sistema de Apoyo para Psicólogos. Nuestro propósito es identificar indicios de maltrato psicológico a través de redes neuronales y métodos de paidografología. Nos enfocamos en analizar el test del "Persona bajo la lluvia", especialmente diseñado para niños de 5 a 12 años.</p>
        </div>
    </div>
  )
}

export default Home