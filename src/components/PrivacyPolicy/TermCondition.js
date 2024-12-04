import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const TermsAndConditions = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-5">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 lg:p-10 relative">
        <div className="bg-gray-400 text-white p-2 rounded-full absolute top-6 md:top-4 left-2 cursor-pointer">
          <IoArrowBack className="text-2xl" onClick={() => navigate("/")} />
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-center text-blue-600 mb-6">
          Terms & Conditions
        </h1>
        <p className="text-center text-sm text-gray-500 mb-10">
          Effective Date: 27th November 2024 • Last Updated: 27th November 2024
        </p>

        <div className="text-gray-700 space-y-6">
          <p>
            Welcome to <strong>waiwishes.com</strong>, owned and operated by
            Fanmart Media Private Limited ("we," "our," or "us"). By accessing
            or using our website, you agree to the following terms and
            conditions:
          </p>

          <h2 className="text-xl font-semibold text-blue-600">
            Use of the Website
          </h2>
          <ul className="list-disc list-inside ml-5 space-y-2">
            <li>
              <strong>Eligibility:</strong> You must be 13 years or older to use
              this website.
            </li>
            <li>
              <strong>Purpose:</strong> This website is intended for creating
              personalized birthday wishes. You agree to use the site only for
              lawful purposes.
            </li>
            <li>
              <strong>Accuracy of Information:</strong> You are responsible for
              ensuring the accuracy of the information provided for creating
              birthday wishes.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-blue-600">
            Content Ownership
          </h2>
          <ul className="list-disc list-inside ml-5 space-y-2">
            <li>
              <strong>User-Generated Content:</strong> The wishes you create
              using our website are your responsibility. Ensure that any custom
              messages do not include offensive, harmful, or inappropriate
              content.
            </li>
            <li>
              <strong>Intellectual Property:</strong> All designs, templates,
              and functionalities of waiwishes.com are the exclusive property of
              Fanmart Media Private Limited. You may not copy, distribute, or
              modify any part of the website without our consent.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-blue-600">
            Prohibited Activities
          </h2>
          <p>You agree not to:</p>
          <ul className="list-disc list-inside ml-5 space-y-2">
            <li>
              Use the website to distribute malicious software or content.
            </li>
            <li>
              Reverse-engineer, decompile, or otherwise attempt to access the
              website’s source code.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-blue-600">
            Limitation of Liability
          </h2>
          <ul className="list-disc list-inside ml-5 space-y-2">
            <li>Any incorrect or incomplete information entered by users.</li>
            <li>
              Any direct, indirect, or consequential damages arising from your
              use of the website.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-blue-600">
            Modification of Terms
          </h2>
          <p>
            We reserve the right to modify these terms at any time. Continued
            use of the website constitutes acceptance of the revised terms.
          </p>

          <h2 className="text-xl font-semibold text-blue-600">Governing Law</h2>
          <p>
            These terms are governed by the laws of Indian Jurisdiction, without
            regard to conflict of laws principles.
          </p>

          <h2 className="text-xl font-semibold text-blue-600">Contact Us</h2>
          <p>
            For questions or concerns about these Terms & Conditions, please
            contact us:
          </p>
          <p>
            <strong>Fanmart Media Private Limited</strong>
            <br />
            Email:{" "}
            <a
              href="mailto:fanmartindia@gmail.com"
              className="text-blue-500 underline"
            >
              fanmartindia@gmail.coms
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
