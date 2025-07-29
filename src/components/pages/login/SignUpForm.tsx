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
            className="py-2 px-3 rounded-lg border-light-border border focus:outline-2 focus:outline-offset-2 focus:outline-dark-accent bg-light-main-bg dark:bg-dark-main-bg"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="py-2 px-3 rounded-lg border-light-border border focus:outline-2 focus:outline-offset-2 focus:outline-dark-accent bg-light-main-bg dark:bg-dark-main-bg"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className="py-2 px-3 rounded-lg border-light-border border focus:outline-2 focus:outline-offset-2 focus:outline-dark-accent bg-light-main-bg dark:bg-dark-main-bg"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            className="py-2 px-3 rounded-lg border-light-border border focus:outline-2 focus:outline-offset-2 focus:outline-dark-accent bg-light-main-bg dark:bg-dark-main-bg"
          />
        </div>
        <div>
          <button
            type="button"
            className="transition-all duration-500 hover:scale-105 rounded-lg hover:cursor-pointer text-dark-primary-text bg-dark-accent hover:bg-dark-accent/90 disabled:bg-dark-accent/50 disabled:hover:cursor-default w-full py-2 px-4"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};
