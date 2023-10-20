export default function Banner() {
    return (
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://plus.unsplash.com/premium_photo-1663039947303-0fad26f737b8?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-lg">
            <h1 className="mb-5 text-5xl font-bold">We’ve got all your cleaning needs covered.</h1>
            <p className="mb-5">
            “We offer a wide range of cleaning services to meet your needs. Our team of professional cleaners is dedicated to providing high-quality, reliable service.
            </p>
            <button className="btn btn-primary">Clean Now</button>
          </div>
        </div>
      </div>
    );
  }