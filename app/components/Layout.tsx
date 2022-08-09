import React, { useState } from "react";
import { Button, Drawer, Menu, Navbar } from "react-daisyui";
import { Footer } from "./Footer";

export const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    console.log("CLICK");
    setVisible(!visible);
  };

  return (
    <Drawer
      open={visible}
      onClickOverlay={toggleVisible}
      className="font-sans"
      side={
        <Menu horizontal={false} className="p-4 overflow-y-auto w-80 bg-base-100">
          <Menu.Item>
            <a>Hem</a>
          </Menu.Item>
          <Menu.Item>
            <a>Dokument</a>
          </Menu.Item>
          <Menu.Item>
            <a>Adresslista</a>
          </Menu.Item>
        </Menu>
      }
    >
      <div className="flex flex-col h-screen justify-between">
        <Navbar>
          <div className="flex-none md:hidden">
            <Button shape="square" color="ghost" onClick={toggleVisible}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
          <div className="flex-1 px-2 mx-2">Salen</div>
          <div className="flex-none hidden md:block">
            <Menu horizontal={true}>
              <Menu.Item>
                <a>Hem</a>
              </Menu.Item>
              <Menu.Item>
                <a>Dokument</a>
              </Menu.Item>
              <Menu.Item>
                <a>Adresslista</a>
              </Menu.Item>
            </Menu>
          </div>
        </Navbar>
        {children}
        <Footer />
      </div>
    </Drawer>
  );
};
