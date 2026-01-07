import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonInput, IonButton, IonItem, IonLabel, IonList,
  IonCheckbox, IonSelect, IonSelectOption, IonChip
} from '@ionic/react';
import { useEffect, useState } from 'react';

interface Subject {
  name: string;
  color: string;
}

interface Task {
  id: number;
  subject: string;
  text: string;
  completed: boolean;
  due?: string;
}

const colors = ['primary', 'secondary', 'tertiary', 'success', 'warning'];

const Tasks: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newSubject, setNewSubject] = useState('');
  const [taskText, setTaskText] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>();
  const [due, setDue] = useState<string>();

  useEffect(() => {
    setSubjects(JSON.parse(localStorage.getItem('subjects') || '[]'));
    setTasks(JSON.parse(localStorage.getItem('tasks') || '[]'));
  }, []);

  useEffect(() => {
    localStorage.setItem('subjects', JSON.stringify(subjects));
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [subjects, tasks]);

  const addSubject = () => {
    if (!newSubject.trim()) return;

    setSubjects([
      ...subjects,
      { name: newSubject, color: colors[subjects.length % colors.length] }
    ]);
    setSelectedSubject(newSubject);
    setNewSubject('');
  };

  const addTask = () => {
    if (!taskText || !selectedSubject) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        subject: selectedSubject,
        text: taskText,
        completed: false,
        due
      }
    ]);
    setTaskText('');
    setDue(undefined);
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const getColor = (subject: string) =>
    subjects.find(s => s.name === subject)?.color || 'medium';

  const isLate = (task: Task) =>
    task.due && new Date(task.due) < new Date() && !task.completed;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gestión de tareas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <IonItem>
          <IonInput
            placeholder="Nueva materia"
            value={newSubject}
            onIonChange={e => setNewSubject(e.detail.value!)}
          />
          <IonButton onClick={addSubject}>Agregar</IonButton>
        </IonItem>

        <IonItem>
          <IonSelect
            placeholder="Seleccione materia"
            value={selectedSubject}
            onIonChange={e => setSelectedSubject(e.detail.value)}
          >
            {subjects.map(s => (
              <IonSelectOption key={s.name} value={s.name}>
                {s.name}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonInput
            placeholder="Nueva actividad"
            value={taskText}
            onIonChange={e => setTaskText(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonInput
            type="date"
            onIonChange={e => setDue(e.detail.value!)}
          />
          <IonButton onClick={addTask}>Agregar</IonButton>
        </IonItem>

        <IonList>
          {tasks.map(task => (
            <IonItem key={task.id}>
              <IonCheckbox
                slot="start"
                checked={task.completed}
                onIonChange={() => toggleTask(task.id)}
              />
              <IonLabel>
                <IonChip color={getColor(task.subject)}>
                  {task.subject}
                </IonChip>

                {isLate(task) && (
                  <IonChip color="danger">Atrasada</IonChip>
                )}

                <p style={{
                  textDecoration: task.completed ? 'line-through' : 'none'
                }}>
                  {task.text}
                </p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Tasks;
