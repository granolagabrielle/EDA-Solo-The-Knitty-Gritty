import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom/';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';
import { DateTime } from 'luxon';

import './ProjectDetails.css';

function ProjectDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const projectDetails = useSelector((store) => store.projects.projectDetails);
  const projectNotes = useSelector((store) => store.notes);
  console.log('check projectDetails', projectDetails);
  console.log('check projectNotes', projectNotes);

  useEffect(() => {
    dispatch({ type: 'FETCH_PROJECT_DETAILS', payload: params.id });
    dispatch({ type: 'FETCH_NOTES', payload: params.id });
  }, []);

  const deleteProject = () => {
    dispatch({ type: 'DELETE_PROJECT', payload: params.id });
    history.push('/projects');
  };

  const returnToProjects = () => {
    history.push('/projects');
  };

  // const editDetails = (projectId) => {
  //   history.push(`/edit-project/${projectId}`);
  // };

  let [newNote, setNewNote] = useState({
    notes: '',
    date: '',
  });

  const handleNewNote = (event) => {
    const { id, value } = event.target;
    setNewNote((prevNote) => ({
      ...prevNote,
      [id]: value,
    }));
  };

  const addNote = (event) => {
    event.preventDefault();
    dispatch({ type: 'ADD_NOTE', payload: { ...newNote, projectId: params.id } });
    setNewNote({
      notes: '',
      date: '',
    });
  };

  return (
    <>
      <h1>Project Details Page</h1>
      <p>{projectDetails.pattern_title}</p>
      <table>
        <thead>
          <th>Date</th>
          <th>Notes</th>
        </thead>
        <tbody>
          {projectNotes.map((note) => {
            return (
              <tr key={note.id}>
                <td>{DateTime.now(note.date).toFormat('MMMM dd, yyyy')}</td>
                <td>{note.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <form onSubmit={addNote}>
        <input id='notes' placeholder='Project notes' type='text' value={newNote.notes} onChange={handleNewNote} />
        <input id='date' type='date' value={newNote.date} onChange={handleNewNote} />
        <button type='submit'>Add Note</button>
      </form>
      {/* <IconButton onClick={() => editDetails(projectDetails.id)}>
        <EditIcon />
      </IconButton> */}
      <button onClick={() => deleteProject(projectDetails.id)}>Delete Project</button>
      <button onClick={returnToProjects}>Back to Inventory</button>
    </>
  );
}

export default ProjectDetails;
