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
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateStockFormType,
  createStockSchema,
} from "@/helpers/schemas/stocks";

export const AddStock = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateStockFormType>({
    mode: "onChange",
    resolver: zodResolver(createStockSchema),
  });

  const { mutate: createStock, isPending: isLoading } = useCreateStock({
    onSuccess: (stock) => {
      toast.success(<p>{stock.symbol} Cadastrado com sucesso</p>);
      onClose();
    },
    onError: (error: any) => {
      toast.error(<p>Erro! {error.response.data.symbol[0]}</p>)
    },
  });

  const onSubmit = (formData: CreateStockFormType) => {
    createStock({
      symbol: formData.symbol,
      check_frequency: Number(formData.check_frequency),
      lower_tunnel_limit: Number(formData.lower_tunnel_limit),
      upper_tunnel_limit: Number(formData.upper_tunnel_limit),
    });
  };

  return (
    <div>
      <Button
        onPress={onOpen}
        color="success"
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
                label="Símbolo"
                placeholder="Digite o símbolo ex: AMER3.SA"
                size="lg"
                type="text"
                variant="faded"
                errorMessage={errors.symbol?.message}
                isInvalid={!!errors.symbol?.message}
                {...register("symbol")}
              />
              <div className="flex gap-2">
                <Input
                  label="Limite mínimo"
                  placeholder="Insira o limite"
                  size="lg"
                  variant="faded"
                  type="number"
                  min={0}
                  errorMessage={errors.lower_tunnel_limit?.message}
                  isInvalid={!!errors.lower_tunnel_limit?.message}
                  {...register("lower_tunnel_limit")}
                />
                <Input
                  label="Limite máximo"
                  placeholder="Insira o limite"
                  size="lg"
                  type="number"
                  variant="faded"
                  min={0}
                  errorMessage={errors.upper_tunnel_limit?.message}
                  isInvalid={!!errors.upper_tunnel_limit?.message}
                  {...register("upper_tunnel_limit")}
                />
              </div>
              <Input
                label="Frequência de checagem (em minutos)"
                placeholder=""
                size="lg"
                min={1}
                type="number"
                variant="faded"
                errorMessage={errors.check_frequency?.message}
                isInvalid={!!errors.check_frequency?.message}
                {...register("check_frequency")}
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
