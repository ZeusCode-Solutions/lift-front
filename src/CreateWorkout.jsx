import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';

class CreateWorkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      workout: {
        title: '',
        description: '',
        exercises: [],
        isUpdating: false,
      },
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.updatedWorkout !== prevProps.updatedWorkout) {
      const { title, description, exercises } = this.props.updatedWorkout;
      this.setState({
        workout: {
          title,
          description,
          exercises: [...exercises],
          isUpdating: true,
        },
      });
    }
  }

  handleChange = (e) => {
    if (e.target.name === 'exercises') {
      const exercises = e.target.value.split(',').map((exercise) => exercise.trim());
      this.setState((prevState) => ({
        workout: { ...prevState.workout, exercises },
      }));
    } else {
      this.setState((prevState) => ({
        workout: { ...prevState.workout, [e.target.name]: e.target.value },
      }));
    }
  };
  handleSubmit = async (e) => {
  e.preventDefault();

  try {
    let resToken = await this.props.auth0.getIdTokenClaims();
    const token = resToken.__raw;
    console.log('This is my token:', token);
    this.props.updateToken(token);

    const { title, description, exercises } = this.state.workout;

    const updatedWorkoutData = {
      title,
      description,
      exercises: exercises.map(exercise => ({
        movement: exercise.movement,
        weight: exercise.weight,
        sets: exercise.sets,
        reps: exercise.reps,
        id: exercise.id,
      })),
    };

    const url = this.state.workout.isUpdating
      ? `${import.meta.env.VITE_SERVER_URL}/lifts/${this.props.updatedWorkout._id}`
      : `${import.meta.env.VITE_SERVER_URL}/lifts`;

    const newLift = await axios.post(
      url,
      updatedWorkoutData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('New Workout Created:', newLift.data);

    this.setState((prevState) => ({
      workout: { ...prevState.workout, res: newLift.data },
    }));
    this.props.onWorkoutCreated(newLift.data);
    this.handleCloseModal();
    } catch (error) {
      console.log('Error Creating/Updating Workout:', error);
    }
  };

  handleShowModal = () => {
    this.setState({
      showModal: true,
      workout: {
        title: '',
        description: '',
        exercises: [],
        isUpdating: false,
      },
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };

  handleAddExercise = () => {
    const newExercise = { movement: '', weight: '', sets: '', reps: '' };
    this.setState((prevState) => ({
      workout: {
        ...prevState.workout,
        exercises: [...prevState.workout.exercises, newExercise],
      },
    }));
  };

  handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...this.state.workout.exercises];
    updatedExercises[index][field] = value;

    this.setState((prevState) => ({
      workout: {
        ...prevState.workout,
        exercises: updatedExercises,
      },
    }));
  };

  render() {
    return (
      <>
        <Button variant="primary" onClick={this.handleShowModal}>
          Add Workout
        </Button>

        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.workout.isUpdating ? 'Update' : 'Add New'} Workout</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Label>
                Title:
                <Form.Control
                  type="text"
                  placeholder="title"
                  name="title"
                  value={this.state.workout.title}
                  onChange={this.handleChange}
                  required
                />
              </Form.Label>

              <Form.Label>
                Description:
                <Form.Control
                  type="text"
                  placeholder="description"
                  name="description"
                  value={this.state.workout.description}
                  onChange={this.handleChange}
                  required
                />
              </Form.Label>

              {this.state.workout.exercises.map((exercise, index) => (
                <div key={index}>
                  <h5>Exercise {index + 1}</h5>
                  <Form.Label>
                    Movement:
                    <Form.Control
                      type="text"
                      placeholder="movement"
                      value={exercise.movement}
                      onChange={(e) => this.handleExerciseChange(index, 'movement', e.target.value)}
                      required
                    />
                  </Form.Label>

                  <Form.Label>
                    Weight:
                    <Form.Control
                      type="text"
                      placeholder="weight"
                      value={exercise.weight}
                      onChange={(e) => this.handleExerciseChange(index, 'weight', e.target.value)}
                      required
                    />
                  </Form.Label>

                  <Form.Label>
                    Sets:
                    <Form.Control
                      type="text"
                      placeholder="sets"
                      value={exercise.sets}
                      onChange={(e) => this.handleExerciseChange(index, 'sets', e.target.value)}
                      required
                    />
                  </Form.Label>

                  <Form.Label>
                    Reps:
                    <Form.Control
                      type="text"
                      placeholder="reps"
                      value={exercise.reps}
                      onChange={(e) => this.handleExerciseChange(index, 'reps', e.target.value)}
                      required
                    />
                  </Form.Label>
                  
                </div>
              ))}

              <Button type="button" onClick={this.handleAddExercise}>
                Add Exercise
              </Button>

              <Button type="submit">
                {this.state.workout.isUpdating ? 'Update Workout' : 'Create Workout'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default withAuth0(CreateWorkout);