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
        exercises: ''
      },
    };
  }

  handleChange = (e) => {
    this.setState({
      workout: { ...this.state.workout, [e.target.name]: e.target.value },
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let resToken = await this.props.auth0.getIdTokenClaims();
      const token = resToken.__raw;
      console.log('This is my token:', token);
      this.props.updateToken(token);
      let res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/lifts`, this.state.workout, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      console.log('New Workout Created:', res.data);

      this.setState((prevState) => ({
        workout: { ...prevState.workout, res: res.data },
      }));
      this.props.onWorkoutCreated(res.data);
      this.handleCloseModal();
    } catch (error) {
      console.log('Error Creating Workout:', error);
    }
  };

  handleShowModal = () => {
    this.setState({ showModal: true });
  }

  handleCloseModal = () => {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <>
        <Button variant="primary" onClick={this.handleShowModal}>
          Add Workout
        </Button>

        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Workout</Modal.Title>
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

              <Form.Label>
                Exercises:
                <Form.Control
                  type="text"
                  placeholder="exercises"
                  name="exercises"
                  value={this.state.workout.exercises}
                  onChange={this.handleChange}
                  required
                />
              </Form.Label>

              <Button type="submit">Create Workout</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default withAuth0(CreateWorkout);
