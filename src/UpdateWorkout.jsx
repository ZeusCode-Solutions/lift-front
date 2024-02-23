import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

class UpdateWorkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      updatedWorkout: {
        title: '',
        description: '',
        exercises: ''
      },
    };
  }

  handleChange = (e) => {
    this.setState({
      updatedWorkout: { ...this.state.updatedWorkout, [e.target.name]: e.target.value },
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id, title, description, exercises } = this.props.updatedWorkout;
      this.setState({
        updatedWorkout: {
          _id,
          title: this.state.updatedWorkout.title || title,
          description: this.state.updatedWorkout.description || description,
          exercises: this.state.updatedWorkout.exercises || exercises,
        },
      });

      let res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/lifts/${this.props.updatedWorkout._id}`, this.state.updatedWorkout);
      console.log('UpdateWorkout.jsx- Workout Updated Successfully:', res.data);

      this.props.handleEditSubmit(this.state.updatedWorkout);
      this.props.handleCloseModal();
    } catch (error) {
      console.log('UpdateWorkout.jsx- Error Updating Workout:', error);
    }
  };

  render() {
    return (
      <>
        <Modal show={this.props.showModal} onHide={this.props.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Workout</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={(e) => this.handleSubmit(e)}>
              <Form.Label>
                Title:
                <Form.Control
                  type="text"
                  placeholder="title"
                  name="title"
                  value={this.state.updatedWorkout.title}
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
                  value={this.state.updatedWorkout.description}
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
                  value={this.state.updatedWorkout.exercises}
                  onChange={this.handleChange}
                  required
                />
              </Form.Label>

              <Button type="submit">Update Workout</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default UpdateWorkout;