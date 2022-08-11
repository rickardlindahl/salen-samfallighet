import { Form } from "@remix-run/react";
import React, { useState } from "react";
import { Button, Drawer, Dropdown, Navbar } from "react-daisyui";
import { Footer } from "./Footer";
import { HamburgerIcon } from "./icons/HamburgerIcon";
import { KeyIcon } from "./icons/KeyIcon";
import { LogoutIcon } from "./icons/LogoutIcon";
import { UserIcon } from "./icons/UserIcon";
import { NavigationMenu } from "./NavigationMenu";
import { useSession } from "./SessionContext";

export const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  const { user } = useSession();
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <Drawer
      open={visible}
      onClickOverlay={toggleVisible}
      className="font-sans"
      side={<NavigationMenu horizontal={false} />}
    >
      <div className="flex flex-col h-screen justify-between">
        <Navbar>
          <Navbar.Start>
            <div className="flex-none md:hidden">
              <Button shape="square" color="ghost" onClick={toggleVisible}>
                <HamburgerIcon />
              </Button>
            </div>
            <div className="flex-1 px-2 mx-2">
              <h4 className="text-base font-bold">Salen</h4>
            </div>
          </Navbar.Start>
          <Navbar.End>
            <div className="flex-none hidden md:flex">
              <NavigationMenu horizontal />
              {user && (
                <Dropdown>
                  <Dropdown.Toggle>
                    <UserIcon />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="w-52 left-[-9rem] bg-base-300">
                    <Dropdown.Item className="pointer-events-none content-center flex" style={{ maxWidth: "100%" }}>
                      <div className="text-xs text-ellipsis overflow-hidden">{user.email}</div>
                    </Dropdown.Item>
                    <Dropdown.Item style={{ width: "100%" }}>
                      <KeyIcon />
                      Byt lösenord
                    </Dropdown.Item>
                    <Dropdown.Item style={{ width: "100%" }}>
                      <Form action="/logout" method="post">
                        <button type="submit" className="button flex w-full" style={{ gap: "0.75rem" }}>
                          <LogoutIcon />
                          Logga ut
                        </button>
                      </Form>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
          </Navbar.End>
        </Navbar>
        {children}
        <Footer />
      </div>
    </Drawer>
  );
};
