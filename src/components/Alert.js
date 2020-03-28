import React, {useContext} from 'react';
import alertContext from '../context/alert/alertContext';

const Alert = () => {
    const Alertcontext = useContext(alertContext);
    const{alert}= Alertcontext;
    return (
       alert!==null&&(
           <div className={`alert alert-${alert.type}`}>
           <i className=' fas fa-info-circle' />{alert.msg}
           </div>
       )
    )
}

export default Alert;