"use client";
import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="p-6 dark:bg-gray-100 dark:text-gray-800">
      <div className="container flex justify-between">
        <div className="flex flex-col space-y-4">
          <h2 className="font-medium">Getting started</h2>
          <div className="flex flex-col space-y-2 text-sm dark:text-gray-600">
            <Link rel="noopener noreferrer" href="#">
              Browse Courses
            </Link>
            <Link rel="noopener noreferrer" href="#">
              Browse Categories
            </Link>
            <Link rel="noopener noreferrer" href="#">
              As a student
            </Link>
            <Link rel="noopener noreferrer" href="#">
              As a Teacher
            </Link>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="font-medium">Community</h2>
          <div className="flex flex-col space-y-2 text-sm dark:text-gray-600">
            <Link rel="noopener noreferrer" href="#">
              GitHub
            </Link>
            <Link rel="noopener noreferrer" href="#">
              Discord
            </Link>
            <Link rel="noopener noreferrer" href="#">
              Twitter
            </Link>
            <Link rel="noopener noreferrer" href="#">
              YouTube
            </Link>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center px-6 pt-12 text-sm">
        <span className="dark:text-gray-600">
          © Copyright 2024 | Academix . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
