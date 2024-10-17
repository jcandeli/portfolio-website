"use client";

import Link from "next/link";

function Navigation() {
  return (
    <nav aria-label="Main navigation">
      <ul>
        <li>
          <button aria-haspopup="true" aria-expanded="false">
            Filter
          </button>
          <ul>
            <li>
              <Link href="/">All</Link>
            </li>
            <li>
              <Link href="/photos">Photos</Link>
            </li>
            <li>
              <Link href="/designs">Designs</Link>
            </li>
            <li>
              <Link href="/music">Music</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href="/about">About me</Link>
        </li>
        <li>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
