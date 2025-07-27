export const SignUpForm = () => {
  return (
    <div>
      <form className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            placeholder="Enter your full name"
            className="py-2 px-3 rounded-lg border-slate-600 border focus:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:ring-offset-primary"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="py-2 px-3 rounded-lg border-slate-600 border focus:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:ring-offset-primary"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className="py-2 px-3 rounded-lg border-slate-600 border focus:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:ring-offset-primary"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            className="py-2 px-3 rounded-lg border-slate-600 border focus:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:ring-offset-primary"
          />
        </div>
        <div>
          <button
            type="button"
            className="rounded-lg hover:cursor-pointer bg-primary hover:bg-primary/90 disabled:bg-primary/50 disabled:hover:cursor-default w-full py-2 px-4"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};
