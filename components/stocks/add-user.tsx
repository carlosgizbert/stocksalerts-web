import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";

export const AddStock = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <Button onPress={onOpen} color="primary" variant="solid">
          Configurar ativo
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Monitorar ativo
                </ModalHeader>
                <ModalBody>
                  <Input label="Símbolo" variant="faded" />
                  {/* <Input label="Descrição" variant="faded" /> */}
                  <Input label="Limite mínimo" variant="faded" />
                  <Input label="Limite máximo" variant="faded" />

                  <Input
                    label="Frequência da verificação (em minutos)"
                    type="number"
                    variant="faded"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button variant="flat" onClick={onClose}>
                    Fechar
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Salvar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
    </div>
  );
};
