import { Form } from "@remix-run/react";
import { clsx } from "clsx";
import { Divider, Menu } from "react-daisyui";
import { AddressIcon } from "./icons/AddressIcon";
import { DocumentIcon } from "./icons/DocumentIcon";
import { HouseIcon } from "./icons/HouseIcon";
import { KeyIcon } from "./icons/KeyIcon";
import { LogoutIcon } from "./icons/LogoutIcon";
import { UserIcon } from "./icons/UserIcon";
import { useSession } from "./SessionContext";

interface NavigationMenuProps {
  horizontal: boolean;
}

export const NavigationMenu = ({ horizontal }: NavigationMenuProps) => {
  const { user } = useSession();

  return (
    <div className={clsx(!horizontal && "w-80 min-h-screen bg-base-100 overflow-y-auto p-4")}>
      <Menu horizontal={horizontal}>
        <Menu.Item>
          <a>
            <HouseIcon />
            Hem
          </a>
        </Menu.Item>
        <Menu.Item>
          <a>
            <DocumentIcon />
            Dokument
          </a>
        </Menu.Item>
        <Menu.Item>
          <a>
            <AddressIcon />
            Adresslista
          </a>
        </Menu.Item>
      </Menu>

      {!horizontal && user && (
        <>
          <Divider />

          <Menu className="bg-base-300 rounded-md">
            <Menu.Item className="pointer-events-none content-center flex">
              <div className="max-w-full">
                <UserIcon />
              </div>
            </Menu.Item>
            <Menu.Item className="pointer-events-none content-center flex">
              <span className="max-w-full">
                <div className="text-xs text-ellipsis overflow-hidden">{user.email}</div>
              </span>
            </Menu.Item>
            <Menu.Item>
              <a>
                <KeyIcon />
                Byt lösenord
              </a>
            </Menu.Item>
            <Menu.Item>
              <Form action="/logout" method="post">
                <button type="submit" className="button flex w-full" style={{ gap: "0.75rem" }}>
                  <LogoutIcon />
                  Logga ut
                </button>
              </Form>
            </Menu.Item>
          </Menu>
        </>
      )}
    </div>
  );
};
