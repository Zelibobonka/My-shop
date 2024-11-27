import Modal from "react-modal";

const customStylesModal = {
  content: {
    position: "static",
    display: "flex",
    justifyContent: "center",
    maxHeight: "100%",
    overflow: "auto",
  },
};

Modal.setAppElement("#root");

function ModalWrap({ isModalOpen, onCloseModal, children }) {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onCloseModal}
      style={customStylesModal}
    >
      {children}
    </Modal>
  );
}

export default ModalWrap;
