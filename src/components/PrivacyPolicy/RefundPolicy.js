import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const RefundPolicy = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-5">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 lg:p-10 relative">
        <div className="bg-gray-400 text-white p-2 rounded-full absolute top-6 md:top-4 left-2 cursor-pointer">
          <IoArrowBack className="text-2xl" onClick={() => navigate("/")} />
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-center text-blue-600 mb-6">
          Refund Policy
        </h1>
        <p className="text-center text-sm text-gray-500 mb-10">
          Effective Date: 27th November 2024 • Last Updated: 27th November 2024
        </p>

        <div className="text-gray-700 space-y-6">
          <p>
            At <strong>waiwishes.com</strong>, operated by Fanmart Media Private
            Limited, we strive to provide seamless and high-quality services.
            The following outlines our refund policy for the custom link
            service:
          </p>

          <h2 className="text-xl font-semibold text-blue-600">
            Custom Link Service
          </h2>
          <ul className="list-disc list-inside ml-5 space-y-2">
            <li>
              <strong>Service Description:</strong> Users can create a
              personalized custom link for Rs. 19, allowing them to have a
              unique URL with their chosen name.
            </li>
            <li>
              <strong>Non-Refundable Policy:</strong> The Rs. 19 charge for the
              custom link service is non-refundable under any circumstances.
            </li>
          </ul>
          <p>This policy applies even if:</p>
          <ul className="list-disc list-inside ml-5 space-y-2">
            <li>You decide not to use the custom link after purchase.</li>
            <li>
              There are typographical errors in the chosen custom link (please
              double-check your entry before finalizing).
            </li>
            <li>The link does not meet your expectations.</li>
          </ul>

          <h2 className="text-xl font-semibold text-blue-600">
            Why is this Service Non-Refundable?
          </h2>
          <p>
            The custom link service involves resources and processes that are
            immediately utilized upon creation of the link. As such, we are
            unable to reverse or cancel the transaction once the service is
            delivered.
          </p>

          <h2 className="text-xl font-semibold text-blue-600">
            Customer Responsibility
          </h2>
          <p>
            Users are encouraged to carefully review their chosen custom link
            before confirming the purchase. We are not liable for errors or
            unintended choices made during the submission process.
          </p>

          <h2 className="text-xl font-semibold text-blue-600">Support</h2>
          <p>
            If you encounter any technical issues with your custom link, please
            contact our support team at{" "}
            <a
              href="mailto:fanmartindia@gmail.com"
              className="text-blue-500 underline"
            >
              fanmartindia@gmail.com
            </a>
            . While refunds are not possible, we are happy to assist in
            resolving any issues related to the functionality of the link.
          </p>

          <h2 className="text-xl font-semibold text-blue-600">Contact Us</h2>
          <p>
            For questions or concerns about this refund policy, please contact
            us:
          </p>
          <p>
            <strong>Fanmart Media Private Limited</strong>
            <br />
            <strong>Email:</strong>  
            <a
              href="mailto:fanmartindia@gmail.com"
              className="text-blue-500 underline"
            >
             {" "} fanmartindia@gmail.com
            </a>
            <br />
            <br />
            <strong> Address: </strong>
            <span>
              Fanmart Media Private Limited <br />
              3RD FLOOR, NO 1664, 27TH MAIN SECTOR 2, HSR LAYOUT, <br />
              Bengaluru, Bengaluru Urban, Karnataka, 560102 <br />
              Karnataka <br />
              India <br />
              9980421041 <br />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
