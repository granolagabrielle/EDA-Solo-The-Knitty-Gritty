import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom/';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';
import { DateTime } from 'luxon';
import { Box, ListDivider } from '@mui/joy';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Button from '@mui/joy/Button';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';

// joy notes
import List from '@mui/joy/List';
import Sheet from '@mui/joy/Sheet';

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

  const [gramsToggle, setGramsToggle] = useState('');

  const editGrams = () => {
    console.log('edit grams button clicked');
    setGramsToggle(!gramsToggle);
  };

  const handleSubmit = (projectId) => {
    console.log('project details', projectDetails);
    dispatch({ type: 'EDIT_PROJECT', payload: { projectId: projectDetails.id, details: projectDetails } });
    setGramsToggle(!gramsToggle);
    // history.push(`/projects/${projectId}`);
  };

  const deleteProject = () => {
    dispatch({ type: 'DELETE_PROJECT', payload: params.id });
    history.push('/projects');
  };

  const returnToProjects = () => {
    history.push('/projects');
  };

  const editDetails = (projectId) => {
    history.push(`/edit-project/${projectId}`);
  };

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

  const [toggle, setToggle] = useState('');

  const addNoteButton = (event) => {
    console.log('plus button clicked');
    setToggle(!toggle);
  };

  

  const imageClean = (images) => {
    // console.log('Images', images.image);
    let myMultipleImagesArray = [];
    if (images?.image?.includes('[')) {
      // console.log('Yes, it does!!!!');
      let imageArray = images?.image?.substring(2, images?.image?.length - 2).split(',');
      // console.log('Image Array', imageArray);

      if (imageArray.length >= 2) {
        // console.log(' More than 2 images...');
        for (let i = 0; i < imageArray.length; i++) {
          let img = imageArray[i];
          if (i === 0) {
            // console.log('IMAGE 1', img);
            myMultipleImagesArray.push(img.substring(0, img.length - 1));
          } else if (i === imageArray.length - 1) {
            // console.log('IMAGE LAST...', img);
            myMultipleImagesArray.push(img.substring(1));
          } else {
            // console.log('IMAGE IN BETWEEN...', img);
            myMultipleImagesArray.push(img.substring(1, img.length - 1));
          }
        }
        // let image1 = imageArray[0];
        // console.log('IMAGE 1', image1);
        // let image2 = imageArray[1];
        // console.log('IMAGE 2', image2);

        // myMultipleImagesArray.push(image1.substring(0, image1.length - 1));
        // myMultipleImagesArray.push(image2.substring(1));
      } else if (imageArray.length === 1) {
        let image1 = imageArray[0];
        // console.log('handle one image new way', image1);
        myMultipleImagesArray.push(image1);
      } else {
        console.log('Something else needs handling...');
      }
    } else {
      // console.log('No, just one image');
      myMultipleImagesArray.push(images?.image);
    }

    // console.log('My Multi Images', myMultipleImagesArray);
    return myMultipleImagesArray;
  };

  return (
    <>
      <Box className='header' sx={{ minHeight: 75, display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
        <IconButton style={{ backgroundColor: 'darkslategray' }} onClick={returnToProjects}>
          <ArrowBackRoundedIcon />
        </IconButton>
        <Box
          key={projectDetails.id}
          sx={{ minHeight: 100, display: 'flex', justifyContent: 'left', alignItems: 'center', margin: 2 }}
        >
          <h3>{projectDetails.pattern_title}</h3>
        </Box>
      </Box>
      <Box
        className='card-container'
        sx={{ minHeight: 75, display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 3 }}
      >
        <Card
          className='container-card'
          variant='outlined'
          sx={(theme) => ({
            width: 270,
            height: 350, // Set the fixed height here
            flexDirection: 'column',
            overflow: 'hidden',
            transition: 'transform 0.3s, border 0.3s',
            '&:hover': {
              borderColor: theme.vars.palette.primary.outlinedHoverBorder,
              transform: 'translateY(-2px)',
            },
          })}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <Typography level='title-lg'>
                <Link
                  overlay
                  underline='none'
                  sx={{
                    color: 'text.primary',
                    '&.Mui-focusVisible:after': { outlineOffset: '-4px' },
                  }}
                >
                  Project details
                </Link>
              </Typography>
            </div>
            <IconButton
              size='sm'
              variant='soft'
              color={'neutral'}
              sx={{ ml: 'auto', zIndex: 2 }}
              onClick={() => editGrams()}
            >
              <EditIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <Typography level='title-lg'>
                <Link
                  overlay
                  underline='none'
                  sx={{
                    color: 'text.primary',
                    '&.Mui-focusVisible:after': { outlineOffset: '-4px' },
                  }}
                >
                  Total grams needed
                </Link>
              </Typography>
              <Typography level='body-sm'>{projectDetails.est_grams_needed}</Typography>
              <Typography level='title-lg'>
                <Link
                  overlay
                  underline='none'
                  sx={{
                    color: 'text.primary',
                    '&.Mui-focusVisible:after': { outlineOffset: '-4px' },
                  }}
                >
                  Grams used
                </Link>
              </Typography>

              <Typography level='body-sm'>{projectDetails.grams_knit}</Typography>

              <Typography level='title-lg'>
                <Link
                  overlay
                  underline='none'
                  sx={{
                    color: 'text.primary',
                    '&.Mui-focusVisible:after': { outlineOffset: '-4px' },
                  }}
                >
                  Progress
                </Link>
              </Typography>
              <Typography level='body-sm'>
                {(projectDetails.grams_knit / projectDetails.est_grams_needed) * 100}%
              </Typography>
            </div>
          </Box>
        </Card>
        {imageClean(projectDetails)?.map((image, i) => {
          return (
            <Card
              className='container-card'
              variant='outlined'
              sx={(theme) => ({
                width: 270,
                height: 350, // Set the fixed height here
                flexDirection: 'column',
                overflow: 'hidden',
                transition: 'transform 0.3s, border 0.3s',
                '&:hover': {
                  borderColor: theme.vars.palette.primary.outlinedHoverBorder,
                  transform: 'translateY(-2px)',
                },
              })}
            >
              <AspectRatio
                ratio='3/4' // Set the aspect ratio for the phone photo size
                sx={{
                  width: '100%',
                  height: 'auto',
                }}
              >
                <img key={i} src={image} style={{ width: 240 }} />
              </AspectRatio>
            </Card>
          );
        })}
      </Box>
      {gramsToggle ? (
        <Box sx={{ minHeight: 75, display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 3 }}>
          <form onSubmit={() => handleSubmit()}>
            {/* <FormControl> */}
            <div className='row'>
              <div className='mb-3 col-lg-4'>
                <Input
                  className='form-control'
                  id='grams_knit'
                  type='text'
                  value={projectDetails?.grams_knit}
                  onChange={(event) =>
                    dispatch({ type: 'EDIT_PROJECT_DETAILS', payload: { grams_knit: event.target.value } })
                  }
                />
              </div>
              <div className='mb-3 col-lg-4'>
                <Button className='btn btn-primary' type='submit' onClick={() => handleSubmit(projectDetails.id)}>
                  Submit
                </Button>
              </div>
            </div>
            {/* </FormControl> */}
          </form>
        </Box>
      ) : (
        ''
      )}
      <Box sx={{ minHeight: 75, display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 3 }}>
        <Box
          className='notes-container'
          sx={{ minHeight: 75, display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 3 }}
        >
          <Card
            className='container-card'
            variant='outlined'
            sx={(theme) => ({
              width: 1210,
              height: 350, // Set the fixed height here
              flexDirection: 'column',
              overflow: 'hidden',
              transition: 'transform 0.3s, border 0.3s',
              '&:hover': {
                borderColor: theme.vars.palette.primary.outlinedHoverBorder,
                transform: 'translateY(-2px)',
              },
            })}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <div>
                <Typography level='title-lg'>
                  <Link
                    overlay
                    underline='none'
                    sx={{
                      color: 'text.primary',
                      '&.Mui-focusVisible:after': { outlineOffset: '-4px' },
                    }}
                  >
                    Project Notes
                  </Link>
                </Typography>
              </div>
              <IconButton
                size='sm'
                variant='soft'
                color={'neutral'}
                sx={{ ml: 'auto', zIndex: 2 }}
                onClick={() => addNoteButton()}
              >
                <AddCircleOutlineRoundedIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'left', justifyContent: 'left' }}>
              <Sheet
                // variant='outlined'
                sx={{
                  width: 1210,
                  maxHeight: 300,
                  overflow: 'auto',
                  borderRadius: 'sm',
                }}
              >
                <List>
                  {projectNotes.map((note) => {
                    return (
                      <>
                        <Typography level='title-md'>
                          {DateTime.fromISO(note.date).toFormat('MMMM dd, yyyy')}
                        </Typography>
                        <li className='note-item'>{note.notes}</li>
                        <ListDivider />
                      </>
                    );
                  })}
                </List>
              </Sheet>
            </Box>
          </Card>
        </Box>
      </Box>
      <Box
        id='bottom-button-box'
        sx={{
          minHeight: 75,
          display: 'flex',
          justifyContent: 'left',
          alignItems: 'center',
          margin: 3,
          paddingLeft: 14,
        }}
      >
        {toggle ? (
          <div className='container'>
            <form onSubmit={addNote}>
              <div className='row'>
                <div className='mb-3 col-lg-8'>
                  <input
                    className='form-control'
                    id='notes'
                    placeholder='Project notes'
                    type='text'
                    value={newNote.notes}
                    onChange={handleNewNote}
                  />
                </div>
                <div className='mb-3 col-lg-2'>
                  <input className='form-control' id='date' type='date' value={newNote.date} onChange={handleNewNote} />
                </div>
                <div className='mb-3 col-lg-2'>
                  <button class='btn btn-secondary' type='submit'>
                    Add Note
                  </button>
                </div>
              </div>
              <div className='row'></div>
            </form>
          </div>
        ) : (
          <Button
            sx={{ marginLeft: 28 }}
            style={{ backgroundColor: 'darkslategray' }}
            onClick={() => deleteProject(projectDetails.id)}
          >
            Delete Project
          </Button>
        )}
      </Box>
    </>
  );
}

export default ProjectDetails;
