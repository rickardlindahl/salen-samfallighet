import React, { useState } from "react";
import { Button, Drawer, Dropdown, Navbar } from "react-daisyui";
import { Footer } from "./Footer";
import { NavigationMenu } from "./NavigationMenu";
import { useSession } from "./SessionContext";

export const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  const { isLoggedIn } = useSession();
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
            <div className="flex-1 px-2 mx-2">
              <h5 className="text-base font-bold">Salen</h5>
            </div>
          </Navbar.Start>
          <Navbar.End>
            <div className="flex-none hidden md:block">
              <NavigationMenu horizontal />
              {isLoggedIn && (
                <Dropdown>
                  <Dropdown.Toggle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="w-52 left-[-9rem] bg-base-300">
                    <Dropdown.Item style={{ width: "100%" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                        />
                      </svg>
                      Byt lösenord
                    </Dropdown.Item>
                    <Dropdown.Item style={{ width: "100%" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logga ut
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
