import { useEffect } from "react";
import './AlertaNotificacion.css';

function AlertaNotificacion({ mensaje, onClose }) {
    useEffect(() => {
        if (!mensaje) return undefined;

        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [mensaje, onClose]);

    if (!mensaje) return null;

    return (
        <div className="alerta-notificacion" role="status">
            {mensaje}
        </div>
    );
}

export default AlertaNotificacion;
