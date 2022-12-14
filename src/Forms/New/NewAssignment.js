import axios from 'axios';
import { useEffect, useState } from 'react';

const NewCourse = ({ props }) => {
  const { id, currentYear, admin_id } = props;

  const initialValues = { name: '', teacher: '', course: id };
  const [formValues, setFormValues] = useState(initialValues);

  const [teachers, setTeachers] = useState();
  const [course, setCourse] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/teacher/admin/${admin_id}`)
      .then((response) => {
        setTeachers(response.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/course/${id}`)
      .then((response) => {
        setCourse(response.data);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let databody = {
      name: formValues.name,
      teacher: formValues.teacher,
      course: id,
      currentYear: currentYear,
      calendarYear: new Date().getFullYear(),
    };

    fetch(`${process.env.REACT_APP_API_URL}/assignment`, {
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

    props.stateHandler();
  };

  return (
    <div className="main-container">
      <div>Nueva Asignatura:</div>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="level">Profesor/a:</label>
        <select
          name="teacher"
          id=""
          value={formValues.teacher}
          onChange={handleChange}
        >
          <option>--Profesor/a--</option>
          {teachers?.map((teacher, key) => {
            return (
              <option key={key} value={teacher._id}>
                {teacher.name} {teacher.lastname}
              </option>
            );
          })}
        </select>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          autoComplete="off"
          name="name"
          value={formValues.name}
          onChange={handleChange}
        />
        <button>Crear</button>
      </form>
    </div>
  );
};

export default NewCourse;
