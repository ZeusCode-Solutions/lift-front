import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';

class UpdateWorkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: this.props.showModal,
      updatedWorkout: this.props.updatedWorkout,
      newExercise: { movement: '', weight: '', sets: '', reps: '' },
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.showModal !== prevProps.showModal) {
      this.setState({
        showModal: this.props.showModal,
        updatedWorkout: this.props.updatedWorkout,
        newExercise: { movement: '', weight: '', sets: '', reps: '' },
      });
    }
  }

  handleAddNewExercise = () => {
    this.setState((prevState) => ({
      updatedWorkout: {
        ...prevState.updatedWorkout,
        exercises: [...prevState.updatedWorkout.exercises, prevState.newExercise],
      },
      newExercise: { movement: '', weight: '', sets: '', reps: '' },
    }));
  };

  handleNewExerciseChange = (field, value) => {
    this.setState((prevState) => ({
      newExercise: {
        ...prevState.newExercise,
        [field]: value,
      },
    }));
  };

  handleUpdateWorkout = async () => {
    const resToken = await this.props.auth0.getIdTokenClaims();
    const token = resToken.__raw;
    console.log(token)
    try {

      this.props.updateToken(token);

      const apiUrl =  `${import.meta.env.VITE_SERVER_URL}/lifts/${this.state.updatedWorkout._id}`;

      
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/lifts/${this.state.updatedWorkout._id}`,
        {
          title: this.state.updatedWorkout.title,
          description: this.state.updatedWorkout.description,
          exercises: this.state.updatedWorkout.exercises,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const updatedLiftData = await response.json();
        this.props.handleEditSubmit(updatedLiftData.updatedLift);
        this.props.handleCloseModal();
      } else {
        console.error('Failed to update lift:', response.status);
      }
    } catch (error) {
      console.error('Error updating lift:', error);
    }
  };


  render() {
    return (
      <Modal show={this.state.showModal} onHide={this.props.handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          {this.state.updatedWorkout.exercises.map((exercise, index) => (
            <div key={index}>
              <h5>Exercise {index + 1}</h5>
              <p>Movement: {exercise.movement}</p>
              <p>Weight: {exercise.weight}</p>
              <p>Sets: {exercise.sets}</p>
              <p>Reps: {exercise.reps}</p>
              <Button type="button" onClick={this.handleUpdateWorkout}>
            Update
          </Button>
            </div>
          ))}

          
          <h5>Update Lifts</h5>
          <Form.Label>
            Movement:
            <Form.Control
              type="text"
              placeholder="movement"
              value={this.state.newExercise.movement}
              onChange={(e) => this.handleNewExerciseChange('movement', e.target.value)}
              required
            />
          </Form.Label>
          <Form.Label>
            Weight:
            <Form.Control
              type="text"
              placeholder="weight"
              value={this.state.newExercise.weight}
              onChange={(e) => this.handleNewExerciseChange('weight', e.target.value)}
              required
            />
          </Form.Label>
          <Form.Label>
            Sets:
            <Form.Control
              type="text"
              placeholder="sets"
              value={this.state.newExercise.sets}
              onChange={(e) => this.handleNewExerciseChange('sets', e.target.value)}
              required
            />
          </Form.Label>
          <Form.Label>
            Reps:
            <Form.Control
              type="text"
              placeholder="reps"
              value={this.state.newExercise.reps}
              onChange={(e) => this.handleNewExerciseChange('reps', e.target.value)}
              required
            />
          </Form.Label>

          <Button type="button" onClick={this.handleAddNewExercise}>
            Add Exercise
          </Button>

          <Button type="button" onClick={this.handleUpdateWorkout}>
            Update Workout
          </Button>
        </Modal.Body>
      </Modal>
    );
  }
}

export default withAuth0(UpdateWorkout);