import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonButton, IonCard, IonCardContent
} from '@ionic/react';
import { useState, useEffect } from 'react';

const Pomodoro: React.FC = () => {
  const [time, setTime] = useState(1500);
  const [running, setRunning] = useState(false);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTime(t => {
        if (t === 1) {
          setRunning(false);
          setCycles(c => c + 1);
          alert('¡Pomodoro completado!');
        }
        return t > 0 ? t - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  const format = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pomodoro</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardContent style={{ textAlign: 'center' }}>
            <h1>{format(time)}</h1>
            <p>Ciclos completados: {cycles}</p>

            <IonButton expand="block" onClick={() => setRunning(!running)}>
              {running ? 'Pausar' : 'Iniciar'}
            </IonButton>

            <IonButton
              expand="block"
              color="medium"
              onClick={() => {
                setTime(1500);
                setRunning(false);
              }}
            >
              Reiniciar
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Pomodoro;
