import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent
} from '@ionic/react';

const Team: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Equipo</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent className="ion-padding">
      <p>Organización grupal (versión local)</p>
      <p>Próximamente colaboración en línea.</p>
    </IonContent>
  </IonPage>
);

export default Team;
