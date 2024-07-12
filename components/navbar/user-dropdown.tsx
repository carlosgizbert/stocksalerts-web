'use client';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from "@nextui-org/react";
import { CACHE_QUERY_KEYS } from "@/services";
import { DarkModeSwitch } from "./darkmodeswitch";
import { deleteCookie } from "cookies-next";
import { signOut } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const UserDropdown = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      redirect: false,
    });
    deleteCookie("@auth:stockJwt")
    await queryClient.invalidateQueries({
      queryKey: Object.values(CACHE_QUERY_KEYS),
    });
    queryClient.clear();
    router.push('/');
  };

  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar
            as='button'
            color='secondary'
            size='md'
            src='https://avatars.githubusercontent.com/u/48734715?v=4'
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label='User menu actions'
        onAction={(actionKey) => console.log({ actionKey })}>
        <DropdownItem
          key='profile'
          className='flex flex-col justify-start w-full items-start'>
          <p>carlosgizbert@gmail.com</p>
        </DropdownItem>
        <DropdownItem
          key='logout'
          color='danger'
          className='text-danger'
          onPress={handleSignOut}>
          Sair
        </DropdownItem>
        <DropdownItem key='switch'>
          <DarkModeSwitch />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
