import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
} from "reactstrap";
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { FiEdit, FiTrash2 } from "react-icons/fi";

function Inventory() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    productname: "",
    quantity: "",
    price: "",
    sales: "",
    prodimage: "", // Add image field
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editProduct, setEditProduct] = useState({
    id: "",
    productname: "",
    quantity: "",
    price: "",
    sales: "",
    prodimage: "", // Add image field
  });
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost:3001/prod")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  const toggleAddModal = () => setAddModal(!addModal);
  const toggleEditModal = () => setEditModal(!editModal);

  const handleCreateProduct = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/createprod", newProduct)
      .then((res) => {
        fetchProducts();
        setNewProduct({
          productname: "",
          quantity: "",
          sales: "",
          prodimage: "",
        });
        toggleAddModal();
      })
      .catch((err) => console.log(err));
  };

  const handleEditProduct = (id, productname, quantity, sales, price, prodimage) => {
    setIsEditing(true);
    setEditProduct({
      id,
      productname,
      quantity,
      price, // Ensure that the price value is set correctly
      sales,
      prodimage,
    });
    toggleEditModal();
  };

  const handleUpdateProduct = () => {
    axios
      .put(`http://localhost:3001/updateprod/${editProduct.id}`, editProduct)
      .then((res) => {
        fetchProducts();
        setIsEditing(false);
        setEditProduct({
          id: "",
          productname: "",
          quantity: "",
          price: "", // Ensure that the price value is cleared after updating
          sales: "",
          prodimage: "",
        });
        toggleEditModal();
      })
      .catch((err) => console.log(err));
  };
  

  const handleDeleteProduct = (id) => {
    axios
      .delete(`http://localhost:3001/deleteprod/${id}`)
      .then((res) => {
        fetchProducts();
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    return product.productname.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row> 
        <Form>
          <FormGroup>
            <InputGroup className="no-border">
              <Input
                placeholder="🔍Search..."
                value={searchTerm}
                onChange={handleSearch}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', // Change opacity to non-transparent
                  padding: '20px', // Increase padding
                  fontSize: '16px', // Increase font size
                  height: '40px', // Increase height
                  width: '300px'
                }}
              />
              
            </InputGroup>
          </FormGroup>
        </Form>

          <Col md={12}>
          </Col>
        </Row>
        {filteredProducts.length > 0 && (
          <Row>
            {filteredProducts.map((product) => (
              <Col md={4} key={product._id}>
                <Card>
                  <CardHeader>
                    <h5 className="text-center">{product.productname}</h5>
                  </CardHeader>
                  <CardBody>
                    <div
                      style={{
                        width: "100%",
                        height: "200px",
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={product.prodimage}
                        alt={product.productname}
                        style={{ width: "auto", height: "100%" }}
                      />
                    </div>
                    <p>Quantity: {product.quantity}</p>
                    <p>
                      Price:{" "}
                      {new Intl.NumberFormat("en-us", {
                        style: "currency",
                        currency: "PHP",
                      }).format(product.price)}
                    </p>
                    <p>
                      Sales:{" "}
                      {new Intl.NumberFormat("en-us", {
                        style: "currency",
                        currency: "PHP",
                      }).format(product.sales)}
                    </p>
                    <div className="d-flex justify-content-center">
                      <Button
                        className="mr-2"
                        color="info"
                        onClick={() =>
                          handleEditProduct(
                            product._id,
                            product.productname,
                            product.quantity,
                            product.sales,
                            product.price,
                            product.prodimage
                          )
                        }
                      >
                        <FiEdit />
                      </Button>
                      <Button
                        color="danger"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        <FiTrash2 />
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        )}
        <div className="text-center">
          <Button className="btn btn-primary" style={{fontWeight: 'bold', backgroundColor: 'blue'}}  onClick={toggleAddModal}>
            ADD PRODUCT
          </Button>
        </div>  
        <Modal isOpen={addModal} toggle={toggleAddModal}>
        <ModalHeader toggle={toggleAddModal} style={{ textAlign: 'center' }}>Add</ModalHeader>
          <p className="text-center py-2 mx-3">Please ensure that all fields are filled out accurately to add a new product successfully.</p>
          <ModalBody>
            <Form onSubmit={handleCreateProduct}>
              <FormGroup>
                <Label for="productname">Product Name</Label>
                <Input
                  type="text"
                  name="productname"
                  id="productname"
                  value={newProduct.productname}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, productname: e.target.value })
                  }
                  placeholder="e.g. Acoustic Dog"
                  className="form-control"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="quantity">Quantity</Label>
                <Input
                  type="number"
                  name="quantity"
                  id="quantity"
                  value={newProduct.quantity}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, quantity: e.target.value })
                  }
                  placeholder="e.g. 50"
                  className="form-control"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="price">Price</Label>
                <Input
                  type="text"
                  name="price"
                  id="price"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  placeholder="e.g. 5000"
                  className="form-control"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="sales">Sales</Label>
                <Input
                  type="text"
                  name="sales"
                  id="sales"
                  value={newProduct.sales}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, sales: e.target.value })
                  }
                  placeholder="e.g. 4500"
                  className="form-control"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="prodimage">Image URL</Label>
                <Input
                  type="text"
                  name="prodimage"
                  id="prodimage"
                  value={newProduct.prodimage}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      prodimage: e.target.value,
                    })
                  }
                  placeholder="e.g. eat_and_sleep.jpg"
                  className="form-control"
                  required
                />
              </FormGroup>
              <div className="text-center">
                <Button type="submit" style={{fontWeight: 'bold', backgroundColor: 'blue'}} className="btn btn-primary">
                  ADD PRODUCT
                </Button>
              </div>
            </Form>
          </ModalBody>
        </Modal>

        {isEditing && (
          <Modal isOpen={editModal} toggle={toggleEditModal}>
            <ModalHeader toggle={toggleEditModal}>Edit Product</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleUpdateProduct}>
                <FormGroup>
                  <Label for="productname">Product Name</Label>
                  <Input
                    type="text"
                    name="productname"
                    id="productname"
                    value={editProduct.productname}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        productname: e.target.value,
                      })
                    }
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="quantity">Quantity</Label>
                  <Input
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={editProduct.quantity}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        quantity: e.target.value,
                      })
                    }
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="price">Price</Label>
                  <Input
                    type="text"
                    name="price"
                    id="price"
                    value={editProduct.price}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        price: e.target.value,
                      })
                    }
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="sales">Sales</Label>
                  <Input
                    type="text"
                    name="sales"
                    id="sales"
                    value={editProduct.sales}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        sales: e.target.value,
                      })
                    }
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="prodimage">Image URL</Label>
                  <Input
                    type="text"
                    name="prodimage"
                    id="prodimage"
                    value={editProduct.prodimage}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        prodimage: e.target.value,
                      })
                    }
                    placeholder="Enter image URL"
                    className="form-control"
                    required
                  />
                </FormGroup>
                <Button type="submit">Update Product</Button>
              </Form>
            </ModalBody>
          </Modal>
        )}
      </div>
    </>
  );
}

export default Inventory;
