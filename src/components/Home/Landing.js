import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Envelope from "../animation";
import { FaFacebook, FaInstagram, FaRegUser, FaWhatsapp } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdOutlineContentCopy } from "react-icons/md";
import Loader from "../../shared/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { logPageView } from "../../utils/addGoogleAnalytics";

const Landing = () => {
  const { name, message, age, customUrl } = useParams();
  console.log("name: ", name);
  const [customUrlEnabled, setCustomUrlEnabled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState("");
  const [animation, setAnimation] = useState(false);
  const [loading, setLoading] = useState(false);
  const baseCustomUrl = "https://www.waiwishes.com/surprise/";
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // const message = queryParams.get("message");
  console.log(message, "Mess");
  useEffect(() => {
    logPageView(location.pathname);
  }, [location]);

  useEffect(() => {
    if (name) {
      setAnimation(true);
      setTimeout(() => {
        setModalOpen(true);
        setAnimation(false);
      }, 7000);
    }
  }, [name]);

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      message: "",
      customUrlPart: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .max(25, "Name must not More than 25 characters")
        .required("Name is required"),
      age: Yup.number()
        .required("Age is required")
        .min(1, "Age must be at least 1 year")
        .max(120, "Age should not more than 120 year")
        .positive("Age must be a positive number"),
      message: Yup.string()
        .required("Message is required")
        .max(400, "Message should not more than 400 characters"),
      customUrlPart: customUrlEnabled
        ? Yup.string().required("Custom URL part is required")
        : Yup.string().notRequired(),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (window.gtag) {
        window.gtag("event", "submit_button_click", {
          event_category: "Form",
          event_label: "User Submission",
          value: 1,
        });
      }
      if (customUrlEnabled) {
        try {
          const { data } = await axios.get(
            `https://13.201.137.218/api/check-custom/${values?.customUrlPart}`
          );
          if (data.exists) {
            toast.error("Custom URL already taken. Please choose another.", {
              theme: "dark",
            });
          } else {
            setLoading(true);

            const payData = {
              name: values?.name,
              amount: 9,
              msg: values?.message,
              age: values?.age,
              customUrl: values?.customUrlPart,
            };

            try {
              const { data } = await axios.post(
                "https://13.201.137.218/api/payment",
                payData
              );
              if (data?.redirectUrl) {
                window.location.href = data.redirectUrl;
              } else {
                toast.error("Redirect URL not provided by the backend", {
                  theme: "dark",
                });
              }
            } catch (error) {
              toast.error("Error processing payment:", { theme: "dark" });
            }
          }
        } catch (error) {
          console.error("Error checking custom URL:", error.message);
          toast.error(
            "An error occurred while checking the custom URL. Please try again.",
            { theme: "dark" }
          );
        }
      } else {
        const SendData = {
          name: values?.name,
          age: values?.age,
          message: values?.message,
        };

        try {
          const response = await axios.post(
            "https://13.201.137.218/api/create-user",
            SendData
          );

          if (response?.data?.success === "true") {
            toast.success("User Created successfully!", {
              theme: "dark",
              position: "top-right",
              autoClose: 3000,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            setUser(response?.data);
            setAnimation(true);
            setTimeout(() => {
              setModalOpen(true);
              setAnimation(false);
            }, 7000);
          } else {
            toast.error("Please try again!", { theme: "dark" });
          }
        } catch (error) {
          console.error("Error occurred while creating user:", error.message);
          toast.error("An error occurred. Please try again!", {
            theme: "dark",
          });
        }
      }
    },
  });

  const handleToggle = () => {
    setCustomUrlEnabled(!customUrlEnabled);
    if (!customUrlEnabled) {
      formik.setFieldValue("customUrlPart", "");
    }
  };

  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(user?.dummyLink || baseCustomUrl + customUrl)
        .then(() =>
          toast.success("URL copied to clipboard!", { theme: "dark" })
        )
        .catch((error) =>
          toast.error("Failed to copy text:", { theme: "dark" })
        );
    } else {
      // Fallback for unsupported browsers
      const textArea = document.createElement("textarea");
      textArea.value = user?.dummyLink;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");

        toast.success("URL copied to clipboard!", {
          theme: "dark",
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (error) {
        toast.error("Failed to copy text:", { theme: "dark" });
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="lg:flex min-h-screen overflow-scroll">
      {loading && <Loader loading={loading} />}
      {modalOpen && !name && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-brightness-50 backdrop-blur-md px-5">
          <div className="bg-white p-5 rounded-lg shadow-xl max-w-[30rem] w-full text-center transform transition-all duration-300 scale-105 relative">
            <div className="right-2 absolute top-2 text-3xl">
              <IoClose
                className=""
                onClick={() => {
                  setModalOpen(false);
                  setAnimation(false);
                }}
              />
            </div>
            <div className="mb-4 text-gray-600 text-[1rem] font-semibold flex capitalize items-center gap-3">
              <img src="/assets/c-url-icon.png" alt="url" />
              <p className="text-left">
                Share this link with your birthday friend for a <br /> special
                surprise!
              </p>
            </div>
            <div className="relative text-blue-600 font-medium text-lg underline mb-4 p-2 flex items-center border w-full">
              <span className="truncate text-[16px]">
                {!name && user?.dummyLink?.length > 40
                  ? `${user?.dummyLink.slice(0, 42)}...`
                  : user?.dummyLink}
              </span>
              <div
                className="absolute right-0 p-3 cursor-pointer border-2 border-blue-500 bg-blue-500 text-white hover:bg-blue-700"
                onClick={handleCopy}
              >
                <MdOutlineContentCopy />
              </div>
            </div>
            <div className="flex justify-center items-center text-2xl gap-8">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  user?.dummyLink || "Check out this link!"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="hover:text-blue-500" />
              </a>

              <a
                href="https://www.instagram.com/direct/inbox/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram
                  onClick={handleCopy}
                  className="hover:text-blue-500"
                />
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  user?.dummyLink || "https://www.waiwishes.com"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="hover:text-blue-500" />
              </a>
            </div>
          </div>
        </div>
      )}

      {modalOpen && name && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-brightness-50 backdrop-blur-md px-5">
          <div className="bg-white p-5 rounded-lg shadow-xl  max-w-[30rem]  w-full text-center transform transition-all duration-300 scale-105 relative">
            <div className="right-2 absolute top-2 text-3xl">
              <IoClose
                className=""
                onClick={() => {
                  setModalOpen(false);
                  setAnimation(false);
                }}
              />
            </div>
            <div className="mb-4 text-gray-600 text-[1rem]  font-semibold flex capitalize items-center gap-3">
              <img src="/assets/c-url-icon.png" alt="url" />
              <p className="text-left">
                Share this link with your birthday friend for a <br /> special
                surprise!
              </p>
            </div>
            <div className="relative text-blue-600 font-medium text-lg underline mb-4 p-2 flex items-center border w-full">
              <span className="truncate text-[16px]">
                {(baseCustomUrl + customUrl).length > 40
                  ? `${baseCustomUrl + customUrl?.slice(0, 42)}...`
                  : baseCustomUrl + customUrl}
              </span>
              <div
                className="absolute right-0 p-3 cursor-pointer border-2 border-blue-500 bg-blue-500 text-white hover:bg-blue-700"
                onClick={handleCopy}
              >
                <MdOutlineContentCopy />
              </div>
            </div>
          </div>
        </div>
      )}

      {animation && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-brightness-50 z-50 backdrop-blur-md">
          <div className="flex justify-center items-center m-auto">
            <Envelope name={user?.user?.name} />
          </div>
        </div>
      )}
      {animation && name && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-brightness-50 z-50 backdrop-blur-md">
          <div className="flex justify-center items-center m-auto">
            <Envelope name={name} />
          </div>
        </div>
      )}

      <div
        className="flex-1 bg-cover bg-center flex items-center justify-center relative py-[6rem]"
        style={{ backgroundImage: "url(/assets/fir.jpg)" }}
      >
        <div className="absolute top-4 lg:left-7 left-0">
          <img
            src="/assets/balloon.png"
            alt="text"
            className="lg:w-[76%] w-[45%] animate-jump"
          />
        </div>

        <div className="absolute lg:top-7  top-1 lg:right-7 -right-3">
          <img
            src="/assets/gift.png"
            alt="text"
            className="lg:w-[80%] w-[50%] animate-zoom"
          />
        </div>
        <img
          src="/assets/Text.png"
          alt="text"
          className="lg:max-w-[75%] w-[70%] "
        />
        <div className="absolute lg:bottom-9 bottom-1 lg:left-14 left-3">
          <img
            src="/assets/choc.png"
            alt="text"
            className="lg:w-[85%] w-[50%] animate-zoom"
          />
        </div>
        <div className="absolute lg:bottom-28 bottom-4 lg:right-8 right-[-12px]">
          <img
            src="/assets/cak.png"
            alt="text"
            className="lg:w-[85%] w-[50%] animate-jump"
          />
        </div>
      </div>

      <div
        className="flex-1 bg-cover bg-center flex items-center justify-center rounded-t-xl lg:rounded-none relative"
        style={{ backgroundImage: "url(/assets/secc.jpg)" }}
      >
        <div className="flex items-center flex-col justify-center h-full lg:w-[70%] py-14 lg:py-0 w-[94%] text-black mb-5">
          <div className=" flex gap-4 mb-[-8px]">
            <img src="/assets/candle.png" alt="Candle" className="w-16 " />
            <img src="/assets/candle.png" alt="Candle" className="w-16" />
            <img src="/assets/candle.png" alt="Candle" className="w-16" />
          </div>
          <div className="rounded-lg  bg-white shadow-md md:p-5 p-2 relative">
            <div className="w-full p-2 rounded-md ">
              <>
                <h2 className="lg:text-lg text-sm font-semibold mb-4">
                  Enter the birthday person's name, age, and a custom message
                  that will appear after they blow out their candles.
                </h2>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-gray-700 font-medium flex items-center text-lg gap-3">
                      <FaRegUser />
                      Name*
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formik.touched.name && formik.errors.name && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-gray-700 font-medium lg:text-lg   flex items-center gap-3">
                      <img
                        src="/assets/age-icon.png"
                        alt="age"
                        className="w-5"
                      />
                      Age*
                    </label>
                    <input
                      type="number"
                      placeholder="Age"
                      name="age"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.age}
                      className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formik.touched.age && formik.errors.age && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.age}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-gray-700 font-medium text-lg flex items-center gap-3">
                      <img src="/assets/msg-icon.png" alt="age" width={20} />
                      Message*
                    </label>
                    <textarea
                      name="message"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Message"
                      value={formik.values.message}
                      className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="2"
                    ></textarea>
                    {formik.touched.message && formik.errors.message && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.message}
                      </p>
                    )}
                  </div>
                  <label className="inline-flex items-center cursor-pointer border-2 border-[#619FEB] p-2 w-full rounded-md">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      checked={customUrlEnabled}
                      onChange={handleToggle}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    <span className="ms-3 lg:text-lg  text-sm  font-medium">
                      Get a custom URL for ₹ 9
                    </span>
                  </label>
                  {customUrlEnabled && (
                    <div>
                      <label className="block text-gray-700 font-medium">
                        Custom URL*
                      </label>
                      <input
                        type="text"
                        name="customUrlPart"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.customUrlPart}
                        className="w-full p-2 mt-1 border rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter custom  (e.g., test-test)"
                      />
                      <p className="text-sm text-gray-400">{`${baseCustomUrl}${formik.values.customUrlPart}`}</p>
                      {formik.touched.customUrlPart &&
                        formik.errors.customUrlPart && (
                          <p className="text-red-500 text-sm">
                            {formik.errors.customUrlPart}
                          </p>
                        )}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Submit
                  </button>
                </form>
                <Link target="_blank" to={"https://cutt.ly/fe07oJOC"}>
                  <button
                    type="submit"
                    className="w-full py-2 mt-4 px-4 bg-white border-[1.5px] border-blue-600 hover:shadow-lg hover:underline text-blue-600 rounded-md  focus:outline-none focus:ring-2 "
                  >
                    Download Birthday Wishes App
                  </button>
                </Link>
              </>
            </div>
          </div>
        </div>

        <div className="absolute bottom-3 md:right-2  flex flex-col md:flex-row md:items-end  md:gap-5  gap-2 mt-2 text-black text-lg font-medium w-[90%] md:w-auto">
          <div className="flex justify-between items-center gap-5  ">
            <Link
              to={"/privacy-policy"}
              className="hover:text-blue-600 underline md:text-lg text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              to={"/refund-policy"}
              className="hover:text-blue-600 underline  md:text-lg text-sm"
            >
              Refund Policy
            </Link>
          </div>
          <Link
            to={"/term-condition"}
            className="hover:text-blue-600 underline text-center md:text-right  md:text-lg text-sm"
          >
            Terms & Conditions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
