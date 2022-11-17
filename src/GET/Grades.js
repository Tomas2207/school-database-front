import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Gradesheet from '../components/Gradesheet';
import NewGrade from '../Forms/New/newGrade';

const Grades = ({ props }) => {
  const location = useLocation();
  const { assignment_id, student_id, student_name } = location.state;
  const [gradesheets, setGradesheets] = useState();
  const [assignment, setAssignment] = useState();
  const [student, setStudent] = useState();

  const [isLoading, setLoading] = useState(false);

  const getInfo = async () => {
    try {
      setLoading(true);

      const resAssignment = await axios.get(
        `${URL}/assignment/${assignment_id}`
      );
      const Assignments = resAssignment.data;
      if (Assignments) setAssignment(Assignments);

      const resStudent = await axios.get(`${URL}/student/${student_id}`);
      const Students = resStudent.data;
      if (Students) setStudent(Students);

      const resGrades = await axios.get(`${URL}/grades/${student_id}`);
      const Gradesheets = resGrades.data;
      if (Gradesheets) setGradesheets(Gradesheets);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    console.log('render');
  }, [isLoading]);

  const handleState = () => {
    getInfo();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let databody = {
      year: new Date().getFullYear(),
      assignment: assignment_id,
      student: student_id,
    };

    fetch(`${URL}/grades`, {
      method: 'POST',
      body: JSON.stringify(databody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });

    handleState();
  };

  if (isLoading) return <div className="main-container">Loading...</div>;

  return (
    <div className="main-container">
      <div>
        <h2>Notas</h2>
        {student && (
          <div>
            {student.lastname}, {student.name}
          </div>
        )}
      </div>

      {assignment && <div>{assignment.name}</div>}
      <form action="" onSubmit={handleSubmit}>
        <button type="submit">Agregar Hoja de notas</button>
      </form>
      {gradesheets?.map((gradesheet) => {
        if (gradesheet.assignment._id === assignment._id) {
          return (
            <Gradesheet
              props={{
                year: gradesheet.year,
                id: gradesheet._id,
              }}
              getInfo={getInfo}
              array={gradesheet.grades}
              handleState={handleState}
            />
          );
        }
      })}
    </div>
  );
};

export default Grades;
