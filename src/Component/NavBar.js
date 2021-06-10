/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import {
  Grid,
  Icon,
  // Input,
  InputGroup,
  Nav,
  Navbar,
  Row,
  Col,
  Button,
  ControlLabel,
  Form,
  // FormControl,
  FormGroup,
  Modal,
  Alert,
} from 'rsuite';
import { useModalState } from '../Misc/Modal';

const NavBar = () => {
  const { open, isOpen, close } = useModalState();
  const [formValue, setFormValue] = useState('');
  const [items, setItems] = useState([]);
  const [fText, setfText] = useState('');

  const newfItems = items.filter(item =>
    item.toLocaleLowerCase().includes(fText)
  );

  const itemsToDisplay = fText ? newfItems : items;

  const onFormChange = event => {
    setFormValue(event.target.value);
  };

  const onSubmit = async () => {
    if (!formValue) {
      Alert.info('Please add the items', 4000);
    } else {
      setItems([...items, formValue]);
      setFormValue('');
      await Alert.success('Item has been added', 4000);
    }
  };

  const deleteItem = id => {
    const updatedItem = items.filter((element, index) => {
      return index !== id;
    });

    setItems(updatedItem);
  };

  return (
    <>
      <Navbar>
        <Navbar.Header>
          <a href="www.google.com" className="navbar-brand logo">
            UrbanBasket
          </a>
        </Navbar.Header>
        <Navbar.Body>
          <Grid>
            <Row>
              <Nav>
                <Col xs={24} sm={12} md={8} className="search">
                  <InputGroup>
                    <input
                      placeholder="Search here"
                      size="lg"
                      onChange={e => {
                        setfText(e.target.value.toLocaleLowerCase());
                      }}
                    />
                    <InputGroup.Button>
                      <Icon icon="search" />
                    </InputGroup.Button>
                  </InputGroup>
                </Col>
              </Nav>
              <Col className="col">
                <Nav pullRight>
                  <Nav.Item icon={<Icon icon="plus-square" />} onSelect={open}>
                    Add here
                  </Nav.Item>
                </Nav>
                <Modal show={isOpen} onHide={close}>
                  <Modal.Header>
                    <Modal.Title>Grocery Item</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form fluid formValue={formValue}>
                      <FormGroup>
                        <ControlLabel>Enter the item</ControlLabel>
                        <input
                          name="name"
                          placeholder="Enter the item..... "
                          value={formValue}
                          onChange={onFormChange}
                          className="inputField"
                        />
                      </FormGroup>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button block appearance="primary" onClick={onSubmit}>
                      Add the item
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Col>
            </Row>
          </Grid>
        </Navbar.Body>
      </Navbar>

      <div className="items">
        {!newfItems.length && (
          <div>There are currently no items to display</div>
        )}
        {itemsToDisplay.map((element, index) => {
          return (
            <div className="eachItem" key={index}>
              <ul>
                <span>
                  <li>
                    <div>
                      <h3>{element}</h3>

                      {/* eslint-disable-next-line react/self-closing-comp */}

                      <Icon
                        icon="trash2"
                        onClick={() => {
                          deleteItem(index);
                        }}
                      />
                    </div>
                  </li>
                </span>
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default NavBar;
