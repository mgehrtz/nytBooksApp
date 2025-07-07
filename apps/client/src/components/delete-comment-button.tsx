'use client'

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

export default function DeleteCommentButton({ commentId, onDelete, isDisabled }: { commentId: number, onDelete: (commentId: number) => void, isDisabled: boolean }) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  function handleDelete() {
    onDelete(commentId);
  }

  return (
    <>
      <Button isIconOnly color="danger" variant="faded" isDisabled={isDisabled} onPress={onOpen}>
        <FontAwesomeIcon icon={faTrash} />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Are you sure?</ModalHeader>
              <ModalBody>
                <p>
                  You are about to delete your comment. This cannot be undone. Are you sure you want to continue?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={() => {
                  handleDelete();
                  onClose();
                }}>
                  Delete Comment
                </Button>
                <Button color="primary" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
