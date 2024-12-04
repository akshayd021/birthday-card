const Loader = ({ loading }) => {
  return (
    <div
      id="modelConfirm"
      className="fixed z-50 inset-0 backdrop-brightness-50 opacity-70 backdrop-blur-sm overflow-y-auto h-full w-full px-4 flex justify-center items-center"
    >
      <div
        className="border-gray-200 h-16 w-16 animate-spin rounded-full border-2 border-t-blue-500"
      />
    </div>
  );
};

export default Loader;
