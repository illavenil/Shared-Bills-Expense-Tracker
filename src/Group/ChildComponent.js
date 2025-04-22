// import React, { useState } from 'react';
// import { Modal, Button } from 'react-bootstrap';

// const ChildComponent = () => {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   return (
//     <>
//     <h1>Hello</h1>
//     <h1>Hello</h1>
//     {/*  */}
//       <Button variant="primary" onClick={handleShow}>
//         Open Scrollable Modal
//       </Button>

//       <Modal scrollable={true} show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Scrollable Modal Example</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {/* Content that exceeds the height of the modal */}
//           {[...Array(20)].map((_, index) => (
//             <p key={index}>
//               This is some example text. Lorem ipsum dolor sit amet,
//               consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
//               labore et dolore magna aliqua. Ut enim ad minim veniam, quis
//               nostrud exercitation ullamco laboris nisi ut aliquip ex ea
//               commodo consequat. Duis aute irure dolor in reprehenderit in
//               voluptate velit esse cillum dolore eu fugiat nulla pariatur.
//               Excepteur sint occaecat cupidatat non proident, sunt in culpa
//               qui officia deserunt mollit anim id est laborum.
//             </p>
//           ))}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleClose}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default ChildComponent;

// import React, { useState } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';

// const ChildComponent = () => {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Handle form submission logic here
//     console.log('Form submitted!');
//     handleClose(); // Close modal after form submission
//   };

//   return (
//     <>
//     <h1>Hello</h1>
//      <h1>Hello</h1>
//       <Button variant="primary" onClick={handleShow}>
//         Open Scrollable Modal with Form
//       </Button>

//       <Modal scrollable={true} show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Scrollable Modal with Form</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="formName">
//               <Form.Label>Name</Form.Label>
//               <Form.Control type="text" placeholder="Enter your name" />
//             </Form.Group>

//             <Form.Group controlId="formEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control type="email" placeholder="Enter email" />
//             </Form.Group>

//             <Form.Group controlId="formMessage">
//               <Form.Label>Message</Form.Label>
//               <Form.Control as="textarea" rows={3} placeholder="Enter your message" />
//             </Form.Group>

//             <Button variant="primary" type="submit">
//               Submit
//             </Button>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default ChildComponent;
