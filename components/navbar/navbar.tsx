import { Navbar, NavbarContent } from "@nextui-org/react";
import { GithubIcon } from "../icons/navbar/github-icon";
import { BurguerButton } from "./burguer-button";
import { UserDropdown } from "./user-dropdown";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  return (
    <div className="relative bg-slate-50 flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden">
          <BurguerButton />
        </NavbarContent>
        <NavbarContent />
        <NavbarContent
          justify="end"
          className="w-fit data-[justify=end]:flex-grow-0"
        >
          <Link
            href="https://github.com/carlosgizbert"
            target={"_blank"}
          >
            <GithubIcon />
          </Link>
          <NavbarContent>
            <UserDropdown />
          </NavbarContent>
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};
