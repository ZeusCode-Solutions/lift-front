import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateWorkout from './CreateWorkout'; 
import UpdateWorkout from './UpdateWorkout'; 
import { withAuth0 } from '@auth0/auth0-react';

class Workouts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lifts: [],
      isLoading: false,
      showModal: false,
      token: null,
      updatedWorkout: {
        _id: '',
        title: '',
        description: '',
        exercises: '',
      },
    };
  }

  updateToken = (token) => {
    this.setState({ token: token });
  };

  handleUpdateWorkout = (lift) => {
    console.log('Clicked Update Workout:', lift);
    this.setState({
      showModal: true,
      updatedWorkout: {
        _id: lift._id || '',
        title: lift.title,
        description: lift.description,
        exercises: lift.exercises,
      },
    });
  };
  handleCloseModal = () => {
    this.setState({
      showModal: false,
      updatedWorkout: {
        _id: '',
        title: '',
        description: '',
        exercises: '',
      },
    });
  };

  async componentDidMount() {
    try {
      let res = await this.props.auth0.getIdTokenClaims();
      const token = res.__raw;
      console.log('This is my token:', token);
      this.setState({ token });
      let foundLifts = await fetch(`${import.meta.env.VITE_SERVER_URL}/lifts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (foundLifts.ok) {
        let liftData = await foundLifts.json();
        this.setState({
          lifts: liftData,
        });
        console.log('Found these lifts:', liftData);
      } else {
        console.error('No Lifts Found. Server response:', foundLifts.status);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  async handleDeleteWorkout(liftId) {
    try {
      let res = await this.props.auth0.getIdTokenClaims();
      const token = res.__raw;
      this.setState({ token });
      this.setState({ isLoading: true });
      console.log('Deleting lifts with this ID: ', liftId);
      let deleteLift = await fetch(`${import.meta.env.VITE_SERVER_URL}/lifts/${liftId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (deleteLift.ok) {
        this.setState((prevState) => ({
          lifts: prevState.lifts.filter((lift) => lift._id !== liftId),
        }));
        console.log('Lift Delete Successfully');
      } else {
        let errorResponse = await deleteLift.json();
        console.error('Failed to Delete Lift:', deleteLift.status, errorResponse);
      }
    } catch (error) {
      console.error('Error Deleting Lift: ', error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleEditSubmit = async (updatedWorkout) => {
    try {
      const { _id, title, description, exercises } = updatedWorkout;
      const updatedLiftData = { title, description, exercises };
      let res = await this.props.auth0.getIdTokenClaims();
      const token = res.__raw;
      this.setState({ token });

      let response = await fetch(`${import.meta.env.VITE_SERVER_URL}/lifts/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedLiftData),
      });
      if (response.ok) {
        const updatedLiftData = await response.json();
        this.setState((prevState) => ({
          lifts: prevState.lifts.map((lift) =>
            lift && updatedLiftData && updatedLiftData.updatedLift && lift._id === updatedLiftData.updatedLift._id
              ? updatedLiftData.updatedLift
              : lift
          ),
        }));
        this.handleCloseModal();
      } else {
        console.error('Workouts.jsx- Failed to Update Lift:', response.status);
      }
    } catch (error) {
      console.error('Workouts.jsx- Error Updating Lift: ', error);
    }
  };

  handleWorkoutCreated = (newLift) => {
    this.setState((prevState) => ({
      lifts: [...prevState.lifts, newLift],
    }));
  };

  render() {
    let carouselStyle = {
      margin: '2rem',
    };

    return (
      <>
        {this.props.auth0.isAuthenticated ? (
          <>
            <h3>Workouts</h3>

            {this.state.lifts.length > 0 ? (
              <Carousel style={carouselStyle} data-bs-theme="dark">
                {this.state.lifts.map((lift, index) => (
                  <Carousel.Item key={index}>
                {lift.img ? (
                  <img src={lift.img} alt={`Slide ${index + 1}`} />
                ) : (
                  <img src="https://fakeimg.pl/600x500/FFFFFF/FFFFFF" alt={`Slide ${index + 1}`} />
                )}
                      <Carousel.Caption className="book-card">
                      <h3>{lift.title}</h3>
                      <p>{lift.description}</p>
                      <Button variant="danger" onClick={() => this.handleDeleteWorkout(lift._id)}>
                        Delete Lift
                      </Button>
                      <Button variant="secondary" onClick={() => this.handleUpdateWorkout(lift)}>
                        Update Lift
                      </Button>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <h3>No Lifts Found</h3>
            )}
            <CreateWorkout
              onWorkoutCreated={this.handleWorkoutCreated}
              token={this.state.token}
              updateToken={this.updateToken}
            />
            {this.state.showModal && (
              <UpdateWorkout
                showModal={this.state.showModal}
                handleCloseModal={this.handleCloseModal}
                updatedWorkout={this.state.updatedWorkout}
                handleEditSubmit={this.handleEditSubmit}
                updateToken={this.updateToken}
              />
            )}
          </>
        ) : (
          <h2> Please Log In To View and Add Books</h2>
        )}
      </>
    );
  }
}

export default withAuth0(Workouts);