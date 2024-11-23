const Loader = ({ loading }) => {
  return (
    <div
      id="modelConfirm"
      className="fixed  z-50 inset-0 backdrop-brightness-50 opacity-70 backdrop-blur-sm overflow-y-auto h-full w-full px-4 "
    >
      <div
        className="border-gray-200 h-16 w-16 animate-spin 
        flex justify-center items-center m-auto rounded-full border-2 border-t-blue-500
       "
        style={{
          position: "fixed",
          top: "40%",
          left: "50%",
          // transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};

export default Loader;
