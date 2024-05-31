import React, { useEffect, useState } from "react";
import { Link, useNavigate} from 'react-router-dom';
import './styles/home.css';
import phonePNG from '../assets/img/phone.png';
import passwdPNG from '../assets/img/passwd.png';
import namePNG from '../assets/img/name.png';
import { registration } from "../action/user";
import { useDispatch } from 'react-redux'; // Импортируем useDispatch
import { getFilials } from "../action/filial"; // Импортируем функцию для получения филиалов


const Registration = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [filialId, setFilialId] = useState(""); // Состояние для выбранного филиала
    const [filials, setFilials] = useState([]); // Состояние для списка филиалов

    const navigate  = useNavigate(); // Инициализируем useHistory
    
    const dispatch = useDispatch(); // Получаем dispatch

    const handleRegistration = async () => {

        const registrationSuccess = await dispatch(registration(name, surname, phone, password, filialId));
        if (registrationSuccess) {
            navigate("/main");
        }
    };

    useEffect(() => {
      // Получаем список филиалов при загрузке компонента
      const fetchFilials = async () => {
        const allFilials = await getFilials();
        setFilials(allFilials || {} );
      };
      fetchFilials();
    }, []);
    console.log(filials)


    return (
      <div className="auth">
          
      <div className="form">
        <h1 className="h1-auth">Регистрация</h1>
        <div className="input__div"><img src={namePNG} alt="person" className="phonePNG"/>
          <input value={name} onChange={(event) => setName(event.target.value)} setValue={setName} type="text" className="input" placeholder="Имя"/>
        </div>
        <div className="input__div"><img src={namePNG} alt="person" className="phonePNG"/>
          <input value={surname} onChange={(event) => setSurname(event.target.value)} setValue={setSurname} type="text" className="input" placeholder="Фамилия"/>
        </div>
        <div className="input__div"><img src={phonePNG} alt="Phone" className="phonePNG"/>
          <input value={phone} onChange={(event) => setPhone(event.target.value)} setValue={setPhone} type="number" className="input" placeholder="Номер телефона"/>
        </div>
        <div className="input__div">
          <select value={filialId} onChange={(event) => setFilialId(event.target.value)} className="input">
            <option value="">Выберите филиал</option>
           
            {filials.map((filial) => (
              <option key={filial.filial._id} value={filial.filial._id}>{filial.filial.filialText}</option>
            ))}
          
          </select>
        </div>
        <div className="input__div"><img src={passwdPNG} alt="Password" className="phonePNG"/>
          <input value={password} onChange={(event) => setPassword(event.target.value)} setValue={setPassword} type="password" className="input" placeholder="Придумайте пароль"/>
        </div>
        {/* <div className="input__div"><img src={passwdPNG} alt="Password" className="phonePNG"/>
          <input type="password" className="input" placeholder="Повторите пароль"/>
        </div> */}
        
        <button className="buttonLogin" onClick={handleRegistration}>Зарегистрироваться</button>
        <Link to="/login" className="link__auth">Войти</Link>
      </div>
      
    </div>

    )
}

export default Registration;