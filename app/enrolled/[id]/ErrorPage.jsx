import Link from "next/link";
import React from "react";

function ErrorPage({ message }) {
  return (
    <section className="flex items-center h-full p-16 dark:bg-gray-50 dark:text-gray-800">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">{message}</p>
          <p className="mt-4 mb-8 dark:text-gray-600">
            Please try again later.
          </p>
          <Link
            rel="noopener noreferrer"
            href="/my-space"
            className="px-8 py-3 font-semibold rounded dark:bg-indigo-600 dark:text-gray-50"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ErrorPage;
