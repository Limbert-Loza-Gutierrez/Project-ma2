import logo from '../../../public/image/logo.jpg'

const Home = () => {
  return (
    <div className='window-content'>
        <img src={logo} alt="" />
        <div className="frase-empresa">
            <h1>¡Bienvenido a la Clínica Virtual!</h1>
            <p>La mejor opción para la atención de tus pacientes</p>
        </div>
    </div>
  )
}

export default Home