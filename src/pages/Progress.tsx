import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonProgressBar
} from '@ionic/react';

import { useIonViewWillEnter } from '@ionic/react';
import { useState } from 'react';

const Progress: React.FC = () => {
  const [total, setTotal] = useState(0);
  const [completed, setCompleted] = useState(0);

  useIonViewWillEnter(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTotal(tasks.length);
    setCompleted(tasks.filter((t: any) => t.completed).length);
  });

  const efficiency = total ? Math.round((completed / total) * 100) : 0;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Progreso</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Eficiencia general</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <p>Total de tareas: {total}</p>
            <p>Completadas: {completed}</p>

            <IonProgressBar
              value={efficiency / 100}
              color={efficiency >= 70 ? 'success' : 'warning'}
            />

            <h2 style={{ textAlign: 'center', marginTop: 16 }}>
              {efficiency}%
            </h2>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Progress;
