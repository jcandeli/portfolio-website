"use client";

import { useState } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { ChevronDown } from "lucide-react";

const NavContainer = styled.nav`
  padding: 1rem 2rem;
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
  font-size: 1rem;
  display: flex;
  align-items: center;
`;

const DropdownMenu = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  list-style-type: none;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  &:hover {
    text-decoration: underline;
  }
`;

const ExternalLink = styled.a`
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: underline;
  }
`;

function Navigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <NavContainer aria-label="Main navigation">
      <NavList>
        <NavItem>
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
