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
import FeatherIcon from "feather-icons-react";
import toast from "react-hot-toast";
import { useDeleteStock } from "@/services/stocks";

interface DeleteStockProps {
  data: {
    id: string
    symbol: string
  }
}

export const DeleteStock = ({ data }: DeleteStockProps) => {
  const { id, symbol } = data

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate: deleteStock, isPending: isLoading } = useDeleteStock({
    onSuccess: () => {
      toast.success(<p>Excluída com sucesso</p>);
      onClose()
    },
    onError: () => {
      toast.error(<p>Erro inesperado! Tente novamente</p>);
    },
  });

  return (
    <div>
      <Button
        isIconOnly
        color="danger"
        variant="light"
        onClick={onOpen}
      >
        <FeatherIcon
          icon="trash"
          className="text-red-500"
          strokeWidth={1.5}
          size={20}
        />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Excluir
          </ModalHeader>
          <ModalBody><b>{symbol}</b> <span className="text-danger-500">será excluído permanentemente</span></ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>
              Manter
            </Button>
            <Button
              color="danger"
              type="button"
              onClick={() => deleteStock({ id })}
              disabled={isLoading}
            >
              {isLoading ? "Excluindo..." : "Confirmar"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
