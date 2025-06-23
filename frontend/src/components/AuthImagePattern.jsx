
const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center bg-[#1f2937] text-white p-10">
      <img
        src="/undraw_chatting_5u5z.svg"
        alt="Chat illustration"
        className="w-3/4 max-w-md mb-6"
      />
      <h2 className="text-3xl font-bold mb-4 text-center capitalize">
        Connect. Converse. Collaborate.
      </h2>
      <p className="text-lg text-gray-400 text-center max-w-md">
        Chatty makes staying in touch easy and fun.
      </p>
    </div>
  );
};

export default AuthImagePattern;
