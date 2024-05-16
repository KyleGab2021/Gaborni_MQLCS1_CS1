import React, { useState, useEffect } from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Label,
} from "reactstrap";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import kid from "assets/noprofilepic.jpg";
import bg from "assets/kingsdemisenebulastar.jpg";

function User() {
  const [user, setUser] = useState({});
  const [editUser, setEditUser] = useState({
    id: "",
    firstname: "",
    lastname: "",
    address: "",
    about: "",
    username: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3001");
        setUser(response.data[0]); // Access the first user object from the response array
        setEditUser(response.data[0]); // Set editUser state
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        // navigate("/login");
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleUpdateUser = () => {
    axios
      .put(`http://localhost:3001/update/${editUser.id}`, editUser)
      .then((res) => {
        console.log("User updated successfully");
        setUser(editUser); // Update the user state
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">PROFILE</h5>
                <label>Update your profile here</label>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Username</label>
                        <Input
                          value={editUser.username}
                          placeholder="Username"
                          type="text"
                          name="username"
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Email address</label>
                        <Input
                          value={editUser.email}
                          placeholder="@gmail.com"
                          type="email"
                          name="email"
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="5">
                      <FormGroup>
                        <label>First Name</label>
                        <Input
                          value={editUser.firstname}
                          placeholder="First Name"
                          type="text"
                          name="firstname"
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="5">
                      <FormGroup>
                        <label>Last Name</label>
                        <Input
                          value={editUser.lastname}
                          placeholder="Last Name"
                          type="text"
                          name="lastname"
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <div className="text-center">
                    <Button
                      className="btn btn-primary"
                      style={{backgroundColor: 'blue'}}
                      onClick={handleUpdateUser}
                    >
                      Update Profile
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>


          <Col md="4">
            <Card className="card-user">
              <div className="image">
                <img alt="..." src={bg} />
              </div>
              <CardBody>
                <div className="author">
                  <a
                    // href="https://github.com/VanCarlo95"
                    onClick={(e) => e.preventDefault()}
                  >
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={kid}
                    />
                    <h5 className="title">
                        {(user && user.firstname && user.firstname.toUpperCase()) + " " + (user && user.lastname && user.lastname.toUpperCase())}
                    </h5>

                  </a>
                  <p className="description">{user.username}</p>
                </div>
                <p className="description text-center"></p>
              </CardBody>
              <hr />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default User;
