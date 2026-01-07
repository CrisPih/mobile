import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonButton, IonCard, IonCardContent
} from '@ionic/react';
import { useState } from 'react';

const tips = [
  'Respira profundo 5 veces',
  'Haz pausas activas cada hora',
  'Divide tareas grandes en pequeñas',
  'Duerme bien y mantente hidratado'
];

const Wellness: React.FC = () => {
  const [tip, setTip] = useState(tips[0]);

  const newTip = () => {
    const random = Math.floor(Math.random() * tips.length);
    setTip(tips[random]);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bienestar</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardContent style={{ textAlign: 'center' }}>
            <p>{tip}</p>
            <IonButton expand="block" onClick={newTip}>
              Nuevo consejo
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Wellness;
