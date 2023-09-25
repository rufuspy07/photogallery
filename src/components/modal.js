import { Modal } from "react-bootstrap";

function CustomMoal(props) {
  return (
    <div>
      <Modal
        // size="xl"
        show={true}
        centered
        onHide={() => {
          props.setShowModal(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="justify-center flex">
          <div className="h-[600px] w-[600px] cursor-pointer">
            <div
              class="w-full h-full bg-contain bg-no-repeat bg-center"
              style={{ backgroundImage: `url(${props.imgUrl})` }}
            ></div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CustomMoal;
