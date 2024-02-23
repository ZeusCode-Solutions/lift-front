import React from 'react';
import { Container, Row, Col, Card, Accordion } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

class Profile extends React.Component {
  render() {
    return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Drew Stroede</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Software Developer
              </Card.Subtitle>
              <Card.Text>
              Hello, I&apos;m Drew Stroede, a Houston-based software developer with a unique background in coaching, having worked with Superbowl champions, Olympic Gold Medalists, and other elite athletes. It was during my time as an online coach that my passion for software development and data collection truly took root. Combining my experience in college athletics and an MBA, I bring a blend of discipline and business acumen to the tech world. Now, eager to leverage my skills, I aim to empower individuals by using technology to facilitate continuous self-improvement. Let&apos;s connect and explore how my blend of education, coaching experience, and tech expertise can make a meaningful impact together.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
          <Col>
            <Accordion>
              <Card>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Welcome</Accordion.Header>
                  <Accordion.Body>
                    <p>Welcome to the Lift Tracker. This is not just another workout app. It is a mission – a mission to dominate your fitness goals, to attack each workout with discipline, and to achieve victory on the battlefield of iron.</p>

                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Our Purpose</Accordion.Header>
                  <Accordion.Body>
                    <p> Lift Tracker is your ally in the war against weakness. It does not accept excuses. It demands effort. It demands commitment. If you are here, you are here to win. Prepare for a relentless assault on your limits. Our mission is simple: empower you to take control of your workouts, crush every set, and leave nothing on the table. The battlefield is where you prove your worth, and Lift Tracker is your strategic advantage.</p>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>Motivate</Accordion.Header>
                  <Accordion.Body>
                    <p> Stay focused. Stay disciplined. Lift heavy. Conquer.</p>
                  </Accordion.Body>
                </Accordion.Item>
              </Card>
            </Accordion>
          </Col>
        </Row>
    </Container>
    );
  }
}

export default Profile;