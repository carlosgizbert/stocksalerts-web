
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
import React from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useCreateStock } from "@/services/stocks";
import { CreateStockPayload } from "@/services/stocks/dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { createStockSchema } from "./schema";

export const AddStock = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateStockPayload>({
  });
  const { mutate: createStock, isPending: isLoading } = useCreateStock({
    onSuccess: (stock) => {
      toast.success(<p>{stock.symbol} Cadastrado com sucesso</p>);
      onClose();
    },
    onError: () => toast.error(<p>Erro! Tente novamente</p>),
  });

  const onSubmit = (formData: CreateStockPayload) => {
    console.log({ formData })
    createStock({
      ...formData,
      description: '',
    });
  };

  return (
    <div>
      <Button
        onPress={onOpen}
        color="primary"
        variant="solid"
        endContent={<FeatherIcon icon="plus" size={18} />}
      >
        Cadastrar ativo
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1">
              Cadastrar ativo
            </ModalHeader>
            <ModalBody>
              <Input
                {...register("symbol")}
                label="Símbolo"
                variant="faded"
                placeholder="MGLU3.SA"
                errorMessage={errors.symbol?.message}
              />
              <Input
                {...register("lower_tunnel_limit")}
                label="Limite mínimo"
                variant="faded"
                errorMessage={errors.lower_tunnel_limit?.message}
              />
              <Input
                {...register("upper_tunnel_limit")}
                label="Limite máximo"
                variant="faded"
                errorMessage={errors.upper_tunnel_limit?.message}
              />
              <Input
                {...register("check_frequency")}
                label="Frequência da verificação (em minutos)"
                type="number"
                variant="faded"
                errorMessage={errors.check_frequency?.message}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onClose}>
                Fechar
              </Button>
              <Button color="primary" type="submit" disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};
