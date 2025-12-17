import cabin from "../assets/cabin.jpg";

function contact() {
  return (
    <div>
      <div
        className="hero-bg absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.45))",
        }}
      >
        <img
          src={cabin}
          alt=""
          className="w-full h-full object-cover mix-blend-overlay"
        />
      </div>

      <div className="w-full absolute flex justify-center bottom-16 px-4">
        <div className="inner flex gap-8 flex-col lg:flex-row  w-[95%] border-t-[#FFFBF5] border-t-1 py-4">
          <div className="left text-3xl lg:text-6xl font-[primary] text-[#FFFBF5]">
            <h1>General Inquiries</h1>
          </div>
          <div className="right py-2 lg:ml-26 px-0 lg:px-6 w-[90%] lg:w-[30%] flex flex-col gap-8 font-[medium] text-[#FFFBF5]">
            <a
              href="mailTo:kanncomp@yahoo.co.in"
              target="_blank"
              className="hover:underline "
            >
              kanncomp@yahoo.co.in
            </a>

            <p className="w-[80%] lg:w-[60%]">
              Old No. 38, New No. 52, Sri Krishna Nagar, 2nd Extention,
              Madhavaram, Chennai - 600060
            </p>

            <h5>9543712343 | 9360168892</h5>
          </div>

          <div className="w-[40vw] h-[20vh] lg:h-[30vh]  lg:w-[20vw] lg:order-3">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3884.913059157677!2d80.222005!3d13.167881500000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526604a2d8738f%3A0x6898f4c861b168cc!2sKannith!5e0!3m2!1sen!2sin!4v1765815577832!5m2!1sen!2sin"
              width="100%"
              height="100%"
              className="border:0 "
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default contact;
