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
import { zodResolver } from "@hookform/resolvers/zod";
import { Stock } from "@/models/stock";
import { EditStockFormType, editStockSchema } from "@/helpers/schemas/stocks";

interface EditStockProps {
  data: Stock;
}

export const EditStock = ({ data }: EditStockProps) => {
  const { id } = data;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<EditStockFormType>({
    mode: "onChange",
    resolver: zodResolver(editStockSchema),
  });

  const {
    mutate: editStock,
    isPending: isLoading,
  } = useEditStock({
    onSuccess: () => {
      toast.success(<span>Ativo atualizado</span>);
    },
    onError: (error: any) =>
      toast.error(<p>Erro! {error.response.data.symbol[0]}</p>),
    id,
  });

  const onSubmit = (formData: EditStockFormType) => {
    editStock({
      id,
      ...(formData.symbol !== data.symbol && { symbol: formData.symbol}),
      check_frequency: Number(formData.check_frequency),
      lower_tunnel_limit: Number(formData.lower_tunnel_limit),
      upper_tunnel_limit: Number(formData.upper_tunnel_limit),
    });
  };

  useEffect(() => {
    if (data) {
      setValue('symbol', data.symbol);
      setValue('check_frequency', String(data.check_frequency));
      setValue('lower_tunnel_limit',  String(data.lower_tunnel_limit));
      setValue('upper_tunnel_limit', String(data.upper_tunnel_limit));
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
              Editar ativo
            </ModalHeader>
            <ModalBody>
              <Input
                label="Símbolo"
                placeholder="Digite o símbolo ex: AMER3.SA"
                size="lg"
                type="text"
                min={0}
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
                  min={0}
                  errorMessage={errors.lower_tunnel_limit?.message}
                  isInvalid={!!errors.lower_tunnel_limit?.message}
                  {...register("lower_tunnel_limit")}
                />
                <Input
                  label="Limite máximo"
                  placeholder="Insira o limite"
                  size="lg"
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
                min="1"
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
