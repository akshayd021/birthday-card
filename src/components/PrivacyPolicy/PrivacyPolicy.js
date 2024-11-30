import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-5">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 lg:p-10">
        <h1 className="text-3xl lg:text-4xl font-bold text-center text-blue-600 mb-6">
          Privacy Policy
        </h1>
        <p className="text-center text-sm text-gray-500 mb-10">
          Effective Date: 27th November 2024 • Last Updated: 27th November 2024
        </p>

        <div className="text-gray-700 space-y-6">
          <p>
            <strong>Fanmart Media Private Limited</strong> ("we," "our," or
            "us") respects your privacy and is committed to protecting the
            personal information you provide while using our website,{" "}
            <a href="https://waiwishes.com" className="text-blue-500 underline">
              waiwishes.com
            </a>
            .
          </p>

          <h2 className="text-xl font-semibold text-blue-600">
            Information We Collect
          </h2>
          <ul className="list-disc list-inside ml-5 space-y-2">
            <li>Name of the birthday person.</li>
            <li>Age of the birthday person.</li>
            <li>A custom message provided by you.</li>
          </ul>
          <p>
            We do not collect any personal information about the user creating
            the wish unless explicitly provided.
          </p>

          <h2 className="text-xl font-semibold text-blue-600">
            How We Use Your Information
          </h2>
          <p>
            The information you provide is used solely to generate personalized
            birthday wishes on our platform. We do not store, share, or sell
            this information. Any details entered are processed temporarily and
            are not retained after generating the wish.
          </p>

          <h2 className="text-xl font-semibold text-blue-600">
            Custom Link Feature
          </h2>
          <p>
            If you use the custom link feature on{" "}
            <a href="https://waiwishes.com" className="text-blue-500 underline">
              waiwishes.com
            </a>
            , you may choose a unique URL name for your birthday wish. The
            details you provide to create the custom link are used solely for
            generating and hosting your personalized link.
          </p>
          <p>
            We do not store this information permanently, and the data is
            processed only for the creation and delivery of the custom link.
            Once generated, the custom link remains active as long as our
            services are operational, but it is not linked to any personally
            identifiable information.
          </p>

          <h2 className="text-xl font-semibold text-blue-600">Data Security</h2>
          <p>
            We employ industry-standard security measures to protect your
            information. However, no method of transmission over the internet or
            electronic storage is 100% secure, and we cannot guarantee absolute
            security.
          </p>

          <h2 className="text-xl font-semibold text-blue-600">
            Third-Party Links
          </h2>
          <p>
            Our website may contain links to third-party websites. We are not
            responsible for the privacy practices or content of those sites.
          </p>

          <h2 className="text-xl font-semibold text-blue-600">Your Rights</h2>
          <p>
            Since we do not store any personal information, you do not need to
            request the deletion of data. However, if you believe any
            privacy-related issues arise, please contact us at{" "}
            <a
              href="mailto:fanmartindia@gmail.com"
              className="text-blue-500 underline"
            >
              fanmartindia@gmail.com
            </a>
            .
          </p>

          <h2 className="text-xl font-semibold text-blue-600">Contact Us</h2>
          <p>
            For questions or concerns about this Privacy Policy, please contact
            us:
          </p>
          <p>
            <strong>Fanmart Media Private Limited</strong>
            <br />
            Email:{" "}
            <a
              href="mailto:fanmartindia@gmail.com"
              className="text-blue-500 underline"
            >
              fanmartindia@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
