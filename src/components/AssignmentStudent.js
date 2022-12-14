import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const AssignmentStudent = ({ props }) => {
  const [AssignmentStudent, setAssignmentStudent] = useState();
  const [showStudents, setShowStudents] = useState(false);
  let theId = props.id;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/assignment/${props.id}/students`)
      .then((response) => setAssignmentStudent(response.data));
  }, []);

  const handleShowStudents = () => {
    if (showStudents) {
      setShowStudents(false);
    } else {
      setShowStudents(true);
    }
  };

  return (
    <div>
      <button onClick={handleShowStudents}>Alumnos:</button>
      {showStudents && (
        <div>
          <h3>Estudiantes: </h3>
          <ul className="list">
            {AssignmentStudent?.map((student, key) => {
              return (
                <li key={key}>
                  <div>
                    {student.name} {student.lastname}
                  </div>
                  <Link
                    to={{ pathname: `/teachers/${props.teacher_id}/grades` }}
                    state={{
                      student_id: student._id,
                      assignment_id: theId,
                    }}
                  >
                    Notas
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AssignmentStudent;
