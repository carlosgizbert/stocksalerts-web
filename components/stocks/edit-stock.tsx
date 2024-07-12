import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import FeatherIcon from "feather-icons-react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useEditStock } from "@/services/stocks";
import { CreateStockPayload } from "@/services/stocks/dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { createStockSchema } from "./schema";
import { Stock } from "@/models/stock";

interface EditStockProps {
  data: Stock;
}

export const EditStock = ({ data }: EditStockProps) => {
  const { id } = data;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateStockPayload>({ 
    
  });

  const {
    mutate: editStock,
    isPending: isLoading,
    isError: isError,
  } = useEditStock({
    onSuccess: () => {
      toast.success(<span>Ativo atualizado</span>);
    },
    onError: (error) =>
      toast.error(
        <span>Erro! Por favor tente novamente. {error.message}</span>
      ),
    id,
  });

  const onSubmit = (formData: CreateStockPayload) => {
    console.log({ formData });
    editStock({
      id,
      ...formData,
    });
  };

  useEffect(() => {
    if (data) {
      setValue('symbol', data.symbol);
      setValue('check_frequency', data.check_frequency);
      setValue('lower_tunnel_limit', data.lower_tunnel_limit);
      setValue('upper_tunnel_limit', data.upper_tunnel_limit);
    }
  }, [data, setValue]);

  return (
    <div>
      <Tooltip content="Editar">
        <Button onClick={onOpen} isIconOnly variant="light">
          <FeatherIcon
            icon="edit-3"
            strokeWidth={1.5}
            size={20}
          />
        </Button>
      </Tooltip>
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
              <Button color="success" type="submit" disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};
