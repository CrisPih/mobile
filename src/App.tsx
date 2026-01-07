import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { list, statsChart, timer, heart, people } from 'ionicons/icons';

import Tasks from './pages/Tasks';
import Progress from './pages/Progress';
import Pomodoro from './pages/Pomodoro';
import Wellness from './pages/Wellness';
import Team from './pages/Team';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/flex-utils.css';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tasks" component={Tasks} />
          <Route exact path="/progress" component={Progress} />
          <Route exact path="/pomodoro" component={Pomodoro} />
          <Route exact path="/wellness" component={Wellness} />
          <Route exact path="/team" component={Team} />
          <Route exact path="/">
            <Redirect to="/tasks" />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="tasks" href="/tasks">
            <IonIcon icon={list} />
            <IonLabel>Tareas</IonLabel>
          </IonTabButton>
          <IonTabButton tab="progress" href="/progress">
            <IonIcon icon={statsChart} />
            <IonLabel>Progreso</IonLabel>
          </IonTabButton>
          <IonTabButton tab="pomodoro" href="/pomodoro">
            <IonIcon icon={timer} />
            <IonLabel>Pomodoro</IonLabel>
          </IonTabButton>
          <IonTabButton tab="wellness" href="/wellness">
            <IonIcon icon={heart} />
            <IonLabel>Bienestar</IonLabel>
          </IonTabButton>
          <IonTabButton tab="team" href="/team">
            <IonIcon icon={people} />
            <IonLabel>Equipo</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
