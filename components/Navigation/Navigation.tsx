"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { ChevronDown } from "lucide-react";
import FocusTrap from "focus-trap-react";

const NavContainer = styled.nav`
  padding: 1rem 0;
  position: relative; // so we can use z-index to prevent H1 from overlapping
  z-index: 2;
`;

const NavList = styled.ul`
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin-right: 1rem;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: var(--primary);
`;

const DropdownMenu = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  background-color: var(--secondary);
  border: 1px solid var(--primary);
  border-radius: 4px;
  padding: 0.5rem;
  list-style-type: none;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: var(--primary);
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  &:hover {
    text-decoration: underline;
  }
`;

const ExternalLink = styled.a`
  text-decoration: none;
  color: var(--primary);
  &:hover {
    text-decoration: underline;
  }
`;

function Navigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <NavContainer aria-label="Main navigation">
      <NavList>
        <NavItem>
          <FocusTrap
            active={isDropdownOpen}
            focusTrapOptions={{
              escapeDeactivates: true,
              allowOutsideClick: true,
            }}
          >
            <div ref={dropdownRef}>
              <DropdownButton
                onClick={toggleDropdown}
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
              >
                Filter
                <ChevronDown size={16} style={{ marginLeft: "0.25rem" }} />
              </DropdownButton>
              <DropdownMenu isOpen={isDropdownOpen}>
                <NavItem>
                  <NavLink href="/" onClick={closeDropdown}>
                    All
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/photos" onClick={closeDropdown}>
                    Photos
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/designs" onClick={closeDropdown}>
                    Designs
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/music" onClick={closeDropdown}>
                    Music
                  </NavLink>
                </NavItem>
              </DropdownMenu>
            </div>
          </FocusTrap>
        </NavItem>
        {/* <NavItem>
          <NavLink href="/about">About me</NavLink>
        </NavItem> */}
        <NavItem>
          <ExternalLink
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </ExternalLink>
        </NavItem>
        <NavItem>
          <ExternalLink
            href="https://github.com/jcandeli/portfolio-website"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </ExternalLink>
        </NavItem>
      </NavList>
    </NavContainer>
  );
}

export default Navigation;
