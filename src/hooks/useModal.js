import { useState } from "react";

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const showModal = (content = "") => {
    setModalContent(content);
    setIsShowing(true);
  };

  const hideModal = () => {
    setIsShowing(false);
    setModalContent("");
  };

  return {
    isShowing,
    modalContent,
    showModal,
    hideModal,
  };
};

export default useModal;
