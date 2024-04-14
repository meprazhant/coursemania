"use client";
import React, { useEffect } from "react";
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineCloudSync,
  AiOutlineDollar,
  AiOutlineClockCircle,
  AiOutlineUser,
  AiOutlineCalendar,
} from "react-icons/ai";
import Countdown from "react-countdown";

const Completionist = () => <span>You are good to go!</span>;

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <div className="flex gap-5">
        <div className="flex flex-col items-center">
          <p className="text-3xl font-bold">{days > 9 ? days : "0" + days}</p>
          <p className="text-gray-500">Days</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-3xl font-bold">
            {hours > 9 ? hours : "0" + hours}
          </p>
          <p className="text-gray-500">Hours</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-3xl font-bold">
            {minutes > 9 ? minutes : "0" + minutes}
          </p>
          <p className="text-gray-500">Minutes</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-3xl font-bold">
            {seconds > 9 ? seconds : "0" + seconds}
          </p>
          <p className="text-gray-500">Seconds</p>
        </div>
      </div>
    );
  }
};

function SingleCOursePage({ slug }) {
  useEffect(() => {
    if (window) {
      window.scroll(0, 0);
    }
  }, []);

  return (
    <div className="flex gap-3 flex-col">
      <div className="flex md:p-7 p-4 w-full">
        <img
          src="https://via.placeholder.com/1920"
          className="w-full max-h-[400px] object-cover rounded-md"
          alt="course image"
        />
      </div>
      <div className="flex relative  flex-col md:flex-row gap-5 md:p-10 p-4 md:pt-2 pt-2">
        <div className="flex flex-col gap-3  md:w-2/3 w-full ">
          {/* title */}
          <h1 className="text-3xl font-bold ">
            Become a Certified Web Developer: HTML, CSS and JavaScript
          </h1>
          {/* short Description */}
          <p className="text-gray-500">
            Learn to build beautiful responsive websites with the latest HTML,
            CSS, and JavaScript.
          </p>
          {/* ratings and students */}
          <div className="flex gap-2 items-center">
            <div className="flex gap-1 items-center">
              <AiFillStar size={22} className="text-yellow-500" />
              <p className="text-gray-500">4.5</p>
              <AiOutlineStar size={22} className="text-gray-500" />
            </div>
            <p className="text-gray-500">1200 students</p>
          </div>
          {/* created by */}
          <div className="flex gap-2 items-center">
            <AiOutlineUser size={22} className="text-gray-800" />
            <p className="text-gray-500">John Doe</p>
          </div>
          {/* a line */}
          <div className="flex h-[2px] w-full bg-gray-800 rounded-full opacity-30"></div>
          {/* big description */}
          <div className="flex flex-col gap-3">
            <h1 className="text-xl font-bold">About The Course</h1>
            <p className="text-gray-500">
              Completely Updated for 2023/2024 with 40 NEW lectures coding
              activities and projects! Learn What It Takes to Code Dynamic,
              Professional Websites and Web Apps From The Comfort of Your Own
              Home Do you ever browse the internet wondering how your favorite
              websites were built? Facebook, Twitter, Amazon—they were all
              created by people who at one point in time didn’t know anything
              about coding. How did they obtain this knowledge? In this
              comprehensive course, I’m going to show you everything you need to
              know so that you can follow in these people’s footsteps. You’re
              going to learn how to code AND you’re going to become a certified
              professional from a recognized international trainer. And best of
              all, you’re going to have fun doing it. You Don’t Have to Be a
              Genius or a Mathematical Wizard. So many people believe that you
              must have a special ‘gift’ to create professional-quality, dynamic
              websites/web apps. I’m here to tell you once and for all that this
              is false. All you need to have is the desire to learn and the
              ability to follow instructions—that’s it! Our course starts
              teaching basic coding principles and develops your coding skills
              in a variety of languages from beginner through to advanced. Here
              it is, once and for all, a complete guide that will take you from
              novice to web developer. Skip Hours of Frustration and Thousands
              of Wasted Dollars and Become 100% Certified The internet has
              changed the rules of doing business. More and more companies are
              migrating online while many new, never before seen businesses are
              created every day thanks to the power of this phenomenon. You know
              what that means? Higher demand for people just like you! But the
              problem for these businesses is that while demand is high, supply
              is short. Please don’t let a lack of knowledge stop you from
              having the career of your dreams, not when the knowledge you need
              is right here and is extremely affordable. Don’t worry, you won’t
              need to buy any additional courses, it’s all here. No need to
              spend four years and over $15,000 per year in college tuition
              either—it really is all here. From HTML to CSS then to Javascript
              and finally PHP, you will learn how to Become a Certified Web
              Developer. It Doesn’t Matter Where You’re Starting From...You Can
              Do It! Maybe: ● You’re planning on studying coding at college and
              want to build a rock-solid foundation so that you have a huge head
              start before your course begins? ● You’re dissatisfied with your
              current job and want to learn exactly what it takes to become a
              fully qualified web developer? ● You’re currently working in IT
              but want to expand your skill base so that you’re 100% up to date
              with the latest developments in web technology? ● You want to
              develop mobile apps or websites on the side to create some
              additional income while retaining your current job? Learn Skills
              That Will Benefit You for The Rest of Your Life - Imagine being
              able to create a web app that is downloaded by millions of paying
              customers—or a website that’s visited by people from all seven
              continents. - Imagine the limitless opportunities that having
              these programming skills will give you. - Imagine working in a
              field that challenges you and allows you to express yourself
              freely every day. - Imagine being paid extremely well for
              developing products and services that can help change people’s
              lives. Stop imagining and take action! It’s time to start your
              journey. Your future is waiting for you... Four Certifications in
              One The unique Certified Web Development Professional credential
              will provide proof that you have mastered the fundamental skills
              needed by new web developers. You'll have a full understanding of
              HTML5, the language used to structure web sites and many mobile
              applications that you use every day. From there, you'll move on to
              Javascript-- the language of interaction on the web. The use of
              Javascript is growing at a lightning pace and it's been called
              "the most important language to learn today," by multiple experts.
              Each language carries its own individual Specialist Designation
              for which you earn a certificate, the privilege of using the
              specialist credential badge, and a personal online transcript page
              that shows your designations, certification, and accomplishments.
              Prepare for Valuable Industry Certifications This course is
              specially designed to prepare you for the Web Development
              Professional Certification from LearnToProgram, Inc. This
              certification will allow you to prove that you have achieved
              competencies in HTML, CSS, and JavaScript-- everything you need to
              create basic web applications. New for 2023: No exams are required
              to earn your certifications. Complete and submit all the lab
              activities for the course program and you'll earn your new
              certifications! Certified Web Developers will receive: A printable
              certificate indicating the new certification that you can present
              to employers or prospects A letter explaining the certification
              and its value to a prospective employer. The letter will state
              exactly what mastery the certification represents Authorization to
              use the LearnToProgram Certified Web Developer Badge on your
              website and marketing materials Automatic linkage to your LinkedIn
              account to display your certification Who this course is for: Web
              Designers who Want to Learn To Code Traditional Programmers who
              Want to Learn Web Development People who Want to Develop Mobile
              Web Sites Students who want Practical Development Skills Web
              Masters who Need to Improve Development Skills Volunteers who
              Manage a Site for a Church or Non Profit Teachers who Want to
              Introduce Web Development to Their Classes Those Considering a
              Career in Web Development
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5 bg-gray-200 sticky top-2 right-10 max-h-[98vh] p-5 md:w-1/3 w-full">
          <img
            src="https://i.ibb.co/9HbyJgH/landing.jpg"
            alt="course"
            className="object-cover w-full rounded-md"
          />
          <div className="flex flex-col gap-3">
            <h1 className="text-xl font-bold">Course Starts In</h1>
            <div className="flex w-full justify-center items-center">
              <Countdown date={Date.now() + 100000000} renderer={renderer} />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="text-xl font-bold">Course Details</h1>
            <div className="flex gap-2 items-center">
              <AiOutlineClockCircle size={22} className="text-gray-800" />
              <p className="text-gray-500">Duration: 6 Weeks</p>
            </div>
            <div className="flex gap-2 items-center">
              <AiOutlineDollar size={22} className="text-gray-800" />
              <p className="text-gray-500">Price: $220</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="text-xl font-bold">Enroll Now</h1>
            <button className="bg-blue-500 text-white p-3 rounded-md">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleCOursePage;
